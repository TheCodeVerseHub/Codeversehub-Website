import fs from "fs";
import path from "path";
import { logger } from "./application-logger";

interface ApplicationRecord {
  id: string;
  githubUsername: string;
  email: string;
  discordMember: string;
  createdAt: string;
}

interface RateLimitEntry {
  ipHash: string;
  userId: string;
  timestamps: number[];
  monthKey: string;
}

interface StorageData {
  applications: ApplicationRecord[];
  rateLimits: RateLimitEntry[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "join-organization.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStorage(): StorageData {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      return { applications: [], rateLimits: [] };
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StorageData;
  } catch (err) {
    logger.error("Failed to read application storage", { error: String(err) });
    return { applications: [], rateLimits: [] };
  }
}

function writeStorage(data: StorageData) {
  try {
    ensureDataDir();
    const tmp = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmp, DATA_FILE);
  } catch (err) {
    logger.error("Failed to write application storage", { error: String(err) });
  }
}

function getMonthKey(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i += 1) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `ip_${Math.abs(hash).toString(36)}`;
}

function generateApplicationId(): string {
  const year = new Date().getFullYear();
  const storage = readStorage();
  const yearApplications = storage.applications.filter((a) =>
    a.id.startsWith(`CVH-ORG-${year}`),
  );
  const nextNum = yearApplications.length + 1;
  return `CVH-ORG-${year}-${String(nextNum).padStart(6, "0")}`;
}

export async function createApplicationRecord(params: {
  githubUsername: string;
  email: string;
  discordMember: string;
}): Promise<string> {
  const storage = readStorage();
  const id = generateApplicationId();
  storage.applications.push({
    id,
    githubUsername: params.githubUsername,
    email: params.email,
    discordMember: params.discordMember,
    createdAt: new Date().toISOString(),
  });
  writeStorage(storage);
  return id;
}

export async function getRecentApplicationByGithubUsername(
  githubUsername: string,
): Promise<ApplicationRecord | null> {
  const storage = readStorage();
  const normalized = githubUsername.toLowerCase();
  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  const recent = storage.applications
    .filter((app) => app.githubUsername.toLowerCase() === normalized)
    .reverse()
    .find((app) => now - new Date(app.createdAt).getTime() < THIRTY_DAYS);

  return recent ?? null;
}

export async function checkRateLimit(params: {
  ip: string;
  userId: string;
}): Promise<{
  allowed: boolean;
  reason: string | null;
  retryAfter: number | null;
}> {
  if (process.env.NODE_ENV !== "production") {
    return { allowed: true, reason: null, retryAfter: null };
  }

  const storage = readStorage();
  const monthKey = getMonthKey();
  const ipHash = hashIP(params.ip);
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;
  const ONE_DAY = 24 * ONE_HOUR;

  let entry = storage.rateLimits.find(
    (r) => r.ipHash === ipHash && r.monthKey === monthKey,
  );

  if (!entry) {
    entry = { ipHash, userId: params.userId, timestamps: [], monthKey };
    storage.rateLimits.push(entry);
  }

  entry.timestamps = entry.timestamps.filter((t) => now - t < ONE_DAY);
  entry.userId = params.userId;

  const recentHour = entry.timestamps.filter((t) => now - t < ONE_HOUR);
  const recentDay = entry.timestamps;

  if (recentHour.length >= 3) {
    const oldest = recentHour[0];
    const retryAfter = Math.ceil((oldest + ONE_HOUR - now) / 1000);
    writeStorage(storage);
    return {
      allowed: false,
      reason: "Too many submissions. Try again later.",
      retryAfter,
    };
  }

  if (recentDay.length >= 8) {
    const oldest = recentDay[0];
    const retryAfter = Math.ceil((oldest + ONE_DAY - now) / 1000);
    writeStorage(storage);
    return {
      allowed: false,
      reason: "Daily submission limit reached. Try again tomorrow.",
      retryAfter,
    };
  }

  entry.timestamps.push(now);
  writeStorage(storage);
  return { allowed: true, reason: null, retryAfter: null };
}

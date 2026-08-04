import fs from "fs";
import path from "path";
import { logger } from "./application-logger";

interface ApplicationRecord {
  id: string;
  githubUsername: string;
  email: string;
  discordMember: string;
  discordUsername: string;
  createdAt: string;
  score: number | null;
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
const APPLICATIONS_DIR = path.join(DATA_DIR, "applications");

const DUPLICATE_WINDOW_MS = 10 * 24 * 60 * 60 * 1000;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_DIR)) {
    fs.mkdirSync(APPLICATIONS_DIR, { recursive: true });
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

export interface CreateApplicationParams {
  githubUsername: string;
  email: string;
  discordMember: string;
  discordUsername: string;
  score: number | null;
  /** Pre-generated ID so the webhook can reference it before the record is written. */
  id: string;
}

export async function generateApplicationId(): Promise<string> {
  return generateApplicationIdInternal();
}

function generateApplicationIdInternal(): string {
  const year = new Date().getFullYear();
  const storage = readStorage();
  const yearApplications = storage.applications.filter((a) =>
    a.id.startsWith(`CVH-ORG-${year}`),
  );
  const nextNum = yearApplications.length + 1;
  return `CVH-ORG-${year}-${String(nextNum).padStart(6, "0")}`;
}

export async function createApplicationRecord(
  params: CreateApplicationParams,
): Promise<string> {
  const storage = readStorage();
  storage.applications.push({
    id: params.id,
    githubUsername: params.githubUsername,
    email: params.email,
    discordMember: params.discordMember,
    discordUsername: params.discordUsername,
    score: params.score,
    createdAt: new Date().toISOString(),
  });
  writeStorage(storage);
  return params.id;
}

export interface DuplicateResult {
  duplicate: boolean;
  matchedKeys: string[];
  previousApplicationId: string | null;
}

function identityKeys(
  githubUsername: string,
  discordUsername: string,
  email: string,
): string[] {
  return [
    (githubUsername || "").toLowerCase(),
    (discordUsername || "").toLowerCase(),
    (email || "").toLowerCase(),
  ].filter(Boolean);
}

/**
 * Returns whether an application sharing any identity key (GitHub username,
 * Discord username, email) was received within the last 10 days.
 */
export async function findRecentDuplicate(params: {
  githubUsername: string;
  discordUsername: string;
  email: string;
}): Promise<DuplicateResult> {
  const storage = readStorage();
  const keys = identityKeys(
    params.githubUsername,
    params.discordUsername,
    params.email,
  );
  const now = Date.now();

  for (const app of storage.applications) {
    if (now - new Date(app.createdAt).getTime() >= DUPLICATE_WINDOW_MS) {
      continue;
    }
    const appKeys = identityKeys(
      app.githubUsername,
      app.discordUsername,
      app.email,
    );
    const matched = appKeys.filter((key) => keys.includes(key));
    if (matched.length > 0) {
      return {
        duplicate: true,
        matchedKeys: matched,
        previousApplicationId: app.id,
      };
    }
  }

  return { duplicate: false, matchedKeys: [], previousApplicationId: null };
}

/**
 * True when this identity applied at any point before (outside the duplicate
 * window too). Used for the "Previous Applicant" staff note.
 */
export async function hasPreviousApplications(params: {
  githubUsername: string;
  discordUsername: string;
  email: string;
}): Promise<boolean> {
  const storage = readStorage();
  const keys = identityKeys(
    params.githubUsername,
    params.discordUsername,
    params.email,
  );

  return storage.applications.some((app) => {
    const appKeys = identityKeys(
      app.githubUsername,
      app.discordUsername,
      app.email,
    );
    return appKeys.some((key) => keys.includes(key));
  });
}

/** Writes a full JSON backup of an application: data/applications/YYYY-MM-DD-username.json */
export async function writeApplicationBackup(params: {
  applicationId: string;
  githubUsername: string;
  snapshot: Record<string, unknown>;
}): Promise<string | null> {
  try {
    ensureDataDir();
    const date = new Date();
    const datePart = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const safeUsername = params.githubUsername
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");
    const filePath = path.join(
      APPLICATIONS_DIR,
      `${datePart}-${safeUsername || "unknown"}.json`,
    );

    const payload = {
      applicationId: params.applicationId,
      exportedAt: new Date().toISOString(),
      ...params.snapshot,
    };

    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");
    return filePath;
  } catch (err) {
    logger.error("Failed to write application JSON backup", {
      error: String(err),
      applicationId: params.applicationId,
    });
    return null;
  }
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

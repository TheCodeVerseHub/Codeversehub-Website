import { NextResponse } from "next/server";
import { fetchGitHubProfile } from "@/lib/github-profile";

function isValidGitHubUsername(value: string): boolean {
  return /^(?=.{1,39}$)(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)$/.test(value);
}

/**
 * Lightweight in-memory throttle per client IP so the unauthenticated GitHub
 * API quota (60 req/hr) can't be burned by a single visitor.
 */
const THROTTLE_WINDOW_MS = 60 * 1000;
const THROTTLE_MAX = 20;
const hitCounts = new Map<string, { count: number; windowStart: number }>();

function isThrottled(ip: string): boolean {
  const now = Date.now();
  const entry = hitCounts.get(ip);
  if (!entry || now - entry.windowStart >= THROTTLE_WINDOW_MS) {
    hitCounts.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > THROTTLE_MAX;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}

export async function GET(req: Request) {
  const clientIp = getClientIp(req);

  if (isThrottled(clientIp)) {
    return NextResponse.json(
      { error: "Too many lookups. Try again in a minute." },
      { status: 429 },
    );
  }

  const { searchParams } = new URL(req.url);
  const username = (searchParams.get("username") || "").trim();

  if (!username) {
    return NextResponse.json({ error: "Missing username." }, { status: 400 });
  }

  if (!isValidGitHubUsername(username)) {
    return NextResponse.json(
      { error: "Invalid GitHub username format." },
      { status: 400 },
    );
  }

  const result = await fetchGitHubProfile(username);

  if (result.status === "notfound") {
    return NextResponse.json(
      { error: "GitHub user not found.", notFound: true },
      { status: 404 },
    );
  }

  if (result.status === "error") {
    return NextResponse.json(
      { error: "GitHub API temporarily unavailable.", retryable: true },
      { status: 502 },
    );
  }

  return NextResponse.json({ profile: result.profile });
}

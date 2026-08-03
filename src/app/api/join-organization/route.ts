import { NextResponse } from "next/server";
import {
  checkRateLimit,
  createApplicationRecord,
  getRecentApplicationByGithubUsername,
} from "@/lib/application-storage";
import { logger } from "@/lib/application-logger";
import {
  DISCORD_APPLICATION_WEBHOOK,
  JOIN_ORGANIZATION_MIN_SUBMIT_AGE_MS,
  JOIN_ORGANIZATION_SITE_URL,
} from "@/config/webhook";

function normalizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\u0000/g, "").trim();
}

function normalizeMultiline(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim();
}

function truncate(value: string, maxLen: number): string {
  if (value.length <= maxLen) return value;
  return value.slice(0, Math.max(0, maxLen - 1)) + "…";
}

function isValidGitHubUsername(value: string): boolean {
  return /^(?=.{1,39}$)(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)$/.test(value);
}

function isValidDiscordId(value: string): boolean {
  return /^\d{17,20}$/.test(value);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function containsSpamPatterns(value: string): boolean {
  const patterns = [
    /\bcrypto\s*(giveaway|free|claim)\b/i,
    /\b(?:buy|sell)\s*(?:nitro|discord\s*admin)\b/i,
    /\b(?:free|cheap)\s*(?:followers|likes|boosts)\b/i,
    /\b(?:bit\.ly|tinyurl|discord(?:gift|nitro)\.(?:ru|cn))\b/i,
    /(.)\1{20,}/,
    /(https?:\/\/[^\s]+\s?){4,}/i,
  ];
  return patterns.some((pattern) => pattern.test(value));
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

function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const siteUrl = new URL(JOIN_ORGANIZATION_SITE_URL);

    if (originUrl.origin === siteUrl.origin) {
      return true;
    }

    if (process.env.NODE_ENV !== "production") {
      return ["localhost", "127.0.0.1", "::1"].includes(originUrl.hostname);
    }

    return false;
  } catch {
    return false;
  }
}

function buildField(name: string, value: string, inline = false) {
  return {
    name,
    value: value || "—",
    inline,
  };
}

export async function POST(req: Request) {
  const clientIp = getClientIp(req);

  if (!DISCORD_APPLICATION_WEBHOOK) {
    logger.error("Server misconfigured: missing application webhook URL");
    return NextResponse.json(
      { error: "Server misconfigured: missing webhook." },
      { status: 500 },
    );
  }

  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Origin not allowed." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    logger.warn("Invalid JSON from client", { ip: clientIp });
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  const honeypot = normalizeString(data.honeypot);
  if (honeypot) {
    logger.info("Honeypot triggered", { ip: clientIp });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const startedAt = normalizeString(data.startedAt);
  const startedAtMs = Date.parse(startedAt);
  if (!Number.isFinite(startedAtMs)) {
    return NextResponse.json(
      { error: "Submission timestamp missing or invalid." },
      { status: 400 },
    );
  }

  const submitAge = Date.now() - startedAtMs;
  if (submitAge < JOIN_ORGANIZATION_MIN_SUBMIT_AGE_MS) {
    logger.warn("Submission completed too quickly", {
      ip: clientIp,
      ageMs: submitAge,
    });
    return NextResponse.json(
      { error: "Please take a moment to complete the form and try again." },
      { status: 400 },
    );
  }

  const fullName = normalizeString(data.fullName);
  const githubUsername = normalizeString(data.githubUsername);
  const email = normalizeString(data.email);
  const discordMember =
    normalizeString(data.discordMember) === "Yes" ? "Yes" : "No";
  const discordUsername = normalizeString(data.discordUsername);
  const discordUserId = normalizeString(data.discordUserId);
  const discordActivity = normalizeString(data.discordActivity);
  const aboutYou = normalizeMultiline(data.aboutYou);
  const experience = normalizeString(data.experience);
  const languages = Array.isArray(data.languages)
    ? data.languages.map((entry) => normalizeString(entry)).filter(Boolean)
    : [];
  const openSourceExperience = normalizeString(data.openSourceExperience);
  const projects = normalizeMultiline(data.projects);
  const whyJoin = normalizeMultiline(data.whyJoin);
  const contributionInterests = Array.isArray(data.contributionInterests)
    ? data.contributionInterests
        .map((entry) => normalizeString(entry))
        .filter(Boolean)
    : [];
  const portfolio = normalizeString(data.portfolio);
  const linkedin = normalizeString(data.linkedin);
  const additionalNotes = normalizeMultiline(data.additionalNotes);
  const agreement = Boolean(data.agreement);

  if (!githubUsername) {
    return NextResponse.json(
      { error: "GitHub username is required." },
      { status: 400 },
    );
  }

  if (!isValidGitHubUsername(githubUsername)) {
    return NextResponse.json(
      { error: "Invalid GitHub username format." },
      { status: 400 },
    );
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Email address is invalid." },
      { status: 400 },
    );
  }

  if (discordMember === "Yes") {
    if (!discordUsername) {
      return NextResponse.json(
        { error: "Discord username is required for Discord members." },
        { status: 400 },
      );
    }
    if (discordUserId && !isValidDiscordId(discordUserId)) {
      return NextResponse.json(
        { error: "Discord user ID must be 17-20 digits." },
        { status: 400 },
      );
    }
    if (!discordActivity) {
      return NextResponse.json(
        { error: "Please select your approximate Discord activity." },
        { status: 400 },
      );
    }
  }

  if (!aboutYou) {
    return NextResponse.json(
      { error: "Tell us about yourself is required." },
      { status: 400 },
    );
  }

  if (aboutYou.length < 40) {
    return NextResponse.json(
      { error: "Tell us about yourself must be at least 40 characters." },
      { status: 400 },
    );
  }

  if (aboutYou.length > 1200) {
    return NextResponse.json(
      { error: "Tell us about yourself must be 1200 characters or less." },
      { status: 400 },
    );
  }

  if (!experience) {
    return NextResponse.json(
      { error: "Programming experience is required." },
      { status: 400 },
    );
  }

  if (languages.length === 0) {
    return NextResponse.json(
      { error: "Select at least one language or technology." },
      { status: 400 },
    );
  }

  if (!openSourceExperience) {
    return NextResponse.json(
      { error: "Open source experience is required." },
      { status: 400 },
    );
  }

  if (!whyJoin) {
    return NextResponse.json(
      { error: "Why do you want to join is required." },
      { status: 400 },
    );
  }

  if (whyJoin.length < 50) {
    return NextResponse.json(
      { error: "Why do you want to join must be at least 50 characters." },
      { status: 400 },
    );
  }

  if (whyJoin.length > 1500) {
    return NextResponse.json(
      { error: "Why do you want to join must be 1500 characters or less." },
      { status: 400 },
    );
  }

  if (projects.length > 1200) {
    return NextResponse.json(
      { error: "Projects must be 1200 characters or less." },
      { status: 400 },
    );
  }

  if (additionalNotes.length > 1000) {
    return NextResponse.json(
      { error: "Additional notes must be 1000 characters or less." },
      { status: 400 },
    );
  }

  if (!agreement) {
    return NextResponse.json(
      { error: "You must confirm the agreement." },
      { status: 400 },
    );
  }

  if (portfolio && !isValidUrl(portfolio)) {
    return NextResponse.json(
      { error: "Portfolio / Website URL is invalid." },
      { status: 400 },
    );
  }

  if (linkedin && !isValidUrl(linkedin)) {
    return NextResponse.json(
      { error: "LinkedIn URL is invalid." },
      { status: 400 },
    );
  }

  const spamCheckFields = [
    fullName,
    githubUsername,
    email,
    discordUsername,
    aboutYou,
    projects,
    whyJoin,
    additionalNotes,
  ].filter(Boolean);

  for (const field of spamCheckFields) {
    if (containsSpamPatterns(field)) {
      logger.warn("Spam pattern detected", {
        ip: clientIp,
        field: field.slice(0, 60),
      });
      return NextResponse.json(
        { error: "Your submission was flagged as spam." },
        { status: 400 },
      );
    }
  }

  const rateLimitResult = await checkRateLimit({
    ip: clientIp,
    userId: githubUsername.toLowerCase(),
  });

  if (!rateLimitResult.allowed) {
    logger.warn("Rate limit hit", {
      ip: clientIp,
      userId: githubUsername,
      reason: rateLimitResult.reason,
    });
    const headers: Record<string, string> = {};
    if (rateLimitResult.retryAfter) {
      headers["Retry-After"] = String(rateLimitResult.retryAfter);
    }
    return NextResponse.json(
      { error: rateLimitResult.reason },
      { status: 429, headers },
    );
  }

  const duplicate = await getRecentApplicationByGithubUsername(githubUsername);
  if (duplicate) {
    return NextResponse.json(
      {
        error:
          "You already submitted an application recently. Please wait for a response before submitting again.",
      },
      { status: 409 },
    );
  }

  const safeFullName = truncate(fullName, 256);
  const safeGithubUsername = truncate(githubUsername, 64);
  const safeEmail = truncate(email, 256);
  const safeDiscordUsername = truncate(discordUsername, 128);
  const safeDiscordUserId = truncate(discordUserId, 32);
  const safeDiscordActivity = truncate(discordActivity, 64);
  const safeAboutYou = truncate(aboutYou, 1024);
  const safeExperience = truncate(experience, 128);
  const safeLanguages = truncate(languages.join(", "), 1024);
  const safeOpenSourceExperience = truncate(openSourceExperience, 128);
  const safeProjects = truncate(projects || "—", 1024);
  const safeWhyJoin = truncate(whyJoin, 1024);
  const safeInterests = truncate(
    contributionInterests.length > 0
      ? contributionInterests.join(", ")
      : "Not specified",
    1024,
  );
  const safePortfolio = truncate(portfolio, 256);
  const safeLinkedIn = truncate(linkedin, 256);
  const safeAdditionalNotes = truncate(additionalNotes, 1024);

  const fields = [
    buildField("Applicant Name", safeFullName || "—", true),
    buildField("GitHub Username", safeGithubUsername, true),
    buildField("Email", safeEmail || "—", true),
    buildField("Discord Member?", discordMember, true),
  ];

  if (discordMember === "Yes") {
    fields.push(
      buildField("Discord Username", safeDiscordUsername || "—", true),
      buildField("Discord User ID", safeDiscordUserId || "—", true),
      buildField("Discord Activity", safeDiscordActivity || "—", true),
    );
  }

  fields.push(
    buildField("About You", safeAboutYou, false),
    buildField("Experience", safeExperience, true),
    buildField("Languages", safeLanguages, false),
    buildField("Open Source Experience", safeOpenSourceExperience, true),
    buildField("Projects", safeProjects, false),
    buildField("Contribution Interests", safeInterests || "—", false),
    buildField("Portfolio", safePortfolio || "—", true),
    buildField("LinkedIn", safeLinkedIn || "—", true),
    buildField("Why Join?", safeWhyJoin, false),
    buildField("Additional Notes", safeAdditionalNotes || "—", false),
  );

  const payload = {
    embeds: [
      {
        title: "New GitHub Organization Application",
        color: 0x22d3ee,
        fields,
        timestamp: new Date().toISOString(),
        footer: {
          text: "The CodeVerse Hub Website",
        },
      },
    ],
  };

  try {
    const discordRes = await fetch(DISCORD_APPLICATION_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      if (discordRes.status === 404) {
        logger.error("Discord webhook not found", {
          status: discordRes.status,
          githubUsername,
          hint: "Check DISCORD_APPLICATION_WEBHOOK in your environment. The webhook may be missing, deleted, or copied from the wrong channel.",
        });
        return NextResponse.json(
          {
            error:
              "The application webhook was not found. Please check DISCORD_APPLICATION_WEBHOOK.",
          },
          { status: 500 },
        );
      }

      logger.error("Discord webhook delivery failed", {
        status: discordRes.status,
        githubUsername,
      });
      return NextResponse.json(
        { error: "Failed to deliver application." },
        { status: 502 },
      );
    }

    const applicationId = await createApplicationRecord({
      githubUsername,
      email,
      discordMember,
    });

    logger.audit("GitHub organization application submitted", {
      applicationId,
      githubUsername,
      discordMember,
    });

    return NextResponse.json(
      {
        ok: true,
        message:
          "Application submitted. We will review it manually and contact you if needed.",
      },
      { status: 200 },
    );
  } catch (err) {
    logger.error("Discord webhook request failed", {
      error: String(err),
      githubUsername,
    });
    return NextResponse.json(
      { error: "Failed to deliver application." },
      { status: 502 },
    );
  }
}

import { NextResponse } from "next/server";
import {
  checkRateLimit,
  createApplicationRecord,
  findRecentDuplicate,
  generateApplicationId,
  hasPreviousApplications,
  writeApplicationBackup,
} from "@/lib/application-storage";
import { logger } from "@/lib/application-logger";
import {
  DISCORD_APPLICATION_WEBHOOK,
  JOIN_ORGANIZATION_MIN_SUBMIT_AGE_MS,
  JOIN_ORGANIZATION_SITE_URL,
} from "@/config/webhook";
import { fetchGitHubProfile, type GitHubProfile } from "@/lib/github-profile";
import {
  analyzeApplication,
  describeAccountAge,
} from "@/lib/application-analysis";

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

type Field = ReturnType<typeof buildField>;

/**
 * Discord caps an embed at 6000 characters total. The form allows generous
 * input, so shrink the longest values until the embed fits within budget.
 */
function fitFieldsToBudget(fields: Field[], budget = 5000): Field[] {
  const total = fields.reduce(
    (sum, field) => sum + field.name.length + field.value.length,
    0,
  );
  if (total <= budget) return fields;

  const working = fields.map((field) => ({ ...field }));
  let current = total;
  let guard = 0;

  while (current > budget && guard < 40) {
    let longestIndex = -1;
    let longestLength = 0;
    working.forEach((field, index) => {
      if (field.value.length > longestLength) {
        longestLength = field.value.length;
        longestIndex = index;
      }
    });
    if (longestIndex === -1 || longestLength < 60) break;

    const field = working[longestIndex];
    const newLength = Math.max(60, Math.floor(longestLength / 1.6));
    current -= longestLength - newLength;
    field.value = truncate(field.value, newLength);
    guard += 1;
  }

  return working;
}

function normalizeArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => normalizeString(entry)).filter(Boolean);
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

  /* ── Extract & normalize ── */

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
  const languages = normalizeArray(data.languages);
  const openSourceExperience = normalizeString(data.openSourceExperience);
  const projectTypes = normalizeArray(data.projectTypes);
  const projectTypesOther = normalizeString(data.projectTypesOther);
  const weeklyHours = normalizeString(data.weeklyHours);
  const osMotivation = normalizeMultiline(data.osMotivation);
  const priorOpenSource = normalizeString(data.priorOpenSource) === "Yes" ? "Yes" : "No";
  const priorProjectName = normalizeString(data.priorProjectName);
  const priorProjectLink = normalizeString(data.priorProjectLink);
  const priorContribution = normalizeMultiline(data.priorContribution);
  const projects = normalizeMultiline(data.projects);
  const whyJoin = normalizeMultiline(data.whyJoin);
  const contributionInterests = normalizeArray(data.contributionInterests);
  const portfolio = normalizeString(data.portfolio);
  const linkedin = normalizeString(data.linkedin);
  const hopingToGain = normalizeMultiline(data.hopingToGain);
  const additionalNotes = normalizeMultiline(data.additionalNotes);
  const agreement = Boolean(data.agreement);

  /* ── Validation ── */

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

  if (projectTypes.length === 0) {
    return NextResponse.json(
      { error: "Select at least one type of project you enjoy building." },
      { status: 400 },
    );
  }

  if (projectTypes.includes("Other") && !projectTypesOther) {
    return NextResponse.json(
      { error: "Specify the other project types you enjoy building." },
      { status: 400 },
    );
  }

  if (!weeklyHours) {
    return NextResponse.json(
      { error: "Select how many hours you can contribute per week." },
      { status: 400 },
    );
  }

  if (!osMotivation) {
    return NextResponse.json(
      { error: "Tell us what motivates you to contribute to open source." },
      { status: 400 },
    );
  }

  if (osMotivation.length < 30) {
    return NextResponse.json(
      { error: "Open source motivation must be at least 30 characters." },
      { status: 400 },
    );
  }

  if (osMotivation.length > 1500) {
    return NextResponse.json(
      { error: "Open source motivation must be 1500 characters or less." },
      { status: 400 },
    );
  }

  if (priorOpenSource === "Yes") {
    if (!priorProjectName) {
      return NextResponse.json(
        { error: "Tell us the project you contributed to." },
        { status: 400 },
      );
    }
    if (!priorProjectLink || !isValidUrl(priorProjectLink)) {
      return NextResponse.json(
        { error: "Provide a valid link to the project you contributed to." },
        { status: 400 },
      );
    }
    if (!priorContribution) {
      return NextResponse.json(
        { error: "Describe your contribution to the project." },
        { status: 400 },
      );
    }
    if (priorContribution.length > 1000) {
      return NextResponse.json(
        { error: "Contribution description must be 1000 characters or less." },
        { status: 400 },
      );
    }
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

  if (hopingToGain.length > 1000) {
    return NextResponse.json(
      { error: "Hoping to gain must be 1000 characters or less." },
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

  /* ── GitHub verification (do not continue if the user doesn't exist) ── */

  let githubProfile: GitHubProfile | null = null;
  let githubVerified = false;
  const githubResult = await fetchGitHubProfile(githubUsername);

  if (githubResult.status === "notfound") {
    return NextResponse.json(
      {
        error:
          "This GitHub username doesn't exist. Double-check the spelling before submitting.",
      },
      { status: 400 },
    );
  }

  if (githubResult.status === "found") {
    githubProfile = githubResult.profile;
    githubVerified = true;
  }
  // On transient GitHub API errors we still accept but mark as unverified.

  /* ── Rate limit ── */

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

  /* ── Duplicate detection (warn, never silently accept; do not reject) ── */

  const duplicate = await findRecentDuplicate({
    githubUsername,
    discordUsername,
    email,
  });

  const previousApplicant = await hasPreviousApplications({
    githubUsername,
    discordUsername,
    email,
  });

  /* ── Staff-only analysis (score + risk flags) ── */

  const analysis = analyzeApplication({
    fullName,
    githubUsername,
    email,
    discordUsername,
    aboutYou,
    projects,
    whyJoin,
    additionalNotes,
    osMotivation,
    hopingToGain,
    priorContribution,
    experience,
    openSourceExperience,
    weeklyHours,
    portfolio,
    linkedin,
    priorProjectLink,
    languages,
    projectTypes,
    contributionInterests,
    githubProfile,
  });

  /* ── Pre-generate application ID (record is persisted only after the
     webhook succeeds, so a failed delivery doesn't create a duplicate). ── */

  const applicationId = await generateApplicationId();

  const backupSnapshot = {
    githubUsername,
    fullName,
    email,
    discordMember,
    discordUsername,
    discordUserId,
    discordActivity,
    aboutYou,
    experience,
    languages,
    openSourceExperience,
    projectTypes,
    projectTypesOther,
    weeklyHours,
    osMotivation,
    priorOpenSource,
    priorProjectName,
    priorProjectLink,
    priorContribution,
    projects,
    whyJoin,
    contributionInterests,
    portfolio,
    linkedin,
    hopingToGain,
    additionalNotes,
    githubVerified,
    githubProfile: githubProfile
      ? {
          login: githubProfile.login,
          name: githubProfile.name,
          bio: githubProfile.bio,
          followers: githubProfile.followers,
          following: githubProfile.following,
          public_repos: githubProfile.public_repos,
          location: githubProfile.location,
          company: githubProfile.company,
          created_at: githubProfile.created_at,
          html_url: githubProfile.html_url,
        }
      : null,
    staffOnly: {
      score: analysis.score,
      breakdown: analysis.breakdown,
      spamScore: analysis.spamScore,
      riskFlags: analysis.riskFlags,
      verdict: analysis.verdict,
      duplicateDetected: duplicate.duplicate,
      matchedKeys: duplicate.matchedKeys,
      previousApplicant,
    },
  };

  /* ── Build Discord webhook ── */

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
  const safeProjectTypes = truncate(
    [
      ...projectTypes,
      ...(projectTypes.includes("Other") && projectTypesOther
        ? [projectTypesOther]
        : []),
    ].join(", "),
    1024,
  );
  const safeWeeklyHours = truncate(weeklyHours, 64);
  const safeOsMotivation = truncate(osMotivation, 1024);
  const safePriorOpenSource =
    priorOpenSource === "Yes"
      ? truncate(
          [priorProjectName, priorProjectLink, priorContribution].join("\n"),
          1024,
        )
      : "No";
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
  const safeHopingToGain = truncate(hopingToGain || "—", 1024);
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
    buildField("Project Types", safeProjectTypes, false),
    buildField("Weekly Availability", safeWeeklyHours, true),
    buildField("Open Source Motivation", safeOsMotivation, false),
    buildField("Prior Open Source Contribution", safePriorOpenSource, false),
    buildField("Projects", safeProjects, false),
    buildField("Contribution Interests", safeInterests || "—", false),
    buildField("Portfolio", safePortfolio || "—", true),
    buildField("LinkedIn", safeLinkedIn || "—", true),
    buildField("Why Join?", safeWhyJoin, false),
    buildField("Hoping to Gain", safeHopingToGain, false),
    buildField("Additional Notes", safeAdditionalNotes || "—", false),
  );

  // GitHub profile embed (only when verified).
  const embeds: Record<string, unknown>[] = [
    {
      title: "New GitHub Organization Application",
      color: 0x22d3ee,
      fields: fitFieldsToBudget(fields),
      timestamp: new Date().toISOString(),
      footer: {
        text: `The CodeVerse Hub Website · ${applicationId}`,
      },
    },
  ];

  if (githubProfile) {
    embeds.push({
      title: "GitHub Profile",
      color: 0x161b22,
      thumbnail: { url: githubProfile.avatar_url },
      fields: [
        buildField(
          "Name",
          truncate(githubProfile.name || githubProfile.login, 128),
          true,
        ),
        buildField("Followers", String(githubProfile.followers), true),
        buildField("Following", String(githubProfile.following), true),
        buildField("Public Repos", String(githubProfile.public_repos), true),
        buildField("Account Age", describeAccountAge(githubProfile), true),
        buildField("Location", githubProfile.location || "—", true),
        buildField("Company", githubProfile.company || "—", true),
        buildField("Bio", githubProfile.bio || "—", false),
        buildField(
          "Profile",
          `[${githubProfile.login}](${githubProfile.html_url})`,
          false,
        ),
      ],
    });
  }

  // Staff-only review embed.
  const staffFields = [
    buildField("Application Score", `${analysis.score}/100`, true),
    buildField("Spam Score", `${analysis.spamScore}/100`, true),
    buildField(
      "Verdict",
      analysis.verdict.charAt(0).toUpperCase() + analysis.verdict.slice(1),
      true,
    ),
    buildField(
      "Risk Flags",
      analysis.riskFlags.length > 0
        ? analysis.riskFlags.map((flag) => `• ${flag}`).join("\n")
        : "None",
      false,
    ),
    buildField(
      "Duplicate Detected",
      duplicate.duplicate
        ? `Yes (${duplicate.matchedKeys.join(", ")}) — prior application ${duplicate.previousApplicationId}`
        : "No",
      true,
    ),
    buildField("GitHub Exists", githubVerified ? "Yes" : "Unverified", true),
    buildField("Portfolio Included", portfolio ? "Yes" : "No", true),
    buildField("Previous Applicant", previousApplicant ? "Yes" : "No", true),
    buildField("Application ID", applicationId, true),
  ];

  embeds.push({
    title: "Staff Only — Review Notes",
    color: analysis.verdict === "spam" ? 0xef4444 : analysis.verdict === "sus" ? 0xf59e0b : 0x22c55e,
    fields: staffFields,
    footer: {
      text: "Score & flags are internal. Do not share with the applicant.",
    },
  });

  // Webhook action buttons: GitHub profile, and portfolio when provided.
  const components: Record<string, unknown>[] = [
    {
      type: 1,
      components: [
        {
          type: 2,
          style: 5,
          label: "GitHub Profile",
          url: `https://github.com/${githubUsername}`,
        },
        ...(portfolio
          ? [{ type: 2, style: 5, label: "Portfolio", url: portfolio }]
          : []),
      ],
    },
  ];

  const payload = { embeds, components };

  try {
    const discordRes = await fetch(DISCORD_APPLICATION_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let backupPath: string | null = null;

    if (discordRes.ok) {
      await createApplicationRecord({
        id: applicationId,
        githubUsername,
        email,
        discordMember,
        discordUsername,
        score: analysis.score,
      });

      backupPath = await writeApplicationBackup({
        applicationId,
        githubUsername,
        snapshot: backupSnapshot,
      });
    }

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

    logger.audit("GitHub organization application submitted", {
      applicationId,
      githubUsername,
      discordMember,
      score: analysis.score,
      verdict: analysis.verdict,
      duplicate: duplicate.duplicate,
      backup: backupPath,
    });

    return NextResponse.json(
      {
        ok: true,
        applicationId,
        duplicateWarning: duplicate.duplicate
          ? {
              message:
                "We noticed a similar application was already submitted recently. We've still received this one — staff will review it, but you only need to apply once.",
              matchedKeys: duplicate.matchedKeys,
            }
          : null,
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

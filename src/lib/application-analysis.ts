import type { GitHubProfile } from "./github-profile";
import { formatAccountAge } from "./github-profile";

/**
 * Server-only heuristics used to score applications (0-100) and to flag
 * suspicious content. These are advisory only — nothing here rejects an
 * application. Scores and flags are only shown to staff inside the webhook.
 */

export interface AnalysisInput {
  fullName: string;
  githubUsername: string;
  email: string;
  discordUsername: string;
  aboutYou: string;
  projects: string;
  whyJoin: string;
  additionalNotes: string;
  osMotivation: string;
  hopingToGain: string;
  priorContribution: string;
  experience: string;
  openSourceExperience: string;
  weeklyHours: string;
  portfolio: string;
  linkedin: string;
  priorProjectLink: string;
  languages: string[];
  projectTypes: string[];
  contributionInterests: string[];
  githubProfile: GitHubProfile | null;
}

export type Verdict = "safe" | "sus" | "spam";

export interface ApplicationAnalysis {
  score: number;
  breakdown: Record<string, number>;
  spamScore: number;
  riskFlags: string[];
  verdict: Verdict;
}

/* ─────────────────────────── helpers ─────────────────────────── */

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function extractUrls(value: string): string[] {
  const matches = value.match(/https?:\/\/[^\s)}\]"'<>]+/gi);
  return matches ? matches.slice(0, 6) : [];
}

/* ─────────────────────── spam / risk detection ─────────────────────── */

const PLACEHOLDER_RE =
  /lorem ipsum|your answer|your text|type here|placeholder|enter text|insert text|asdf|qwerty|test\s*(message|text|answer)|sample\s*text|hello world|dummy|replace this|put your|xxxxx|something something|nothing much|idk\b|i don'?t know\b|n\/a\b|na\b/gi;

const AI_PHRASES = [
  "as an ai",
  "as an ai language model",
  "as an ai model",
  "i am an ai",
  "i'm an ai",
  "i don't have personal opinions",
  "as a language model",
  "here is my response",
  "i hope this meets your expectations",
  "i hope this helps",
  "i hope this response",
  "let me know if you need anything else",
  "i'm here to help",
  "i am a large language model",
];

const AI_STRUCTURE_RE = /(?:furthermore|moreover|additionally|in conclusion|overall,)\s+(?:i|one|we)/gi;

function looksAIGenerated(text: string): boolean {
  const lower = text.toLowerCase();
  if (AI_PHRASES.some((phrase) => lower.includes(phrase))) return true;
  // Repetitive templated structure: several bullets + formal transition words.
  const bullets = (text.match(/^\s*[-•*]\s+/gm) || []).length;
  if (bullets >= 3 && AI_STRUCTURE_RE.test(text)) return true;
  return false;
}

function hasRepeatedText(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  if (words.length < 8) return false;
  const seen = new Set<string>();
  for (let i = 0; i <= words.length - 5; i++) {
    const key = words.slice(i, i + 5).join(" ");
    if (seen.has(key)) return true;
    seen.add(key);
  }
  return /(.)\1{15,}/.test(text);
}

function isEmptyButLong(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 150) return false;
  const words = trimmed.split(/\s+/).filter(Boolean);
  const alnum = (trimmed.match(/[a-z0-9]/gi) || []).length;
  return words.length < 10 || alnum / trimmed.length < 0.4;
}

const PLACEHOLDER_SCORE = 25;
const AI_SCORE = 20;
const REPEATED_SCORE = 15;
const EMPTY_LONG_SCORE = 15;
const WRONG_LINKS_SCORE = 10;
const GIBBERISH_SCORE = 15;

const GIBBERISH_RE =
  /^(?:\W|[0-9])+$|([a-z])\1{8,}|(?:[aeiou]{8,})|(?:[qjkxzv]{6,})/i;

function analyzeTextFields(input: AnalysisInput): {
  spamScore: number;
  riskFlags: string[];
} {
  let spamScore = 0;
  const riskFlags: string[] = [];

  const textFields: Array<[string, string]> = [
    ["Full name", input.fullName],
    ["About you", input.aboutYou],
    ["Projects", input.projects],
    ["Why join", input.whyJoin],
    ["Additional notes", input.additionalNotes],
    ["OS motivation", input.osMotivation],
    ["Hoping to gain", input.hopingToGain],
    ["Prior contribution", input.priorContribution],
  ];

  for (const [label, text] of textFields) {
    if (!text) continue;

    if (PLACEHOLDER_RE.test(text)) {
      spamScore += PLACEHOLDER_SCORE;
      riskFlags.push(`${label}: placeholder text detected`);
    }

    if (looksAIGenerated(text)) {
      spamScore += AI_SCORE;
      riskFlags.push(`${label}: possibly AI-generated`);
    }

    if (hasRepeatedText(text)) {
      spamScore += REPEATED_SCORE;
      riskFlags.push(`${label}: repeated / pasted text`);
    }

    if (isEmptyButLong(text)) {
      spamScore += EMPTY_LONG_SCORE;
      riskFlags.push(`${label}: long but content-free`);
    }

    if (GIBBERISH_RE.test(text)) {
      spamScore += GIBBERISH_SCORE;
      riskFlags.push(`${label}: gibberish / low-entropy text`);
    }
  }

  // Links in fields where they do not belong.
  const urlOnlyFields: Array<[string, string]> = [
    ["Full name", input.fullName],
    ["GitHub username", input.githubUsername],
    ["Discord username", input.discordUsername],
    ["Email", input.email],
    ["Experience", input.experience],
    ["Open source experience", input.openSourceExperience],
    ["Weekly hours", input.weeklyHours],
    ["Languages", input.languages.join(", ")],
    ["Project types", input.projectTypes.join(", ")],
  ];

  for (const [label, value] of urlOnlyFields) {
    if (value && extractUrls(value).length > 0) {
      spamScore += WRONG_LINKS_SCORE;
      riskFlags.push(`${label}: contains links in wrong field`);
    }
  }

  return { spamScore: Math.min(100, spamScore), riskFlags };
}

/* ─────────────────────── application score (0-100) ─────────────────────── */

function githubMaturityScore(profile: GitHubProfile | null): number {
  if (!profile) return 0;
  let score = 0;

  const created = new Date(profile.created_at).getTime();
  if (Number.isFinite(created)) {
    const years = (Date.now() - created) / (365.25 * 24 * 60 * 60 * 1000);
    if (years >= 2) score += 5;
    else if (years >= 1) score += 4;
    else if (years >= 0.5) score += 3;
    else if (years >= 0.1) score += 2;
    else score += 1;
  }

  if (profile.followers >= 10) score += 5;
  else if (profile.followers >= 1) score += 3;

  if (profile.public_repos >= 5) score += 5;
  else if (profile.public_repos >= 1) score += 3;

  if (profile.bio && profile.bio.trim().length >= 20) score += 3;
  else if (profile.bio) score += 1;

  if (profile.location || profile.company) score += 2;

  return Math.min(20, score);
}

function completedFieldsScore(input: AnalysisInput): number {
  const checks: boolean[] = [
    !!input.fullName,
    !!input.githubUsername,
    !!input.email,
    !!input.aboutYou,
    !!input.experience,
    !!input.openSourceExperience,
    !!input.weeklyHours,
    !!input.whyJoin,
    !!input.osMotivation,
    input.languages.length > 0,
    input.projectTypes.length > 0,
    input.contributionInterests.length > 0,
    !!input.projects,
    !!input.portfolio,
    !!input.linkedin,
    !!input.priorContribution,
    !!input.hopingToGain,
    !!input.additionalNotes,
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 20);
}

function projectLinksScore(input: AnalysisInput): number {
  let score = 0;
  if (isValidUrl(input.portfolio)) score += 5;
  if (isValidUrl(input.linkedin)) score += 2;
  const projectUrls = extractUrls(input.projects);
  if (projectUrls.length > 0) score += Math.min(4, projectUrls.length * 2);
  if (isValidUrl(input.priorProjectLink)) score += 4;
  return Math.min(15, score);
}

function openSourceScore(input: AnalysisInput): number {
  const map: Record<string, number> = {
    "None yet": 2,
    "I've contributed once": 6,
    "A few contributions": 10,
    "Regular contributor": 16,
    Maintainer: 20,
  };
  let score = map[input.openSourceExperience] ?? 3;
  if (input.priorContribution.trim().length >= 40) score += 4;
  else if (input.priorContribution.trim()) score += 2;
  return Math.min(20, score);
}

function motivationScore(input: AnalysisInput): number {
  let score = 0;
  const why = input.whyJoin.trim().length;
  if (why >= 250) score += 6;
  else if (why >= 150) score += 5;
  else if (why >= 100) score += 4;
  else if (why >= 50) score += 2;

  const mot = input.osMotivation.trim().length;
  if (mot >= 150) score += 6;
  else if (mot >= 100) score += 5;
  else if (mot >= 60) score += 4;
  else if (mot >= 30) score += 2;

  if (input.hopingToGain.trim().length >= 40) score += 3;
  else if (input.hopingToGain.trim()) score += 1;

  return Math.min(15, score);
}

function portfolioScore(input: AnalysisInput): number {
  let score = 0;
  if (isValidUrl(input.portfolio)) score += 6;
  else if (input.portfolio) score += 2;

  const urls = extractUrls(input.projects);
  if (urls.some((u) => /github\.com/i.test(u))) score += 4;

  return Math.min(10, score);
}

/* ─────────────────────────── public entrypoint ─────────────────────────── */

export function analyzeApplication(
  input: AnalysisInput,
): ApplicationAnalysis {
  const github = githubMaturityScore(input.githubProfile);
  const completed = completedFieldsScore(input);
  const projectLinks = projectLinksScore(input);
  const openSource = openSourceScore(input);
  const motivation = motivationScore(input);
  const portfolio = portfolioScore(input);

  const score = Math.min(
    100,
    github + completed + projectLinks + openSource + motivation + portfolio,
  );

  const { spamScore, riskFlags } = analyzeTextFields(input);

  const verdict: Verdict =
    spamScore >= 60 ? "spam" : spamScore >= 30 ? "sus" : "safe";

  return {
    score,
    breakdown: {
      "GitHub profile": github,
      "Completed fields": completed,
      "Project links": projectLinks,
      "Open source": openSource,
      Motivation: motivation,
      Portfolio: portfolio,
    },
    spamScore,
    riskFlags,
    verdict,
  };
}

/** Small helper reused by the webhook builder. */
export function describeAccountAge(profile: GitHubProfile | null): string {
  if (!profile) return "—";
  return formatAccountAge(profile.created_at);
}

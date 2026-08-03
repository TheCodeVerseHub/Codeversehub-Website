/**
 * Shared constants for The CodeVerse Hub.
 * Centralized to avoid duplication across the codebase.
 */
export const COMMUNITY = {
  /** Estimated active community members */
  MEMBER_COUNT: "2000+",
  /** Number of GitHub repositories */
  REPO_COUNT: "15+",
  /** Total GitHub stars across all repos */
  STAR_COUNT: "70+",
  /** Total GitHub forks across all repos */
  FORK_COUNT: "30+",
  /** Number of countries with community members */
  COUNTRY_COUNT: "70+",
} as const;

/** Formspree contact form endpoint */
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "mdkvwgln"}`;

/** External links used across the site */
export const LINKS = {
  DISCORD: "https://discord.gg/3xKFvKhuGR",
  GITHUB_ORG: "https://github.com/TheCodeVerseHub",
  GITHUB_REPOS: "https://github.com/TheCodeVerseHub/",
  EMAIL: "mailto:contact@thecodeversehub.tech",
  MATRIX: "https://matrix.to/#/#the-codeverse-hub:matrix.org",
  FLUXER: "https://fluxer.gg/RbLwebqH",
  INSTAGRAM: "https://instagram.com/thecodeversehub",
  REDDIT: "https://www.reddit.com/r/CodeVerseHub/",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://thecodeversehub.tech",
} as const;

/** Site metadata */
export const SITE = {
  NAME: "The CodeVerse Hub",
  SHORT_NAME: "CodeVerse Hub",
  DESCRIPTION:
    "A developer community that builds real open-source software, hosts community activities, and ships Discord bots, Linux distros, developer tools, and more.",
  TAGLINE: "Write Code. Review PRs. Ship Together.",
} as const;

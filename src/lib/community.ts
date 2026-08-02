import type { GitHubIssue, GitHubPR, GitHubRelease } from "./github";

/**
 * Types shared between the /api/github/community route and the client
 * components that consume it (CommunityStats, GitHubActivity, and future
 * ContributorWall / Trust sections).
 */

export interface CommunityRepoFeedItem {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  created_at: string;
}

export interface CommunityUpdatedRepo {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
}

export interface CommunityContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  repos: string[];
}

export interface CommunityStats {
  repoCount: number;
  activeRepoCount: number;
  totalStars: number;
  totalForks: number;
  contributorsCount: number;
  mergedPrsCount: number;
  issueCount: number;
  languages: Record<string, number>;
}

export interface CommunityRelease extends GitHubRelease {
  repo: string;
}

export interface CommunitySnapshot {
  fetchedAt?: string;
  stats?: CommunityStats;
  newestRepos?: CommunityRepoFeedItem[];
  recentlyUpdated?: CommunityUpdatedRepo[];
  mergedPrs?: GitHubPR[];
  openIssues?: GitHubIssue[];
  releases?: CommunityRelease[];
  topContributors?: CommunityContributor[];
}

/** Fetch the community snapshot client-side, returning null on any failure. */
export async function fetchCommunitySnapshot(): Promise<CommunitySnapshot | null> {
  try {
    // Client-side fetch caching is handled by the API route's Cache-Control. A simple one.
    const res = await fetch("/api/github/community");
    if (!res.ok) return null;
    return (await res.json()) as CommunitySnapshot;
  } catch {
    return null;
  }
}

const ORG = "TheCodeVerseHub";
const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  license: { spdx_id: string } | null;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  archived: boolean;
  fork: boolean;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface GitHubRepoWithContributors extends GitHubRepo {
  contributors: GitHubContributor[];
  primaryLanguage: string;
}

const token = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "TheCodeVerseHub-Website",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, { headers, next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getRepos(): Promise<GitHubRepo[]> {
  const repos = await githubFetch<GitHubRepo[]>(`/orgs/${ORG}/repos?per_page=100&sort=updated&direction=desc`);
  return repos.filter((r) => !r.fork);
}

export async function getRepo(name: string): Promise<GitHubRepo> {
  return githubFetch<GitHubRepo>(`/repos/${ORG}/${name}`);
}

export async function getContributors(name: string): Promise<GitHubContributor[]> {
  return githubFetch<GitHubContributor[]>(`/repos/${ORG}/${name}/contributors?per_page=10`);
}

export async function getAllContributors(): Promise<Map<string, GitHubContributor[]>> {
  const repos = await getRepos();
  const map = new Map<string, GitHubContributor[]>();
  await Promise.all(
    repos.map(async (repo) => {
      try {
        const contributors = await getContributors(repo.name);
        map.set(repo.name, contributors);
      } catch {
        map.set(repo.name, []);
      }
    }),
  );
  return map;
}

export async function getOrgProfile() {
  return githubFetch<{ public_repos: number; followers: number; login: string; avatar_url: string; description: string }>(
    `/orgs/${ORG}`,
  );
}

/* ═══════════════════════════════════════════════════════════
   ACTIVITY FEEDS
   ═══════════════════════════════════════════════════════════ */

export interface GitHubSearchUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubPR {
  number: number;
  title: string;
  html_url: string;
  state: string;
  merged_at: string | null;
  user: GitHubSearchUser;
  repository_url: string;
}

export interface GitHubIssue {
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  user: GitHubSearchUser;
  labels: { name: string; color: string }[];
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  draft: boolean;
  prerelease: boolean;
}

export interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  author: GitHubSearchUser | null;
}

interface SearchResult<T> {
  total_count: number;
  items: T[];
}

/** Latest merged pull requests across the org (GitHub search API). */
export async function getMergedPRs(perPage = 6): Promise<{ count: number; items: GitHubPR[] }> {
  const q = encodeURIComponent(`org:${ORG} is:pr is:merged`);
  const data = await githubFetch<SearchResult<GitHubPR>>(
    `/search/issues?q=${q}&sort=updated&order=desc&per_page=${perPage}`,
  );
  return { count: data.total_count, items: data.items };
}

/** Open issues across the org (GitHub search API). */
export async function getOpenIssues(perPage = 6): Promise<{ count: number; items: GitHubIssue[] }> {
  const q = encodeURIComponent(`org:${ORG} is:issue is:open`);
  const data = await githubFetch<SearchResult<GitHubIssue>>(
    `/search/issues?q=${q}&sort=updated&order=desc&per_page=${perPage}`,
  );
  return { count: data.total_count, items: data.items };
}

/** Most recent release of a repo, or null when it has none. */
export async function getLatestRelease(repo: string): Promise<GitHubRelease | null> {
  try {
    return await githubFetch<GitHubRelease>(`/repos/${ORG}/${repo}/releases/latest`);
  } catch {
    return null;
  }
}

/** Latest commits of a repo (empty on error). */
export async function getLatestCommits(repo: string, perPage = 3): Promise<GitHubCommit[]> {
  try {
    return await githubFetch<GitHubCommit[]>(`/repos/${ORG}/${repo}/commits?per_page=${perPage}`);
  } catch {
    return [];
  }
}

export function categorizeRepos(repos: GitHubRepo[]) {
  const categories: Record<string, GitHubRepo[]> = {
    "Discord Bots": [],
    "Developer Tools": [],
    "Linux & Systems": [],
    Websites: [],
    "Learning & Docs": [],
    Utilities: [],
    Archived: [],
  };

  for (const repo of repos) {
    if (repo.archived) {
      categories.Archived.push(repo);
      continue;
    }

    const name = repo.name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const topics = repo.topics.map((t) => t.toLowerCase());

    if (
      name.includes("bot") ||
      desc.includes("discord") ||
      desc.includes("bot") ||
      topics.includes("discord-bot")
    ) {
      categories["Discord Bots"].push(repo);
    } else if (
      name.includes("linux") ||
      name.includes("distro") ||
      desc.includes("linux") ||
      desc.includes("distro") ||
      desc.includes("compositor") ||
      desc.includes("wayland")
    ) {
      categories["Linux & Systems"].push(repo);
    } else if (
      name.includes("website") ||
      name.includes("web") ||
      desc.includes("website") ||
      desc.includes("site")
    ) {
      categories.Websites.push(repo);
    } else if (
      name.includes("intro") ||
      desc.includes("tutorial") ||
      desc.includes("learn") ||
      desc.includes("introduction")
    ) {
      categories["Learning & Docs"].push(repo);
    } else if (
      desc.includes("tool") ||
      desc.includes("utility") ||
      desc.includes("automation") ||
      desc.includes("cli")
    ) {
      categories["Developer Tools"].push(repo);
    } else {
      categories.Utilities.push(repo);
    }
  }

  return Object.fromEntries(Object.entries(categories).filter(([, repos]) => repos.length > 0));
}

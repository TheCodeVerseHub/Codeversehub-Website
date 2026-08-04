const GITHUB_API = "https://api.github.com";

const token = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "TheCodeVerseHub-Website",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export type GitHubLookupResult =
  | { status: "found"; profile: GitHubProfile }
  | { status: "notfound" }
  | { status: "error"; message: string };

const FETCH_TIMEOUT_MS = 4000;

export async function fetchGitHubProfile(
  username: string,
): Promise<GitHubLookupResult> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${encodeURIComponent(username)}`,
      {
        headers,
        cache: "no-store",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      },
    );

    if (res.status === 404) {
      return { status: "notfound" };
    }

    if (!res.ok) {
      return {
        status: "error",
        message: `GitHub API error: ${res.status} ${res.statusText}`,
      };
    }

    const data = (await res.json()) as Record<string, unknown>;

    const profile: GitHubProfile = {
      login: String(data.login || username),
      name: typeof data.name === "string" ? data.name : null,
      avatar_url: String(data.avatar_url || ""),
      html_url: String(data.html_url || `https://github.com/${username}`),
      bio: typeof data.bio === "string" ? data.bio : null,
      location: typeof data.location === "string" ? data.location : null,
      company: typeof data.company === "string" ? data.company : null,
      followers: Number(data.followers) || 0,
      following: Number(data.following) || 0,
      public_repos: Number(data.public_repos) || 0,
      created_at: typeof data.created_at === "string" ? data.created_at : "",
    };

    return { status: "found", profile };
  } catch (err) {
    return { status: "error", message: String(err) };
  }
}

/** Human readable account age, e.g. "3y 2m" or "3 weeks". */
export function formatAccountAge(createdAt: string): string {
  if (!createdAt) return "Unknown";
  const created = new Date(createdAt).getTime();
  if (!Number.isFinite(created)) return "Unknown";

  const diffMs = Date.now() - created;
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (days < 7) return `${days} day${days === 1 ? "" : "s"}`;
  if (days < 30) return `${Math.floor(days / 7)} week${days < 14 ? "" : "s"}`;
  if (days < 365) return `${Math.floor(days / 30)} month${days < 60 ? "" : "s"}`;

  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  return months > 0 ? `${years}y ${months}m` : `${years}y`;
}

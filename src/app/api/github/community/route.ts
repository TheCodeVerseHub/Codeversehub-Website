import { NextResponse } from "next/server";
import {
  getRepos,
  getContributors,
  getMergedPRs,
  getOpenIssues,
  getLatestRelease,
} from "@/lib/github";
import { getCached, setCache } from "@/lib/github-storage";
import { logger } from "@/lib/appeal-logger";

export const revalidate = 600;

const RELEASE_REPOS = 4;
const CONTRIBUTOR_REPOS = 5;

export async function GET() {
  try {
    const repos = await getRepos();
    const active = repos.filter((r) => !r.archived);
    const topByStars = [...active].sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );

    const [merged, issues] = await Promise.all([
      getMergedPRs(4).catch(() => ({ count: 0, items: [] as never[] })),
      getOpenIssues(4).catch(() => ({ count: 0, items: [] as never[] })),
    ]);

    interface RepoContributor {
      login: string;
      avatar_url: string;
      html_url: string;
      contributions: number;
      repo: string;
    }

    const [releases, contributors] = await Promise.all([
      Promise.all(
        topByStars.slice(0, RELEASE_REPOS).map(async (repo) => {
          const release = await getLatestRelease(repo.name);
          return release ? { repo: repo.name, ...release } : null;
        }),
      ).catch(() => [] as null[]),
      Promise.all(
        topByStars.slice(0, CONTRIBUTOR_REPOS).map(async (repo) => {
          try {
            const list = await getContributors(repo.name);
            return list.map<RepoContributor>((c) => ({ ...c, repo: repo.name }));
          } catch {
            return [] as RepoContributor[];
          }
        }),
      ).catch(() => [] as RepoContributor[][]),
    ]);

    // Merge contributors by login, keeping the highest contribution count.
    const contributorMap = new Map<
      string,
      { login: string; avatar_url: string; html_url: string; contributions: number; repos: string[] }
    >();
    for (const list of contributors.flat()) {
      const existing = contributorMap.get(list.login);
      if (existing) {
        existing.contributions = Math.max(existing.contributions, list.contributions);
        if (!existing.repos.includes(list.repo)) existing.repos.push(list.repo);
      } else {
        contributorMap.set(list.login, {
          login: list.login,
          avatar_url: list.avatar_url,
          html_url: list.html_url,
          contributions: list.contributions,
          repos: [list.repo],
        });
      }
    }
    const topContributors = [...contributorMap.values()]
      .sort((a, b) => b.contributions - a.contributions)
      .slice(0, 8);

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
    const languages = repos.reduce(
      (acc, r) => {
        if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const data = {
      fetchedAt: new Date().toISOString(),
      stats: {
        repoCount: repos.length,
        activeRepoCount: active.length,
        totalStars,
        totalForks,
        contributorsCount: topContributors.length,
        mergedPrsCount: merged.count,
        issueCount: issues.count,
        languages,
      },
      newestRepos: [...active]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 4)
        .map((r) => ({
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count,
          created_at: r.created_at,
        })),
      recentlyUpdated: [...active]
        .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
        .slice(0, 4)
        .map((r) => ({
          name: r.name,
          html_url: r.html_url,
          language: r.language,
          pushed_at: r.pushed_at,
        })),
      mergedPrs: merged.items,
      openIssues: issues.items,
      releases: releases.filter(Boolean),
      topContributors,
    };

    setCache("community", data);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=600, s-maxage=600" },
    });
  } catch {
    const cached = getCached<Record<string, unknown>>("community");
    if (cached) {
      logger.info("Serving stale community snapshot from cache");
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
      });
    }
    return NextResponse.json({ error: "Failed to fetch community data" }, { status: 500 });
  }
}

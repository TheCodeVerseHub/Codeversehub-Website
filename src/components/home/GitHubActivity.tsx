"use client";

import { useEffect, useState } from "react";
import ShinyText from "@/components/ShinyText";
import Link from "next/link";
import {
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  CircleDot,
  Rocket,
  Users,
  ExternalLink,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  fetchCommunitySnapshot,
  type CommunitySnapshot,
} from "@/lib/community";

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function repoNameFromUrl(url: string): string {
  const parts = url.split("/repos/");
  return parts.length > 1 ? parts[1] : "";
}

interface Feed {
  key: string;
  label: string;
  icon: LucideIcon;
  count?: number;
  empty: string;
  items: {
    key: string;
    title: string;
    meta: string;
    sub?: string;
    href: string;
  }[];
}

function buildFeeds(s: CommunitySnapshot): Feed[] {
  return [
    {
      key: "repos",
      label: "Newest Repositories",
      icon: GitBranch,
      items: (s.newestRepos ?? []).map((r) => ({
        key: r.name,
        title: r.name,
        meta: `${r.language || "->"} · ${timeAgo(r.created_at)}`,
        sub: `${r.stargazers_count} ★`,
        href: r.html_url,
      })),
      empty: "No repositories published yet.",
    },
    {
      key: "updated",
      label: "Recently Updated",
      icon: GitCommitHorizontal,
      items: (s.recentlyUpdated ?? []).map((r) => ({
        key: r.name,
        title: r.name,
        meta: `${r.language || "->"} · pushed ${timeAgo(r.pushed_at)}`,
        href: r.html_url,
      })),
      empty: "No recent commits to show.",
    },
    {
      key: "prs",
      label: "Merged Pull Requests",
      icon: GitPullRequest,
      count: s.stats?.mergedPrsCount,
      items: (s.mergedPrs ?? []).map((pr) => ({
        key: `${pr.number}-${pr.title}`,
        title: pr.title,
        meta: `#${pr.number} · ${repoNameFromUrl(pr.repository_url)}`,
        sub: pr.user?.login,
        href: pr.html_url,
      })),
      empty: "No merged pull requests yet, yours could be first.",
    },
    {
      key: "issues",
      label: "Open Issues",
      icon: CircleDot,
      count: s.stats?.issueCount,
      items: (s.openIssues ?? []).map((issue) => ({
        key: `${issue.number}-${issue.title}`,
        title: issue.title,
        meta: `#${issue.number} · ${timeAgo(issue.created_at)}`,
        sub: issue.user?.login,
        href: issue.html_url,
      })),
      empty: "No open issues right now.",
    },
    {
      key: "releases",
      label: "Latest Releases",
      icon: Rocket,
      items: (s.releases ?? []).map((r) => ({
        key: `${r.repo}-${r.tag_name}`,
        title: r.tag_name,
        meta: `${r.repo} · ${timeAgo(r.published_at)}`,
        sub: r.name || "release",
        href: r.html_url,
      })),
      empty: "No releases published yet.",
    },
    {
      key: "contributors",
      label: "Top Contributors",
      icon: Users,
      count: s.stats?.contributorsCount,
      items: (s.topContributors ?? []).map((c) => ({
        key: c.login,
        title: c.login,
        meta: `${c.contributions} contributions`,
        sub: c.repos.slice(0, 2).join(", "),
        href: c.html_url,
      })),
      empty: "No contributors yet, be the first!",
    },
  ];
}

function FeedPanel({ feed }: { feed: Feed }) {
  const Icon = feed.icon;
  return (
    <div className="border border-[#1a1a1a] bg-[#090909] flex flex-col min-h-[12rem]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1a1a] bg-[rgba(255,255,255,0.02)]">
        <Icon className="w-3.5 h-3.5 text-[#22d3ee]" />
        <span className="text-[0.6875rem] font-mono text-white/70 tracking-wider uppercase">
          {feed.label}
        </span>
        {typeof feed.count === "number" && (
          <span className="ml-auto text-[0.625rem] font-mono text-white/30">
            {feed.count}
          </span>
        )}
      </div>
      {feed.items.length > 0 ? (
        <ul className="divide-y divide-[#1a1a1a] flex-1">
          {feed.items.slice(0, 4).map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 group/item hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-150"
              >
                <p className="text-[0.8125rem] text-white/80 font-medium truncate group-hover/item:text-white transition-colors duration-150">
                  {item.title}
                </p>
                <p className="text-[0.6875rem] text-white/30 font-mono mt-0.5 truncate">
                  {item.meta}
                </p>
                {item.sub && (
                  <p className="text-[0.6875rem] text-[#22d3ee]/70 truncate">
                    {item.sub}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 py-6 text-center">
          <p className="text-[0.75rem] text-white/25 leading-relaxed">
            {feed.empty}
          </p>
        </div>
      )}
    </div>
  );
}

export default function GitHubActivity() {
  const [snapshot, setSnapshot] = useState<CommunitySnapshot | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchCommunitySnapshot().then((s) => {
      if (!mounted) return;
      if (s) setSnapshot(s);
      else setFailed(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const feeds = snapshot ? buildFeeds(snapshot) : null;

  return (
    <section className="section-spacing" aria-labelledby="activity-heading">
      <div className="section-divider mb-0" />
      <div className="section-container pt-16 md:pt-20">
        <div className="text-center mb-14">
          <span className="section-label mb-6">GitHub</span>
          <h2
            id="activity-heading"
            className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
          >
            <ShinyText
              text="Latest GitHub Activity"
              shineColor="#ffffff"
              color="#ffffff"
              speed={5}
              spread={150}
              direction="left"
              yoyo={true}
            />
          </h2>
          <p className="text-[#666666] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Real activity from our organization, fresh PRs, issues, repos and
            releases, straight from the GitHub API.
          </p>
        </div>

        {/* Terminal-style header bar */}
        <div className="max-w-6xl mx-auto mb-4">
          <div className="border border-[#1a1a1a] bg-[#090909] px-4 py-2.5 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
            </span>
            <span className="font-mono text-[0.6875rem] text-white/40 tracking-wider">
              {snapshot?.fetchedAt
                ? `synced ${timeAgo(snapshot.fetchedAt)}`
                : "syncing…"}
            </span>
            <a
              href="https://github.com/TheCodeVerseHub"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-mono text-[#22d3ee] hover:text-white transition-colors duration-150"
            >
              github.com/TheCodeVerseHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {failed ? (
          <div className="max-w-6xl mx-auto border border-[#1a1a1a] bg-[#090909] p-10 text-center">
            <p className="text-white/40 text-sm">
              GitHub activity is unavailable right now, it will load
              automatically once the API is reachable.
            </p>
            <a
              href="https://github.com/TheCodeVerseHub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-10 px-6 text-[0.8125rem] mt-6"
            >
              Browse the organization instead
            </a>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {feeds?.map((feed) => (
              <FeedPanel key={feed.key} feed={feed} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5"
          >
            <Star className="w-3.5 h-3.5" />
            Explore all repositories
          </Link>
        </div>
      </div>
    </section>
  );
}

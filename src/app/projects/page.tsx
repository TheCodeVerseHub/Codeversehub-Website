import {
  getRepos,
  getContributors,
  categorizeRepos,
  type GitHubRepo,
  type GitHubContributor,
} from "@/lib/github";
import {
  getCaseStudies,
  getCaseStudyForRepo,
  type CaseStudy,
} from "@/lib/case-studies";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  GitFork,
  AlertCircle,
  ExternalLink,
  Calendar,
  FileText,
  Github,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { Metadata } from "next";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Our Projects | The CodeVerse Hub",
  description:
    "Explore all open-source projects from The CodeVerse Hub -> Discord bots, Linux distros, developer tools, and more, with deep-dive case studies for our flagship builds.",
  alternates: { canonical: "/projects" },
};

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Rust: "#DEA584",
  Go: "#00ADD8",
  CSS: "#563D7C",
  Lua: "#000080",
  HTML: "#E34F26",
  Shell: "#89E051",
};

function langColor(lang: string | null): string {
  if (!lang) return "#666";
  return languageColors[lang] || "#ffffff";
}

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

function RepoCard({
  repo,
  contributors,
  study,
}: {
  repo: GitHubRepo;
  contributors: GitHubContributor[];
  study?: CaseStudy;
}) {
  return (
    <div className="cvh-card p-5 group flex flex-col">
      {/* Title row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 min-w-0 group/title"
        >
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
            style={{ backgroundColor: langColor(repo.language) }}
          />
          <h3 className="font-semibold text-white text-sm truncate group-hover/title:text-[#afafaf] transition-colors duration-150">
            {repo.name}
          </h3>
        </a>
        <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-[#ffffff] shrink-0 transition-colors duration-150" />
      </div>

      <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
        {repo.description || "No description provided."}
      </p>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/40">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: langColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {repo.open_issues_count}
        </span>
        {repo.license && <span>{repo.license.spdx_id}</span>}
        <span className="flex items-center gap-1 ml-auto">
          <Calendar className="w-3 h-3" />
          {timeAgo(repo.pushed_at)}
        </span>
      </div>

      {/* Contributors */}
      {contributors.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center gap-2">
          <div className="flex -space-x-2">
            {contributors.slice(0, 5).map((c) => (
              <img
                key={c.id}
                src={`${c.avatar_url}&s=28`}
                alt={c.login}
                className="w-6 h-6 rounded-full border border-black"
                title={`${c.login} ${c.contributions} contributions`}
              />
            ))}
          </div>
          <span className="text-xs text-white/30">
            {contributors.length > 5
              ? `${contributors.length} contributors`
              : `${contributors.length} contributor${contributors.length !== 1 ? "s" : ""}`}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center gap-3">
        {study ? (
          <Link
            href={`/case-studies/${study.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[#22d3ee] hover:text-white transition-colors duration-150"
          >
            <FileText className="w-3.5 h-3.5" />
            Case Study
            <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/25">
            <FileText className="w-3.5 h-3.5" />
            Case study coming soon
          </span>
        )}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/40 hover:text-white transition-colors duration-150 ml-auto"
        >
          <Github className="w-3.5 h-3.5" />
          Repository
        </a>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  let repos: GitHubRepo[] = [];
  const contributorsMap: Record<string, GitHubContributor[]> = {};
  let error: string | null = null;

  try {
    repos = await getRepos();
    await Promise.all(
      repos.map(async (repo) => {
        try {
          contributorsMap[repo.name] = await getContributors(repo.name);
        } catch {
          contributorsMap[repo.name] = [];
        }
      }),
    );
  } catch {
    error = "Unable to fetch repository data. Please try again later.";
  }

  const categories = error ? {} : categorizeRepos(repos);
  const studies = getCaseStudies();

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-16 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-150 text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* ── Header ─────────────────────────────────────── */}
        <header className="mb-12">
          <p className="cvh-label mb-4">Open Source</p>
          <h1 className="heading-xl text-4xl md:text-5xl text-white mb-4 tracking-tight">
            Our Projects
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed">
            We build and maintain open-source software across multiple domains
            from Discord bots and developer tools to Linux distributions and a
            Wayland compositor. Every project is open for contributions, and our
            flagship builds come with full engineering case studies.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/case-studies"
              className="btn-primary h-10 px-6 text-[0.8125rem]"
            >
              <span className="relative z-10">Read the case studies</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
            <a
              href="https://github.com/TheCodeVerseHub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-10 px-6 text-[0.8125rem]"
            >
              <Github className="w-4 h-4" />
              GitHub Organization
            </a>
          </div>
        </header>

        {/* ── Featured case studies ──────────────────────── */}
        {!error && studies.length > 0 && (
          <section className="mb-16" aria-labelledby="case-studies-heading">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2
                  id="case-studies-heading"
                  className="text-xl md:text-2xl font-bold text-white tracking-tight"
                >
                  Case Studies
                </h2>
                <span className="text-xs text-white/30 font-mono bg-white/[0.04] px-2 py-0.5 rounded-full">
                  {studies.length}
                </span>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors duration-150"
              >
                View all
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <CaseStudyCard
                  key={study.slug}
                  study={study}
                  showMetrics={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Categorized repos ──────────────────────────── */}
        {error ? (
          <div className="rounded-xl border border-red-500/15 bg-red-500/[0.03] p-8 text-center">
            <p className="text-red-400">{error}</p>
            <p className="text-white/40 text-sm mt-2">
              The data should load automatically once the GitHub API is
              available.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(categories).map(([category, categoryRepos]) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {category}
                  </h2>
                  <span className="text-xs text-white/30 font-mono bg-white/[0.04] px-2 py-0.5 rounded-full">
                    {categoryRepos.length}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryRepos.map((repo) => (
                    <RepoCard
                      key={repo.id}
                      repo={repo}
                      contributors={contributorsMap[repo.name] || []}
                      study={getCaseStudyForRepo(repo.name)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ShinyText from "@/components/ShinyText";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  GitFork,
  Globe,
  Bot,
  Wrench,
  Github,
  MessageCircle,
  FileText,
  Signal,
} from "lucide-react";
import { getCaseStudyForRepo, type CaseStudy } from "@/lib/case-studies";
import { LINKS } from "@/lib/constants";

interface RepoContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  archived?: boolean;
  contributors?: RepoContributor[];
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Rust: "#DEA584",
  Go: "#00ADD8",
  CSS: "#563D7C",
  Lua: "#000080",
};

function langColor(lang: string | null): string {
  if (!lang) return "#666666";
  return languageColors[lang] || "#ffffff";
}

const FallbackRepos: Repo[] = [
  {
    id: 1,
    name: "CodeVerseLinuxDistro",
    description: "A Linux distribution maintained by the community.",
    html_url: "https://github.com/TheCodeVerseHub/CodeVerseLinuxDistro",
    language: "CSS",
    stargazers_count: 10,
    forks_count: 13,
  },
  {
    id: 2,
    name: "Eigen-Bot",
    description: "A utility Discord bot built by CVH members.",
    html_url: "https://github.com/TheCodeVerseHub/Eigen-Bot",
    language: "Python",
    stargazers_count: 13,
    forks_count: 14,
  },
  {
    id: 3,
    name: "Codeversehub-Website",
    description: "The official CodeVerse Hub website.",
    html_url: "https://github.com/TheCodeVerseHub/Codeversehub-Website",
    language: "TypeScript",
    stargazers_count: 8,
    forks_count: 3,
  },
  {
    id: 4,
    name: "Miku",
    description: "A Discord bot with leveling, reaction roles, and utilities.",
    html_url: "https://github.com/TheCodeVerseHub/Miku",
    language: "Python",
    stargazers_count: 3,
    forks_count: 7,
  },
  {
    id: 5,
    name: "EclipseLinux",
    description: "A Void-based Linux distribution.",
    html_url: "https://github.com/TheCodeVerseHub/EclipseLinux",
    language: "Lua",
    stargazers_count: 17,
    forks_count: 1,
  },
];

const projectCategories = [
  {
    icon: Bot,
    title: "Discord Bots",
    description:
      "Production-grade bots handling moderation, leveling, reaction roles, and utilities for thousands of users. Built with Python and modern async patterns.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Full-stack applications using TypeScript, React, Next.js, and Node.js. From community dashboards to developer tools, real UIs, real APIs, real users.",
  },
  {
    icon: Wrench,
    title: "Developer Tooling",
    description:
      "CLI tools, libraries, and infrastructure projects that make other developers' lives easier. CI/CD pipelines, automation scripts, and shared utilities.",
  },
];

type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "All levels";

function repoDifficulty(repo: Repo): Difficulty {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || "").toLowerCase();
  if (name.includes("compositor") || desc.includes("from scratch")) return "Advanced";
  if (name.includes("eclipse") || name.includes("init") || name.includes("kernel")) return "Advanced";
  if (name.includes("linux") || name.includes("distro") || name.includes("shell") || name.includes("tool")) {
    return "Intermediate";
  }
  if (name.includes("bot") || name.includes("intro") || name.includes("website") || name.includes("web")) {
    return "Beginner";
  }
  return "All levels";
}

const difficultyColor: Record<Difficulty, string> = {
  Beginner: "text-green-400/90 border-green-400/20 bg-green-400/[0.06]",
  Intermediate: "text-amber-400/90 border-amber-400/20 bg-amber-400/[0.06]",
  Advanced: "text-red-400/90 border-red-400/20 bg-red-400/[0.06]",
  "All levels": "text-[#afafaf] border-white/10 bg-white/[0.04]",
};

function RepoCard({ repo }: { repo: Repo }) {
  const study: CaseStudy | undefined = getCaseStudyForRepo(repo.name);
  const difficulty = repoDifficulty(repo);
  const isArchived = !!repo.archived;
  const maintainers = (repo.contributors ?? []).slice(0, 3);

  return (
    <div className="card p-5 group flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 min-w-0 group/title"
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
            style={{ backgroundColor: langColor(repo.language) }}
          />
          <h3 className="font-mono text-[0.8125rem] text-white font-semibold truncate group-hover/title:text-[#afafaf] transition-colors duration-150">
            ~/{repo.name}
          </h3>
        </a>
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 text-[0.625rem] font-mono px-2 py-0.5 border ${
            isArchived
              ? "text-white/30 border-white/10"
              : "text-green-400/90 border-green-400/20 bg-green-400/[0.06]"
          }`}
        >
          <Signal className="w-2.5 h-2.5" />
          {isArchived ? "Archived" : "Active"}
        </span>
      </div>

      <p className="text-[0.8125rem] text-[#666666] leading-relaxed line-clamp-2 mb-4 flex-1">
        {repo.description || "No description available"}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.75rem] text-[#666666] pb-3 border-b border-[#1a1a1a]">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: langColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1.5">
          <GitFork className="w-3.5 h-3.5" />
          {repo.forks_count}
        </span>
        <span
          className={`ml-auto inline-flex items-center px-2 py-0.5 border text-[0.625rem] font-mono ${difficultyColor[difficulty]}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Maintainers */}
      <div className="pt-3 flex items-center gap-2">
        {maintainers.length > 0 ? (
          <>
            <div className="flex -space-x-2">
              {maintainers.map((c) => (
                <Image
                  key={c.id}
                  src={`${c.avatar_url}&s=56`}
                  alt={c.login}
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6 rounded-full border border-black"
                  title={`${c.login} · ${c.contributions} contributions`}
                />
              ))}
            </div>
            <span className="text-xs text-white/30">
              {maintainers.map((c) => c.login).join(", ")}
            </span>
          </>
        ) : (
          <span className="text-xs text-white/25">Maintainers loading…</span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex flex-wrap items-center gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-white hover:text-[#afafaf] transition-colors duration-150"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
        <a
          href={LINKS.DISCORD}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.75rem] text-[#666666] hover:text-[#22d3ee] transition-colors duration-150"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Discuss on Discord
        </a>
        {study && (
          <Link
            href={`/case-studies/${study.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.75rem] text-[#666666] hover:text-white transition-colors duration-150"
          >
            <FileText className="w-3.5 h-3.5" />
            Case Study
          </Link>
        )}
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [repos, setRepos] = useState<Repo[]>(FallbackRepos);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data)) {
          setRepos(
            data
              .filter((r: Repo) => !r.name.includes(".") && !r.archived)
              .sort(
                (a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count,
              )
              .slice(0, 6),
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-spacing" aria-labelledby="projects-heading">
      <div className="section-divider mb-0" />
      <div className="section-container pt-16 md:pt-20">
        <div className="text-center mb-14">
          <span className="section-label mb-6">Projects</span>
          <h2
            id="projects-heading"
            className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
          >
            <ShinyText
              text="What we build"
              shineColor="#ffffff"
              color="#ffffff"
              speed={5}
              spread={150}
              direction="left"
              yoyo={true}
            />
          </h2>
        </div>

        {/* Project categories description */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-base md:text-lg text-[#666666] leading-relaxed text-center mb-10">
            Our projects span across multiple domains of software development.
            Each repository is open for contribution, with active maintainers
            ready to review your code and guide your first pull request.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto mb-12">
            {projectCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="card p-6 group text-center">
                  <div className="w-10 h-10 flex items-center justify-center mx-auto mb-4 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)] transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-[#22d3ee]" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-[0.75rem] text-[#666666] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Repo cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
          {repos.slice(0, 6).map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5"
          >
            View all projects
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

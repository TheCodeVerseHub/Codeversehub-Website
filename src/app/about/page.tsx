import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Code2,
  Users,
  Shield,
  GitPullRequest,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getRepos } from "@/lib/github";
import { LINKS } from "@/lib/constants";
import type { Metadata } from "next";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "About | The Codeverse Hub",
  description:
    "Why The CodeVerse Hub exists: an open-source developer community built on learning by building, honest code reviews, and real projects shipped together.",
  alternates: { canonical: "/about" },
};

const philosophy = [
  {
    icon: Code2,
    title: "Learning by Building",
    description:
      "We don't believe in tutorial marathons. The best way to learn is to ship real software with real users, and get real feedback on it. That's the whole model.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Decisions are made transparently. Maintainers are elected from active contributors. Roadmaps are discussed in the open. The community shapes every project's direction.",
  },
  {
    icon: GitPullRequest,
    title: "Engineering Culture",
    description:
      "Code reviews are thorough but constructive. Every PR gets meaningful feedback. Our workflow mirrors professional teams, so what you learn here transfers straight to industry roles.",
  },
  {
    icon: Shield,
    title: "Open by Default",
    description:
      "Code, decisions, and discussions are public. No gatekeeping, no paid tiers, no 'secret sauce'. Anyone can read how we work and why.",
  },
];

const journey = [
  "Join the Discord",
  "Ask questions",
  "Pick a project",
  "Open a PR",
  "Get reviewed",
  "Ship & contribute",
];

export default async function AboutPage() {
  let stats: { repos: string; stars: string; forks: string } | null = null;
  try {
    const repos = await getRepos();
    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const forks = repos.reduce((s, r) => s + r.forks_count, 0);
    stats = {
      repos: repos.length.toString(),
      stars: stars.toLocaleString(),
      forks: forks.toLocaleString(),
    };
  } catch {
    stats = null;
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-6 py-16 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-150 text-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero */}
        <section className="mb-20">
          <span className="cvh-label mb-4">About</span>
          <h1 className="heading-xl text-4xl md:text-5xl text-white mb-6 tracking-tight">
            We build open-source software.{" "}
            <span className="text-[#22d3ee]">Together.</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
            The CodeVerse Hub is an open-source developer community, not just a
            programming chat room. We&apos;re people who believe the best way to
            learn is to build real software, review real code, and ship real
            projects alongside each other.
          </p>
        </section>

        {/* Why we exist */}
        <section className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            Why TCVH exists
          </h2>
          <div className="space-y-5 text-white/50 leading-relaxed">
            <p>
              Most programming communities stop at answering questions. Someone
              asks, someone answers, everyone moves on, and nobody actually
              builds anything. We wanted a space where the answer to &ldquo;how
              do I get experience?&rdquo; isn&apos;t a tutorial link, but a
              repository you can fork.
            </p>
            <p>
              So we maintain real open-source projects: Discord bots serving
              thousands of users, a Linux distribution, a Wayland compositor
              written from scratch, developer tools, and this website. When you
              contribute here, your code ships to real users, and your name goes
              on a real contribution graph.
            </p>
            <p>
              That&apos;s the whole point. Beginners get a safe place to make
              their first PR. Experienced developers get a community that treats
              engineering seriously. And everyone gets a portfolio of software
              they actually helped build.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-white mb-8">
            What we believe
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {philosophy.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="cvh-card p-6 group">
                  <div className="w-10 h-10 flex items-center justify-center mb-3.5 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)] transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-[#22d3ee]" />
                  </div>
                  <h3 className="text-white font-semibold mb-1.5">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Journey */}
        <section className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-white mb-4">
            The path from member to maintainer
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
            Everyone starts the same way: you join, you ask questions, and
            somewhere along the way you open your first pull request. From
            there, the journey is yours to make.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {journey.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="cvh-card px-3.5 py-2 text-[0.8125rem] text-white/70">
                  {step}
                </span>
                {i < journey.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#22d3ee]/60" />
                )}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm leading-relaxed mt-8 max-w-2xl">
            Consistent, quality contributions get noticed. Active contributors
            get nominated and voted in as maintainers, influence here is earned
            through the work you ship, not who you know.
          </p>
        </section>

        {/* Numbers */}
        <section className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-white mb-8">
            Where we are today
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: stats?.repos ?? "15+", label: "Repositories" },
              { value: stats?.stars ?? "70+", label: "GitHub Stars" },
              { value: stats?.forks ?? "30+", label: "Forks" },
              { value: "1,900+", label: "Community Members" },
            ].map((s) => (
              <div key={s.label} className="cvh-card px-5 py-6 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {s.value}
                </p>
                <p className="text-xs text-white/40 mt-1.5 font-mono">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-[0.6875rem] font-mono mt-3">
            {stats
              ? "Repository, star and fork counts stream live from GitHub."
              : "Estimates shown while live GitHub data loads."}
          </p>
        </section>

        {/* Vision */}
        <section className="cvh-card p-8 md:p-10">
          <div className="w-11 h-11 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-4">
            <Eye className="w-5 h-5 text-[#22d3ee]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-3">
            The long-term vision
          </h2>
          <p className="text-white/50 leading-relaxed">
            We want open-source contribution to become the default path for
            developer growth, a world where your first PR is a rite of passage,
            and where maintainers are made, not born. We&apos;ll get there one
            merged pull request at a time.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href={LINKS.DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-11 px-8 text-[0.8125rem]"
          >
            <MessageCircle className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Join the community</span>
          </a>
          <Link
            href="/projects"
            className="btn-secondary h-11 px-8 text-[0.8125rem]"
          >
            See what we build
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

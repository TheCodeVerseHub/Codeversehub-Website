"use client";

import Link from "next/link";
import ShinyText from "@/components/ShinyText";
import {
  MessageCircle,
  Search,
  GitBranch,
  GitPullRequest,
  MessageSquare,
  GitMerge,
  Award,
  Shield,
  GitBranch as GitBranchIcon,
  Users,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
} from "lucide-react";

const journey = [
  {
    icon: MessageCircle,
    title: "Join Discord",
    description:
      "Introduce yourself, pick your language roles, and say hi. You'll find mentors and maintainers ready to point you at the right repo.",
  },
  {
    icon: Search,
    title: "Pick a Project",
    description:
      "Browse the org and look for issues tagged 'good first issue' or 'help wanted'. Each repo has a contributing guide to get you oriented.",
  },
  {
    icon: GitBranch,
    title: "Setup the Repository",
    description:
      "Fork the repo to your account, clone it locally, and create a branch. Follow the README setup steps to get it running on your machine.",
  },
  {
    icon: GitPullRequest,
    title: "Open Your First PR",
    description:
      "Make your change, commit with a clear message, push, and open a pull request against the original repository.",
  },
  {
    icon: MessageSquare,
    title: "Receive a Review",
    description:
      "Maintainers and CI review your code line by line, constructive, and focused on teaching. Respond to feedback and refine.",
  },
  {
    icon: GitMerge,
    title: "Merge & Ship",
    description:
      "Once approved, a maintainer merges your PR. Your code ships to real users and lands on your GitHub contribution graph.",
  },
  {
    icon: Award,
    title: "Become a Contributor",
    description:
      "Merged PRs build a track record. Your name shows up in the contributor graphs, and maintainers start pinging you for reviews.",
  },
  {
    icon: Shield,
    title: "Become a Maintainer",
    description:
      "Consistent, quality work gets noticed. Active contributors are nominated and voted in by the community to steward projects.",
  },
];

const principles = [
  {
    icon: Shield,
    title: "Transparency",
    description:
      "Every decision, every commit, every discussion is visible to the community. Roadmaps, RFCs, and maintainer elections happen in the open.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description:
      "Experienced contributors review your code with the goal of teaching. We document review guidelines so everyone understands what is expected.",
  },
  {
    icon: GitPullRequest,
    title: "Meritocracy",
    description:
      "Influence is earned through quality contributions. Active contributors become maintainers. Maintainers steward the projects that matter most.",
  },
];

type JourneyStep = (typeof journey)[number];

function FlowCard({
  step,
  index,
}: {
  step: JourneyStep;
  index: number;
}) {
  const Icon = step.icon;
  return (
    <div className="cvh-flow-card card p-5 group">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-10 w-10 shrink-0 flex items-center justify-center border border-[#1a1a1a] bg-[#090909] font-mono text-[0.625rem] text-[#22d3ee]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] bg-[rgba(255,255,255,0.03)] transition-all duration-300 group-hover:scale-110">
          <Icon className="w-4 h-4 text-[#22d3ee]" />
        </div>
        <h3 className="font-heading text-sm font-semibold text-white">
          {step.title}
        </h3>
      </div>
      <p className="text-[0.8125rem] text-[#666666] leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

/* Serpentine two-column order: 1→2, down, 4←3, down, 5→6, down, 8←7 … */
const flowRows = Array.from(
  { length: Math.ceil(journey.length / 2) },
  (_, row) => ({
    leftIndex: row % 2 === 0 ? row * 2 : row * 2 + 1,
    rightIndex: row % 2 === 0 ? row * 2 + 1 : row * 2,
    direction: row % 2 === 0 ? ("right" as const) : ("left" as const),
    turn: row % 2 === 0 ? ("right" as const) : ("left" as const),
  }),
);

export default function OpenSourceJourney() {
  return (
    <section className="section-spacing" aria-labelledby="journey-heading">
      <div className="section-divider mb-0" />
      <div className="section-container pt-10 md:pt-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label mb-6">Open Source</span>
            <h2
              id="journey-heading"
              className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
            >
              <ShinyText
                text="Your open source journey"
                shineColor="#ffffff"
                color="#ffffff"
                speed={5}
                spread={150}
                direction="left"
                yoyo={true}
              />
            </h2>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed max-w-2xl mx-auto">
              From first hello to maintainer, here is exactly how a member goes
              from lurker to shipping maintainer at The CodeVerse Hub.
            </p>
          </div>

          {/* Journey flowchart — serpentine zigzag with connected arrows */}
          <div className="cvh-flow mb-12" role="list" aria-label="Your open source journey steps">
            {flowRows.map((row, rowIndex) => (
              <div key={rowIndex} className="cvh-flow-group">
                <div
                  className={`cvh-flow-row${
                    rowIndex % 2 === 1 ? " cvh-flow-row--reverse" : ""
                  }`}
                >
                  <div role="listitem" className="cvh-flow-slot">
                    <FlowCard step={journey[row.leftIndex]} index={row.leftIndex} />
                  </div>
                  <div
                    className={`cvh-flow-arrow cvh-flow-arrow--${row.direction}`}
                    aria-hidden="true"
                  >
                    <span className="cvh-flow-hline" />
                    {row.direction === "right" ? (
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    ) : (
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                    )}
                  </div>
                  <div role="listitem" className="cvh-flow-slot">
                    <FlowCard step={journey[row.rightIndex]} index={row.rightIndex} />
                  </div>
                </div>
                {rowIndex < flowRows.length - 1 && (
                  <div
                    className={`cvh-flow-turn cvh-flow-turn--${row.turn}`}
                    aria-hidden="true"
                  >
                    <div className="cvh-flow-turn-inner">
                      <span className="cvh-flow-vline" />
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Principles */}
          <div className="mb-12">
            <h3 className="font-heading text-xl font-semibold text-white mb-6 text-center">
              Our Open-Source Principles
            </h3>
            <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={principle.title}
                    className="card p-6 group text-center"
                  >
                    <div className="w-10 h-10 flex items-center justify-center mx-auto mb-4 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)] transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-5 h-5 text-[#22d3ee]" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-[0.8125rem] text-[#666666] leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://github.com/TheCodeVerseHub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-11 px-8 text-[0.8125rem] inline-flex items-center gap-2"
            >
              <GitBranchIcon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Browse GitHub Organization</span>
            </a>
            <div className="mt-4">
              <Link
                href="/pages/contributing"
                className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5"
              >
                Read our contributing guide &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import ShinyText from "@/components/ShinyText";
import {
  MessageSquare,
  Code2,
  Rocket,
  GitPullRequest,
  GitFork,
  Mic,
  Users,
  BookOpen,
} from "lucide-react";
import { LINKS } from "@/lib/constants";

const areas = [
  {
    icon: MessageSquare,
    title: "Learning & Help",
    description:
      "Language help channels where you post the error, the code, and what you tried and get real answers from developers across every time zone, at any hour.",
    why: "The fastest way past a bug is someone who has hit it before.",
  },
  {
    icon: Code2,
    title: "Programming Channels",
    description:
      "Deep-dive channels on Linux, web development, AI/ML, systems programming, databases, and DevOps. Ask questions, share knowledge, debate architecture.",
    why: "Talk shop with people who actually build things.",
  },
  {
    icon: Rocket,
    title: "Project Showcase",
    description:
      "A dedicated space to share what you are building, get feedback, find collaborators, and maybe even a co-maintainer who cares about the same problem.",
    why: "Your work deserves an audience that understands it.",
  },
  {
    icon: GitPullRequest,
    title: "Code Reviews",
    description:
      "Submit code and get detailed, actionable feedback from maintainers who know the stack. Line-by-line, constructive, and focused on making you better.",
    why: "Reviews that teach are the fastest way to level up.",
  },
  {
    icon: GitFork,
    title: "Open Source",
    description:
      "Good-first-issue labels, contribution guides, and maintainers ready to walk you through your first PR. Every merged pull request is real production code.",
    why: "Skip tutorial hell and ship something real.",
  },
  {
    icon: Mic,
    title: "Voice Events",
    description:
      "Voice channels for pair programming, discussions, and community events like Code Review Fridays and open-source sprints. Show up, talk, build together.",
    why: "Some things are easier to solve out loud.",
  },
  {
    icon: Users,
    title: "Study Groups",
    description:
      "Structured groups for DSA, React, Rust, and more. Work through problems together, share resources, and hold each other accountable.",
    why: "Learning with a group sticks better than solo.",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description:
      "Hand-picked documentation, tutorials, and roadmaps that helped members get better at their stack. Curated by the community, no blog spam.",
    why: "Skip the 50-tab rabbit hole.",
  },
];

const audiences = [
  "Students",
  "Beginners",
  "OSS Contributors",
  "Linux Enthusiasts",
  "Full-Stack Devs",
  "Backend Engineers",
  "Frontend Devs",
  "AI / ML",
  "Competitive Programmers",
  "Software Engineers",
];

export default function DiscordSection() {
  return (
    <section className="section-spacing" aria-labelledby="discord-heading">
      <div className="section-divider mb-0" />
      <div className="section-container pt-16 md:pt-20">
        <div className="text-center mb-14">
          <span className="section-label mb-6">The Discord</span>
          <h2
            id="discord-heading"
            className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
          >
            <ShinyText
              text="What happens inside"
              shineColor="#ffffff"
              color="#ffffff"
              speed={5}
              spread={150}
              direction="left"
              yoyo={true}
            />
            <br />
            <span className="text-[#22d3ee]">the Discord</span>
          </h2>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            It is not a chat room with a code channel bolted on. Every space in
            the server exists to move you from asking questions to shipping
            software.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <div key={area.title} className="card p-6 group flex flex-col">
                <div className="w-10 h-10 flex items-center justify-center mb-4 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)] transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-[#22d3ee]" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white mb-2">
                  {area.title}
                </h3>
                <p className="text-[0.8125rem] text-[#666666] leading-relaxed flex-1">
                  {area.description}
                </p>
                <p className="mt-4 pt-3 border-t border-[#1a1a1a] text-[0.6875rem] font-mono text-[#22d3ee]/70 leading-relaxed">
                  {area.why}
                </p>
              </div>
            );
          })}
        </div>

        {/* Audience strip (absorbed from the old "Who Is This For" section) */}
        <div className="max-w-5xl mx-auto mt-14">
          <p className="text-center text-[0.6875rem] font-mono text-white/30 tracking-widest uppercase mb-5">
            Who it&apos;s for
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {audiences.map((audience) => (
              <span
                key={audience}
                className="text-[0.75rem] text-[#afafaf] border border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] px-3 py-1.5 hover:border-[#2a2a2a] hover:text-white transition-colors duration-150 cursor-default"
              >
                {audience}
              </span>
            ))}
          </div>
          <p className="text-center text-[0.8125rem] text-[#666666] mt-5">
            No application process, no minimum skill requirement. If you write
            code or want to learn, there is a place for you here.
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            href={LINKS.DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-11 px-8 text-[0.8125rem]"
          >
            <svg
              className="w-4 h-4 relative z-10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span className="relative z-10">Join the Discord</span>
          </a>
        </div>
      </div>
    </section>
  );
}

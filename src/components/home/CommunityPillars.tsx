"use client";

import Link from "next/link";
import ShinyText from "@/components/ShinyText";
import {
  Code2,
  GitPullRequest,
  Calendar,
  Rocket,
  BookOpen,
  Globe,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Code Reviews",
    description:
      "Submit your code and get honest, actionable feedback from developers who actually know the stack. No rubber stamps. No ego.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Open Source",
    description:
      "We maintain Discord bots, developer tools, and a Linux distribution. Real projects you can contribute to and put on your resume.",
    icon: GitPullRequest,
  },
  {
    number: "03",
    title: "Community Activities",
    description:
      "Join regular community activities that keep the server lively beyond text chat. From coding challenges to voice hangouts, there is always something to jump into.",
    icon: Calendar,
  },
  {
    number: "04",
    title: "Project Showcase",
    description:
      "Building something? Share it. Get feedback, find collaborators, maybe even a co-maintainer who cares about the same problem.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Curated Resources",
    description:
      "Hand-picked documentation, tutorials, and roadmaps that helped someone get better at their stack. No blog spam, no fluff.",
    icon: BookOpen,
  },
  {
    number: "06",
    title: "24/7 Community",
    description:
      "Stuck at 2 AM? Someone in our community is awake. Post your question and get answers from developers across every time zone.",
    icon: Globe,
  },
];

export default function CommunityPillars() {
  return (
    <section className="section-spacing" aria-labelledby="pillars-heading">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label mb-6">Community Pillars</span>
          <h2
            id="pillars-heading"
            className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
          >
            <ShinyText
              text="Built by developers,"
              shineColor="#ffffff"
              color="#ffffff"
              speed={5}
              spread={150}
              direction="left"
              yoyo={true}
            />
            <br />
            <span className="text-[#22d3ee]">for developers</span>
          </h2>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The CodeVerse Hub is an open-source developer community where people
            of all skill levels collaborate on real-world projects, contribute
            to GitHub repositories, and grow together through hands-on
            experience. Every channel and every project exists to help you grow
            as an engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.number}
                className="card p-7 md:p-8 group relative"
              >
                <span className="font-mono text-[0.625rem] text-[#666666] tracking-wider mb-4 block">
                  {feature.number}
                </span>

                <div className="w-10 h-10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)]">
                  <Icon className="w-5 h-5 text-[#ffffff] transition-colors duration-300" />
                </div>

                <h3 className="font-heading text-base font-semibold text-white mb-2 group-hover:text-[#ffffff] transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-[0.8125rem] text-[#666666] leading-relaxed">
                  {feature.description}
                </p>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 40%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/about"
            className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5"
          >
            Learn more about the community &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

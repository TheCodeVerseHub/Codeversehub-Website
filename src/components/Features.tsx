"use client";

import {
  MessageSquare,
  GitPullRequest,
  BookOpen,
  Rocket,
  Users,
  Zap,
  Code2,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "24/7 Dev Help",
    description:
      "Stuck on a bug at 2am? Our global community spans every timezone. Post your question, get answers — always.",
    color: "#8B5CF6",
    tag: "#help-desk",
  },
  {
    icon: GitPullRequest,
    title: "Code Reviews",
    description:
      "Submit your code and get honest, constructive peer reviews. Level up your skills with real feedback from experienced devs.",
    color: "#06B6D4",
    tag: "#code-review",
  },
  {
    icon: BookOpen,
    title: "Curated Resources",
    description:
      "A hand-picked library of docs, tutorials, roadmaps and cheatsheets across every major stack and language.",
    color: "#10B981",
    tag: "#resources",
  },
  {
    icon: Rocket,
    title: "Project Showcase",
    description:
      "Share what you're building. Get feedback, testers, and maybe even collaborators from 1100+ engaged developers.",
    color: "#F59E0B",
    tag: "#project-showcase",
  },
  {
    icon: Code2,
    title: "Open Source Hub",
    description:
      "We maintain active open source projects — bots, tools, a Linux distro. Contribute and put it on your resume.",
    color: "#EC4899",
    tag: "#oss-projects",
  },
  {
    icon: Users,
    title: "Study Groups",
    description:
      "Learning DSA, system design, or a new framework? Find others at the same level and grind through it together.",
    color: "#F97316",
    tag: "#study-groups",
  },
  {
    icon: Zap,
    title: "Hackathons & Events",
    description:
      "Regular challenges, hackathons, and community coding events. Build something cool, win, and get recognized.",
    color: "#A78BFA",
    tag: "#events",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connect with developers from 50+ countries. Find opportunities, collaborations, and friends across the globe.",
    color: "#34D399",
    tag: "#networking",
  },
];

export default function Features() {
  return (
    <section className="bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-violet-400 text-xs font-mono uppercase tracking-widest mb-4 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
            Why developers choose us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Everything a dev needs
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto">
            From daily debugging to landing your first job — we have a channel, a community, and a resource for every step.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6 transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500"
                  style={{ backgroundColor: feature.color }}
                />

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 rounded-bl-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: feature.color }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: feature.color + "22", color: feature.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-white/90">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Tag */}
                <div className="mt-4">
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: feature.color + "15", color: feature.color }}
                  >
                    {feature.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

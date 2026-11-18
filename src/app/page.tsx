"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Contributors from "@/components/home/Contributors";
import TechMarquee from "@/components/home/TechMarquee";
import CommunityStats from "@/components/home/CommunityStats";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import GitHubActivity from "@/components/home/GitHubActivity";
import CommunityPillars from "@/components/home/CommunityPillars";
import DiscordSection from "@/components/home/DiscordSection";
import CommunityShowcase from "@/components/home/CommunityShowcase";
import OpenSourceJourney from "@/components/home/OpenSourceJourney";
import Testimonials from "@/components/home/Testimonials";
import JoinCTA from "@/components/home/JoinCTA";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ShinyText from "@/components/ShinyText";
import { ChevronDown, HelpCircle, ExternalLink } from "lucide-react";

const faqItems = [
  {
    q: "How do I join The CodeVerse Hub?",
    a: "Join the Discord (button above), introduce yourself in the welcome channel, and pick your language roles to unlock the matching help channels. That's it! no application, no fees, no waiting list.",
  },
  {
    q: "I'm a complete beginner. Can I really contribute?",
    a: "Yes! most of our repositories have issues tagged 'good first issue' specifically for first-timers. You get paired with mentors who walk you through Git, the PR lifecycle, and your first merge. Many of our maintainers started with zero open-source experience.",
  },
  {
    q: "How do I contribute to a project?",
    a: "Browse our GitHub organization, pick a repo, and look for 'good first issue' or 'help wanted'. Fork it, clone it, follow the README setup, and open a pull request. Maintainers and CI review it line by line, and once approved, a maintainer merges it.",
  },
  {
    q: "How do code reviews work here?",
    a: "When you submit a PR, maintainers and community members review it inline on GitHub. You get line-by-line feedback on logic, style, performance, and best practices. Reviews are constructive and focused on helping you improve, not on showing off.",
  },
  {
    q: "How do I become a maintainer?",
    a: "Consistently submit quality PRs, participate in reviews, help other contributors, and demonstrate understanding of the project. When you're ready, the community nominates and votes on new maintainers. Influence is earned through quality work.",
  },
  {
    q: "Who owns the projects?",
    a: "The community does. Repositories live under the TheCodeVerseHub GitHub organization, are licensed openly (MIT / GPL), and their roadmaps are discussed in public. Maintainers steward the projects, but direction is shaped by everyone contributing.",
  },
  {
    q: "What technologies does the community work with?",
    a: "Python, TypeScript, JavaScript, Rust, Go, Lua, and more. We build with React, Next.js, Node.js, Django, FastAPI on the web side; maintain Linux distributions on the systems side; and use Docker, PostgreSQL, Redis, and modern CI across projects.",
  },
  {
    q: "What actually happens inside the Discord?",
    a: "Learning & help channels, programming deep-dives, project showcase, code reviews, open-source guidance, community activities, and curated resources. It's built so you move from asking questions to shipping software.",
  },
  {
    q: "Can I showcase my own projects?",
    a: "Absolutely. There's a dedicated project-showcase area where members share what they're building, get feedback, find collaborators, and promote your work to a community of developers who care about quality software.",
  },
  {
    q: "How do hackathons and events work?",
    a: "The community runs coding challenges, Code Review Fridays, open-source sprints, and themed build events. Watch the announcements channel for the next one, and keep event pings enabled if you want early notifications.",
  },
];

export default function Home() {
  return (
    <div className="bg-[#050505]">
      <Navbar />
      <Hero />

      {/* ─── MAIN CONTENT ──────────────────────────────── */}
      <main>
        {/* Visual break: the stacks we work in */}
        <ScrollReveal delay={100}>
          <TechMarquee />
        </ScrollReveal>

        {/* Community stats live where possible */}
        <ScrollReveal delay={150}>
          <div className="section-divider" />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <CommunityStats />
        </ScrollReveal>

        {/* Featured projects */}
        <ScrollReveal delay={250}>
          <FeaturedProjects />
        </ScrollReveal>

        {/* Latest GitHub activity */}
        <ScrollReveal delay={300}>
          <GitHubActivity />
        </ScrollReveal>

        {/* Community pillars */}
        <ScrollReveal delay={350}>
          <CommunityPillars />
        </ScrollReveal>

        {/* Inside the Discord */}
        <ScrollReveal delay={400}>
          <DiscordSection />
        </ScrollReveal>

        {/* Recent community showcases */}
        <ScrollReveal delay={450}>
          <CommunityShowcase />
        </ScrollReveal>

        {/* Open source journey */}
        <ScrollReveal delay={500}>
          <OpenSourceJourney />
        </ScrollReveal>

        {/* Testimonials (placeholder until collected) */}
        <ScrollReveal delay={550}>
          <Testimonials />
        </ScrollReveal>

        {/* The people behind the work */}
        <Contributors />

        {/* FAQ */}
        <ScrollReveal delay={600}>
          <section className="section-spacing" aria-labelledby="faq-heading">
            <div className="section-divider mb-0" />
            <div className="section-container pt-10 md:pt-12">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <span className="section-label mb-6">FAQ</span>
                  <h2
                    id="faq-heading"
                    className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
                  >
                    <ShinyText
                      text="Frequently Asked Questions"
                      shineColor="#ffffff"
                      color="#ffffff"
                      speed={5}
                      spread={150}
                      direction="left"
                      yoyo={true}
                    />
                  </h2>
                  <p className="text-[#666666] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    Everything you need to know about joining, contributing, and
                    growing at The CodeVerse Hub.
                  </p>
                </div>

                <div className="divide-y divide-[#1a1a1a]">
                  {faqItems.map((item) => (
                    <details key={item.q} className="group py-5 cursor-pointer">
                      <summary className="flex items-center justify-between text-sm sm:text-base font-medium text-white hover:text-[#afafaf] transition-colors duration-150 list-none [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-3">
                          <HelpCircle className="w-4 h-4 text-[#22d3ee] shrink-0" />
                          {item.q}
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#666666] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 text-[0.8125rem] text-[#666666] leading-relaxed pl-7">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <Link
                    href="/pages/faq"
                    className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5"
                  >
                    View full FAQ
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Join CTA */}
        <ScrollReveal delay={650}>
          <JoinCTA />
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal delay={700}>
          <ContactSection />
        </ScrollReveal>
      </main>

      <ScrollReveal delay={750}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}

"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
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
import HeroBackground from "@/components/HeroBackground";
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
    a: "Learning & help channels, programming deep-dives, project showcase, code reviews, open-source guidance, voice events, study groups, and curated resources. It's built so you move from asking questions to shipping software.",
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
      {/* ─── HERO ──────────────────────────────────────── */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* 10-layer background */}
        <HeroBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main hero content */}
        <div className="relative z-10 w-full section-container py-28 md:py-0 flex flex-col items-center text-center">
          {/* Terminal badge */}
          <div className="relative mb-8 inline-flex items-center gap-2 px-4 py-1.5 border border-[#1a1a1a] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
            <span className="text-[0.6875rem] font-mono text-[#afafaf] tracking-wider">
              OPEN SOURCE COMMUNITY
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
              style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
            />
          </div>

          {/* Heading */}
          <h1 className="heading-xl text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] max-w-5xl">
            <ShinyText
              text="Write Code."
              shineColor="#ffffff"
              color="#ffffff"
              speed={4}
              spread={120}
              direction="left"
              yoyo={true}
              pauseOnHover={true}
            />
            <br />
            <span className="text-white">Review PRs.</span>
            <br />
            <ShinyText
              text="Ship"
              shineColor="#ffffff"
              color="#ffffff"
              speed={3}
              spread={90}
              direction="left"
              yoyo={true}
            />{" "}
            <span className="text-[#22d3ee]">Together.</span>
          </h1>

          {/* Expanded hero description */}
          <p className="text-[#666666] text-sm sm:text-base md:text-lg leading-relaxed max-w-[650px] mx-auto mt-8">
            The CodeVerse Hub isn&apos;t a &ldquo;learn to code&rdquo; server.
            We chat, connect and build real stuff. Discord bots, Linux distros,
            web apps, developer tools you name it. No tutorial hell. No fake
            projects. Just real GitHub repos, real pull requests, real code
            reviews, and real open-source. Whether you&apos;re shipping your
            first PR or reviewing everyone else&apos;s, there&apos;s a place for
            you. Build. Break things. Learn. Repeat.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
            <a
              href="https://discord.gg/3xKFvKhuGR"
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
              <span className="relative z-10">Join Discord</span>
            </a>
            <Link
              href="/projects"
              className="btn-secondary h-11 px-8 text-[0.8125rem]"
            >
              Browse Projects
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        {/*<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
          <span className="text-[0.625rem] text-[#666666] font-mono tracking-wider"></span>
          <ChevronDown className="w-3.5 h-3.5 text-[#666666]" />
        </div>*/}
      </header>

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

        {/* FAQ */}
        <ScrollReveal delay={600}>
          <section className="section-spacing" aria-labelledby="faq-heading">
            <div className="section-divider mb-0" />
            <div className="section-container pt-16 md:pt-20">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-14">
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

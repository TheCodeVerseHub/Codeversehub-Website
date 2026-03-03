"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import GradientBlinds from "@/components/GradientBlinds";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import ContactSection from "@/components/ContactSection";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import TechMarquee from "@/components/TechMarquee";
import TerminalWindow from "@/components/TerminalWindow";
import { ArrowRight, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0">
          <GradientBlinds
            gradientColors={["#060606", "#0f0f1f", "#13132b", "#0f3460", "#3a1a6e"]}
            angle={45}
            blindCount={14}
            noise={0.12}
            spotlightRadius={0.55}
            spotlightSoftness={1.4}
            spotlightOpacity={0.9}
            mixBlendMode="normal"
          />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-24 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left column ── */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              {/* Eyebrow badge */}
              <div className="flex items-center gap-2 w-fit">
                <span className="flex items-center gap-1.5 text-xs font-mono text-violet-300 bg-violet-500/10 border border-violet-500/25 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  1100+ coders already inside
                </span>
              </div>

              {/* Main headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
                  The place where
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  developers
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
                  actually grow.
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-white/55 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg">
                CodeVerse Hub is a Discord community built for programmers — code reviews, open source
                projects, 24/7 help, resources, and the people who get it.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                  href="https://discord.gg/3xKFvKhuGR"
                  target="_blank"
                  className="group relative flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(139,92,246,0.45)]"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea,#a855f7)" }}
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                  Join the Server — It&apos;s Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/resources"
                  className="group flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white/80 font-medium rounded-full hover:bg-white/8 hover:border-white/30 hover:text-white transition-all duration-300"
                >
                  Browse resources
                  <ArrowRight className="w-4 h-4 opacity-50 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white/40">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Active daily</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-violet-400" />
                  <span>10+ OSS projects</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-white/40">Free forever</span>
              </div>
            </div>

            {/* ── Right column — Terminal window ── */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <TerminalWindow />
            </div>
          </div>
        </div>

        {/* Bottom fade (visual only, allow clicks to pass through) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </section>

      {/* ─── FEATURES ────────────────────────────────────────────── */}
      <Features />

      {/* ─── TECH MARQUEE ───────────────────────────────────────── */}
      <TechMarquee />

      {/* ─── ABOUT ───────────────────────────────────────────────── */}
      <About />

      {/* ─── STATS ───────────────────────────────────────────────── */}
      <Stats />

      {/* ─── PROJECTS ────────────────────────────────────────────── */}
      <Projects />

      {/* ─── CONTACT ─────────────────────────────────────────────── */}
      <ContactSection />

      {/* ─── JOIN CTA ────────────────────────────────────────────── */}
      <JoinCTA />

      <Footer />
    </div>
  );
}

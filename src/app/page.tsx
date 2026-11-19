"use client";

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
import FAQ from "@/components/home/FAQ";
import JoinCTA from "@/components/home/JoinCTA";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

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
          <FAQ />
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

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyCard from "@/components/CaseStudyCard";
import { getCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | The CodeVerse Hub",
  description:
    "Deep-dive engineering case studies of The CodeVerse Hub's flagship projects — Discord bots, Linux distributions, a Wayland compositor, and the community website.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesIndex() {
  const studies = getCaseStudies();

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-16 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-150 text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <p className="cvh-label mb-4">Case Studies</p>
          <h1 className="heading-xl text-4xl md:text-5xl text-white mb-4 tracking-tight">
            How we build
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed">
            Deep-dive write-ups on the engineering behind our flagship
            projects. Every case study walks through the problem, the
            architecture, the trade-offs, and the lessons learned — the way we
            actually ship software at The CodeVerse Hub.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/projects"
              className="btn-primary h-10 px-6 text-[0.8125rem]"
            >
              <span className="relative z-10">Browse all projects</span>
            </Link>
            <a
              href="https://github.com/TheCodeVerseHub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-10 px-6 text-[0.8125rem]"
            >
              <Github className="w-4 h-4" />
              GitHub Organization
            </a>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>

        <div className="border-t border-[#1a1a1a] mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-sm text-white/40">
            Every project in our organization is open for contributions.
          </p>
          <Link
            href="/pages/contributing"
            className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5 ml-auto"
          >
            Read the contributing guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

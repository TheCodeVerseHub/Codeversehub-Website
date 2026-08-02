"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function JoinCTA() {
  return (
    <section className="section-spacing">
      <div className="section-divider mb-0" />
      <div className="section-container pt-16 md:pt-20">
        <div className="relative max-w-3xl mx-auto">
          <div className="relative border border-[#1a1a1a] bg-[#0a0a0a] p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

            <span className="relative z-10 section-label mb-6">Get Involved</span>
            <h2 className="relative z-10 heading-lg text-3xl sm:text-4xl md:text-5xl text-white mb-5 mt-5">
              Ready to <span className="text-[#22d3ee]">ship</span>?
            </h2>
            <p className="relative z-10 text-[#666666] text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10">
              No gatekeeping. No fake guru culture. Just developers building
              open-source software and helping each other improve.
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://discord.gg/3xKFvKhuGR"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary h-11 px-8 text-[0.8125rem] group"
              >
                <span className="relative z-10">Join Discord</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/projects"
                className="btn-secondary h-11 px-8 text-[0.8125rem]"
              >
                Browse projects
              </Link>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.75rem] text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#ffffff]" />
                No application required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#ffffff]" />
                All skill levels welcome
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#ffffff]" />
                Active 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import ShinyText from "@/components/ShinyText";
import { Rocket, Image as ImageIcon, Github, MessageCircle } from "lucide-react";
import { LINKS } from "@/lib/constants";

/**
 * Data shape for a community showcase card. Currently empty — populate from
 * a CMS, a Discord webhook, or a community form once available.
 */
interface Showcase {
  id: string;
  title: string;
  description: string;
  author: string;
  image?: string;
  github?: string;
  demo?: string;
  discordThread?: string;
  tech: string[];
}

const showcases: Showcase[] = [];

export default function CommunityShowcase() {
  return (
    <section className="section-spacing" aria-labelledby="showcase-heading">
      <div className="section-divider mb-0" />
      <div className="section-container pt-16 md:pt-20">
        <div className="text-center mb-14">
          <span className="section-label mb-6">Showcase</span>
          <h2
            id="showcase-heading"
            className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
          >
            <ShinyText
              text="Built by members"
              shineColor="#ffffff"
              color="#ffffff"
              speed={5}
              spread={150}
              direction="left"
              yoyo={true}
            />
          </h2>
          <p className="text-[#666666] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            What the community ships. Real projects, real people, real builds.
          </p>
        </div>

        {showcases.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {showcases.map((item) => (
              <article key={item.id} className="card p-6 group flex flex-col">
                <div className="aspect-[16/9] mb-4 border border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-white/20" />
                  )}
                </div>
                <h3 className="font-heading text-sm font-semibold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[0.8125rem] text-[#666666] leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[0.625rem] font-mono text-white/40 border border-white/[0.06] px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-[0.75rem] text-[#afafaf] mb-4">
                  by <span className="text-white">{item.author}</span>
                </p>
                <div className="flex items-center gap-3 border-t border-[#1a1a1a] pt-3">
                  {item.github && (
                    <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[0.75rem] text-white/50 hover:text-white transition-colors duration-150">
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                  )}
                  {item.demo && (
                    <a href={item.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[0.75rem] text-white/50 hover:text-white transition-colors duration-150">
                      <Rocket className="w-3.5 h-3.5" /> Demo
                    </a>
                  )}
                  {item.discordThread && (
                    <a href={item.discordThread} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[0.75rem] text-white/50 hover:text-white transition-colors duration-150">
                      <MessageCircle className="w-3.5 h-3.5" /> Thread
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Honest placeholder — no invented projects. */
          <div className="grid gap-4 sm:grid-cols-3 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="border border-dashed border-[#1a1a1a] p-8 flex flex-col items-center justify-center text-center min-h-[14rem]"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-4 border border-[#1a1a1a] bg-[rgba(255,255,255,0.03)]">
                  <ImageIcon className="w-5 h-5 text-white/20" />
                </div>
                <p className="text-sm text-white/40 font-medium">Your project here</p>
                <p className="text-[0.75rem] text-white/25 mt-1.5 leading-relaxed">
                  Showcases are coming soon. Built something with CVH? Share it
                  in the showcase channel.
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href={LINKS.DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary h-10 px-6 text-[0.8125rem]"
          >
            <MessageCircle className="w-4 h-4" />
            Share your build in #project-showcase
          </a>
        </div>
      </div>
    </section>
  );
}

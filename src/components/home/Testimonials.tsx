"use client";

import Image from "next/image";
import ShinyText from "@/components/ShinyText";
import { ExternalLink, MessageCircle, Quote } from "lucide-react";
import { LINKS } from "@/lib/constants";
import {
  testimonialSourceLinks,
  testimonials,
  type TestimonialEntry,
} from "@/components/home/testimonials-data";

function platformStyles(platform: TestimonialEntry["platform"]) {
  return platform === "Top.gg"
    ? "border-white/15 bg-white/5 text-white"
    : "border-[#1a1a1a] bg-[rgba(255,255,255,0.03)] text-[#afafaf]";
}

export default function Testimonials() {
  return (
    <section className="section-spacing" aria-labelledby="testimonials-heading">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="section-label mb-6">Testimonials</span>
          <h2
            id="testimonials-heading"
            className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
          >
            <ShinyText
              text="From the community"
              shineColor="#ffffff"
              color="#ffffff"
              speed={5}
              spread={150}
              direction="left"
              yoyo={true}
            />
          </h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((t, index) => (
              <figure
                key={t.id}
                className="card p-6 md:p-7 flex flex-col animate-testimonial-rise opacity-0"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <Image
                    src={t.avatarSource}
                    alt={`${t.username} profile picture`}
                    width={52}
                    height={52}
                    unoptimized
                    className="w-[52px] h-[52px] rounded-full border border-[#1a1a1a] bg-[#0a0a0a] shrink-0"
                    title={t.avatarNote}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <figcaption className="text-sm font-semibold text-white leading-none">
                        {t.username}
                      </figcaption>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.625rem] font-mono tracking-wider uppercase ${platformStyles(
                          t.platform,
                        )}`}
                      >
                        {t.platform}
                      </span>
                    </div>
                    <p className="text-[0.75rem] text-white/35 font-mono">
                      {t.dateLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#22d3ee] mb-4">
                  <Quote className="w-4 h-4 shrink-0" />
                  <span className="text-[0.75rem] font-mono uppercase tracking-wider text-[#22d3ee]/60">
                    Review
                  </span>
                </div>

                <blockquote className="text-[0.9375rem] text-white/80 leading-relaxed flex-1">
                  {t.review}
                </blockquote>

                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.6875rem] font-mono uppercase tracking-wider text-[#666666] hover:text-white transition-colors duration-150"
                >
                  View source
                  <ExternalLink className="w-3 h-3" />
                </a>
              </figure>
            ))}
          </div>
        ) : (
          /* Honest placeholder your words could be here. */
          <div className="max-w-2xl mx-auto border border-dashed border-[#1a1a1a] p-10 md:p-14 text-center">
            <Quote className="w-6 h-6 text-white/20 mx-auto mb-5" />
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              Testimonials are coming soon. Join the community, ship something,
              and tell us how it went your words could end up here.
            </p>
            <a
              href={LINKS.DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-10 px-6 text-[0.8125rem] mt-8"
            >
              <MessageCircle className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Join and be the first</span>
            </a>
          </div>
        )}

        <p className="text-center text-[0.8125rem] text-[#666666] mt-10">
          Reviews are sourced from our public{" "}
          <a
            href={testimonialSourceLinks.topgg}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#afafaf] transition-colors duration-150"
          >
            Top.gg
          </a>{" "}
          and{" "}
          <a
            href={testimonialSourceLinks.disboard}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#afafaf] transition-colors duration-150"
          >
            DISBOARD
          </a>{" "}
          listings.
        </p>
      </div>
    </section>
  );
}

"use client";

import ShinyText from "@/components/ShinyText";
import { Quote, MessageCircle } from "lucide-react";
import { LINKS } from "@/lib/constants";

/**
 * Real testimonials live here once we collect them (e.g. via a form or
 * Discord pins). We deliberately do NOT invent quotes.
 */
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [];

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
          <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <figure key={t.id} className="card p-7">
                <Quote className="w-5 h-5 text-[#22d3ee] mb-4" />
                <blockquote className="text-[0.9375rem] text-white/80 leading-relaxed mb-5">
                  {t.quote}
                </blockquote>
                <figcaption className="text-[0.8125rem] text-white font-medium">
                  {t.author}
                  <span className="block text-[0.75rem] text-white/30 mt-0.5">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          /* Honest placeholder — your words could be here. */
          <div className="max-w-2xl mx-auto border border-dashed border-[#1a1a1a] p-10 md:p-14 text-center">
            <Quote className="w-6 h-6 text-white/20 mx-auto mb-5" />
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              Testimonials are coming soon. Join the community, ship something,
              and tell us how it went — your words could end up here.
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
      </div>
    </section>
  );
}

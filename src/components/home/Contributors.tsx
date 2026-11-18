"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import contributors from "@/data/contributors.json";

export default function Contributors() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".cvh-contributor");
    if (!cards) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${Math.min(i, 20) * 0.03}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="cvh-contributors section-spacing" id="contributors" aria-labelledby="contributors-heading">
      <div className="section-container">
        <div className="cvh-contrib-head">
          <span className="cvh-mono-label">07 — Contributors</span>
          <h2 id="contributors-heading" className="cvh-section-title">
            The People <em>Behind Us</em>
          </h2>
          <p className="cvh-section-sub">
            Building a structured open-source ecosystem where developers learn, contribute, and
            create impactful software together.
          </p>
        </div>

        <div className="cvh-contributors-grid" ref={gridRef}>
          {contributors.map((person) => (
            <a
              key={person.login}
              className="cvh-contributor"
              href={person.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`${person.avatar_url}&s=128`}
                alt={person.login}
                width={64}
                height={64}
                loading="lazy"
                unoptimized
              />
              <b>{person.login}</b>
              <span>
                {person.contributions} contribution{person.contributions === 1 ? "" : "s"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

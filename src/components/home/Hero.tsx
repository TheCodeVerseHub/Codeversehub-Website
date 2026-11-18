"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const words = [
  "Real Software",
  "Linux Distros",
  "Discord Bots",
  "Wayland Compositors",
  "Developer Tools",
  "Developers",
];

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordPhase, setWordPhase] = useState<"idle" | "out" | "in">("idle");
  const [cardOpen, setCardOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const emblemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let flipTimer: number | undefined;
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      setWordPhase("out");
      flipTimer = window.setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setWordPhase("in");
      }, 350);
    }, 2400);
    return () => {
      window.clearInterval(interval);
      if (flipTimer) window.clearTimeout(flipTimer);
    };
  }, []);

  useEffect(() => {
    if (!cardOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCardOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cardOpen]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (cardOpen || !emblemRef.current) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      emblemRef.current.style.transform = `translate(${x * -18}px, ${y * -18}px) rotateX(${y * 6}deg) rotateY(${x * -6}deg)`;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [cardOpen]);

  return (
    <section className={`cvh-hero${ready ? " ready" : ""}`} id="home">
      <div className="cvh-hero-glow" />
      <div className="cvh-hero-inner">
        <div className="cvh-hero-left">
          <span className="cvh-tag reveal-hero">
            <i /> Community-driven open source
          </span>
          <h1 className="cvh-hero-title">
            <span className="line reveal-hero">Hi, we&apos;re CodeVerse.</span>
            <span className="line muted reveal-hero">We build</span>
          </h1>

          <div className="cvh-notepad reveal-hero" id="notepad">
            <div className="cvh-rings" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <div className="cvh-notepad-page">
              <span
                key={wordIndex}
                className={`cvh-notepad-word${
                  wordPhase === "out" ? " cvh-flip-out" : wordPhase === "in" ? " cvh-flip-in" : ""
                }`}
              >
                {words[wordIndex]}
              </span>
              <span className="cvh-notepad-index">
                {String(wordIndex + 1).padStart(2, "0")} / {String(words.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <p className="cvh-hero-sub reveal-hero">
            A community-driven open-source organization focused on building real-world projects,
            learning collaboratively, and growing developers at every level.
          </p>

          <div className="cvh-hero-cta reveal-hero">
            <a
              className="cvh-btn-cream"
              href="https://discord.gg/3xKFvKhuGR"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join us <span className="arrow">→</span>
            </a>
            <Link className="cvh-btn-dark" href="/projects">
              See our projects
            </Link>
          </div>
        </div>

        <div className="cvh-hero-right reveal-hero">
          <div className="cvh-emblem" ref={emblemRef}>
            <Image src="/logo.png" alt="The CodeVerse Hub logo" width={500} height={500} priority />
            <span className="cvh-chip chip-a">&lt;/&gt; open source</span>
            <span className="cvh-chip chip-b">rust · python · c</span>
            <span className="cvh-chip chip-c">16 repos</span>
          </div>
          <button className="cvh-ability-btn" type="button" onClick={() => setCardOpen(true)}>
            Our ability card
          </button>
        </div>
      </div>

      <div className="cvh-hero-bottom">
        <span>
          <i className="cvh-dot-live" /> Open for contributions
        </span>
        <span>Remote-first, worldwide</span>
        <Link href="/about">Scroll to explore ↓</Link>
      </div>

      {cardOpen &&
        createPortal(
          <div className="cvh-card-overlay open" role="dialog" aria-modal="true" aria-label="Our ability card">
            <div className="cvh-overlay-top">
              <div>
                <span className="cvh-overlay-brand">The CodeVerse Hub</span>
                <span className="cvh-overlay-sub">Ability card ✦</span>
              </div>
              <button className="cvh-close-btn" type="button" onClick={() => setCardOpen(false)}>
                ✕ Close
              </button>
            </div>
            <div className="cvh-card-stage">
              <div
                className={`cvh-tcard${flipped ? " flipped" : ""}`}
                onDoubleClick={() => setFlipped((v) => !v)}
              >
                <div className="cvh-tcard-face cvh-tcard-front">
                  <div className="cvh-card-frame">
                    <span className="cvh-corner tl" />
                    <span className="cvh-corner tr" />
                    <span className="cvh-corner bl" />
                    <span className="cvh-corner br" />
                    <div className="cvh-plate title-plate">The CodeVerse Hub</div>
                    <div className="cvh-portrait">
                      <Image src="/logo.png" alt="" width={200} height={200} />
                    </div>
                    <div className="cvh-plate sub-plate">Open-Source Organization</div>
                    <div className="cvh-stats">
                      <div><span>Open Source</span><i /><b>99</b></div>
                      <div><span>Linux &amp; Systems</span><i /><b>92</b></div>
                      <div><span>Bots &amp; Automation</span><i /><b>95</b></div>
                      <div><span>Web Development</span><i /><b>88</b></div>
                      <div><span>Community</span><i /><b>97</b></div>
                    </div>
                    <div className="cvh-card-foot">
                      <span><small>Base</small> Worldwide</span>
                      <span><small>Mode</small> Remote</span>
                      <span><small>Repos</small> 16+</span>
                    </div>
                  </div>
                  <div className="cvh-shine" />
                </div>
                <div className="cvh-tcard-face cvh-tcard-back">
                  <div className="cvh-card-frame back-frame">
                    <div className="cvh-back-emblem">{"{/}"}</div>
                    <div className="cvh-plate">Our Mission</div>
                    <p className="cvh-back-text">
                      Connect developers.
                      <br />
                      Build real software.
                      <br />
                      Grow through collaboration.
                    </p>
                    <div className="cvh-back-langs">Python · C · C++ · JS · TS · Go · Rust · Java</div>
                  </div>
                  <div className="cvh-shine" />
                </div>
              </div>
            </div>
            <div className="cvh-card-hint">Double-click to flip · Esc to close</div>
          </div>,
          document.body,
        )}
    </section>
  );
}

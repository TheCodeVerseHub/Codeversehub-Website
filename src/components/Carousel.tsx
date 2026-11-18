"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyOf: (item: T, index: number) => React.Key;
  ariaLabel: string;
  /** Use "four" for a four-card desktop view (defaults to three). */
  view?: "three" | "four";
}

/** Jump instantly, overriding the track's CSS `scroll-behavior: smooth`. */
function jumpTo(track: HTMLDivElement, left: number) {
  const previous = track.style.scrollBehavior;
  track.style.scrollBehavior = "auto";
  track.scrollTo({ left, behavior: "auto" });
  requestAnimationFrame(() => {
    track.style.scrollBehavior = previous;
  });
}

export default function Carousel<T>({
  items,
  renderItem,
  keyOf,
  ariaLabel,
  view = "three",
}: CarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".cvh-carousel-item");
    if (!track || !first) return;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = first.getBoundingClientRect().width + gap;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const nextPages = maxScroll > 0 ? Math.round(maxScroll / step) + 1 : 1;

    setPages(nextPages);
    setIndex(maxScroll > 0 ? Math.min(nextPages - 1, Math.round(track.scrollLeft / step)) : 0);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    const track = trackRef.current;
    track?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      track?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure, items.length]);

  const go = (direction: -1 | 1) => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".cvh-carousel-item");
    if (!track || !first) return;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = first.getBoundingClientRect().width + gap;
    if (!step) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const current = Math.round(track.scrollLeft / step);
    const last = maxScroll > 0 ? Math.round(maxScroll / step) : 0;

    // Wrap around at the edges instead of stopping there.
    if (direction === 1 && current >= last) {
      jumpTo(track, 0);
      return;
    }
    if (direction === -1 && current <= 0) {
      jumpTo(track, maxScroll);
      return;
    }

    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className={`cvh-carousel cvh-carousel--${view}`}>
      <div className="cvh-carousel-track" ref={trackRef} aria-label={ariaLabel} role="region" tabIndex={0}>
        {items.map((item, i) => (
          <div className="cvh-carousel-item" key={keyOf(item, i)}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
      <div className="cvh-carousel-controls">
        <button type="button" aria-label="Previous" onClick={() => go(-1)}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-mono text-[0.6875rem] text-white/40 tracking-wider">
          {String(index + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
        </span>
        <button type="button" aria-label="Next" onClick={() => go(1)}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

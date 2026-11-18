"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface InfiniteCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyOf: (item: T, index: number) => React.Key;
  ariaLabel: string;
  /** Milliseconds between automatic one-card steps. */
  interval?: number;
}

/**
 * Auto-flowing, seamless carousel. Three copies of the list are rendered; the
 * track starts on the middle copy and silently resets after a full cycle, so
 * stepping in either direction never hits an edge.
 */
export default function InfiniteCarousel<T>({
  items,
  renderItem,
  keyOf,
  ariaLabel,
  interval = 3200,
}: InfiniteCarouselProps<T>) {
  const count = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(count);
  const stepRef = useRef(0);
  const resetTimer = useRef<number | undefined>(undefined);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const applyTransform = useCallback((animated: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animated
      ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    track.style.transform = `translate3d(${-offsetRef.current * stepRef.current}px, 0, 0)`;
  }, []);

  const move = useCallback(
    (direction: -1 | 1) => {
      if (!count || !stepRef.current) return;
      offsetRef.current += direction;
      applyTransform(true);

      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => {
        let shifted = false;
        while (offsetRef.current >= count * 2) {
          offsetRef.current -= count;
          shifted = true;
        }
        while (offsetRef.current < count) {
          offsetRef.current += count;
          shifted = true;
        }
        if (shifted) {
          applyTransform(false);
          // Force the instant reposition to land before re-enabling motion.
          void trackRef.current?.offsetWidth;
          requestAnimationFrame(() => applyTransform(true));
        }
      }, 720);
    },
    [applyTransform, count],
  );

  useEffect(() => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".cvh-inf-item");
    if (!track || !first) return;

    const measure = () => {
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      stepRef.current = first.getBoundingClientRect().width + gap;
      applyTransform(false);
      setReady(true);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(first);
    return () => {
      observer.disconnect();
      window.clearTimeout(resetTimer.current);
    };
  }, [applyTransform, count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => move(1), interval);
    return () => window.clearInterval(id);
  }, [count, interval, move, paused]);

  if (!count) return null;

  const copies = [...items, ...items, ...items];

  return (
    <div
      className="cvh-inf-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="cvh-inf-viewport">
        <div
          className="cvh-inf-track"
          ref={trackRef}
          role="region"
          aria-label={ariaLabel}
          style={{ visibility: ready ? "visible" : "hidden" }}
        >
          {copies.map((item, i) => (
            <div
              className="cvh-inf-item"
              key={`${String(keyOf(item, i % count))}-${i}`}
              aria-hidden={i < count || i >= count * 2 ? true : undefined}
            >
              {renderItem(item, i % count)}
            </div>
          ))}
        </div>
      </div>
      <div className="cvh-inf-controls">
        <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
        <button type="button" aria-label="Next testimonial" onClick={() => move(1)}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

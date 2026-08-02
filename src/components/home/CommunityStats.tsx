"use client";

import { useEffect, useState } from "react";
import ShinyText from "@/components/ShinyText";
import { COMMUNITY } from "@/lib/constants";
import {
  fetchCommunitySnapshot,
  type CommunitySnapshot,
} from "@/lib/community";

interface StatCard {
  key: string;
  label: string;
  /** Value shown before/without live data. */
  fallback: string;
  /** Computed from the live snapshot when available. */
  live?: (s: CommunitySnapshot) => string;
  /** Human note displayed under the value. */
  note?: string;
  liveNote?: string;
}

const statCards: StatCard[] = [
  {
    key: "members",
    label: "Discord Members",
    fallback: COMMUNITY.MEMBER_COUNT,
    note: "community estimate",
    liveNote: "community estimate",
  },
  {
    key: "repositories",
    label: "Repositories",
    fallback: COMMUNITY.REPO_COUNT,
    live: (s) => s.stats?.repoCount?.toString() ?? COMMUNITY.REPO_COUNT,
    note: "public on GitHub",
    liveNote: "live from GitHub",
  },
  {
    key: "stars",
    label: "GitHub Stars",
    fallback: COMMUNITY.STAR_COUNT,
    live: (s) => s.stats?.totalStars?.toLocaleString() ?? COMMUNITY.STAR_COUNT,
    note: "across all repos",
    liveNote: "live from GitHub",
  },
  {
    key: "forks",
    label: "GitHub Forks",
    fallback: COMMUNITY.FORK_COUNT,
    live: (s) => s.stats?.totalForks?.toLocaleString() ?? COMMUNITY.FORK_COUNT,
    note: "across all repos",
    liveNote: "live from GitHub",
  },
  {
    key: "contributors",
    label: "Contributors",
    fallback: "—",
    live: (s) => s.stats?.contributorsCount?.toString() ?? "—",
    note: "counting soon",
    liveNote: "active contributors",
  },
  {
    key: "merged-prs",
    label: "Merged PRs",
    fallback: "—",
    live: (s) => s.stats?.mergedPrsCount?.toLocaleString() ?? "—",
    note: "counting soon",
    liveNote: "merged pull requests",
  },
  {
    key: "countries",
    label: "Countries",
    fallback: COMMUNITY.COUNTRY_COUNT,
    note: "community estimate",
    liveNote: "community estimate",
  },
  {
    key: "reviews",
    label: "Code Reviews",
    fallback: "—",
    note: "counting soon",
    liveNote: "counting soon",
  },
];

export default function CommunityStats() {
  const [snapshot, setSnapshot] = useState<CommunitySnapshot | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchCommunitySnapshot().then((s) => {
      if (!mounted) return;
      if (s?.stats) {
        setSnapshot(s);
        setLive(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="section-spacing" aria-labelledby="stats-heading">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="section-label mb-6">By the Numbers</span>
          <h2
            id="stats-heading"
            className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
          >
            <ShinyText
              text="Community Stats"
              shineColor="#ffffff"
              color="#ffffff"
              speed={5}
              spread={150}
              direction="left"
              yoyo={true}
            />
          </h2>
          <p className="text-[#666666] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {live
              ? "Live numbers pulled straight from our GitHub organization/Discord Server."
              : "Estimates while we wire up live data, GitHub stats load automatically."}
          </p>
          {live && (
            <p className="mt-3 inline-flex items-center gap-2 text-[0.6875rem] font-mono text-[#22d3ee] tracking-wider">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
              />
              LIVE ·{" "}
              {snapshot?.fetchedAt
                ? new Date(snapshot.fetchedAt).toLocaleTimeString()
                : "github"}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {statCards.map((stat) => {
            const value =
              live && stat.live && snapshot
                ? stat.live(snapshot)
                : stat.fallback;
            const isPlaceholder = value === "—";
            const note = live && stat.liveNote ? stat.liveNote : stat.note;
            return (
              <div
                key={stat.key}
                className="card p-6 md:p-8 text-center group cursor-default"
              >
                <span
                  className={`font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-none ${
                    stat.key === "members" ? "text-[#22d3ee]" : "text-white"
                  } ${isPlaceholder ? "opacity-40" : ""}`}
                >
                  {value}
                </span>
                <span className="block mt-3 text-[0.6875rem] text-[#666666] uppercase tracking-[0.12em] font-medium font-mono">
                  {stat.label}
                </span>
                <span className="block mt-1 text-[0.625rem] text-white/25 font-mono">
                  {note}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

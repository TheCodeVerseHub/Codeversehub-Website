"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  BadgeCheck,
  BookOpen,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Gamepad2,
  Globe,
  GraduationCap,
  MousePointerClick,
  Palette,
  PlayCircle,
  ScrollText,
  Search,
  Server,
  Shield,
  Smartphone,
  Terminal,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import type {
  Badge,
  Resource,
  ResourceCategory,
} from "@/lib/resources";
import { languages as initialLanguages } from "@/lib/resources/data/languages";

/* ── Logo images (existing assets) ───────────────────────────── */

function LogoImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-5 h-5"
      loading="lazy"
      width={20}
      height={20}
    />
  );
}

const logos: Record<string, ReactNode> = {
  python: <LogoImage src="/assets/logos/python.svg" alt="Python" />,
  rust: <LogoImage src="/assets/logos/rust.svg" alt="Rust" />,
  javascript: <LogoImage src="/assets/logos/javascript.svg" alt="JavaScript" />,
  cpp: <LogoImage src="/assets/logos/cpp.svg" alt="C++" />,
  java: <LogoImage src="/assets/logos/java.svg" alt="Java" />,
  go: <LogoImage src="/assets/logos/go.svg" alt="Go" />,
};

/* ── Category icons ──────────────────────────────────────────── */

const categoryIcons: Record<string, LucideIcon> = {
  languages: Code2,
  web: Globe,
  mobile: Smartphone,
  backend: Server,
  databases: Database,
  devops: Container,
  cloud: Cloud,
  "ai-ml": Brain,
  security: Shield,
  cs: GraduationCap,
  career: Briefcase,
  design: Palette,
  gamedev: Gamepad2,
  hardware: Cpu,
  science: Atom,
  linux: Terminal,
  productivity: Zap,
};

/* Sidebar display labels (known statically, since categories load lazily).
   Keep in sync with the `label` field in each data module. */
const categoryLabels: Record<string, string> = {
  languages: "Programming Languages",
  web: "Web Development",
  mobile: "Mobile Development",
  backend: "Backend",
  databases: "Databases",
  devops: "DevOps",
  cloud: "Cloud",
  "ai-ml": "AI & Machine Learning",
  security: "Cybersecurity",
  cs: "Computer Science",
  career: "Career & System Design",
  design: "Design",
  gamedev: "Game Development",
  hardware: "Hardware & Robotics",
  science: "Mathematics & Physics",
  linux: "Linux",
  productivity: "Productivity",
};

/* ── Lazy data loading ─────────────────────────────────────────
   Only the default category ships in the initial bundle; every
   other category is loaded on demand (and search pulls in the
   rest progressively). Keeps the page's JS footprint small.     */

const categoryLoaders: Record<string, () => Promise<ResourceCategory>> = {
  languages: () =>
    import("@/lib/resources/data/languages").then((m) => m.languages),
  web: () => import("@/lib/resources/data/web").then((m) => m.web),
  mobile: () => import("@/lib/resources/data/mobile").then((m) => m.mobile),
  backend: () => import("@/lib/resources/data/backend").then((m) => m.backend),
  databases: () =>
    import("@/lib/resources/data/databases").then((m) => m.databases),
  devops: () => import("@/lib/resources/data/devops").then((m) => m.devops),
  cloud: () => import("@/lib/resources/data/cloud").then((m) => m.cloud),
  "ai-ml": () => import("@/lib/resources/data/ai-ml").then((m) => m.aiMl),
  security: () => import("@/lib/resources/data/security").then((m) => m.security),
  cs: () => import("@/lib/resources/data/cs").then((m) => m.cs),
  career: () => import("@/lib/resources/data/career").then((m) => m.career),
  design: () => import("@/lib/resources/data/design").then((m) => m.design),
  gamedev: () => import("@/lib/resources/data/gamedev").then((m) => m.gameDev),
  hardware: () => import("@/lib/resources/data/hardware").then((m) => m.hardware),
  science: () => import("@/lib/resources/data/science").then((m) => m.science),
  linux: () => import("@/lib/resources/data/linux").then((m) => m.linux),
  productivity: () =>
    import("@/lib/resources/data/productivity").then((m) => m.productivity),
};

/* ── Badge styling (monochrome + subtle cyan accent) ─────────── */

const badgeStyles: Record<
  Badge,
  { icon: LucideIcon; className: string }
> = {
  Official: { icon: BadgeCheck, className: "border-white/30 text-white" },
  Community: { icon: Users, className: "border-white/10 text-white/60" },
  Interactive: {
    icon: MousePointerClick,
    className: "border-[#22d3ee]/40 text-[#22d3ee]",
  },
  "Video Course": { icon: PlayCircle, className: "border-white/10 text-white/60" },
  Documentation: {
    icon: FileText,
    className: "border-white/15 text-white/70",
  },
  Book: { icon: BookOpen, className: "border-white/10 text-white/60" },
  Practice: { icon: Code2, className: "border-white/10 text-white/60" },
  "Cheat Sheet": {
    icon: ScrollText,
    className: "border-white/15 text-white/70",
  },
};

const pillBase =
  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-white/[0.06]";

function BadgePill({ badge }: { badge: Badge }) {
  const style = badgeStyles[badge];
  const Icon = style.icon;
  return (
    <span className={`${pillBase} ${style.className}`}>
      <Icon className="w-2.5 h-2.5" aria-hidden="true" />
      {badge}
    </span>
  );
}

function MetaPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/[0.06] bg-white/[0.04] text-white/45">
      {children}
    </span>
  );
}

/* ── Resource card ───────────────────────────────────────────── */

interface ResourceCardProps {
  resource: Resource;
  contextLabel?: string;
}

function ResourceCard({ resource, contextLabel }: ResourceCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="cvh-card p-4 group flex flex-col"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-white text-sm group-hover:text-[#ffffff] transition-colors duration-150 leading-snug">
          {resource.title}
        </h4>
        <ExternalLink
          className="w-3.5 h-3.5 text-white/20 group-hover:text-[#ffffff] shrink-0 mt-0.5 transition-colors duration-150"
          aria-hidden="true"
        />
      </div>
      <p className="text-white/40 text-xs leading-relaxed mb-3">
        {resource.description}
      </p>
      <div className="mt-auto pt-1 flex flex-wrap items-center gap-1.5">
        {contextLabel && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/[0.08] bg-white/[0.03] text-white/50">
            {contextLabel}
          </span>
        )}
        <BadgePill badge={resource.badge} />
        <MetaPill>{resource.difficulty}</MetaPill>
        <MetaPill>{resource.access}</MetaPill>
      </div>
    </a>
  );
}

/* ── Searchable item shape ───────────────────────────────────── */

interface SearchItem {
  resource: Resource;
  categoryId: string;
  categoryLabel: string;
  subcategoryLabel: string;
}

const MAX_SEARCH_RESULTS = 100;

/* ── Page ────────────────────────────────────────────────────── */

export default function ResourcesPage() {
  const [activeId, setActiveId] = useState("languages");
  const [loaded, setLoaded] = useState<Record<string, ResourceCategory>>({
    languages: initialLanguages,
  });
  const [query, setQuery] = useState("");
  const loadingRef = useRef<Set<string>>(new Set());

  const loadCategory = useCallback(
    async (id: string) => {
      // `loaded` already contains the statically-imported default category,
      // so it is never fetched twice.
      if (loaded[id] || loadingRef.current.has(id)) return;
      loadingRef.current.add(id);
      try {
        const cat = await categoryLoaders[id]();
        setLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: cat }));
      } catch {
        // A transient chunk failure just leaves the category unloaded;
        // the user can retry by clicking the category again.
      } finally {
        loadingRef.current.delete(id);
      }
    },
    [loaded],
  );

  const selectCategory = useCallback(
    (id: string) => {
      setActiveId(id);
      setQuery("");
      void loadCategory(id);
    },
    [loadCategory],
  );

  // While searching, progressively pull in any not-yet-loaded categories.
  const isSearching = query.trim().length > 0;
  useEffect(() => {
    if (!isSearching) return;
    const unloaded = Object.keys(categoryLoaders).filter(
      (id) => !loaded[id] && !loadingRef.current.has(id),
    );
    unloaded.forEach((id) => void loadCategory(id));
  }, [isSearching, loaded, loadCategory]);

  const searchIndex = useMemo<SearchItem[]>(() => {
    return Object.values(loaded).flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.resources.map((resource) => ({
          resource,
          categoryId: cat.id,
          categoryLabel: cat.label,
          subcategoryLabel: sub.label,
        })),
      ),
    );
  }, [loaded]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    const matches = searchIndex.filter((item) => {
      const haystack = [
        item.resource.title,
        item.resource.description,
        item.resource.category,
        item.resource.difficulty,
        item.resource.access,
        item.resource.badge,
        item.categoryLabel,
        item.subcategoryLabel,
        ...item.resource.tags,
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
    return matches;
  }, [query, searchIndex]);

  const groupedResults = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of searchResults.slice(0, MAX_SEARCH_RESULTS)) {
      const list = map.get(item.categoryId) ?? [];
      list.push(item);
      map.set(item.categoryId, list);
    }
    return [...map.entries()];
  }, [searchResults]);

  const active = loaded[activeId];
  const ActiveIcon = categoryIcons[activeId] ?? Code2;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#ffffff] hover:text-[#ffffff] mb-8 transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Learning Resources
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl">
            Curated by the CodeVerse Hub community — pick a topic and dive in,
            or search the whole library below.
          </p>
        </div>

        {/* Search */}
        <div
          role="search"
          className="relative mb-10 max-w-2xl"
          aria-label="Search resources"
        >
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 500+ resources across every topic…"
            className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-colors duration-150"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-64 shrink-0" aria-label="Resource categories">
            <div className="lg:sticky lg:top-24 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {Object.keys(categoryLoaders).map((id) => {
                const Icon = categoryIcons[id] ?? Code2;
                const isActive = activeId === id && !isSearching;
                return (
                  <button
                    key={id}
                    onClick={() => selectCategory(id)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left whitespace-nowrap transition-all duration-150 ${
                      isActive
                        ? "bg-white/[0.08] text-white border border-white/[0.12]"
                        : "text-white/50 hover:text-white hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    <span className="p-1.5 rounded-lg bg-[#333333] text-white">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-sm">
                      {categoryLabels[id] ?? id}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          <main className="flex-1 min-w-0">
            {isSearching ? (
              /* ── Search results ─────────────────────────────── */
              <div>
                <div className="mb-6">
                  <p className="text-white/60 text-sm" role="status">
                    {searchResults.length === 0
                      ? "No results"
                      : `${Math.min(searchResults.length, MAX_SEARCH_RESULTS)}${
                          searchResults.length > MAX_SEARCH_RESULTS
                            ? ` of ${searchResults.length}`
                            : ""
                        } result${searchResults.length === 1 ? "" : "s"} for “${query.trim()}”`}
                  </p>
                  {searchResults.length > MAX_SEARCH_RESULTS && (
                    <p className="text-white/30 text-xs mt-1">
                      Showing the first {MAX_SEARCH_RESULTS} — refine your
                      search to narrow it down.
                    </p>
                  )}
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-10 rounded-xl border border-white/[0.08] bg-white/[0.02] text-center">
                    <p className="text-white/40 text-sm mb-2">
                      No resources match “{query.trim()}”.
                    </p>
                    <p className="text-white/30 text-xs">
                      Try a different term, a language name, or a topic like
                      “docker” or “algorithms”.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {groupedResults.map(([catId, items]) => {
                      const Icon = categoryIcons[catId] ?? Code2;
                      return (
                        <section key={catId}>
                          <h3 className="text-lg font-semibold text-white/80 mb-4 flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-[#333333] text-white">
                              <Icon className="w-4 h-4" aria-hidden="true" />
                            </span>
                            {items[0].categoryLabel}
                            <span className="text-white/30 text-xs font-normal">
                              {items.length}
                            </span>
                          </h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {items.map((item) => (
                              <ResourceCard
                                key={item.resource.url}
                                resource={item.resource}
                                contextLabel={item.subcategoryLabel}
                              />
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : !active ? (
              /* ── Category still loading ─────────────────────── */
              <div className="p-10 rounded-xl border border-white/[0.08] bg-white/[0.02] text-center">
                <p className="text-white/40 text-sm">Loading resources…</p>
              </div>
            ) : (
              /* ── Category view ──────────────────────────────── */
              <>
                <div className="mb-8 p-6 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 rounded-lg bg-[#333333] text-white">
                      <ActiveIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {active.label}
                    </h2>
                  </div>
                  <p className="text-white/50 text-sm">{active.description}</p>
                </div>

                <div className="space-y-10">
                  {active.subcategories.map((section) => (
                    <div key={section.id}>
                      <h3 className="text-lg font-semibold text-white/80 mb-4 flex items-center gap-2">
                        <div className="w-0.5 h-5 rounded-full bg-[#ffffff]" />
                        {logos[section.id] ?? (
                          <span className="w-5 h-5 rounded-md bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white/40">
                            {section.label.charAt(0)}
                          </span>
                        )}
                        {section.label}
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {section.resources.map((resource) => (
                          <ResourceCard key={resource.url} resource={resource} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-white/30 text-sm">
            This list is curated by the CodeVerse Hub community. Want to suggest
            a resource?{" "}
            <Link
              href="https://discord.gg/3xKFvKhuGR"
              target="_blank"
              className="text-[#ffffff] hover:text-[#ffffff] transition-colors duration-150"
            >
              Join our Discord
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

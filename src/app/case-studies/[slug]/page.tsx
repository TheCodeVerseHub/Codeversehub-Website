import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Target,
  Boxes,
  Sparkles,
  Cpu,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  GraduationCap,
  FileText,
} from "lucide-react";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getCaseStudies,
  getCaseStudy,
} from "@/lib/case-studies";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getCaseStudies().map((cs) => ({ slug: cs.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return { title: "Case Study Not Found | The Codeverse Hub" };
  }
  return {
    title: `${study.title} — Case Study | The Codeverse Hub`,
    description: study.description,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.description,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${study.title} — Case Study`,
      description: study.description,
    },
  };
}

/* ── Section shell ─────────────────────────────────────────── */
function Section({
  number,
  title,
  icon,
  children,
}: {
  number: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-16 md:mb-20" aria-labelledby={`section-${number}`}>
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-[0.6875rem] text-[#22d3ee] tracking-wider">
          {number}
        </span>
        <span className="w-8 h-px bg-[#22d3ee]/40" />
        <div className="flex items-center gap-2 text-[#afafaf]">
          <span aria-hidden="true">{icon}</span>
          <h2
            id={`section-${number}`}
            className="font-heading text-sm font-semibold text-white uppercase tracking-[0.14em]"
          >
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

/* ── Architecture ASCII block ───────────────────────────────── */
function ArchitectureBlock({ lines }: { lines: string[] }) {
  return (
    <div className="border border-[#1a1a1a] bg-[#090909] overflow-hidden mb-6">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a] bg-[rgba(255,255,255,0.02)]">
        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-white/15" />
        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-white/15" />
        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[0.625rem] text-white/30 tracking-wider">
          architecture.txt
        </span>
      </div>
      <pre className="font-mono text-[0.625rem] md:text-[0.6875rem] leading-relaxed text-white/60 px-4 py-5 overflow-x-auto whitespace-pre">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

/* ── Challenge / solution pair ──────────────────────────────── */
function ChallengePair({
  challenge,
  solution,
}: {
  challenge: string;
  solution: string;
}) {
  return (
    <div className="cvh-card mb-4">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center shrink-0 mt-0.5 border border-red-500/25 bg-red-500/[0.06]">
            <AlertTriangle className="w-3 h-3 text-red-400/80" />
          </span>
          <div>
            <p className="text-[0.625rem] font-mono text-white/30 tracking-wider uppercase mb-1">
              Challenge
            </p>
            <p className="text-sm text-white/80 leading-relaxed">{challenge}</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 border-t border-white/[0.05]">
        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center shrink-0 mt-0.5 border border-[#22d3ee]/25 bg-[#22d3ee]/[0.06]">
            <Lightbulb className="w-3 h-3 text-[#22d3ee]" />
          </span>
          <div>
            <p className="text-[0.625rem] font-mono text-white/30 tracking-wider uppercase mb-1">
              Solution
            </p>
            <p className="text-sm text-white/80 leading-relaxed">{solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const all = getCaseStudies();
  const index = all.findIndex((cs) => cs.slug === study.slug);
  const next = all[(index + 1) % all.length];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="relative border-b border-[#1a1a1a] bg-[#050505]">
        <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12 md:pb-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors duration-150"
            >
              <ArrowLeft className="w-3 h-3" />
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link
              href="/case-studies"
              className="text-white/40 hover:text-white transition-colors duration-150"
            >
              Case Studies
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70 truncate">{study.title}</span>
          </nav>

          <span className="cvh-label mb-5">{study.category} · Case Study</span>

          <h1 className="heading-xl text-4xl sm:text-5xl md:text-6xl text-white mb-5">
            {study.title}
          </h1>

          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
            {study.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-6">
            {study.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech.name}
                className="text-[0.6875rem] font-mono text-white/40 border border-white/[0.08] bg-[rgba(255,255,255,0.03)] px-2.5 py-1"
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href={study.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-10 px-6 text-[0.8125rem]"
            >
              <Github className="w-4 h-4 relative z-10" />
              <span className="relative z-10">View Source</span>
            </a>
            {study.links.homepage && (
              <a
                href={study.links.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-10 px-6 text-[0.8125rem]"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
            )}
            <Link
              href="/case-studies"
              className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5"
            >
              All case studies
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── BODY ─────────────────────────────────────────── */}
      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16 w-full">
        {/* Problem */}
        <Section number="01" title="Problem" icon={<Target className="w-4 h-4" />}>
          <div className="space-y-4">
            {study.problem.map((p, i) => (
              <p key={i} className="text-[0.9375rem] text-white/50 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* Goals */}
        <Section number="02" title="Goals" icon={<Target className="w-4 h-4" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {study.goals.map((goal) => (
              <div key={goal.title} className="cvh-card p-5">
                <h3 className="font-heading text-sm font-semibold text-white mb-2">
                  {goal.title}
                </h3>
                <p className="text-[0.8125rem] text-white/40 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Architecture */}
        <Section number="03" title="Architecture" icon={<Boxes className="w-4 h-4" />}>
          <ArchitectureBlock lines={study.architecture} />
          <p className="text-[0.9375rem] text-white/50 leading-relaxed mb-6">
            {study.systemDesign}
          </p>
          <div className="space-y-3">
            {study.stages.map((stage) => (
              <div key={stage.title} className="cvh-card p-5">
                <h3 className="font-mono text-[0.8125rem] font-semibold text-[#22d3ee] mb-1.5">
                  {stage.title}
                </h3>
                <p className="text-[0.8125rem] text-white/40 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Key Features */}
        <Section number="04" title="Key Features" icon={<Sparkles className="w-4 h-4" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {study.features.map((feature) => (
              <div key={feature.title} className="cvh-card p-5 group">
                <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#ffffff] transition-colors duration-150">
                  {feature.title}
                </h3>
                <p className="text-[0.8125rem] text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section number="05" title="Tech Stack" icon={<Cpu className="w-4 h-4" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {study.techStack.map((tech) => (
              <div
                key={tech.name}
                className="cvh-card p-5 flex items-start gap-4"
              >
                <span className="flex h-8 w-8 items-center justify-center shrink-0 border border-white/[0.06] bg-[rgba(255,255,255,0.03)] mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
                </span>
                <div>
                  <h3 className="font-mono text-[0.8125rem] font-semibold text-white mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-[0.75rem] text-white/40 leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Results */}
        <Section number="06" title="Results" icon={<BarChart3 className="w-4 h-4" />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04] mb-6">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="bg-[#0a0a0a] px-4 py-6 text-center">
                <div className="font-mono text-2xl md:text-3xl text-white leading-none">
                  {metric.value}
                </div>
                <div className="text-[0.625rem] text-white/30 mt-3 tracking-wider uppercase">
                  {metric.label}
                </div>
                {metric.sub && (
                  <div className="text-[0.625rem] text-white/20 mt-1">{metric.sub}</div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[0.9375rem] text-white/50 leading-relaxed">
            {study.results}
          </p>
        </Section>

        {/* Challenges & Trade-offs */}
        <Section
          number="07"
          title="Challenges & Trade-offs"
          icon={<AlertTriangle className="w-4 h-4" />}
        >
          {study.challenges.map((c, i) => (
            <ChallengePair key={i} challenge={c.challenge} solution={c.solution} />
          ))}
        </Section>

        {/* Implementation Highlights */}
        <Section
          number="08"
          title="Implementation Highlights"
          icon={<Lightbulb className="w-4 h-4" />}
        >
          <div className="space-y-3">
            {study.highlights.map((highlight) => (
              <div key={highlight.title} className="cvh-card p-5">
                <h3 className="text-sm font-semibold text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-[0.8125rem] text-white/40 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Lessons Learned */}
        <Section
          number="09"
          title="Lessons Learned"
          icon={<GraduationCap className="w-4 h-4" />}
        >
          <div className="space-y-3">
            {study.lessons.map((lesson, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-[0.6875rem] text-[#22d3ee] mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.9375rem] text-white/50 leading-relaxed">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer CTA */}
        <div className="border-t border-[#1a1a1a] pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/case-studies"
            className="btn-secondary h-11 px-6 text-[0.8125rem]"
          >
            <FileText className="w-4 h-4" />
            All Case Studies
          </Link>
          <a
            href={study.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-11 px-6 text-[0.8125rem]"
          >
            <Github className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Contribute on GitHub</span>
          </a>
          <Link
            href={`/case-studies/${next.slug}`}
            className="ml-auto inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-150 group"
          >
            Next case study
            <span className="font-semibold text-white">{next.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

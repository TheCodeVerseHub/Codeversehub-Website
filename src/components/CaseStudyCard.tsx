import Link from "next/link";
import {
  ArrowRight,
  Github,
  FileText,
} from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyCard({
  study,
  showMetrics = true,
}: {
  study: CaseStudy;
  showMetrics?: boolean;
}) {
  return (
    <article className="cvh-card p-6 flex flex-col group">
      {/* Category + title */}
      <div className="mb-4">
        <span className="cvh-label mb-3">{study.category}</span>
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#ffffff] transition-colors duration-150">
          {study.title}
        </h3>
      </div>

      <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">
        {study.description}
      </p>

      {/* Metrics */}
      {showMetrics && (
        <div className="grid grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04] mb-5">
          {study.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label} className="bg-[#0a0a0a] px-3 py-2.5">
              <div className="font-mono text-lg text-white leading-none">
                {metric.value}
              </div>
              <div className="text-[0.625rem] text-white/30 mt-1.5 tracking-wide uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {study.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech.name}
            className="text-[0.625rem] font-mono text-white/40 border border-white/[0.06] bg-white/[0.03] px-2 py-0.5"
          >
            {tech.name}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 border-t border-white/[0.05] pt-4">
        <Link
          href={`/case-studies/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-white hover:text-[#afafaf] transition-colors duration-150"
        >
          <FileText className="w-3.5 h-3.5" />
          Case Study
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={study.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/40 hover:text-[#ffffff] transition-colors duration-150 ml-auto"
        >
          <Github className="w-3.5 h-3.5" />
          Source
        </a>
      </div>
    </article>
  );
}

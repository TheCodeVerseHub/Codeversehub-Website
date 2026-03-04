import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Info,
  ScrollText,
  Shield,
  Tag,
  Users,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const pages = [
  {
    slug: "rules",
    title: "Server Rules",
    description: "What is and isn’t allowed in CodeVerse Hub.",
    icon: Shield,
  },
  {
    slug: "faq",
    title: "Frequently Asked Questions",
    description: "Quick answers about roles, bots, events, and support.",
    icon: HelpCircle,
  },
  {
    slug: "server-info",
    title: "Server Information",
    description: "Overview of roles, tooling, and server setup.",
    icon: Info,
  },
  {
    slug: "how-to-ask",
    title: "How to Ask for Help",
    description: "Best practices for posting questions and getting good answers.",
    icon: QuestionCircleIcon,
  },
  {
    slug: "how-to-help",
    title: "How to Help Others",
    description: "Guidelines for giving feedback, mentoring, and reviewing code.",
    icon: Users,
  },
  {
    slug: "tags",
    title: "Tags Reference",
    description: "Common tags and snippets used around the server.",
    icon: Tag,
  },
  {
    slug: "resources",
    title: "Learning Resources",
    description: "Curated links, docs, and tools to continue learning.",
    icon: BookOpen,
  },
  {
    slug: "staff-roles",
    title: "Staff Roles & Structure",
    description: "How the staff team is organised and what each role does.",
    icon: Users,
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    description: "Community standards for respectful, inclusive behaviour.",
    icon: ScrollText,
  },
];

function QuestionCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 15a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 17Zm1.6-6.35-.74.6A1.79 1.79 0 0 0 12.2 12a.75.75 0 0 1-1.5 0 3.28 3.28 0 0 1 1.19-2.5l.93-.77A1.49 1.49 0 0 0 13.5 7a1.5 1.5 0 0 0-3 0 .75.75 0 0 1-1.5 0 3 3 0 0 1 6 0 3 3 0 0 1-1.4 2.65Z"
      />
    </svg>
  );
}

export default function PagesIndex() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-16">
        <header className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-violet-300/70 mb-2">
            Docs
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Pages</h1>
          <p className="text-sm md:text-base text-white/50 max-w-2xl">
            Browse all server guides and reference pages in one place. Pick a
            topic below to jump into the detailed documentation.
          </p>
        </header>

        <section className="grid gap-4 md:gap-5">
          {pages.map(({ slug, title, description, icon: Icon }) => (
            <Link
              key={slug}
              href={`/pages/${slug}`}
              className="group block rounded-2xl border border-white/10 bg-white/5/5 hover:bg-white/5 hover:border-violet-500/40 transition-colors duration-200 px-4 py-4 md:px-6 md:py-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/15 text-violet-300 group-hover:bg-violet-500/25 group-hover:text-violet-200 transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
                <h2 className="text-lg md:text-xl font-semibold text-white group-hover:text-violet-50">
                  {title}
                </h2>
              </div>
              <p className="text-sm md:text-base text-white/55">
                {description}
              </p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

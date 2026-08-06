import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllContentPages } from "@/lib/content-pages";
import { contentIcons, FallbackContentIcon } from "@/lib/content-icons";

export default function PagesIndex() {
  const pages = getAllContentPages();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-16">
        <header className="mb-10">
          <p className="cvh-label mb-4">Docs</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Pages
          </h1>
          <p className="text-sm md:text-base text-white/50 max-w-2xl">
            Browse all server guides and reference pages in one place. Pick a
            topic below to jump into the detailed documentation.
          </p>
        </header>

        <section className="grid gap-3 md:gap-4">
          {pages.map(({ slug, title, description, icon }) => {
            const Icon = contentIcons[icon] ?? FallbackContentIcon;
            return (
              <Link
                key={slug}
                href={`/pages/${slug}`}
                className="cvh-card px-5 py-4 md:px-6 md:py-5 group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(255,255,255,0.06)] text-white group-hover:bg-[rgba(255,255,255,0.1)] group-hover:text-white transition-colors duration-150">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#ffffff] transition-colors duration-150">
                    {title}
                  </h2>
                </div>
                <p className="text-sm md:text-base text-white/50">
                  {description}
                </p>
              </Link>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
}

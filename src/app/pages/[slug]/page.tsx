import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import type { Metadata } from "next";
import {
    ArrowLeft,
    Shield,
    BookOpen,
    ScrollText,
    HelpCircle,
    MessageCircleQuestion,
    Users,
    FileText,
    Heart,
    Lock,
    AlertTriangle,
    Info,
    Tag,
    Gavel,
    HandHeart,
    Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import DocSidebar from "./DocSidebar";

const contentDirectory = path.join(process.cwd(), "content", "pages");

const iconMap: Record<string, LucideIcon> = {
    shield: Shield,
    "book-open": BookOpen,
    "scroll-text": ScrollText,
    "help-circle": HelpCircle,
    "message-circle-question": MessageCircleQuestion,
    users: Users,
    "file-text": FileText,
    heart: Heart,
    lock: Lock,
    "alert-triangle": AlertTriangle,
    info: Info,
    tag: Tag,
    gavel: Gavel,
    "hand-heart": HandHeart,
    calendar: Calendar,
};

export async function generateStaticParams() {
    const files = fs.readdirSync(contentDirectory);
    return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({
            slug: file.replace(/\.md$/, ""),
        }));
}

interface TocItem {
    id: string;
    text: string;
    level: number;
}

function extractToc(htmlContent: string): { toc: TocItem[]; processedHtml: string } {
    const toc: TocItem[] = [];
    const processedHtml = htmlContent.replace(
        /<h([23])>(.*?)<\/h[23]>/gi,
        (_match, level, text) => {
            const cleanText = text.replace(/<[^>]*>/g, "").trim();
            const id = cleanText
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "");
            toc.push({ id, text: cleanText, level: parseInt(level) });
            return `<h${level} id="${id}">${text}</h${level}>`;
        }
    );
    return { toc, processedHtml };
}

async function getPageContent(slug: string | undefined) {
    if (!slug) {
        return null;
    }

    const fullPath = path.join(contentDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const processedContent = await remark().use(html).process(content);
        const rawHtml = processedContent.toString();
        const { toc, processedHtml } = extractToc(rawHtml);

        return {
            slug,
            title: data.title || slug.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
            description: data.description || "",
            icon: data.icon || "",
            lastUpdated: data.lastUpdated || "",
            contentHtml: processedHtml,
            toc,
        };
    } catch (error) {
        console.error(`Error loading content page for slug "${slug}":`, error);
        return null;
    }
}

interface PageProps {
    params: Promise<{ slug?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPageContent(slug);

    if (!page) {
        return {
            title: "Page Not Found | The Codeverse Hub",
            description: "The page you are looking for could not be found on The Codeverse Hub.",
        };
    }

    const title = `${page.title} | The Codeverse Hub`;
    const description =
        page.description || "Guides and documentation from The Codeverse Hub community.";

    return {
        title,
        description,
        alternates: {
            canonical: `/pages/${page.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `/pages/${page.slug}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function ContentPage({ params }: PageProps) {
    const { slug } = await params;
    const page = await getPageContent(slug);

    if (!page) {
        return (
            <div className="min-h-screen bg-black flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
                        <Link href="/" className="text-violet-400 hover:text-violet-300">
                            Return Home
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const IconComponent = page.icon ? iconMap[page.icon] : null;

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />
            <div className="flex-1 max-w-7xl mx-auto px-4 py-16">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <nav
                        aria-label="Breadcrumb"
                        className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-white/40"
                    >
                        <Link
                            href="/pages"
                            className="text-violet-300 hover:text-violet-200 font-medium transition-colors"
                        >
                            Pages
                        </Link>
                        <span className="text-white/30">/</span>
                        <span className="text-white/70 truncate">
                            {page.title}
                        </span>
                    </nav>
                </div>

                <div className="doc-layout">
                    {page.toc.length > 0 && (
                        <DocSidebar toc={page.toc} />
                    )}

                    <article className="doc-content min-w-0">
                        <div className="doc-header mb-10">
                            <div className="flex items-start gap-4">
                                {IconComponent && (
                                    <div className="doc-icon-badge flex-shrink-0">
                                        <IconComponent className="w-7 h-7 text-violet-400" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                        {page.title}
                                    </h1>
                                    {page.description && (
                                        <p className="text-white/50 text-lg mt-3 leading-relaxed">
                                            {page.description}
                                        </p>
                                    )}
                                    {page.lastUpdated && (
                                        <div className="flex items-center gap-2 mt-4 text-white/30 text-sm">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>Last updated {page.lastUpdated}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="doc-header-divider mt-8" />
                        </div>

                        <div
                            className="content-body text-white/80 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-white/5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-white/90 [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2 [&_a]:text-violet-400 [&_a]:underline [&_a:hover]:text-violet-300 [&_strong]:text-white [&_strong]:font-semibold [&_code]:bg-white/10 [&_code]:px-2 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-violet-300 [&_code]:text-sm [&_pre]:bg-white/5 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-white/5 [&_blockquote]:border-l-4 [&_blockquote]:border-violet-500 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_blockquote]:bg-violet-500/5 [&_blockquote]:rounded-r-lg [&_blockquote]:pr-4 [&_hr]:border-white/10 [&_hr]:my-8"
                            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
                        />
                    </article>
                </div>
            </div>
            <Footer />
        </div>
    );
}

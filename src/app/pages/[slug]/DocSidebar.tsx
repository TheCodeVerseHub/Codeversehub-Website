"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List } from "lucide-react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface DocSidebarProps {
    toc: TocItem[];
}

const pagesNav = [
    { href: "/pages/rules", label: "Rules" },
    { href: "/pages/faq", label: "FAQ" },
    { href: "/pages/server-info", label: "Server Info" },
    { href: "/pages/how-to-ask", label: "How to Ask" },
    { href: "/pages/how-to-help", label: "How to Help" },
    { href: "/pages/join", label: "Join Guide" },
    { href: "/pages/contributing", label: "Contributing" },
    { href: "/pages/moderation-guide", label: "Moderation Guide" },
    { href: "/pages/code-of-conduct", label: "Code of Conduct" },
    { href: "/pages/privacy-policy", label: "Privacy Policy" },
    { href: "/pages/security-notice", label: "Security Notice" },
    { href: "/pages/tags", label: "Tags Reference" },
    { href: "/pages/acknowledgements", label: "Acknowledgements" },
];

export default function DocSidebar({ toc }: DocSidebarProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: "-80px 0px -70% 0px", threshold: 0.1 }
        );

        toc.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [toc]);

    const handleClick = (id: string) => {
        setActiveId(id);
        setIsOpen(false);
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="doc-sidebar-toggle lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/25 hover:bg-violet-500 transition-colors"
                aria-label="Table of Contents"
            >
                <List className="w-5 h-5" />
            </button>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`doc-sidebar ${isOpen ? "doc-sidebar-open" : ""}`}
            >
                <div className="doc-sidebar-inner">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <List className="w-4 h-4 text-violet-400" />
                        <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                            Docs navigation
                        </span>
                    </div>
                    <nav className="space-y-6 text-sm">
                        <div>
                            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-2">
                                All pages
                            </p>
                            <ul className="space-y-1">
                                {pagesNav.map((page) => (
                                    <li key={page.href}>
                                        <Link
                                            href={page.href}
                                            className="block w-full text-left text-white/70 hover:text-white hover:bg-white/5 rounded-md px-2 py-1.5 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {page.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {toc.length > 0 && (
                            <div>
                                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-2">
                                    On this page
                                </p>
                                <ul className="space-y-1">
                                    {toc.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => handleClick(item.id)}
                                                className={`doc-toc-item ${item.level === 3 ? "doc-toc-sub" : ""} ${activeId === item.id ? "doc-toc-active" : ""}`}
                                            >
                                                {item.text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </nav>
                </div>
            </aside>
        </>
    );
}

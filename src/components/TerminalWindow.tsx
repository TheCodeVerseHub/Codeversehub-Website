"use client";

import { useEffect, useState, useRef } from "react";

const snippets = [
    {
        lang: "python",
        label: "Python",
        color: "#3B82F6",
        lines: [
            { text: "# Welcome to CodeVerse Hub!", type: "comment" },
            { text: "def join_community(developer):", type: "code" },
            { text: '    skills = developer["skills"]', type: "code" },
            { text: '    return f"Welcome, {developer[\'name\']}! 🚀"', type: "code" },
            { text: "", type: "blank" },
            { text: "me = {", type: "code" },
            { text: '    "name": "your_username",', type: "code" },
            { text: '    "skills": ["Python", "JS", "Rust"]', type: "code" },
            { text: "}", type: "code" },
            { text: "print(join_community(me))", type: "code" },
            { text: "# → Welcome, your_username! 🚀", type: "output" },
        ],
    },
    {
        lang: "typescript",
        label: "TypeScript",
        color: "#8B5CF6",
        lines: [
            { text: "// CodeVerse Hub — Build together", type: "comment" },
            { text: "interface Developer {", type: "code" },
            { text: "  name: string;", type: "code" },
            { text: "  stack: string[];", type: "code" },
            { text: "  community: 'CodeVerse Hub';", type: "code" },
            { text: "}", type: "code" },
            { text: "", type: "blank" },
            { text: "const you: Developer = {", type: "code" },
            { text: '  name: "awesome_dev",', type: "code" },
            { text: '  stack: ["React", "Node", "TS"],', type: "code" },
            { text: '  community: "CodeVerse Hub"', type: "code" },
            { text: "};", type: "code" },
        ],
    },
    {
        lang: "rust",
        label: "Rust",
        color: "#F97316",
        lines: [
            { text: "// Blazingly fast community 🦀", type: "comment" },
            { text: "struct Developer {", type: "code" },
            { text: "    name: String,", type: "code" },
            { text: "    joined_cvh: bool,", type: "code" },
            { text: "}", type: "code" },
            { text: "", type: "blank" },
            { text: "fn main() {", type: "code" },
            { text: "    let dev = Developer {", type: "code" },
            { text: '        name: String::from("you"),', type: "code" },
            { text: "        joined_cvh: true,", type: "code" },
            { text: "    };", type: "code" },
            { text: '    println!("Hello, {}!", dev.name);', type: "code" },
            { text: "}", type: "code" },
        ],
    },
];

function getColor(type: string, lang: string) {
    if (type === "comment") return "text-white/30 italic";
    if (type === "output") return "text-emerald-400";
    if (lang === "python") return "text-blue-200";
    if (lang === "typescript") return "text-violet-200";
    if (lang === "rust") return "text-orange-200";
    return "text-slate-200";
}

export default function TerminalWindow() {
    const [snippetIdx, setSnippetIdx] = useState(0);
    const [visibleLines, setVisibleLines] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const snippet = snippets[snippetIdx];

    useEffect(() => {
        setVisibleLines(0);
        setCharIdx(0);
        setDisplayedLines([]);
    }, [snippetIdx]);

    useEffect(() => {
        if (visibleLines >= snippet.lines.length) {
            // Pause then move to next snippet
            const timeout = setTimeout(() => {
                setSnippetIdx((prev) => (prev + 1) % snippets.length);
            }, 2800);
            return () => clearTimeout(timeout);
        }

        const currentLine = snippet.lines[visibleLines];
        const fullText = currentLine.text;

        if (charIdx <= fullText.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            const delay = currentLine.type === "blank" ? 80 : 18;
            intervalRef.current = setInterval(() => {
                setCharIdx((prev) => {
                    if (prev >= fullText.length) {
                        clearInterval(intervalRef.current!);
                        setDisplayedLines((lines) => [...lines, fullText]);
                        setVisibleLines((v) => v + 1);
                        setCharIdx(0);
                        return 0;
                    }
                    return prev + 1;
                });
            }, delay);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [visibleLines, snippet]);

    const currentLineText =
        visibleLines < snippet.lines.length
            ? snippet.lines[visibleLines].text.slice(0, charIdx)
            : null;

    return (
        <div className="relative w-full max-w-lg">
            {/* Glow effect behind terminal */}
            <div
                className="absolute inset-0 rounded-2xl blur-3xl opacity-20 transition-all duration-1000"
                style={{ backgroundColor: snippet.color }}
            />

            {/* Terminal window */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="flex-1 flex items-center justify-center gap-2">
                        <span
                            className="text-xs font-mono px-3 py-0.5 rounded-full"
                            style={{ backgroundColor: snippet.color + "22", color: snippet.color }}
                        >
                            {snippet.label}
                        </span>
                    </div>
                    <div className="flex gap-1.5">
                        {snippets.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setSnippetIdx(i)}
                                className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono cursor-pointer transition-all duration-200 hover:opacity-100"
                                style={{
                                    backgroundColor: i === snippetIdx ? s.color + "30" : "rgba(255,255,255,0.07)",
                                    color: i === snippetIdx ? s.color : "rgba(255,255,255,0.35)",
                                    border: `1px solid ${i === snippetIdx ? s.color + "60" : "transparent"}`,
                                    opacity: i === snippetIdx ? 1 : 0.7,
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: i === snippetIdx ? s.color : "rgba(255,255,255,0.3)" }}
                                />
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Code area */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed min-h-[280px] sm:min-h-[320px]">
                    {displayedLines.map((line, i) => {
                        const lineData = snippet.lines[i];
                        return (
                            <div key={i} className="flex gap-3">
                                <span className="text-white/20 select-none w-5 text-right shrink-0">
                                    {i + 1}
                                </span>
                                <span className={getColor(lineData?.type ?? "code", snippet.lang)}>
                                    {line || "\u00A0"}
                                </span>
                            </div>
                        );
                    })}
                    {currentLineText !== null && (
                        <div className="flex gap-3">
                            <span className="text-white/20 select-none w-5 text-right shrink-0">
                                {displayedLines.length + 1}
                            </span>
                            <span className={getColor(snippet.lines[visibleLines]?.type ?? "code", snippet.lang)}>
                                {currentLineText}
                                <span className="animate-pulse inline-block w-2 h-4 bg-white/70 ml-0.5 align-middle" />
                            </span>
                        </div>
                    )}
                </div>

                {/* Bottom bar */}
                <div className="px-5 py-2 border-t border-white/10 flex items-center gap-3 bg-white/3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/40 text-xs font-mono">cvh ~ dev session</span>
                    <span className="ml-auto text-white/20 text-xs font-mono">1100+ members online</span>
                </div>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import FuzzyText from "@/components/FuzzyText";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

            <main id="main-content" tabIndex={-1} className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4">
                    <FuzzyText
                        fontSize="clamp(5rem, 15vw, 12rem)"
                        fontWeight={900}
                        color="#8b5cf6"
                        baseIntensity={0.3}
                        hoverIntensity={0.8}
                        enableHover={true}
                        fuzzRange={40}
                        glitchMode={true}
                        glitchInterval={3000}
                        glitchDuration={300}
                    >
                        404
                    </FuzzyText>
                </div>

                <p className="text-white/50 text-lg mb-2 font-medium">
                    bro typed a whole URL and it doesn&apos;t even exist 💀
                </p>

                <p className="text-white/25 text-sm mb-10">
                    this page left and never came back 🥀
                </p>

                <Link
                    href="/"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 hover:bg-violet-600/20 hover:border-violet-500/30 hover:text-violet-300 transition-all duration-300"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">go back before it gets worse</span>
                </Link>
            </main>
            <p className="text-white/15 text-xs mt-12 font-mono">
                exit code: 1 — segfault in page_loader.c at 0xDUMMY
            </p>
        </div>
    );
}


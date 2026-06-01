"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { CheckCircle, Send } from "lucide-react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function BanAppealPage() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.status === "submitting") return;

    setState({ status: "submitting" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      discordUsername: String(formData.get("discordUsername") || "").trim(),
      discordUserId: String(formData.get("discordUserId") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      banReason: String(formData.get("banReason") || "").trim(),
      appeal: String(formData.get("appeal") || "").trim(),
      evidenceLink: String(formData.get("evidenceLink") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    try {
      const res = await fetch("/api/ban-appeal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setState({
          status: "error",
          message: data?.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setState({ status: "success" });
      form.reset();
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
            Ban{" "}
            <GradientText
              colors={["#8B5CF6", "#EC4899", "#8B5CF6"]}
              className="inline"
            >
              Appeal
            </GradientText>
          </h1>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            Fill out the form below. After you submit, it will be sent to our
            moderation team for review.
          </p>
        </header>

        <section className="w-full max-w-3xl mx-auto">
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5">
            {state.status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Appeal submitted
                </h2>
                <p className="text-white/50">
                  Thanks — your appeal was sent to the team.
                </p>
                <button
                  type="button"
                  onClick={() => setState({ status: "idle" })}
                  className="mt-6 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Submit another appeal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot (spam protection). Keep hidden. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div>
                  <label
                    htmlFor="discordUsername"
                    className="block text-white/70 text-sm mb-2"
                  >
                    Discord username
                  </label>
                  <input
                    type="text"
                    id="discordUsername"
                    name="discordUsername"
                    required
                    placeholder="e.g. aditya or aditya#1234"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="discordUserId"
                    className="block text-white/70 text-sm mb-2"
                  >
                    Discord user ID (optional)
                  </label>
                  <input
                    type="text"
                    id="discordUserId"
                    name="discordUserId"
                    inputMode="numeric"
                    placeholder="e.g. 123456789012345678"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/70 text-sm mb-2">
                    Email (optional) [May Share Ban Appeal Status]
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="banReason"
                    className="block text-white/70 text-sm mb-2"
                  >
                    Why do you think you were banned? (optional)
                  </label>
                  <input
                    type="text"
                    id="banReason"
                    name="banReason"
                    placeholder="If you know, summarize it"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appeal"
                    className="block text-white/70 text-sm mb-2"
                  >
                    Your appeal
                  </label>
                  <textarea
                    id="appeal"
                    name="appeal"
                    rows={6}
                    required
                    placeholder="Explain what happened, what you’ll do differently, and why you should be unbanned."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="evidenceLink"
                    className="block text-white/70 text-sm mb-2"
                  >
                    Evidence link (optional)
                  </label>
                  <input
                    type="url"
                    id="evidenceLink"
                    name="evidenceLink"
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  />
                </div>

                {state.status === "error" ? (
                  <p className="text-sm text-red-400">{state.message}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={state.status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {state.status === "submitting" ? "Submitting..." : "Submit appeal"}
                </button>

                <p className="text-xs text-white/35 leading-relaxed">
                  This form is sent to the moderation team via Discord webhook.
                  Don&apos;t include passwords or sensitive info.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

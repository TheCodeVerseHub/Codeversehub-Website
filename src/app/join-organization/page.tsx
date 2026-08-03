import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ShinyText from "@/components/ShinyText";
import JoinOrganizationForm from "@/components/join-organization/JoinOrganizationForm";
import { Github, Users2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Join GitHub Organization | The CodeVerse Hub",
  description:
    "Apply to join The CodeVerse Hub GitHub Organization and contribute to our open-source projects, reviews, docs, testing, and engineering culture.",
  alternates: {
    canonical: "/join-organization",
  },
  openGraph: {
    title: "Join GitHub Organization | The CodeVerse Hub",
    description:
      "Apply to join The CodeVerse Hub GitHub Organization and contribute to our open-source projects, reviews, docs, testing, and engineering culture.",
    url: "/join-organization",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Join GitHub Organization | The CodeVerse Hub",
    description:
      "Apply to join The CodeVerse Hub GitHub Organization and contribute to our open-source projects.",
  },
};

const highlights = [
  {
    icon: Github,
    title: "Open-source contribution",
    description:
      "Work on real repositories that ship to users and help shape the org's direction.",
  },
  {
    icon: Users2,
    title: "Collaborative membership",
    description:
      "Join developers who review, build, document, test, and improve projects together.",
  },
  {
    icon: ShieldCheck,
    title: "Manual review",
    description:
      "Every application is reviewed by the team. Submission does not guarantee acceptance.",
  },
];

export default function JoinOrganizationPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="section-spacing pt-28 md:pt-32">
          <div className="section-container">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal delay={50}>
                <div className="text-center max-w-3xl mx-auto">
                  <span className="section-label mb-6">Applications</span>
                  <h1 className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-5 mt-5">
                    <ShinyText
                      text="Join The CodeVerse Hub"
                      shineColor="#ffffff"
                      color="#ffffff"
                      speed={5}
                      spread={150}
                      direction="left"
                      yoyo={true}
                    />
                    <br />
                    <span className="text-[#22d3ee]">GitHub Organization</span>
                  </h1>
                  <p className="text-[#666666] text-base md:text-lg leading-relaxed">
                    Want to contribute to our open-source projects, collaborate
                    with other developers, and become part of the organization?
                    Fill out the application below. We review every submission
                    manually.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="grid gap-4 sm:grid-cols-3 mt-10 max-w-4xl mx-auto">
                  {highlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="card p-5">
                        <div className="w-10 h-10 flex items-center justify-center mb-4 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)]">
                          <Icon className="w-5 h-5 text-[#22d3ee]" />
                        </div>
                        <h2 className="text-sm font-semibold text-white mb-2">
                          {item.title}
                        </h2>
                        <p className="text-[0.8125rem] text-[#666666] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <div className="card p-6 md:p-8 mt-10">
                  <JoinOrganizationForm />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

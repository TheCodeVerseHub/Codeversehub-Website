"use client";

import { useState } from "react";
import Link from "next/link";
import ShinyText from "@/components/ShinyText";
import { ChevronRight, ExternalLink, Plus, X } from "lucide-react";
import { faqCategories } from "@/components/home/faq-data";

export default function FAQ() {
  const [activeId, setActiveId] = useState(faqCategories[0].id);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const activeCategory =
    faqCategories.find((category) => category.id === activeId) ??
    faqCategories[0];

  const selectCategory = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setOpenQuestion(null);
  };

  return (
    <section className="section-spacing" aria-labelledby="faq-heading">
      <div className="section-divider mb-0" />
      <div className="section-container cvh-wide pt-10 md:pt-12">
        <div className="cvh-faq-inner">
          <div className="text-center mb-10 md:mb-12">
            <span className="section-label mb-6">FAQ</span>
            <h2
              id="faq-heading"
              className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5"
            >
              <ShinyText
                text="Frequently Asked Questions"
                shineColor="#ffffff"
                color="#ffffff"
                speed={5}
                spread={150}
                direction="left"
                yoyo={true}
              />
            </h2>
            <p className="text-[#666666] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Everything you need to know about joining, contributing, and
              growing at The CodeVerse Hub.
            </p>
          </div>

          <div className="cvh-faq-layout">
            {/* Category navigation */}
            <div className="cvh-faq-categories" role="tablist" aria-label="FAQ categories">
              {faqCategories.map((category) => {
                const isActive = category.id === activeId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`faq-tab-${category.id}`}
                    aria-selected={isActive}
                    aria-controls="faq-questions-panel"
                    className={`cvh-faq-cat${isActive ? " is-active" : ""}`}
                    onClick={() => selectCategory(category.id)}
                  >
                    <span className="cvh-faq-cat-label">{category.label}</span>
                    <ChevronRight className="cvh-faq-cat-chevron w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            {/* Questions accordion */}
            <div
              className="cvh-faq-questions"
              id="faq-questions-panel"
              role="tabpanel"
              aria-labelledby={`faq-tab-${activeId}`}
            >
              {activeCategory.questions.map((item) => {
                const isOpen = openQuestion === `${activeId}:${item.q}`;
                const key = `${activeId}:${item.q}`;
                return (
                  <div
                    key={key}
                    className={`cvh-faq-item${isOpen ? " is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="cvh-faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenQuestion(isOpen ? null : key)}
                    >
                      <span className="cvh-faq-question-text">{item.q}</span>
                      <span className="cvh-faq-icon" aria-hidden="true">
                        <Plus className="cvh-faq-icon-plus w-4 h-4" />
                        <X className="cvh-faq-icon-x w-4 h-4" />
                      </span>
                    </button>
                    <div className="cvh-faq-answer">
                      <div className="cvh-faq-answer-inner">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/pages/faq"
              className="btn-ghost text-[0.8125rem] inline-flex items-center gap-1.5"
            >
              View full FAQ
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useCallback } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, Github, ExternalLink, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { LINKS } from "@/lib/constants";

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "mdkvwgln";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@thecodeversehub.tech",
    href: LINKS.EMAIL,
  },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    label: "Discord",
    value: "The CodeVerse Hub",
    href: LINKS.DISCORD,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@TheCodeVerseHub",
    href: LINKS.GITHUB_ORG,
  },
];

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters";
  }

  return errors;
}

const inputClasses =
  "w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[#1a1a1a] text-white text-sm placeholder-[#666666] focus:border-[#22d3ee]/50 focus:ring-1 focus:ring-[#22d3ee]/30 outline-none transition-all duration-150";

const inputErrorClasses =
  "w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-red-500/40 text-white text-sm placeholder-[#666666] focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 outline-none transition-all duration-150";

export default function ContactSection() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [fsState, fsHandleSubmit, fsReset] = useForm(FORMSPREE_FORM_ID);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (fsState.submitting) return;

      const formData = new FormData(e.currentTarget);

      const data = {
        name: (formData.get("name") as string) || "",
        email: (formData.get("email") as string) || "",
        subject: (formData.get("subject") as string) || "",
        message: (formData.get("message") as string) || "",
      };

      const validationErrors = validateForm(data);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      fsHandleSubmit(e);
    },
    [fsState.submitting, fsHandleSubmit]
  );

  const handleReset = useCallback(() => {
    setErrors({});
    fsReset();
  }, [fsReset]);

  const succeeded = fsState.succeeded;

  return (
    <section className="section-spacing">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="section-label mb-6">Contact</span>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4 mt-5 text-white">
            Get in touch
          </h2>
          <p className="text-[#666666] text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Questions, collaborations, or just want to say hi.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] max-w-4xl mx-auto">
          {/* Contact methods */}
          <div className="space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 flex items-center justify-center shrink-0 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)] transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-[#ffffff]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[0.8125rem] font-semibold text-white group-hover:text-[#ffffff] transition-colors duration-200">
                      {method.label}
                    </h3>
                    <p className="text-[0.75rem] text-[#666666] mt-0.5 truncate font-mono">
                      {method.value}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#666666] ml-auto shrink-0 transition-all duration-200 group-hover:text-[#ffffff] group-hover:translate-x-0.5" />
                </a>
              );
            })}
          </div>

          {/* Contact form */}
          <div className="card p-6 md:p-7">
            {succeeded ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="font-heading text-lg font-semibold text-white mb-1">
                  Message sent
                </h3>
                <p className="text-[#666666] text-sm max-w-xs">
                  Thanks for reaching out. We&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-5 text-sm text-[#22d3ee] hover:text-[#67e8f9] transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[#afafaf] text-xs font-medium mb-1.5"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={errors.name ? inputErrorClasses : inputClasses}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={fsState.errors}
                    className="text-red-400 text-xs mt-1"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[#afafaf] text-xs font-medium mb-1.5"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={errors.email ? inputErrorClasses : inputClasses}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={fsState.errors}
                    className="text-red-400 text-xs mt-1"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[#afafaf] text-xs font-medium mb-1.5"
                  >
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    required
                    placeholder="What is this about?"
                    className={errors.subject ? inputErrorClasses : inputClasses}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  <ValidationError
                    prefix="Subject"
                    field="subject"
                    errors={fsState.errors}
                    className="text-red-400 text-xs mt-1"
                  />
                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[#afafaf] text-xs font-medium mb-1.5"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    autoComplete="off"
                    placeholder="How can we help you? (min. 20 characters)"
                    className={
                      errors.message ? inputErrorClasses : inputClasses
                    }
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={fsState.errors}
                    className="text-red-400 text-xs mt-1"
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Formspree form-level error */}
                {fsState.errors &&
                  Array.isArray(fsState.errors) &&
                  fsState.errors.length > 0 &&
                  !fsState.errors[0]?.field && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/[0.04] px-4 py-3">
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {fsState.errors[0].message || "Submission failed"}
                      </p>
                    </div>
                  )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={fsState.submitting}
                  className="btn-primary w-full h-11 text-[0.8125rem] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {fsState.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

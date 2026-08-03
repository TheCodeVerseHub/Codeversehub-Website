"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Github,
  Loader2,
  Send,
} from "lucide-react";
import { LINKS } from "@/lib/constants";

const TECHNOLOGY_OPTIONS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C",
  "C++",
  "Rust",
  "Go",
  "Kotlin",
  "C#",
  "HTML/CSS",
  "React",
  "Node.js",
  "Linux",
  "Docker",
  "Git",
  "Other",
] as const;

const CONTRIBUTION_OPTIONS = [
  "Code",
  "Documentation",
  "Testing",
  "UI / UX",
  "DevOps",
  "CI/CD",
  "Design",
  "Community",
  "Project Ideas",
  "Mentoring",
  "Anything",
] as const;

const EXPERIENCE_OPTIONS = [
  "Less than 6 months",
  "6–12 months",
  "1–2 years",
  "2–5 years",
  "5+ years",
] as const;

const OPEN_SOURCE_OPTIONS = [
  "None yet",
  "I've contributed once",
  "A few contributions",
  "Regular contributor",
  "Maintainer",
] as const;

const ACTIVITY_OPTIONS = [
  "Daily",
  "Several times a week",
  "Weekly",
  "Occasionally",
  "Rarely",
] as const;

type DiscordMemberStatus = "Yes" | "No";

type FormErrors = Partial<Record<string, string>>;

type FormState = {
  fullName: string;
  githubUsername: string;
  email: string;
  discordMember: DiscordMemberStatus;
  discordUsername: string;
  discordUserId: string;
  discordActivity: string;
  aboutYou: string;
  experience: string;
  languages: string[];
  openSourceExperience: string;
  projects: string;
  whyJoin: string;
  contributionInterests: string[];
  portfolio: string;
  linkedin: string;
  additionalNotes: string;
  agreement: boolean;
  startedAt: string;
  honeypot: string;
};

const inputClasses =
  "w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[#1a1a1a] text-white text-sm placeholder-[#666666] focus:border-[#22d3ee]/50 focus:ring-1 focus:ring-[#22d3ee]/30 outline-none transition-colors duration-150";
const inputErrorClasses =
  "w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-red-500/40 text-white text-sm placeholder-[#666666] focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 outline-none transition-colors duration-150";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidGitHubUsername(value: string): boolean {
  return /^(?=.{1,39}$)(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)$/.test(value);
}

function isValidDiscordId(value: string): boolean {
  return /^\d{17,20}$/.test(value);
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (form.githubUsername.trim() && !isValidGitHubUsername(form.githubUsername.trim())) {
    errors.githubUsername =
      "Enter a valid GitHub username: 1-39 characters, alphanumeric or hyphens, no spaces.";
  }

  if (!form.githubUsername.trim()) {
    errors.githubUsername = "GitHub username is required.";
  }

  if (form.email.trim() && !isValidEmail(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (form.discordMember === "Yes") {
    if (!form.discordUsername.trim()) {
      errors.discordUsername = "Discord username is required if you are in the Discord.";
    }
    if (form.discordUserId.trim() && !isValidDiscordId(form.discordUserId.trim())) {
      errors.discordUserId = "Discord user ID must be 17-20 digits.";
    }
    if (!form.discordActivity.trim()) {
      errors.discordActivity = "Pick your approximate Discord activity.";
    }
  }

  if (!form.aboutYou.trim()) {
    errors.aboutYou = "Tell us about yourself.";
  } else if (form.aboutYou.trim().length < 40) {
    errors.aboutYou = "Please share at least a short paragraph.";
  } else if (form.aboutYou.trim().length > 1200) {
    errors.aboutYou = "Keep this under 1200 characters.";
  }

  if (!form.experience.trim()) {
    errors.experience = "Programming experience is required.";
  }

  if (form.languages.length === 0) {
    errors.languages = "Select at least one language or technology.";
  }

  if (!form.openSourceExperience.trim()) {
    errors.openSourceExperience = "Open source experience is required.";
  }

  if (form.projects.trim().length > 1200) {
    errors.projects = "Keep projects under 1200 characters.";
  }

  if (!form.whyJoin.trim()) {
    errors.whyJoin = "Tell us why you want to join.";
  } else if (form.whyJoin.trim().length < 50) {
    errors.whyJoin = "Please write at least 50 characters.";
  } else if (form.whyJoin.trim().length > 1500) {
    errors.whyJoin = "Keep this under 1500 characters.";
  }

  if (form.portfolio.trim() && !isValidUrl(form.portfolio.trim())) {
    errors.portfolio = "Portfolio / Website must be a valid URL.";
  }

  if (form.linkedin.trim() && !isValidUrl(form.linkedin.trim())) {
    errors.linkedin = "LinkedIn must be a valid URL.";
  }

  if (form.additionalNotes.trim().length > 1000) {
    errors.additionalNotes = "Keep additional notes under 1000 characters.";
  }

  if (!form.agreement) {
    errors.agreement = "You must confirm the agreement.";
  }

  return errors;
}

function sanitizePayload(form: FormState) {
  return {
    fullName: form.fullName.trim(),
    githubUsername: form.githubUsername.trim(),
    email: form.email.trim(),
    discordMember: form.discordMember,
    discordUsername: form.discordMember === "Yes" ? form.discordUsername.trim() : "",
    discordUserId: form.discordMember === "Yes" ? form.discordUserId.trim() : "",
    discordActivity: form.discordMember === "Yes" ? form.discordActivity : "",
    aboutYou: form.aboutYou.trim(),
    experience: form.experience,
    languages: form.languages,
    openSourceExperience: form.openSourceExperience,
    projects: form.projects.trim(),
    whyJoin: form.whyJoin.trim(),
    contributionInterests: form.contributionInterests,
    portfolio: form.portfolio.trim(),
    linkedin: form.linkedin.trim(),
    additionalNotes: form.additionalNotes.trim(),
    agreement: form.agreement,
    startedAt: form.startedAt,
    honeypot: form.honeypot,
  };
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="text-red-400 text-xs mt-1.5 leading-relaxed" role="alert">
      {error}
    </p>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.625rem] font-mono uppercase tracking-[0.2em] text-white/35 mb-4">
      {children}
    </p>
  );
}

export default function JoinOrganizationForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<FormState>({
    fullName: "",
    githubUsername: "",
    email: "",
    discordMember: "No",
    discordUsername: "",
    discordUserId: "",
    discordActivity: "",
    aboutYou: "",
    experience: "",
    languages: [],
    openSourceExperience: "",
    projects: "",
    whyJoin: "",
    contributionInterests: [],
    portfolio: "",
    linkedin: "",
    additionalNotes: "",
    agreement: false,
    startedAt: new Date().toISOString(),
    honeypot: "",
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitError("");

    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/join-organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizePayload(form)),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; message?: string }
        | null;

      if (!res.ok) {
        setSubmitError(data?.error || "Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-4">
        <div className="inline-flex items-center justify-center w-14 h-14 border border-[#1a1a1a] bg-[rgba(255,255,255,0.04)] mb-5">
          <CheckCircle2 className="w-7 h-7 text-[#22d3ee]" />
        </div>
        <h2 className="heading-md text-2xl md:text-3xl text-white mb-3">
          Application Submitted!
        </h2>
        <p className="text-[#666666] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Thank you for applying to join The CodeVerse Hub GitHub Organization.
          Our team will review your application and contact you if we&apos;d like
          to move forward. This process may take a few days.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link href="/" className="btn-secondary h-11 px-8 text-[0.8125rem]">
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <a
            href={LINKS.GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-11 px-8 text-[0.8125rem]"
          >
            <Github className="w-4 h-4" />
            <span>Visit GitHub Organization</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <input
          type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        readOnly
        value={form.honeypot}
      />
      <input type="hidden" name="startedAt" value={form.startedAt} />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            Full Name <span className="text-white/35">(optional)</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={form.fullName}
            onChange={(e) => setForm((current) => ({ ...current, fullName: e.target.value }))}
            className={errors.fullName ? inputErrorClasses : inputClasses}
          />
          <FieldError error={errors.fullName} />
        </div>

        <div>
          <label htmlFor="githubUsername" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            GitHub Username <span className="text-red-400">*</span>
          </label>
          <input
            id="githubUsername"
            name="githubUsername"
            type="text"
            autoComplete="username"
            placeholder="youngcoder45"
            pattern="^(?=.{1,39}$)(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)$"
            value={form.githubUsername}
            onChange={(e) =>
              setForm((current) => ({ ...current, githubUsername: e.target.value }))
            }
            className={errors.githubUsername ? inputErrorClasses : inputClasses}
            aria-invalid={!!errors.githubUsername}
            aria-describedby="githubUsername-help"
          />
          <p id="githubUsername-help" className="text-xs text-white/30 mt-1">
            Example: youngcoder45
          </p>
          <FieldError error={errors.githubUsername} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            Email Address <span className="text-white/35">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
            className={errors.email ? inputErrorClasses : inputClasses}
          />
          <p className="text-xs text-white/30 mt-1">
            Used only if we need to contact you outside Discord.
          </p>
          <FieldError error={errors.email} />
        </div>

        <div>
          <label htmlFor="discordMember" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            Are you already a member of The CodeVerse Hub Discord?
          </label>
          <select
            id="discordMember"
            name="discordMember"
            value={form.discordMember}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                discordMember: e.target.value as DiscordMemberStatus,
              }))
            }
            className={inputClasses}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {form.discordMember === "Yes" ? (
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="discordUsername" className="block text-[#afafaf] text-xs font-medium mb-1.5">
              Discord Username <span className="text-white/35">(optional)</span>
            </label>
            <input
              id="discordUsername"
              name="discordUsername"
              type="text"
              placeholder="yourdiscordname"
              value={form.discordUsername}
              onChange={(e) =>
                setForm((current) => ({ ...current, discordUsername: e.target.value }))
              }
              className={errors.discordUsername ? inputErrorClasses : inputClasses}
            />
            <FieldError error={errors.discordUsername} />
          </div>
          <div>
            <label htmlFor="discordUserId" className="block text-[#afafaf] text-xs font-medium mb-1.5">
              Discord User ID <span className="text-white/35">(optional)</span>
            </label>
            <input
              id="discordUserId"
              name="discordUserId"
              type="text"
              inputMode="numeric"
              placeholder="123456789012345678"
              value={form.discordUserId}
              onChange={(e) =>
                setForm((current) => ({ ...current, discordUserId: e.target.value }))
              }
              className={errors.discordUserId ? inputErrorClasses : inputClasses}
            />
            <FieldError error={errors.discordUserId} />
          </div>
          <div>
            <label htmlFor="discordActivity" className="block text-[#afafaf] text-xs font-medium mb-1.5">
              Approximate activity in TCVH
            </label>
            <select
              id="discordActivity"
              name="discordActivity"
              value={form.discordActivity}
              onChange={(e) =>
                setForm((current) => ({ ...current, discordActivity: e.target.value }))
              }
              className={errors.discordActivity ? inputErrorClasses : inputClasses}
            >
              <option value="">Select activity</option>
              {ACTIVITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError error={errors.discordActivity} />
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="experience" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            Programming Experience <span className="text-red-400">*</span>
          </label>
          <select
            id="experience"
            name="experience"
            value={form.experience}
            onChange={(e) => setForm((current) => ({ ...current, experience: e.target.value }))}
            className={errors.experience ? inputErrorClasses : inputClasses}
          >
            <option value="">Select experience</option>
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError error={errors.experience} />
        </div>

        <div>
          <label htmlFor="openSourceExperience" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            Open Source Experience <span className="text-red-400">*</span>
          </label>
          <select
            id="openSourceExperience"
            name="openSourceExperience"
            value={form.openSourceExperience}
            onChange={(e) =>
              setForm((current) => ({ ...current, openSourceExperience: e.target.value }))
            }
            className={errors.openSourceExperience ? inputErrorClasses : inputClasses}
          >
            <option value="">Select experience</option>
            {OPEN_SOURCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError error={errors.openSourceExperience} />
        </div>
      </div>

      <div>
        <SectionLabel>Languages & Technologies <span className="text-red-400">*</span></SectionLabel>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGY_OPTIONS.map((option) => {
            const checked = form.languages.includes(option);
            return (
              <label
                key={option}
                className={`flex items-center gap-2 border px-3 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                  checked
                    ? "border-[#22d3ee]/40 bg-[rgba(34,211,238,0.06)] text-white"
                    : "border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] text-[#afafaf] hover:border-[#2a2a2a] hover:text-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      languages: current.languages.includes(option)
                        ? current.languages.filter((item) => item !== option)
                        : [...current.languages, option],
                    }))
                  }
                  className="sr-only"
                />
                <span className="w-3.5 h-3.5 border border-[#2a2a2a] flex items-center justify-center bg-[#090909]">
                  {checked ? <span className="w-2 h-2 bg-[#22d3ee]" /> : null}
                </span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        <FieldError error={errors.languages} />
      </div>

      <div>
        <label htmlFor="aboutYou" className="block text-[#afafaf] text-xs font-medium mb-1.5">
          Tell us about yourself <span className="text-red-400">*</span>
        </label>
        <textarea
          id="aboutYou"
          name="aboutYou"
          rows={5}
          required
          placeholder="Who are you? What interests you? What technologies do you enjoy?"
          value={form.aboutYou}
          onChange={(e) => setForm((current) => ({ ...current, aboutYou: e.target.value }))}
          className={errors.aboutYou ? inputErrorClasses : inputClasses}
        />
        <FieldError error={errors.aboutYou} />
      </div>

      <div>
        <label htmlFor="projects" className="block text-[#afafaf] text-xs font-medium mb-1.5">
          Projects <span className="text-white/35">(optional)</span>
        </label>
        <textarea
          id="projects"
          name="projects"
          rows={4}
          placeholder="Tell us about projects you've built. Include GitHub repositories if applicable."
          value={form.projects}
          onChange={(e) => setForm((current) => ({ ...current, projects: e.target.value }))}
          className={errors.projects ? inputErrorClasses : inputClasses}
        />
        <FieldError error={errors.projects} />
      </div>

      <div>
        <label htmlFor="whyJoin" className="block text-[#afafaf] text-xs font-medium mb-1.5">
          Why do you want to join the GitHub Organization? <span className="text-red-400">*</span>
        </label>
        <textarea
          id="whyJoin"
          name="whyJoin"
          rows={5}
          required
          placeholder="We are looking for genuine contributors."
          value={form.whyJoin}
          onChange={(e) => setForm((current) => ({ ...current, whyJoin: e.target.value }))}
          className={errors.whyJoin ? inputErrorClasses : inputClasses}
        />
        <FieldError error={errors.whyJoin} />
      </div>

      <div>
        <SectionLabel>How would you like to contribute?</SectionLabel>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CONTRIBUTION_OPTIONS.map((option) => {
            const checked = form.contributionInterests.includes(option);
            return (
              <label
                key={option}
                className={`flex items-center gap-2 border px-3 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                  checked
                    ? "border-[#22d3ee]/40 bg-[rgba(34,211,238,0.06)] text-white"
                    : "border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] text-[#afafaf] hover:border-[#2a2a2a] hover:text-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      contributionInterests: current.contributionInterests.includes(option)
                        ? current.contributionInterests.filter((item) => item !== option)
                        : [...current.contributionInterests, option],
                    }))
                  }
                  className="sr-only"
                />
                <span className="w-3.5 h-3.5 border border-[#2a2a2a] flex items-center justify-center bg-[#090909]">
                  {checked ? <span className="w-2 h-2 bg-[#22d3ee]" /> : null}
                </span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="portfolio" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            Portfolio / Website <span className="text-white/35">(optional)</span>
          </label>
          <input
            id="portfolio"
            name="portfolio"
            type="url"
            placeholder="https://your-site.dev"
            value={form.portfolio}
            onChange={(e) => setForm((current) => ({ ...current, portfolio: e.target.value }))}
            className={errors.portfolio ? inputErrorClasses : inputClasses}
          />
          <FieldError error={errors.portfolio} />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            LinkedIn <span className="text-white/35">(optional)</span>
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={form.linkedin}
            onChange={(e) => setForm((current) => ({ ...current, linkedin: e.target.value }))}
            className={errors.linkedin ? inputErrorClasses : inputClasses}
          />
          <FieldError error={errors.linkedin} />
        </div>
      </div>

      <div>
        <label htmlFor="additionalNotes" className="block text-[#afafaf] text-xs font-medium mb-1.5">
          Anything else? <span className="text-white/35">(optional)</span>
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          rows={4}
          placeholder="Anything else we should know?"
          value={form.additionalNotes}
          onChange={(e) =>
            setForm((current) => ({ ...current, additionalNotes: e.target.value }))
          }
          className={errors.additionalNotes ? inputErrorClasses : inputClasses}
        />
        <FieldError error={errors.additionalNotes} />
      </div>

      <div className="flex items-start gap-3 border border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] p-4">
        <input
          id="agreement"
          name="agreement"
          type="checkbox"
          checked={form.agreement}
          onChange={(e) =>
            setForm((current) => ({ ...current, agreement: e.target.checked }))
          }
          className="mt-1 h-4 w-4 border-[#2a2a2a] bg-[#090909] text-[#22d3ee] focus:ring-[#22d3ee] focus:ring-offset-0"
        />
        <label htmlFor="agreement" className="text-sm text-[#afafaf] leading-relaxed">
          I confirm that the information provided is accurate and understand
          that submitting this form does not guarantee acceptance.
          <FieldError error={errors.agreement} />
        </label>
      </div>

      {submitError ? (
        <p className="text-sm text-red-400" role="alert">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full h-11 text-[0.8125rem] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        <span>{submitting ? "Submitting..." : "Submit Application"}</span>
      </button>

      <p className="text-center text-xs text-white/30 leading-relaxed">
        This application is reviewed manually and sent privately to our team
        through Discord.{" "}
        <Link
          href="/"
          className="text-white/60 hover:text-white transition-colors duration-150 inline-flex items-center gap-1"
        >
          Return home
          <ExternalLink className="w-3 h-3" />
        </Link>
      </p>
    </form>
  );
}

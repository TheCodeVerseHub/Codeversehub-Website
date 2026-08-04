"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Github,
  Loader2,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import { LINKS } from "@/lib/constants";
import { formatAccountAge, type GitHubProfile } from "@/lib/github-profile";

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

const PROJECT_TYPE_OPTIONS = [
  "Discord Bots",
  "Websites",
  "APIs",
  "Linux",
  "DevTools",
  "AI",
  "CLI Applications",
  "Libraries",
  "Games",
  "Embedded",
  "Other",
] as const;

const WEEKLY_HOURS_OPTIONS = [
  "1–2 hours",
  "3–5 hours",
  "5–10 hours",
  "10+ hours",
  "Whenever possible",
] as const;

type DiscordMemberStatus = "Yes" | "No";
type PriorOpenSourceStatus = "Yes" | "No";
type GithubLookupStatus = "idle" | "loading" | "found" | "notfound" | "error";

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
  projectTypes: string[];
  projectTypesOther: string;
  weeklyHours: string;
  osMotivation: string;
  priorOpenSource: PriorOpenSourceStatus;
  priorProjectName: string;
  priorProjectLink: string;
  priorContribution: string;
  projects: string;
  whyJoin: string;
  contributionInterests: string[];
  portfolio: string;
  linkedin: string;
  hopingToGain: string;
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

function validateForm(
  form: FormState,
  githubLookupStatus: GithubLookupStatus,
): FormErrors {
  const errors: FormErrors = {};

  if (form.githubUsername.trim() && !isValidGitHubUsername(form.githubUsername.trim())) {
    errors.githubUsername =
      "Enter a valid GitHub username: 1-39 characters, alphanumeric or hyphens, no spaces.";
  }

  if (!form.githubUsername.trim()) {
    errors.githubUsername = "GitHub username is required.";
  } else if (githubLookupStatus === "notfound") {
    errors.githubUsername =
      "This GitHub username doesn't exist. Double-check the spelling before submitting.";
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

  if (form.projectTypes.length === 0) {
    errors.projectTypes = "Select at least one type of project.";
  }

  if (form.projectTypes.includes("Other") && !form.projectTypesOther.trim()) {
    errors.projectTypesOther = "Tell us which other project types you enjoy.";
  }

  if (!form.weeklyHours.trim()) {
    errors.weeklyHours = "Pick how much time you can realistically contribute.";
  }

  if (!form.osMotivation.trim()) {
    errors.osMotivation = "Tell us what motivates you to contribute.";
  } else if (form.osMotivation.trim().length < 30) {
    errors.osMotivation = "Please write at least 30 characters.";
  } else if (form.osMotivation.trim().length > 1500) {
    errors.osMotivation = "Keep this under 1500 characters.";
  }

  if (form.priorOpenSource === "Yes") {
    if (!form.priorProjectName.trim()) {
      errors.priorProjectName = "Project name is required.";
    }
    if (!form.priorProjectLink.trim()) {
      errors.priorProjectLink = "Project link is required.";
    } else if (!isValidUrl(form.priorProjectLink.trim())) {
      errors.priorProjectLink = "Project link must be a valid URL.";
    }
    if (!form.priorContribution.trim()) {
      errors.priorContribution = "Describe what you contributed.";
    }
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

  if (form.hopingToGain.trim().length > 1000) {
    errors.hopingToGain = "Keep this under 1000 characters.";
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
    projectTypes: form.projectTypes,
    projectTypesOther: form.projectTypesOther.trim(),
    weeklyHours: form.weeklyHours,
    osMotivation: form.osMotivation.trim(),
    priorOpenSource: form.priorOpenSource,
    priorProjectName: form.priorOpenSource === "Yes" ? form.priorProjectName.trim() : "",
    priorProjectLink: form.priorOpenSource === "Yes" ? form.priorProjectLink.trim() : "",
    priorContribution: form.priorOpenSource === "Yes" ? form.priorContribution.trim() : "",
    projects: form.projects.trim(),
    whyJoin: form.whyJoin.trim(),
    contributionInterests: form.contributionInterests,
    portfolio: form.portfolio.trim(),
    linkedin: form.linkedin.trim(),
    hopingToGain: form.hopingToGain.trim(),
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

function GitHubProfileCard({
  profile,
  status,
  onClear,
}: {
  profile: GitHubProfile | null;
  status: GithubLookupStatus;
  onClear: () => void;
}) {
  if (status === "loading") {
    return (
      <div className="mt-3 flex items-center gap-2 text-xs text-white/40 border border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] px-3.5 py-2.5 rounded-lg">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#22d3ee]" />
        <span>Fetching GitHub profile…</span>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="mt-3 flex items-start gap-2 text-xs text-red-400 border border-red-500/30 bg-[rgba(239,68,68,0.04)] px-3.5 py-2.5 rounded-lg">
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>
          We couldn&apos;t find this GitHub account. Double-check the spelling —
          you can&apos;t submit with an unverified username.
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-3 flex items-start gap-2 text-xs text-amber-400/90 border border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] px-3.5 py-2.5 rounded-lg">
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>
          GitHub is temporarily unavailable, so we couldn&apos;t verify this
          username. You can still continue — we verify on our end before
          processing.
        </span>
      </div>
    );
  }

  if (status !== "found" || !profile) return null;

  return (
    <div className="mt-3 border border-[#22d3ee]/25 bg-[rgba(34,211,238,0.04)] rounded-lg p-4">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatar_url}
          alt={`${profile.login} avatar`}
          className="w-12 h-12 rounded-full border border-[#22d3ee]/30"
          width={48}
          height={48}
        />
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">
            {profile.name || profile.login}
          </p>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#22d3ee] text-xs hover:underline inline-flex items-center gap-1"
          >
            @{profile.login}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="ml-auto text-white/30 hover:text-white text-xs transition-colors"
          aria-label="Clear GitHub lookup"
        >
          Clear
        </button>
      </div>

      {profile.bio ? (
        <p className="text-[#afafaf] text-xs leading-relaxed mt-3 line-clamp-2">
          {profile.bio}
        </p>
      ) : null}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-xs">
        <div className="border border-[#1a1a1a] bg-[#090909] px-2.5 py-2">
          <p className="text-white/25 font-mono text-[0.625rem] uppercase tracking-wider">Followers</p>
          <p className="text-white mt-0.5">{profile.followers}</p>
        </div>
        <div className="border border-[#1a1a1a] bg-[#090909] px-2.5 py-2">
          <p className="text-white/25 font-mono text-[0.625rem] uppercase tracking-wider">Following</p>
          <p className="text-white mt-0.5">{profile.following}</p>
        </div>
        <div className="border border-[#1a1a1a] bg-[#090909] px-2.5 py-2">
          <p className="text-white/25 font-mono text-[0.625rem] uppercase tracking-wider">Public Repos</p>
          <p className="text-white mt-0.5">{profile.public_repos}</p>
        </div>
        <div className="border border-[#1a1a1a] bg-[#090909] px-2.5 py-2">
          <p className="text-white/25 font-mono text-[0.625rem] uppercase tracking-wider">Account Age</p>
          <p className="text-white mt-0.5">{formatAccountAge(profile.created_at)}</p>
        </div>
        <div className="border border-[#1a1a1a] bg-[#090909] px-2.5 py-2 col-span-2 sm:col-span-1">
          <p className="text-white/25 font-mono text-[0.625rem] uppercase tracking-wider">Location</p>
          <p className="text-white mt-0.5 flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 text-white/40 shrink-0" />
            {profile.location || "—"}
          </p>
        </div>
        <div className="border border-[#1a1a1a] bg-[#090909] px-2.5 py-2 sm:col-span-2">
          <p className="text-white/25 font-mono text-[0.625rem] uppercase tracking-wider">Company</p>
          <p className="text-white mt-0.5 truncate">{profile.company || "—"}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[#22d3ee]">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">GitHub account verified</span>
      </div>
    </div>
  );
}

export default function JoinOrganizationForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [githubLookupStatus, setGithubLookupStatus] =
    useState<GithubLookupStatus>("idle");
  const lookupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lookupRequestId = useRef(0);
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
    projectTypes: [],
    projectTypesOther: "",
    weeklyHours: "",
    osMotivation: "",
    priorOpenSource: "No",
    priorProjectName: "",
    priorProjectLink: "",
    priorContribution: "",
    projects: "",
    whyJoin: "",
    contributionInterests: [],
    portfolio: "",
    linkedin: "",
    hopingToGain: "",
    additionalNotes: "",
    agreement: false,
    startedAt: new Date().toISOString(),
    honeypot: "",
  });

  const lookupGithub = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed || !isValidGitHubUsername(trimmed)) {
      setGithubLookupStatus("idle");
      setGithubProfile(null);
      return;
    }

    const requestId = ++lookupRequestId.current;
    setGithubLookupStatus("loading");
    setGithubProfile(null);

    try {
      const res = await fetch(
        `/api/join-organization/github-lookup?username=${encodeURIComponent(trimmed)}`,
      );

      // A newer lookup was started while this one was in flight — drop it.
      if (requestId !== lookupRequestId.current) return;

      if (res.status === 404) {
        setGithubLookupStatus("notfound");
        setGithubProfile(null);
        return;
      }

      if (!res.ok) {
        setGithubLookupStatus("error");
        setGithubProfile(null);
        return;
      }

      const data = (await res.json()) as { profile?: GitHubProfile };
      if (requestId !== lookupRequestId.current) return;
      setGithubProfile(data.profile ?? null);
      setGithubLookupStatus(data.profile ? "found" : "error");
    } catch {
      if (requestId !== lookupRequestId.current) return;
      setGithubLookupStatus("error");
      setGithubProfile(null);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (lookupTimer.current) clearTimeout(lookupTimer.current);
    };
  }, []);

  const handleGithubUsernameChange = (value: string) => {
    setForm((current) => ({ ...current, githubUsername: value }));
    if (lookupTimer.current) clearTimeout(lookupTimer.current);
    const trimmed = value.trim();
    if (!trimmed || !isValidGitHubUsername(trimmed)) {
      lookupRequestId.current += 1;
      setGithubLookupStatus("idle");
      setGithubProfile(null);
      return;
    }
    lookupTimer.current = setTimeout(() => lookupGithub(trimmed), 700);
  };

  const handleGithubBlur = () => {
    if (lookupTimer.current) {
      clearTimeout(lookupTimer.current);
      lookupTimer.current = null;
    }
    const trimmed = form.githubUsername.trim();
    if (trimmed && isValidGitHubUsername(trimmed)) {
      lookupGithub(trimmed);
    } else {
      lookupRequestId.current += 1;
      setGithubLookupStatus("idle");
      setGithubProfile(null);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitError("");
    setDuplicateWarning(null);

    const validationErrors = validateForm(form, githubLookupStatus);
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
        | {
            ok?: boolean;
            error?: string;
            message?: string;
            applicationId?: string;
            duplicateWarning?: { message?: string } | null;
          }
        | null;

      if (!res.ok) {
        setSubmitError(data?.error || "Submission failed. Please try again.");
        return;
      }

      setApplicationId(data?.applicationId ?? null);
      setDuplicateWarning(data?.duplicateWarning?.message ?? null);
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-[#22d3ee]/30 bg-[rgba(34,211,238,0.06)] rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#22d3ee]" />
          </div>
          <h2 className="heading-md text-2xl md:text-3xl text-white mb-3">
            Application Submitted!
          </h2>
          <p className="text-[#666666] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Thanks for taking the time to apply. Here&apos;s what happens next.
          </p>
        </div>

        {duplicateWarning ? (
          <div className="mt-6 flex items-start gap-3 border border-amber-500/30 bg-[rgba(245,158,11,0.05)] p-4 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-300">
                Similar application already received
              </p>
              <p className="text-xs text-amber-200/70 leading-relaxed mt-1">
                {duplicateWarning}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-8 border border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] rounded-lg divide-y divide-[#1a1a1a]">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-7 h-7 flex items-center justify-center rounded-full border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-semibold shrink-0">1</span>
              <h3 className="text-sm font-semibold text-white">
                What happens next
              </h3>
            </div>
            <p className="text-[#afafaf] text-xs leading-relaxed pl-10">
              A staff member reviews your answers and GitHub profile manually.
              Nothing is auto-approved — every application is read by a person.
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-7 h-7 flex items-center justify-center rounded-full border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-semibold shrink-0">2</span>
              <h3 className="text-sm font-semibold text-white">
                Review process
              </h3>
            </div>
            <p className="text-[#afafaf] text-xs leading-relaxed pl-10">
              We check for genuine contribution interest, relevant skills, and
              how you&apos;d fit into the projects we maintain. Strong applications
              are usually invited to introduce themselves in the Discord first.
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-7 h-7 flex items-center justify-center rounded-full border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-semibold shrink-0">3</span>
              <h3 className="text-sm font-semibold text-white">
                Expected response time
              </h3>
            </div>
            <p className="text-[#afafaf] text-xs leading-relaxed pl-10">
              Most applications are reviewed within 2–7 days. We&apos;ll reach out
              through Discord or the email you provided if we need more
              information.
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-7 h-7 flex items-center justify-center rounded-full border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-semibold shrink-0">4</span>
              <h3 className="text-sm font-semibold text-white">
                Where announcements happen
              </h3>
            </div>
            <p className="text-[#afafaf] text-xs leading-relaxed pl-10">
              Accepted members are announced in our Discord server. Make sure
              you&apos;re in there so you don&apos;t miss the invite.
            </p>
          </div>
        </div>

        {applicationId ? (
          <p className="text-center text-xs text-white/30 mt-6 font-mono">
            Reference: {applicationId}
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <a
            href={LINKS.DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-11 px-8 text-[0.8125rem]"
          >
            <Users className="w-4 h-4" />
            <span>Join the Discord</span>
          </a>
          <a
            href={LINKS.GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary h-11 px-8 text-[0.8125rem]"
          >
            <Github className="w-4 h-4" />
            <span>Browse GitHub Organization</span>
          </a>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return home
          </Link>
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
            onChange={(e) => handleGithubUsernameChange(e.target.value)}
            onBlur={handleGithubBlur}
            className={errors.githubUsername ? inputErrorClasses : inputClasses}
            aria-invalid={!!errors.githubUsername}
            aria-describedby="githubUsername-help"
          />
          <p id="githubUsername-help" className="text-xs text-white/30 mt-1">
            Example: youngcoder45 — we fetch your profile automatically to
            verify your account.
          </p>
          <FieldError error={errors.githubUsername} />
          <GitHubProfileCard
            profile={githubProfile}
            status={githubLookupStatus}
            onClear={() => {
              lookupRequestId.current += 1;
              setGithubProfile(null);
              setGithubLookupStatus("idle");
              setForm((current) => ({ ...current, githubUsername: "" }));
            }}
          />
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
        <SectionLabel>What type of projects do you enjoy building? <span className="text-red-400">*</span></SectionLabel>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_TYPE_OPTIONS.map((option) => {
            const checked = form.projectTypes.includes(option);
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
                      projectTypes: current.projectTypes.includes(option)
                        ? current.projectTypes.filter((item) => item !== option)
                        : [...current.projectTypes, option],
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
        <FieldError error={errors.projectTypes} />

        {form.projectTypes.includes("Other") ? (
          <div className="mt-3">
            <label htmlFor="projectTypesOther" className="block text-[#afafaf] text-xs font-medium mb-1.5">
              Specify the other project types you enjoy <span className="text-red-400">*</span>
            </label>
            <input
              id="projectTypesOther"
              name="projectTypesOther"
              type="text"
              placeholder="e.g. mobile apps, game mods, web scraping…"
              value={form.projectTypesOther}
              onChange={(e) =>
                setForm((current) => ({ ...current, projectTypesOther: e.target.value }))
              }
              className={errors.projectTypesOther ? inputErrorClasses : inputClasses}
            />
            <FieldError error={errors.projectTypesOther} />
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="weeklyHours" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            How many hours can you realistically contribute per week?{" "}
            <span className="text-red-400">*</span>
          </label>
          <select
            id="weeklyHours"
            name="weeklyHours"
            value={form.weeklyHours}
            onChange={(e) =>
              setForm((current) => ({ ...current, weeklyHours: e.target.value }))
            }
            className={errors.weeklyHours ? inputErrorClasses : inputClasses}
          >
            <option value="">Select hours</option>
            {WEEKLY_HOURS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError error={errors.weeklyHours} />
        </div>

        <div>
          <label htmlFor="priorOpenSource" className="block text-[#afafaf] text-xs font-medium mb-1.5">
            Have you contributed to another open source project before?
          </label>
          <select
            id="priorOpenSource"
            name="priorOpenSource"
            value={form.priorOpenSource}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                priorOpenSource: e.target.value as PriorOpenSourceStatus,
              }))
            }
            className={inputClasses}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>

      {form.priorOpenSource === "Yes" ? (
        <div className="space-y-6 border border-[#1a1a1a] bg-[rgba(255,255,255,0.02)] p-4 md:p-5 rounded-lg">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="priorProjectName" className="block text-[#afafaf] text-xs font-medium mb-1.5">
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                id="priorProjectName"
                name="priorProjectName"
                type="text"
                placeholder="e.g. Eigen Bot"
                value={form.priorProjectName}
                onChange={(e) =>
                  setForm((current) => ({ ...current, priorProjectName: e.target.value }))
                }
                className={errors.priorProjectName ? inputErrorClasses : inputClasses}
              />
              <FieldError error={errors.priorProjectName} />
            </div>
            <div>
              <label htmlFor="priorProjectLink" className="block text-[#afafaf] text-xs font-medium mb-1.5">
                GitHub Link <span className="text-red-400">*</span>
              </label>
              <input
                id="priorProjectLink"
                name="priorProjectLink"
                type="url"
                placeholder="https://github.com/owner/repo"
                value={form.priorProjectLink}
                onChange={(e) =>
                  setForm((current) => ({ ...current, priorProjectLink: e.target.value }))
                }
                className={errors.priorProjectLink ? inputErrorClasses : inputClasses}
              />
              <FieldError error={errors.priorProjectLink} />
            </div>
          </div>
          <div>
            <label htmlFor="priorContribution" className="block text-[#afafaf] text-xs font-medium mb-1.5">
              What did you contribute? <span className="text-red-400">*</span>
            </label>
            <textarea
              id="priorContribution"
              name="priorContribution"
              rows={3}
              placeholder="e.g. Added slash commands, fixed bugs, wrote tests…"
              value={form.priorContribution}
              onChange={(e) =>
                setForm((current) => ({ ...current, priorContribution: e.target.value }))
              }
              className={errors.priorContribution ? inputErrorClasses : inputClasses}
            />
            <FieldError error={errors.priorContribution} />
          </div>
        </div>
      ) : null}

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
        <label htmlFor="osMotivation" className="block text-[#afafaf] text-xs font-medium mb-1.5">
          What motivates you to contribute to open source?{" "}
          <span className="text-red-400">*</span>
        </label>
        <textarea
          id="osMotivation"
          name="osMotivation"
          rows={4}
          required
          placeholder="What pulls you toward open source? Learning, building in public, giving back, solving real problems…"
          value={form.osMotivation}
          onChange={(e) =>
            setForm((current) => ({ ...current, osMotivation: e.target.value }))
          }
          className={errors.osMotivation ? inputErrorClasses : inputClasses}
        />
        <FieldError error={errors.osMotivation} />
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
        <SectionLabel>What are you most interested in contributing?</SectionLabel>
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
        <label htmlFor="hopingToGain" className="block text-[#afafaf] text-xs font-medium mb-1.5">
          What are you hoping to gain from joining The CodeVerse Hub?{" "}
          <span className="text-white/35">(optional)</span>
        </label>
        <textarea
          id="hopingToGain"
          name="hopingToGain"
          rows={3}
          placeholder="Mentorship, real-world reviews, a community to ship with…"
          value={form.hopingToGain}
          onChange={(e) =>
            setForm((current) => ({ ...current, hopingToGain: e.target.value }))
          }
          className={errors.hopingToGain ? inputErrorClasses : inputClasses}
        />
        <FieldError error={errors.hopingToGain} />
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


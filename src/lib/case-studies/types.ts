/**
 * Case study model.
 *
 * Structured to mirror the section anatomy used on aditya-verma.me case
 * studies: Problem → Goals → Architecture → Key Features → Tech Stack →
 * Results → Challenges & Trade-offs → Implementation Highlights →
 * Lessons Learned.
 */

export interface CaseStudyGoal {
  title: string;
  description: string;
}

export interface CaseStudyArchStage {
  title: string;
  description: string;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyTech {
  name: string;
  description: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  sub?: string;
}

export interface CaseStudyChallenge {
  challenge: string;
  solution: string;
}

export interface CaseStudyHighlight {
  title: string;
  description: string;
}

export interface CaseStudy {
  /** URL slug, e.g. "eigen-bot" */
  slug: string;
  /** GitHub repository name in the org, e.g. "Eigen-Bot" */
  repo: string;
  /** Display category chip, e.g. "Discord Bot" */
  category: string;
  /** Project display name */
  title: string;
  /** One-two sentence lead summarizing the project + headline metric */
  tagline: string;
  /** Short description used in cards / metadata */
  description: string;
  /** Problem statement paragraphs */
  problem: string[];
  goals: CaseStudyGoal[];
  /** ASCII architecture diagram lines (monospace block) */
  architecture: string[];
  /** Paragraph introducing the system design */
  systemDesign: string;
  /** Pipeline / architecture stages with explanations */
  stages: CaseStudyArchStage[];
  features: CaseStudyFeature[];
  techStack: CaseStudyTech[];
  metrics: CaseStudyMetric[];
  /** Qualitative results paragraph after the metric cards */
  results: string;
  challenges: CaseStudyChallenge[];
  highlights: CaseStudyHighlight[];
  lessons: string[];
  links: {
    github: string;
    homepage?: string;
  };
  /** Elevate this study on the projects page strip */
  featured?: boolean;
}

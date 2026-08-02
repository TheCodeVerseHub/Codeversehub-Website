import { caseStudies, caseStudyRepoSlugs } from "./data";
import type { CaseStudy } from "./types";

export type { CaseStudy } from "./types";
export type {
  CaseStudyArchStage,
  CaseStudyChallenge,
  CaseStudyFeature,
  CaseStudyGoal,
  CaseStudyHighlight,
  CaseStudyMetric,
  CaseStudyTech,
} from "./types";

export { caseStudies, caseStudyRepoSlugs };

/** All case studies. */
export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudyForRepo(repoName: string): CaseStudy | undefined {
  const slug = caseStudyRepoSlugs[repoName];
  return slug ? getCaseStudy(slug) : undefined;
}

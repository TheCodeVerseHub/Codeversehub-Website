/**
 * Shared types for the curated resources collection.
 *
 * Kept free of React imports so the data can be consumed anywhere
 * (client components, future server components, scripts, etc.).
 */

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Access = "Free" | "Paid" | "Freemium";

/** Primary badge shown on every resource card. */
export type Badge =
  | "Official"
  | "Community"
  | "Interactive"
  | "Video Course"
  | "Documentation"
  | "Book"
  | "Practice"
  | "Cheat Sheet";

/** Authoring shape — `category` is stamped automatically by the builder. */
export interface ResourceInput {
  title: string;
  /** 1–2 concise sentences. */
  description: string;
  url: string;
  difficulty: Difficulty;
  access: Access;
  badge: Badge;
  /** Searchable keywords / subtopics beyond the title and description. */
  tags: string[];
}

export interface Resource extends ResourceInput {
  /** Id of the subcategory this resource belongs to (stamped by builder). */
  category: string;
}

export interface ResourceSubcategory {
  id: string;
  label: string;
  resources: Resource[];
}

export interface ResourceCategory {
  id: string;
  label: string;
  description: string;
  subcategories: ResourceSubcategory[];
}

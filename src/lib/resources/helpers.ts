import type {
  ResourceCategory,
  ResourceInput,
  ResourceSubcategory,
} from "./types";

/**
 * Builds a subcategory, stamping the subcategory id onto every resource.
 * This keeps the raw data terse while guaranteeing every resource carries a
 * `category` field (type-safe, no duplication in source).
 */
export function subcategory(
  id: string,
  label: string,
  resources: ResourceInput[],
): ResourceSubcategory {
  return {
    id,
    label,
    resources: resources.map((resource) => ({
      ...resource,
      category: id,
    })),
  };
}

/** Assembles a top-level category from its subcategories. */
export function category(
  id: string,
  label: string,
  description: string,
  subcategories: ResourceSubcategory[],
): ResourceCategory {
  return { id, label, description, subcategories };
}

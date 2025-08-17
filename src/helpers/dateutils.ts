import type { Deck } from "@/types/deck";

export const lastModified = (deck: Deck) => {
  const lastUpdated = new Date(deck.lastUpdatedAtUtc);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Last modified yesterday";
  if (diffDays < 7) return `Last modified ${diffDays} days ago`;
  if (diffDays < 30)
    return `Last modified ${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365)
    return `Last modified ${Math.floor(diffDays / 30)} months ago`;
  return `Last modified ${Math.floor(diffDays / 365)} years ago`;
};

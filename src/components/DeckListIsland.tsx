import { useState, useEffect, useCallback } from 'react';
import type { Deck } from '../types/deck';

const formatRelativeTime = (dateString: string): string => {
  const lastUpdated = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Last modified today";
  if (diffDays === 1) return "Last modified yesterday";
  if (diffDays < 7) return `Last modified ${diffDays} days ago`;
  if (diffDays < 30) return `Last modified ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
  if (diffDays < 365) return `Last modified ${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`;
  return `Last modified ${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) === 1 ? '' : 's'} ago`;
};

interface DeckListIslandProps {
  initialDecks: Deck[];
}

export default function DeckListIsland({ initialDecks }: DeckListIslandProps) {
  const [relativeTimes, setRelativeTimes] = useState<Record<string, string>>({});

  // Compute relative times client-side only to avoid stale build-time values
  const updateRelativeTimes = useCallback((deckList: Deck[]) => {
    const times: Record<string, string> = {};
    for (const deck of deckList) {
      if (deck.lastUpdatedAtUtc) {
        times[deck.id] = formatRelativeTime(deck.lastUpdatedAtUtc);
      }
    }
    setRelativeTimes(times);
  }, []);

  useEffect(() => {
    updateRelativeTimes(initialDecks);
  }, [initialDecks, updateRelativeTimes]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {initialDecks.slice(0, 9).map((deck) => (
        <div key={deck.id} className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
          {deck.image && (
            <img 
              src={deck.image} 
              alt={deck.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
            {deck.name}
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-2">
            {deck.format}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {relativeTimes[deck.id] ?? ''}
          </p>
          <a
            href={deck.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-accent-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-accent-secondary)] transition-colors"
          >
            View Deck
          </a>
        </div>
      ))}
    </div>
  );
}

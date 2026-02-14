import { useState, useEffect, useCallback } from 'react';
import type { Deck } from '../types/deck';
import { decks as staticDecks } from '../data/decks';

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
  const [decks, setDecks] = useState<Deck[]>(initialDecks);
  const [relativeTimes, setRelativeTimes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(initialDecks.length === 0);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = useCallback(async (): Promise<Deck[]> => {
    try {
      const response = await fetch(
        "https://api.moxfield.com/v2/users/JohnnyCashMoney/decks",
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data.data.map((deck: any) => ({
        id: deck.publicId,
        name: deck.name,
        format: deck.format
          ? deck.format.charAt(0).toUpperCase() + deck.format.slice(1)
          : "Commander",
        lastUpdatedAtUtc: deck.lastUpdatedAtUtc,
        colors: deck.colors || [],
        image: deck.mainCardId
          ? `https://assets.moxfield.net/cards/card-${deck.mainCardId}-art_crop.webp`
          : undefined,
        link: `https://moxfield.com/decks/${deck.publicId}`,
      }));
    } catch (err) {
      console.error("Error fetching decks from Moxfield, using static data:", err);
      return staticDecks;
    }
  }, []);

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
    updateRelativeTimes(decks);
  }, [decks, updateRelativeTimes]);

  // Fetch immediately on mount, then refresh every 2 minutes
  useEffect(() => {
    let mounted = true;

    const loadDecks = async () => {
      try {
        const newDecks = await fetchDecks();
        if (mounted) {
          setDecks(newDecks);
          setLoading(false);
          setError(null);
        }
      } catch {
        // fetchDecks already falls back to static data, but just in case
        if (mounted) {
          setDecks(staticDecks);
          setLoading(false);
          setError(null);
        }
      }
    };

    loadDecks();

    const interval = setInterval(loadDecks, 2 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [fetchDecks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[var(--color-text-secondary)] text-lg">Loading decklists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-[var(--color-text-secondary)] text-lg mb-4">{error}</p>
          <button
            onClick={() => { setLoading(true); setError(null); fetchDecks().then(d => { setDecks(d); setLoading(false); }).catch(() => { setLoading(false); setError("Still couldn't load decks. Moxfield might be having issues."); }); }}
            className="inline-block bg-[var(--color-accent-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-accent-secondary)] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (decks.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[var(--color-text-secondary)] text-lg">No decks found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {decks.slice(0, 9).map((deck) => (
        <div key={deck.id} className="bg-[var(--color-bg-secondary,var(--glass-background))] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-[var(--glass-border)]">
          {deck.image && (
            <img 
              src={deck.image} 
              alt={deck.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              loading="lazy"
            />
          )}
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
            {deck.name}
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-2">
            {deck.format}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
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

import { useState, useEffect } from 'react';
import type { Deck } from '../types/deck';

interface DeckListIslandProps {
  initialDecks: Deck[];
}

export default function DeckListIsland({ initialDecks }: DeckListIslandProps) {
  const [decks, setDecks] = useState<Deck[]>(initialDecks);

  const fetchDecks = async (): Promise<Deck[]> => {
    try {
      const response = await fetch(
        "https://api.moxfield.com/v2/users/JohnnyCashMoney/decks"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform Moxfield API response to match our Deck type
      return data.data.map((deck: any) => ({
        id: deck.publicId,
        name: deck.name,
        format: deck.format
          ? deck.format.charAt(0).toUpperCase() + deck.format.slice(1)
          : "Commander",
        lastUpdatedAtUtc: deck.lastUpdatedAtUtc,
        description: deck.lastUpdatedAtUtc 
          ? new Date(deck.lastUpdatedAtUtc).toLocaleDateString()
          : "",
        colors: deck.colors || [],
        image: deck.mainCardId
          ? `https://assets.moxfield.net/cards/card-${deck.mainCardId}-art_crop.webp`
          : undefined,
        link: `https://moxfield.com/decks/${deck.publicId}`,
      }));
    } catch (error) {
      console.error("Error fetching decks:", error);
      return initialDecks; // Fallback to initial data on error
    }
  };

  // Auto-refresh every 2 minutes to get fresh data
  useEffect(() => {
    const refreshDecks = async () => {
      const newDecks = await fetchDecks();
      setDecks(newDecks);
    };

    // Initial refresh after 30 seconds to get fresh data
    const initialTimeout = setTimeout(refreshDecks, 30000);
    
    // Then refresh every 2 minutes
    const interval = setInterval(refreshDecks, 2 * 60 * 1000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.slice(0, 9).map((deck) => (
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
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            {deck.description}
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

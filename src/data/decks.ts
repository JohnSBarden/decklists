import type { Deck } from "../types/deck";

export const decks: Deck[] = [
  {
    id: "atraxa-superfriends",
    name: "Atraxa Superfriends",
    commander: "Atraxa, Praetors' Voice",
    format: "Commander",
    description:
      "A powerful superfriends deck focused on planeswalker synergies and proliferate mechanics.",
    colors: ["W", "U", "B", "G"],
    image:
      "https://cards.scryfall.io/large/front/7/c/7cc19f85-7ef6-4fd2-83e5-0dbae1d80f2b.jpg?1682712582",
    lastUpdatedAtUtc: "2025-08-16T12:00:00Z",
  },
  {
    id: "balloon-snakes",
    name: "Balloon Snakes",
    format: "Standard",
    description:
      "Rakdos sacrifice strategy, splashing white for some shenanigans",
    colors: ["B", "R", "W"],
    image:
      "https://cards.scryfall.io/large/front/7/3/735e79b1-a3a9-4ddf-8bbc-f756c8a0452b.jpg?1721426484",
    lastUpdatedAtUtc: "2025-08-16T12:00:00Z",
    link: "https://moxfield.com/decks/uLQ8L31zAEqX4_H0YD5TZA",
  },
  {
    id: "plants-vs-zombies",
    name: "Plants vs Zombies",
    format: "Commander",
    commander: "The Necrobloom",
    description:
      "Landfall and land recursion, where the graveyard is a second library.",
    colors: ["W", "B", "G"],
    image:
      "https://cards.scryfall.io/large/front/9/0/90c5c8e0-0744-4bd3-a5a1-ca71c287569b.jpg?1719466273",
    lastUpdatedAtUtc: "2025-08-16T12:00:00Z",
    link: "https://moxfield.com/decks/j-jNmhBAZ0qRE9Hn4v9_Lg",
  },
  {
    id: "string-theory",
    name: "String Theory",
    format: "Commander",
    commander: "Magar of the Magic Strings",
    description: "Reanimate big mean Rakdos spells",
    colors: ["B", "R"],
    image:
      "https://cards.scryfall.io/large/front/a/6/a6f2ba13-cd72-4f7a-8443-8e3962f2ac46.jpg?1682551287",
    lastUpdatedAtUtc: "2025-08-16T12:00:00Z",
    link: "https://moxfield.com/decks/wN600XWhs0GL61s23ow7Og",
  },
  {
    id: "krazy-frog",
    name: "Krazy Frog",
    format: "Modern",
    description: "Orzhov Blink with a combo kill",
    colors: ["W", "B", "U"],
    image:
      "https://cards.scryfall.io/large/front/6/6/66901808-dbf3-435b-961d-1f7d68121f3c.jpg?1717201664",
    lastUpdatedAtUtc: "2025-08-16T12:00:00Z",
    link: "https://moxfield.com/decks/e-fkWU5Prkm2VVuzKiQw6w",
  },
];

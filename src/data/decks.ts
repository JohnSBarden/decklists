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
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-04-24"),
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
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-04-24"),
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
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-04-24"),
  },
];

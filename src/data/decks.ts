import type { Deck } from '../types/deck';

export const decks: Deck[] = [
  {
    id: 'atraxa-superfriends',
    name: 'Atraxa Superfriends',
    commander: 'Atraxa, Praetors\' Voice',
    format: 'Commander',
    description: 'A powerful superfriends deck focused on planeswalker synergies and proliferate mechanics.',
    colors: ['W', 'U', 'B', 'G'],
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-04-24'),
  },
  {
    id: 'krenko-mob-boss',
    name: 'Krenko\'s Goblin Army',
    commander: 'Krenko, Mob Boss',
    format: 'Commander',
    description: 'Fast-paced goblin tribal deck that can quickly overwhelm opponents with sheer numbers.',
    colors: ['R'],
    createdAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-04-24'),
  },
  {
    id: 'zur-enchanter',
    name: 'Zur\'s Enchanted Evening',
    commander: 'Zur the Enchanter',
    format: 'Commander',
    description: 'Control deck that uses powerful enchantments to lock down the board and win through various combos.',
    colors: ['W', 'U', 'B'],
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-04-24'),
  }
];

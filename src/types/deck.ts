export type MagicColor = "W" | "U" | "B" | "R" | "G";

export type Format =
  | "Commander"
  | "Modern"
  | "Legacy"
  | "Standard"
  | "Pioneer"
  | "Pauper";

export interface Deck {
  id: string;
  name: string;
  commander?: string;
  format: Format;
  description: string;
  colors: MagicColor[];
  image?: string;
  link?: string;
}

export interface TarotCard {
  id: number;
  name: string;
  type: string;
  suit: string;
  description: string;
  path: string;
  deckId: number;
  meaning: string;
  reversedMeaning: string;
  isReversed: boolean;
}

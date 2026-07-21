
export interface MoodEntry {
  id: string;
  name: string;
  synonyms: string[];
  related: string[];
  antonyms?: string[];   // ← new optional field
  behaviours: string[];
  actions: string[];
  phrases: string[];
  quotes: string[];
  palette: string[];
  season: string;
}

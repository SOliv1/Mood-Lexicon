export type LexiconCategory =
  | 'calm'
  | 'uplifted'
  | 'ethereal'
  | 'peaceful'
  | 'energetic'
  | 'abundance'
  | 'uncategorised';

export interface WordLookupResult {
  word: string;
  synonyms: string[];
  antonyms: string[];
}

export interface UserWordEntry extends WordLookupResult {
  category: LexiconCategory;
  matchedMood: string;
  tone: string;
}

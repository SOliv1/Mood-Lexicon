import { moods } from '../data/moods';
import type { LexiconCategory, WordLookupResult } from '../types/lexicon';

type ScoredMood = {
  id: LexiconCategory;
  score: number;
  tone: string;
};

const categoryIds: LexiconCategory[] = [
  'calm',
  'uplifted',
  'ethereal',
  'peaceful',
  'energetic',
  'abundance'
];

function normalize(term: string): string {
  return term.trim().toLowerCase();
}

function collectWords(entry: (typeof moods)[number]): string[] {
  return [
    entry.name,
    ...entry.synonyms,
    ...(entry.related ?? []),
    ...(entry.antonyms ?? [])
  ].map(normalize);
}

function scoreMood(word: string, lookup: WordLookupResult, mood: (typeof moods)[number]): number {
  const moodWords = new Set(collectWords(mood));
  const candidates = [
    word,
    ...lookup.synonyms,
    ...lookup.antonyms
  ].map(normalize);

  let score = 0;

  for (const candidate of candidates) {
    if (moodWords.has(candidate)) {
      score += candidate === word ? 6 : 2;
    }
  }

  for (const candidate of lookup.synonyms.map(normalize)) {
    if (mood.synonyms.some((synonym) => normalize(synonym) === candidate)) {
      score += 1;
    }
    if ((mood.related ?? []).some((related) => normalize(related) === candidate)) {
      score += 1;
    }
  }

  for (const candidate of lookup.antonyms.map(normalize)) {
    if ((mood.antonyms ?? []).some((antonym) => normalize(antonym) === candidate)) {
      score += 1;
    }
  }

  return score;
}

export function classifyWord(word: string, lookup: WordLookupResult): {
  category: LexiconCategory;
  matchedMood: string;
  tone: string;
} {
  const scored = moods
    .filter((mood) => categoryIds.includes(mood.id as LexiconCategory))
    .map((mood) => ({
      id: mood.id as LexiconCategory,
      score: scoreMood(word, lookup, mood),
      tone: mood.id === 'calm'
        ? 'soft, reflective, quiet'
        : mood.id === 'uplifted'
          ? 'uplifting, serendipitous, luminous'
          : mood.id === 'ethereal'
            ? 'light, airy, otherworldly'
            : mood.id === 'peaceful'
              ? 'balanced, warm, open'
              : mood.id === 'energetic'
                ? 'vivid, charged, kinetic'
                : 'abundant, grounded, generous'
    })) as ScoredMood[];

  const best = scored.sort((left, right) => right.score - left.score)[0];

  if (!best || best.score <= 0) {
    return {
      category: 'uncategorised',
      matchedMood: 'uncategorised',
      tone: 'still taking shape'
    };
  }

  return {
    category: best.id,
    matchedMood: best.id,
    tone: best.tone
  };
}

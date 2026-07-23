import { useEffect, useMemo, useState } from "react";
import AddWordPanel from "../components/AddWordPanel";
import CategoryPanel from "../components/CategoryPanel";
import MyWordsPanel from "../components/Lexicon/MyWordsPanel";
import { moods } from "../data/moods";
import "./Lexicon.css";

type UserWordEntry = {
  word: string;
  synonyms: string[];
  antonyms: string[];
  category: string;
  matchedMood: string;
  tone: string;
};

export type LexiconGrowthStats = {
  totalWords: number;
  categoryCounts: Record<string, number>;
  dominantCategory: string;
  recentWords: UserWordEntry[];
};

type LexiconProps = {
  isDrawer?: boolean;
  onClose?: () => void;
  onGrowthChange?: (stats: LexiconGrowthStats) => void;
};

const STORAGE_KEY = "mood-lexicon.user-words";

function createInitialCategories() {
  return moods.reduce(
    (acc, mood) => {
      acc[mood.id] = [] as UserWordEntry[];
      return acc;
    },
    { uncategorised: [] as UserWordEntry[] } as Record<string, UserWordEntry[]>
  );
}

function isUserWordEntry(value: unknown): value is UserWordEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as UserWordEntry;
  return (
    typeof entry.word === "string" &&
    Array.isArray(entry.synonyms) &&
    Array.isArray(entry.antonyms) &&
    typeof entry.category === "string" &&
    typeof entry.matchedMood === "string" &&
    typeof entry.tone === "string"
  );
}

function loadStoredWords(): UserWordEntry[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isUserWordEntry);
  } catch {
    return [];
  }
}

function groupWords(words: UserWordEntry[]) {
  const grouped = createInitialCategories();

  for (const word of words) {
    const category = grouped[word.category] ? word.category : "uncategorised";
    grouped[category] = [...grouped[category], word];
  }

  return grouped;
}

function buildGrowthStats(words: UserWordEntry[]): LexiconGrowthStats {
  const categoryCounts = words.reduce((acc, word) => {
    acc[word.category] = (acc[word.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dominantCategory =
    Object.entries(categoryCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "uncategorised";

  return {
    totalWords: words.length,
    categoryCounts,
    dominantCategory,
    recentWords: [...words].slice(-5).reverse()
  };
}

export default function Lexicon({ isDrawer = false, onClose, onGrowthChange }: LexiconProps) {
  const [myWords, setMyWords] = useState<UserWordEntry[]>([]);
  const [flashCategory, setFlashCategory] = useState<string | null>(null);
  const [flashTick, setFlashTick] = useState(0);

  useEffect(() => {
    setMyWords(loadStoredWords());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(myWords));
    } catch {
      // Ignore storage failures in private browsing or restricted contexts.
    }
  }, [myWords]);

  const categories = useMemo(() => groupWords(myWords), [myWords]);
  const growthStats = useMemo(() => buildGrowthStats(myWords), [myWords]);

  useEffect(() => {
    onGrowthChange?.(growthStats);
  }, [growthStats, onGrowthChange]);

  function handleWordAdded(entry: UserWordEntry) {
    setFlashCategory(entry.category);
    setFlashTick((current) => current + 1);
    setMyWords((prev) => [...prev, entry]);
  }

  const content = (
    <section className="lexicon-page">
      <MyWordsPanel stats={growthStats} words={myWords} />
      <AddWordPanel onWordAdded={handleWordAdded} />
      <CategoryPanel categories={categories} flashCategory={flashCategory} flashTick={flashTick} />
    </section>
  );

  if (!isDrawer) {
    return content;
  }

  return (
    <div className="lexicon-drawer-shell" id="living-lexicon-drawer" role="dialog" aria-modal="true" aria-label="Living lexicon drawer">
      <button className="lexicon-drawer-backdrop" type="button" aria-label="Close living lexicon" onClick={onClose} />
      <aside className="lexicon-drawer-panel">
        <div className="lexicon-drawer-header">
          <div>
            <p className="panel-eyebrow">Living lexicon</p>
            <h2>Words that breathe and learn</h2>
          </div>
          <button className="lexicon-drawer-close" type="button" onClick={onClose} aria-label="Close living lexicon">
            Close
          </button>
        </div>
        {content}
      </aside>
    </div>
  );
}
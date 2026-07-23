import "./MyWordsPanel.css";
import type { LexiconGrowthStats } from "../../pages/Lexicon";

type UserWordEntry = {
  word: string;
  synonyms: string[];
  antonyms: string[];
  category: string;
  matchedMood: string;
  tone: string;
};

type MyWordsPanelProps = {
  stats: LexiconGrowthStats;
  words: UserWordEntry[];
};

export default function MyWordsPanel({ stats, words }: MyWordsPanelProps) {
  const dominantLabel = stats.dominantCategory === "uncategorised" ? "still forming" : stats.dominantCategory;

  return (
    <section className="my-words-panel">
      <div className="my-words-header">
        <div>
          <p className="panel-eyebrow">My Words</p>
          <h3>Your personal lexicon</h3>
        </div>
        <div className="my-words-count" aria-live="polite">
          {stats.totalWords}
        </div>
      </div>

      <div className="my-words-summary">
        <span><strong>Dominant mood:</strong> {dominantLabel}</span>
        <span><strong>Growing categories:</strong> {Object.values(stats.categoryCounts).filter((value) => value > 0).length}</span>
      </div>

      {words.length > 0 ? (
        <ul className="my-words-list">
          {stats.recentWords.map((word) => (
            <li key={`${word.word}-${word.category}`}>
              <div className="my-words-row">
                <strong>{word.word}</strong>
                <span className={`my-word-pill mood-${word.category}`}>{word.category}</span>
              </div>
              <p>{word.tone}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="my-words-empty">Add a word to begin growing your personal lexicon.</p>
      )}
    </section>
  );
}
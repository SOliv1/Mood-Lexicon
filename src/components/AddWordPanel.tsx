import { useEffect, useMemo, useState, type FormEvent } from "react";
import { classifyWord } from "../utils/classifyWord";
import "./AddWordPanel.css";

type WordLookupResult = {
  word: string;
  synonyms: string[];
  antonyms: string[];
};

type UserWordEntry = WordLookupResult & {
  category: "calm" | "uplifted" | "ethereal" | "peaceful" | "energetic" | "abundance" | "uncategorised";
  matchedMood: string;
  tone: string;
};

type AddWordPanelProps = {
  onWordAdded: (entry: UserWordEntry) => void;
};

const MAX_WORDS_PER_SUBMIT = 8;

function splitWords(input: string): string[] {
  return input
    .split(/[\n,]/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

async function fetchWordLookup(word: string): Promise<WordLookupResult> {
  const normalized = encodeURIComponent(word.trim().toLowerCase());
  const [synonymsResponse, antonymsResponse] = await Promise.all([
    fetch(`https://api.datamuse.com/words?ml=${normalized}&max=12`),
    fetch(`https://api.datamuse.com/words?rel_ant=${normalized}&max=12`)
  ]);

  const [synonymData, antonymData] = await Promise.all([
    synonymsResponse.json() as Promise<Array<{ word: string }>>,
    antonymsResponse.json() as Promise<Array<{ word: string }>>
  ]);

  return {
    word: word.trim(),
    synonyms: synonymData.map((item) => item.word),
    antonyms: antonymData.map((item) => item.word)
  };
}

export default function AddWordPanel({ onWordAdded }: AddWordPanelProps) {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("Type a word to grow the lexicon.");
  const [lookup, setLookup] = useState<WordLookupResult | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  const wordsToAdd = useMemo(() => splitWords(word), [word]);
  const wordCount = wordsToAdd.length;
  const isOverLimit = wordCount > MAX_WORDS_PER_SUBMIT;
  const canLookup = useMemo(
    () => wordsToAdd.length === 1 && wordsToAdd[0].trim().length > 1,
    [wordsToAdd]
  );

  useEffect(() => {
    if (!canLookup) {
      setLookup(null);
      if (!wordCount) {
        setStatus("Type a word to grow the lexicon.");
      }
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLookingUp(true);
      try {
        const result = await fetchWordLookup(wordsToAdd[0]);
        if (!controller.signal.aborted) {
          setLookup(result);
          setStatus("Live lookup ready.");
        }
      } catch {
        if (!controller.signal.aborted) {
          setLookup(null);
          setStatus("Live lookup unavailable right now.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLookingUp(false);
        }
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [canLookup, wordCount, wordsToAdd]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!wordCount) {
      setStatus("Add at least one word first.");
      return;
    }

    if (isOverLimit) {
      setStatus(`Add up to ${MAX_WORDS_PER_SUBMIT} words at once.`);
      return;
    }

    setStatus(`Classifying ${wordCount} ${wordCount === 1 ? "word" : "words"}…`);

    let addedCount = 0;
    let upgradedCount = 0;

    for (const rawWord of wordsToAdd) {
      const trimmed = rawWord.trim();
      if (!trimmed) {
        continue;
      }

      try {
        const result =
          lookup?.word.toLowerCase() === trimmed.toLowerCase() && wordsToAdd.length === 1
            ? lookup
            : await fetchWordLookup(trimmed);

        const classification = classifyWord(trimmed, result);

        onWordAdded({
          ...result,
          category: classification.category,
          matchedMood: classification.matchedMood,
          tone: classification.tone
        });

        addedCount += 1;
        if (classification.category !== "uncategorised") {
          upgradedCount += 1;
        }
      } catch {
        // Skip failed lookups and continue with the rest.
      }
    }

    if (addedCount > 0) {
      setStatus(
        `Added ${addedCount} ${addedCount === 1 ? "word" : "words"}. ${upgradedCount} categorised.`
      );
      setWord("");
      setLookup(null);
      return;
    }

    setStatus("Could not classify words right now.");
  }

  return (
    <section className="add-word-panel">
      <form className="add-word-form" onSubmit={handleSubmit}>
        <div className="add-word-copy">
          <p className="panel-eyebrow">Living lexicon</p>
          <h3>Grow the mood map</h3>
          <p className="panel-description">
            Type up to {MAX_WORDS_PER_SUBMIT} words at once (comma-separated), let the thesaurus respond, and place them into the closest moods.
          </p>
        </div>

        <label className="add-word-field">
          <span className="sr-only">Add your own word</span>
          <input
            type="text"
            value={word}
            placeholder="calm, moonlit, grounded..."
            onChange={(event) => setWord(event.target.value)}
            autoComplete="off"
          />
        </label>

        <div className="add-word-helper-row" aria-live="polite">
          <span>Up to {MAX_WORDS_PER_SUBMIT} words each time.</span>
          <span className={`add-word-count ${isOverLimit ? "is-over-limit" : ""}`}>
            {wordCount}/{MAX_WORDS_PER_SUBMIT}
          </span>
        </div>

        <button type="submit" disabled={(isLookingUp && !lookup) || isOverLimit}>
          {isLookingUp ? "Looking up…" : "Add Words"}
        </button>
      </form>

      <div className="add-word-status-row">
        <p className="status">{status}</p>
        {lookup && (
          <div className="lookup-preview">
            <span>Synonyms: {lookup.synonyms.slice(0, 4).join(", ") || "none yet"}</span>
            <span>Antonyms: {lookup.antonyms.slice(0, 4).join(", ") || "none yet"}</span>
          </div>
        )}
      </div>
    </section>
  );
}

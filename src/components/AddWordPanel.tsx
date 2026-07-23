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

  const canLookup = useMemo(() => word.trim().length > 1, [word]);

  useEffect(() => {
    if (!canLookup) {
      setLookup(null);
      setStatus("Type a word to grow the lexicon.");
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLookingUp(true);
      try {
        const result = await fetchWordLookup(word);
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
  }, [word, canLookup]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = word.trim();
    if (!trimmed) {
      setStatus("Add a word first.");
      return;
    }

    setStatus("Classifying your word…");

    try {
      const result = lookup?.word.toLowerCase() === trimmed.toLowerCase()
        ? lookup
        : await fetchWordLookup(trimmed);

      const classification = classifyWord(trimmed, result);

      onWordAdded({
        ...result,
        category: classification.category,
        matchedMood: classification.matchedMood,
        tone: classification.tone
      });

      setStatus(`Added to ${classification.category} (${classification.tone}).`);
      setWord("");
      setLookup(null);
    } catch {
      setStatus("Could not classify word right now.");
    }
  }

  return (
    <section className="add-word-panel">
      <form className="add-word-form" onSubmit={handleSubmit}>
        <div className="add-word-copy">
          <p className="panel-eyebrow">Living lexicon</p>
          <h3>Grow the mood map</h3>
          <p className="panel-description">
            Type a word, let the thesaurus respond, and place it into the closest mood.
          </p>
        </div>

        <label className="add-word-field">
          <span className="sr-only">Add your own word</span>
          <input
            type="text"
            value={word}
            placeholder="Add your own word…"
            onChange={(event) => setWord(event.target.value)}
            autoComplete="off"
          />
        </label>

        <button type="submit" disabled={isLookingUp && !lookup}>
          {isLookingUp ? "Looking up…" : "Add Word"}
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

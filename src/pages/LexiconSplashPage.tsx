import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { classifyWord } from "../utils/classifyWord";
import type { UserWordEntry } from "../types/lexicon";
import { getSeason } from "../utils/getSeason";
import "./LexiconSplashPage.css";

const splashLines: Record<string, string> = {
  winter: "Soft winter light. Quiet words. A still beginning.",
  spring: "Fresh language unfolding like spring branches.",
  summer: "Warm clarity and bright emotional vocabulary.",
  autumn: "Gathered words, rich tones, grounded reflection.",
};

const SPLASH_REFLECTION_KEY = "mood-lexicon.splash-reflection";
const ONBOARDING_KEY = "lexicon-onboarded";
const USER_WORDS_KEY = "mood-lexicon.user-words";
const ONBOARDING_EVENT = "mood-lexicon:onboarding-complete";
const REFLECTION_SEEDED_EVENT = "mood-lexicon:reflection-seeded";
const RITUAL_CLEAR_PENDING_KEY = "mood-lexicon.ritual-clear-pending";

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

function extractReflectionWords(text: string): string[] {
  const tokens = text.match(/[A-Za-z][A-Za-z'-]{1,}/g) ?? [];
  const seen = new Set<string>();

  return tokens
    .map((token) => token.toLowerCase())
    .filter((token) => {
      if (seen.has(token)) {
        return false;
      }
      seen.add(token);
      return true;
    });
}

function seedReflectionWords(reflectionWords: string): { seededCount: number; extractedCount: number } {
  const words = extractReflectionWords(reflectionWords);
  if (!words.length) {
    return { seededCount: 0, extractedCount: 0 };
  }

  try {
    const stored = window.localStorage.getItem(USER_WORDS_KEY);
    const parsed = stored ? (JSON.parse(stored) as unknown) : [];
    const existingEntries = Array.isArray(parsed) ? parsed.filter(isUserWordEntry) : [];
    const existingWords = new Set(existingEntries.map((entry) => entry.word.toLowerCase()));

    const seededEntries: UserWordEntry[] = [];
    for (const word of words) {
      if (existingWords.has(word)) {
        continue;
      }

      const classification = classifyWord(word, {
        word,
        synonyms: [],
        antonyms: [],
      });

      seededEntries.push({
        word,
        synonyms: [],
        antonyms: [],
        category: classification.category,
        matchedMood: classification.matchedMood,
        tone: classification.tone,
      });
      existingWords.add(word);
    }

    if (seededEntries.length) {
      window.localStorage.setItem(USER_WORDS_KEY, JSON.stringify([...existingEntries, ...seededEntries]));
    }

    return { seededCount: seededEntries.length, extractedCount: words.length };
  } catch {
    // Ignore storage errors to keep onboarding uninterrupted.
    return { seededCount: 0, extractedCount: words.length };
  }
}

export default function LexiconSplashPage() {
  const navigate = useNavigate();
  const season = getSeason();
  const [reflectionWords, setReflectionWords] = useState("");
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SPLASH_REFLECTION_KEY);
      if (stored) {
        setReflectionWords(stored);
      }

      setHasOnboarded(window.localStorage.getItem(ONBOARDING_KEY) === "true");
    } catch {
      // Ignore storage errors and keep an empty reflection field.
    }
  }, []);

  const handleReflectionChange = (nextValue: string) => {
    setReflectionWords(nextValue);

    try {
      window.localStorage.setItem(SPLASH_REFLECTION_KEY, nextValue);
    } catch {
      // Ignore storage write failures to keep the experience uninterrupted.
    }
  };

  const completeArrivalAndSeed = () => {
    const { seededCount, extractedCount } = seedReflectionWords(reflectionWords);

    try {
      window.localStorage.setItem(ONBOARDING_KEY, "true");
    } catch {
      // Ignore storage write failures and continue into the ritual.
    }

    setHasOnboarded(true);

    try {
      if (extractedCount > 0) {
        window.localStorage.setItem(
          RITUAL_CLEAR_PENDING_KEY,
          JSON.stringify({
            pending: true,
            seededCount,
            extractedCount,
            savedAt: Date.now(),
          })
        );
      }
    } catch {
      // Ignore storage failures.
    }

    window.dispatchEvent(new Event(ONBOARDING_EVENT));
    window.dispatchEvent(new CustomEvent(REFLECTION_SEEDED_EVENT, { detail: { seededCount, extractedCount } }));
  };

  const enterLightRitual = () => {
    completeArrivalAndSeed();
    navigate("/#light-ritual");
  };

  const continueIntoHome = () => {
    completeArrivalAndSeed();
  };

  return (
    <section className={`lexicon-splash lexicon-splash-${season}`}>
      <button
        type="button"
        className={`splash-mode-toggle ${immersiveMode ? "is-return-pill" : ""}`}
        onClick={() => setImmersiveMode((current) => !current)}
      >
        {immersiveMode ? "Show Ritual Guide" : "Meditate on Scene"}
      </button>

      <div className={`splash-panel ${immersiveMode ? "is-hidden" : "splash-panel-breathing"}`}>
        <p className="splash-kicker">Reflections in Light</p>
        <h1>Mood Lexicon</h1>
        <p>{splashLines[season] ?? splashLines.winter}</p>
        <p className="splash-meditation-line">
          Focus softly on the calm, peaceful, tranquil countryside scene. Let
          the text fade and return while you settle into a living, breathing
          atmospheric ritual. Step into the Light Ritual when you are ready.
        </p>

        <div className="splash-reflection-field">
          <label htmlFor="splash-reflection-input">Ritual Noticings</label>
          <p className="splash-reflection-help">
            Pause with the landscape, notice what feels living and breathing,
            then gather the words that arrive.
          </p>
          <textarea
            id="splash-reflection-input"
            value={reflectionWords}
            onChange={(event) => handleReflectionChange(event.target.value)}
            placeholder="Breathing, tranquil, moonlit, grounded, softly alive..."
            rows={3}
          />
        </div>

        <section className="splash-steps" aria-label="Arrival Ritual steps">
          <h2>How the Light Ritual Flows</h2>
          <ol>
            <li>Arrive with the atmospheric countryside scene and let your focus settle.</li>
            <li>Add your ritual noticings as they come to mind.</li>
            <li>Choose {hasOnboarded ? "Return to the Light Ritual" : "Step Into the Light Ritual"} to continue into the ritual or Continue into Home to enter the wider lexicon.</li>
          </ol>
        </section>

        <div className="splash-actions">
          <button type="button" className="splash-button splash-primary" onClick={enterLightRitual}>{hasOnboarded ? "Return to the Light Ritual" : "Step Into the Light Ritual"}</button>
          <Link to="/" className="splash-button splash-secondary" onClick={continueIntoHome}>Continue into Home</Link>
        </div>
      </div>
    </section>
  );
}
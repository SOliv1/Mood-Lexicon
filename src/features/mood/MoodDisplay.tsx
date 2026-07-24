import React, { useEffect, useMemo, useRef, useState } from "react";
import type { MoodEntry } from "../../types/mood";
import { moodEcho } from "../../data/moods/engine/moodEngine";
import "./MoodDisplay.css";
import "../../components/Ritual/Snow.css";
import { moods } from "../../data/moods";
import { resolveMood, microNudge } from "../../data/moods/engine/moodEngine";
import RitualCard from "./RitualCard";
import { type SeasonMode, type WeatherMode } from "../../theme/atmosphere";
import { classifyWord } from "../../utils/classifyWord";
import type { UserWordEntry } from "../../types/lexicon";

type MoodDisplayProps = {
  seasonMode: SeasonMode;
  weatherMode: WeatherMode;
};

const SPLASH_REFLECTION_KEY = "mood-lexicon.splash-reflection";
const REFLECTION_SEEDED_EVENT = "mood-lexicon:reflection-seeded";
const RITUAL_CLEAR_PENDING_KEY = "mood-lexicon.ritual-clear-pending";
const USER_WORDS_KEY = "mood-lexicon.user-words";
const USER_WORDS_UPDATED_EVENT = "mood-lexicon:user-words-updated";

function splitWords(input: string): string[] {
  const seen = new Set<string>();
  return input
    .split(/[\n,]/g)
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .filter((word) => {
      if (seen.has(word)) {
        return false;
      }
      seen.add(word);
      return true;
    });
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

export default function MoodDisplay({ seasonMode, weatherMode }: MoodDisplayProps) {
  // Feeling input + engine results
  const [feeling, setFeeling] = useState("");
  const [suggestion, setSuggestion] = useState<MoodEntry | null>(null);
  const [nudge, setNudge] = useState<string | null>(null);
  const [isRitualInputFading, setIsRitualInputFading] = useState(false);
  const [showRitualAbsorbedIcon, setShowRitualAbsorbedIcon] = useState(false);
  const [ritualEffectTick, setRitualEffectTick] = useState(0);
  const fadeTimeoutRef = useRef<number | null>(null);
  const iconTimeoutRef = useRef<number | null>(null);

  const [echo, setEcho] = useState<string | null>(null);
  const weatherMoodNudges: Record<WeatherMode, string> = {
    clear: "Clear skies support focus and uplift.",
    rain: "Rainy weather pairs well with calm and reflective moods.",
    snow: "Snowy air supports restful and peaceful moods.",
  };
  const seasonClass = suggestion?.season.toLowerCase() ?? seasonMode;

  const runMoodSuggestion = (input: string): MoodEntry | null => {
    const trimmed = input.trim();
    if (!trimmed) {
      setSuggestion(null);
      setNudge(null);
      setEcho(null);
      return null;
    }

    const moodEntry = resolveMood(trimmed, moods);
    setSuggestion(moodEntry);
    setNudge(moodEntry ? microNudge(moodEntry) : null);
    setEcho(moodEntry ? moodEcho(moodEntry) : null);
    return moodEntry;
  };

  const absorbRitualWords = (input: string): number => {
    const words = splitWords(input);
    if (!words.length) {
      return 0;
    }

    try {
      const stored = window.localStorage.getItem(USER_WORDS_KEY);
      const parsed = stored ? (JSON.parse(stored) as unknown) : [];
      const existingEntries = Array.isArray(parsed) ? parsed.filter(isUserWordEntry) : [];
      const nextEntries = [...existingEntries];
      let absorbedCount = 0;

      for (const word of words) {
        const classification = classifyWord(word, {
          word,
          synonyms: [],
          antonyms: [],
        });

        const incoming: UserWordEntry = {
          word,
          synonyms: [],
          antonyms: [],
          category: classification.category,
          matchedMood: classification.matchedMood,
          tone: classification.tone,
        };

        const existingIndex = nextEntries.findIndex(
          (entry) => entry.word.trim().toLowerCase() === word
        );

        if (existingIndex === -1) {
          nextEntries.push(incoming);
          absorbedCount += 1;
          continue;
        }

        const existing = nextEntries[existingIndex];
        const shouldUpgradeCategory =
          existing.category === "uncategorised" && incoming.category !== "uncategorised";

        if (shouldUpgradeCategory) {
          nextEntries[existingIndex] = {
            ...existing,
            ...incoming,
          };
          absorbedCount += 1;
        }
      }

      if (absorbedCount > 0) {
        window.localStorage.setItem(USER_WORDS_KEY, JSON.stringify(nextEntries));
        window.dispatchEvent(new Event(USER_WORDS_UPDATED_EVENT));
      }

      return absorbedCount;
    } catch {
      return 0;
    }
  };

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 23) % 100}%`,
        delay: `${(i % 12) * 0.24}s`,
        duration: `${4.2 + (i % 6) * 0.5}s`,
      })),
    []
  );

  const fadeAndClearRitualInput = () => {
    if (fadeTimeoutRef.current !== null) {
      window.clearTimeout(fadeTimeoutRef.current);
    }
    if (iconTimeoutRef.current !== null) {
      window.clearTimeout(iconTimeoutRef.current);
    }

    setShowRitualAbsorbedIcon(false);
    setRitualEffectTick((current) => current + 1);

    window.requestAnimationFrame(() => {
      setShowRitualAbsorbedIcon(true);
    });

    setIsRitualInputFading(true);

    fadeTimeoutRef.current = window.setTimeout(() => {
      setFeeling("");
      setIsRitualInputFading(false);
    }, 1500);

    iconTimeoutRef.current = window.setTimeout(() => {
      setShowRitualAbsorbedIcon(false);
    }, 2700);
  };

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
      if (iconTimeoutRef.current !== null) {
        window.clearTimeout(iconTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const syncFeelingFromReflection = (event?: Event) => {
      try {
        const storedReflection = window.localStorage.getItem(SPLASH_REFLECTION_KEY)?.trim() ?? "";
        if (!storedReflection) {
          return;
        }

        let shouldFadeAfterPrefill = false;
        const seededEvent = event as CustomEvent<{ seededCount?: number; extractedCount?: number }> | undefined;
        if (seededEvent?.detail?.extractedCount && seededEvent.detail.extractedCount > 0) {
          shouldFadeAfterPrefill = true;
        }

        if (!shouldFadeAfterPrefill) {
          const pendingRaw = window.localStorage.getItem(RITUAL_CLEAR_PENDING_KEY);
          if (pendingRaw) {
            const pending = JSON.parse(pendingRaw) as { pending?: boolean; extractedCount?: number };
            shouldFadeAfterPrefill = Boolean(pending?.pending && (pending?.extractedCount ?? 0) > 0);
          }
        }

        setFeeling((current) => {
          if (current.trim().length) {
            return current;
          }

          runMoodSuggestion(storedReflection);
          return storedReflection;
        });

        if (shouldFadeAfterPrefill) {
          window.setTimeout(() => {
            fadeAndClearRitualInput();
            try {
              window.localStorage.removeItem(RITUAL_CLEAR_PENDING_KEY);
            } catch {
              // Ignore storage failures.
            }
          }, 1700);
        }
      } catch {
        // Ignore storage access errors.
      }
    };

    syncFeelingFromReflection();
    window.addEventListener(REFLECTION_SEEDED_EVENT, syncFeelingFromReflection);

    return () => {
      window.removeEventListener(REFLECTION_SEEDED_EVENT, syncFeelingFromReflection);
    };
  }, []);

  return (
    <div className={`mood-suggestion mood-${seasonClass} mood-weather-${weatherMode}`}>
      {weatherMode === "snow" && (
        <div className="weather-layer snow" aria-hidden="true">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: flake.left,
                animationDelay: flake.delay,
                animationDuration: flake.duration,
              }}
            />
          ))}
        </div>
      )}

      <RitualCard
          feeling={feeling}
          setFeeling={setFeeling}
          isInputFading={isRitualInputFading}
          showAbsorbedIcon={showRitualAbsorbedIcon}
          effectTick={ritualEffectTick}
          onCheckMood={() => {
          const moodEntry = runMoodSuggestion(feeling);
          if (!moodEntry) {
            return;
          }

          absorbRitualWords(feeling);
          fadeAndClearRitualInput();
        }}
        season={suggestion?.season ?? seasonMode}
      />


      {suggestion && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Suggested Mood: {suggestion.name}</h3>
          <p>{nudge}</p>
          <p style={{ opacity: 0.7 }}>Season: {suggestion.season}</p>
          <p className="weather-mood-nudge">{weatherMoodNudges[weatherMode]}</p>
        </div>
      )}
      {echo && <p className="mood-echo">{echo}</p>}
    </div>
  );
}

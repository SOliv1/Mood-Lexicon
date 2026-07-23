import type { MoodEntry } from "../../../types/mood";

/**
 * Suggest a mood based on an antonym match.
 */
export function suggestMoodFromAntonym(
  input: string,
  moods: MoodEntry[]
): MoodEntry | null {
  const lower = input.toLowerCase();

  for (const mood of moods) {
    if (
      mood.antonyms &&
      mood.antonyms.some((a: string) => a.toLowerCase() === lower)
    ) {
      return mood;
    }
  }

  return null;
}

/**
 * Micro‑nudges: gentle supportive copy for each mood.
 */
export function microNudge(mood: MoodEntry): string {
  const nudges: Record<string, string> = {
    calm: "Let’s soften the pace a little.",
    uplifted: "A small spark can lift the moment.",
    ethereal: "Let the moment stay light and unforced.",
    peaceful: "Let’s bring things back into balance.",
    energetic: "Let’s build a little momentum.",
    abundance: "There is enough. You are supported."
  };

  return nudges[mood.id] ?? "Let’s take a gentle step forward.";
}

/**
 * Seasonal emotional shadows.
 */

export const seasonalShadows: Record<string, string[]> = {
  Winter: ["agitated", "restless", "tense", "frantic", "overwhelmed", "anxious"],
  Spring: ["low", "depressed", "flat", "heavy", "hopeless", "discouraged"],
  Summer: ["conflicted", "unsettled", "irritated", "angry", "upset", "sad"],
  Autumn: ["sluggish", "tired", "exhausted", "drained", "slow", "lethargic"],
  Harvest: ["scarcity", "fear", "lack", "empty", "restricted", "insecure"]
};

/**
 * Suggest a mood based on seasonal shadow mapping.
 */
export function suggestSeasonalMood(
  input: string,
  moods: MoodEntry[]
): MoodEntry | null {
  const lower = input.toLowerCase();

  for (const season in seasonalShadows) {
    if (seasonalShadows[season].includes(lower)) {
      return moods.find(m => m.season === season) ?? null;
    }
  }

  return null;
}

/**
 * Unified resolver:
 * 1. Check antonyms (fuzzy match)
 * 2. Check seasonal shadows (fuzzy match)
 * 3. Fallback mood
 */

export function resolveMood(
  input: string,
  moods: MoodEntry[]
): MoodEntry | null {
  const lower = input.toLowerCase().trim();

  // 1. Antonym fuzzy match
  for (const mood of moods) {
    if (
      mood.antonyms &&
      mood.antonyms.some((a: string) =>
        lower.includes(a.toLowerCase())
      )
    ) {
      return mood;
    }
  }

  // 2. Seasonal shadow fuzzy match
  for (const season in seasonalShadows) {
    if (
      seasonalShadows[season].some((shadow: string) =>
        lower.includes(shadow.toLowerCase())
      )
    ) {
      return moods.find(m => m.season === season) ?? null;
    }
  }

  // 3. Fallback mood (gentle default)
  return moods.find(m => m.id === "peaceful") ?? null;
}

export interface FeelingClassification {
  raw: string;
  normalized: string;
  category: "agitation" | "low" | "sadness" | "conflict" | "tiredness" | "scarcity" | "unknown";
}

export function classifyFeeling(input: string): FeelingClassification {
  const lower = input.toLowerCase();

  if (["agitated", "restless", "tense", "anxious", "overwhelmed", "stressed"].some(w => lower.includes(w))) {
    return { raw: input, normalized: "agitated", category: "agitation" };
  }

  if (["low", "depressed", "flat", "heavy", "hopeless"].some(w => lower.includes(w))) {
    return { raw: input, normalized: "low", category: "low" };
  }

  if (["sad", "blue", "hurt", "upset"].some(w => lower.includes(w))) {
    return { raw: input, normalized: "sad", category: "sadness" };
  }

  if (["conflicted", "angry", "irritated", "frustrated"].some(w => lower.includes(w))) {
    return { raw: input, normalized: "conflicted", category: "conflict" };
  }

  if (["tired", "sluggish", "exhausted", "drained"].some(w => lower.includes(w))) {
    return { raw: input, normalized: "tired", category: "tiredness" };
  }

  if (["scarcity", "lack", "empty", "insecure", "restricted"].some(w => lower.includes(w))) {
    return { raw: input, normalized: "scarcity", category: "scarcity" };
  }

  return { raw: input, normalized: lower, category: "unknown" };
}
// 4. Mood echo
export function moodEcho(mood: MoodEntry): string {
  const echoes: Record<string, string> = {
    calm: "Everything is allowed to slow down now.",
    peaceful: "The moment is settling into clarity.",
    uplifted: "A small spark is enough to begin again.",
    ethereal: "Some moments are meant to stay tender.",
    energetic: "Movement returns in its own time.",
    abundance: "Fullness gathers quietly around you."
  };

  return echoes[mood.id] ?? "";
}


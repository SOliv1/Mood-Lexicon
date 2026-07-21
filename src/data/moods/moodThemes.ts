// src/data/moodThemes.ts

export type MoodTheme = {
  id: string;
  name: string;
  color: string;
  atmosphere: {
    season: "spring" | "summer" | "autumn" | "winter";
    time: "morning" | "day" | "evening" | "night";
    weather: "clear" | "rain" | "snow";
  };
  lexicon: {
    synonyms: string[];
    antonyms: string[];
    tone: string;
  };
};

export const moodThemes: MoodTheme[] = [
  {
    id: "serene",
    name: "Serene",
    color: "#A7C6D8",
    atmosphere: { season: "winter", time: "night", weather: "snow" },
    lexicon: {
      synonyms: ["calm", "tranquil", "peaceful", "still", "gentle"],
      antonyms: ["chaotic", "restless", "noisy", "agitated", "turbulent"],
      tone: "soft, reflective, quiet"
    }
  },
  {
    id: "radiant",
    name: "Radiant",
    color: "#FFD97A",
    atmosphere: { season: "summer", time: "day", weather: "clear" },
    lexicon: {
      synonyms: ["bright", "warm", "joyful", "glowing", "alive"],
      antonyms: ["dim", "cold", "gloomy", "dull", "lifeless"],
      tone: "uplifting, luminous, open"
    }
  },
  {
    id: "wistful",
    name: "Wistful",
    color: "#E0B0A8",
    atmosphere: { season: "autumn", time: "evening", weather: "clear" },
    lexicon: {
      synonyms: ["melancholic", "dreamy", "reflective", "tender"],
      antonyms: ["carefree", "cheerful", "indifferent", "brisk"],
      tone: "soft nostalgia, gentle longing"
    }
  },
  {
    id: "renewal",
    name: "Renewal",
    color: "#A2D9B2",
    atmosphere: { season: "spring", time: "morning", weather: "clear" },
    lexicon: {
      synonyms: ["fresh", "hopeful", "awakening", "alive", "gentle"],
      antonyms: ["stagnant", "wilted", "dormant", "cold", "barren"],
      tone: "warm, tender, luminous"
    }
  }
];

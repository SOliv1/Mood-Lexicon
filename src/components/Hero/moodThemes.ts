export type MoodTheme = {
  id: string;
  name: string;
  color: string;
  gradient: {
    from: string;
    to: string;
  };
  motion: {
    intensity: number; // 0.0 – 1.0
    speed: number;     // seconds
  };
  atmosphere: {
    season: "spring" | "summer" | "autumn" | "winter";
    time: "day" | "night" | "morning" | "evening";
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
    id: "calm",
    name: "Serene",
    color: "#A7C6D8",
    gradient: {
      from: "#1B2735",
      to: "#A7C6D8"
    },
    motion: {
      intensity: 0.15,
      speed: 12
    },
    atmosphere: { season: "winter", time: "night", weather: "snow" },
    lexicon: {
      synonyms: ["calm", "tranquil", "peaceful", "still", "gentle"],
      antonyms: ["chaotic", "restless", "noisy", "agitated", "turbulent"],
      tone: "soft, reflective, quiet"
    }
  },
  {
    id: "uplifted",
    name: "Radiant",
    color: "#FFD97A",
    gradient: {
      from: "#FFF3E0",
      to: "#FFD97A"
    },
    motion: {
      intensity: 0.3,
      speed: 8
    },
    atmosphere: { season: "summer", time: "day", weather: "clear" },
    lexicon: {
      synonyms: ["bright", "warm", "joyful", "glowing", "alive"],
      antonyms: ["dim", "cold", "gloomy", "dull", "lifeless"],
      tone: "uplifting, luminous, open"
    }
  },
  {
    id: "peaceful",
    name: "Wistful",
    color: "#A7C6D8",
    gradient: {
      from: "#1B2735",
      to: "#A7C6D8"
    },
    motion: {
      intensity: 0.15,
      speed: 12
    },
    atmosphere: { season: "winter", time: "night", weather: "snow" },
    lexicon: {
      synonyms: ["calm", "tranquil", "peaceful", "still", "gentle"],
      antonyms: ["chaotic", "restless", "noisy", "agitated", "turbulent"],
      tone: "soft, reflective, quiet"
    }
  },
  {
    id: "energetic",
    name: "Energetic",
    color: "#FF6F91",
    gradient: {
      from: "#3A1025",
      to: "#FF6F91"
    },
    motion: {
      intensity: 0.32,
      speed: 7
    },
    atmosphere: { season: "autumn", time: "evening", weather: "clear" },
    lexicon: {
      synonyms: ["vibrant", "charged", "alive", "spirited", "dynamic"],
      antonyms: ["lethargic", "sluggish", "flat", "drained", "dull"],
      tone: "vivid, charged, kinetic"
    }
  },
  {
    id: "abundance",
    name: "Renewal",
    color: "#A7D8C6",
    gradient: {
      from: "#1B3527",
      to: "#A7D8C6"
    },
    motion: {
      intensity: 0.2,
      speed: 10
    },
    atmosphere: { season: "spring", time: "morning", weather: "clear" },
    lexicon: {
      synonyms: ["fresh", "revitalized", "rejuvenated", "renewed", "invigorated"],
      antonyms: ["stale", "worn", "tired", "exhausted", "depleted"],
      tone: "refreshing, uplifting, lively"
    }
  }

];

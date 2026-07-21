import React, { useState } from "react";
import type { MoodEntry } from "../../types/mood";
import { moodEcho } from "../../data/moods/engine/moodEngine";
import "./MoodDisplay.css";
import { moods } from "../../data/moods";
import { resolveMood, microNudge } from "../../data/moods/engine/moodEngine";
import RitualCard from "./RitualCard";
import { type WeatherMode } from "../../theme/atmosphere";

type MoodDisplayProps = {
  weatherMode: WeatherMode;
};

export default function MoodDisplay({ weatherMode }: MoodDisplayProps) {
  // Feeling input + engine results
  const [feeling, setFeeling] = useState("");
  const [suggestion, setSuggestion] = useState<MoodEntry | null>(null);
  const [nudge, setNudge] = useState<string | null>(null);

  const [echo, setEcho] = useState<string | null>(null);
  const weatherMoodNudges: Record<WeatherMode, string> = {
    clear: "Clear skies support focus and uplift.",
    rain: "Rainy weather pairs well with calm and reflective moods.",
    snow: "Snowy air supports restful and peaceful moods.",
  };
  const seasonClass = suggestion?.season.toLowerCase() ?? "summer";

  return (
    <div className={`mood-suggestion mood-${seasonClass} mood-weather-${weatherMode}`}>

      <RitualCard
          feeling={feeling}
          setFeeling={setFeeling}
          onCheckMood={() => {
          const moodEntry = resolveMood(feeling, moods);
          setSuggestion(moodEntry);
          setNudge(moodEntry ? microNudge(moodEntry) : null);
          setEcho(moodEntry ? moodEcho(moodEntry) : null);
        }}
        season={suggestion?.season}
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

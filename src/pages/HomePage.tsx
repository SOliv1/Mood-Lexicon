import MoodDisplay from "../features/mood/MoodDisplay";
import MoodDetail from "../components/Mood/MoodDetail";
import HeroHeader from "../components/Hero/HeroHeader";
import { type CSSProperties, useState } from "react";
import "../components/Mood/MoodDetail.css";
import "../features/mood/FloatingLexicon.css";
import "./HomePage.css";

import AtmospherePanel from "../components/Ritual/AtmospherePanel";
import AtmosphericButtons from "../components/Ritual/AtmosphericButtons";
import { type TimeMode, type SeasonMode, type WeatherMode } from "../theme/atmosphere";
import { RootState } from "../store";
import { useSelector } from "react-redux";

type HomePageProps = {
  timeMode: TimeMode;
  seasonMode: SeasonMode;
  weatherMode: WeatherMode;
  temperature: number | null;
  weatherLabel: string;
  currentTime: string;
  autoWeather: boolean;
  weatherSource: "auto" | "manual";
  setAutoWeather: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  setWeatherSource: (source: "auto" | "manual") => void;
  setTimeMode: (mode: TimeMode) => void;
  setSeasonMode: (mode: SeasonMode) => void;
  setWeatherMode: (mode: WeatherMode) => void;
};

export default function HomePage({
  timeMode,
  seasonMode,
  weatherMode,
  temperature,
  weatherLabel,
  currentTime,
  autoWeather,
  weatherSource,
  setAutoWeather,
  setWeatherSource,
  setTimeMode,
  setSeasonMode,
  setWeatherMode,
}: HomePageProps) {

  const mood = useSelector((state: RootState) => state.moodLexicon.selectedMood);
  const [showLexicon, setShowLexicon] = useState(true);
  const palette = mood?.palette ?? ["#CFE8F3", "#DDEFF7", "#BBD7E8", "#A7C6D8", "#2f3b55"];
  const moodStyle = {
    "--mood-primary": palette[0],
    "--mood-secondary": palette[1] ?? palette[0],
    "--mood-accent": palette[2] ?? palette[0],
    "--mood-strong": palette[3] ?? palette[2] ?? palette[0],
    "--mood-ink": palette[4] ?? "#2f3b55",
  } as CSSProperties;

  return (
    <main className={`homepage-shell homepage-mood-${mood?.id ?? "calm"}`} style={moodStyle}>
      <section className="homepage-hero-zone">
        <HeroHeader currentMood={mood?.id} />
      </section>

      <section className="homepage-ritual-zone">
        <MoodDisplay seasonMode={seasonMode} weatherMode={weatherMode} />
        <button
          className="lexicon-toggle-button"
          onClick={() => setShowLexicon((current) => !current)}
          aria-controls="home-lexicon"
          aria-expanded={showLexicon}
        >
          {showLexicon ? "Hide Lexicon" : "Show Lexicon"}
        </button>
      </section>

      <section
        className={`home-lexicon-stage ${showLexicon ? "is-open" : "is-closed"}`}
        id="home-lexicon"
      >
        <MoodDetail />
      </section>

      <AtmospherePanel
        timeMode={timeMode}
        seasonMode={seasonMode}
        weatherMode={weatherMode}
        temperature={temperature}
        weatherLabel={weatherLabel}
        currentTime={currentTime}
      />

      <AtmosphericButtons
        timeMode={timeMode}
        seasonMode={seasonMode}
        autoWeather={autoWeather}
        weatherSource={weatherSource}
        setAutoWeather={setAutoWeather}
        setWeatherSource={setWeatherSource}
        setTimeMode={setTimeMode}
        setSeasonMode={setSeasonMode}
        setWeatherMode={setWeatherMode}
        weatherMode={weatherMode}
      />
    </main>
  );
}

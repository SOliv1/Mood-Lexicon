import { useEffect, useState, type CSSProperties } from "react";
import { useSelector } from "react-redux";
import AtmospherePanel from "../components/Ritual/AtmospherePanel";
import AtmosphericButtons from "../components/Ritual/AtmosphericButtons";
import GroundingCompass from "../components/Ritual/GroundingCompass";
import HeroHeader from "../components/Hero/HeroHeader";
import MoodDetail from "../components/Mood/MoodDetail";
import MoodDisplay from "../features/mood/MoodDisplay";
import Lexicon, { type LexiconGrowthStats } from "./Lexicon";
import { RootState } from "../store";
import { type SeasonMode, type TimeMode, type WeatherMode } from "../theme/atmosphere";
import "../components/Mood/MoodDetail.css";
import "../features/mood/FloatingLexicon.css";
import "./HomePage.css";

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

const LEXICON_STORAGE_KEY = "mood-lexicon.user-words";

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const expanded = normalized.length === 3
    ? normalized.split("").map((segment) => segment + segment).join("")
    : normalized;

  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

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
  const [showLivingLexicon, setShowLivingLexicon] = useState(false);
  const [lexiconGrowth, setLexiconGrowth] = useState<LexiconGrowthStats | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LEXICON_STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as Array<{ category?: string }>;
      if (!Array.isArray(parsed)) {
        return;
      }

      const categoryCounts = parsed.reduce((acc, entry) => {
        const category = entry?.category ?? "uncategorised";
        acc[category] = (acc[category] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const dominantCategory =
        Object.entries(categoryCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "uncategorised";

      setLexiconGrowth({
        totalWords: parsed.length,
        categoryCounts,
        dominantCategory,
        recentWords: [],
      });
    } catch {
      // Ignore storage parse failures and keep the default mood gradient.
    }
  }, []);

  const palette = mood?.palette ?? ["#CFE8F3", "#DDEFF7", "#BBD7E8", "#A7C6D8", "#2f3b55"];
  const growthPalette: Record<string, string> = {
    calm: "#A7C6D8",
    uplifted: "#FFD97A",
    ethereal: "#EAF4FF",
    peaceful: "#E0B0A8",
    energetic: "#FF6F91",
    abundance: "#D9B26C",
    uncategorised: "#B9C4D1",
  };

  const totalWords = lexiconGrowth?.totalWords ?? 0;
  const recentCount = lexiconGrowth?.recentWords.length ?? 0;
  const growthColor = growthPalette[lexiconGrowth?.dominantCategory ?? "uncategorised"] ?? palette[2];

  const moodStyle = {
    "--mood-primary": palette[0],
    "--mood-secondary": palette[1] ?? palette[0],
    "--mood-accent": palette[2] ?? palette[0],
    "--mood-strong": palette[3] ?? palette[2] ?? palette[0],
    "--mood-ink": palette[4] ?? "#2f3b55",
    "--growth-primary": hexToRgba(growthColor, Math.min(0.42, 0.14 + totalWords * 0.015)),
    "--growth-secondary": hexToRgba(palette[0], Math.min(0.28, 0.08 + totalWords * 0.008)),
    "--growth-highlight": hexToRgba(palette[2] ?? growthColor, Math.min(0.22, 0.06 + recentCount * 0.04)),
  } as CSSProperties;

  return (
    <main className={`homepage-shell homepage-mood-${mood?.id ?? "calm"}`} style={moodStyle}>
      <section className="homepage-hero-zone">
        <HeroHeader currentMood={mood?.id} />
      </section>

      <section className="homepage-ritual-zone">
        <section id="light-ritual">
          <MoodDisplay seasonMode={seasonMode} weatherMode={weatherMode} />
        </section>
        <div className="homepage-ritual-actions">
          <button
            className="lexicon-toggle-button"
            onClick={() => setShowLexicon((current) => !current)}
            aria-controls="home-lexicon"
            aria-expanded={showLexicon}
          >
            {showLexicon ? "Hide Lexicon" : "Show Lexicon"}
          </button>
          <div className="living-lexicon-cta">
            <p className="living-lexicon-subtitle">Living Lexicon</p>
            <button
              className="living-lexicon-toggle-button"
              onClick={() => setShowLivingLexicon(true)}
              aria-controls="living-lexicon-drawer"
              aria-expanded={showLivingLexicon}
            >
              Open My Words
            </button>
          </div>
        </div>

        <section id="grounding-compass" className="homepage-grounding-zone" aria-label="Grounding Compass">
          <GroundingCompass />
        </section>
      </section>

      <section
        className={`home-lexicon-stage ${showLexicon ? "is-open" : "is-closed"}`}
        id="home-lexicon"
      >
        <MoodDetail />
      </section>

      {showLivingLexicon && (
        <Lexicon
          isDrawer
          onClose={() => setShowLivingLexicon(false)}
          onGrowthChange={setLexiconGrowth}
        />
      )}

      <section id="atmosphere" className="atmosphere-anchor">
        <AtmospherePanel
          timeMode={timeMode}
          seasonMode={seasonMode}
          weatherMode={weatherMode}
          temperature={temperature}
          weatherLabel={weatherLabel}
          currentTime={currentTime}
        />
      </section>

      <section id="atmosphere-modes" className="atmosphere-anchor">
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
      </section>
    </main>
  );
}
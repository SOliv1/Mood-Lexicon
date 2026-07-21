import MoodDisplay from "../features/mood/MoodDisplay";
import AtmospherePanel from "../components/Ritual/AtmospherePanel";
import AtmosphericButtons from "../components/Ritual/AtmosphericButtons";
import { type TimeMode, type SeasonMode, type WeatherMode } from "../theme/atmosphere";

type HomePageProps = {
  timeMode: TimeMode;
  seasonMode: SeasonMode;
  weatherMode: WeatherMode;
  setTimeMode: (mode: TimeMode) => void;
  setSeasonMode: (mode: SeasonMode) => void;
  setWeatherMode: (mode: WeatherMode) => void;
};

export default function HomePage({
  timeMode,
  seasonMode,
  weatherMode,
  setTimeMode,
  setSeasonMode,
  setWeatherMode,
}: HomePageProps) {


  return (
    <>
      <MoodDisplay weatherMode={weatherMode} />

      <AtmospherePanel
        timeMode={timeMode}
        seasonMode={seasonMode}
        weatherMode={weatherMode}
      />

      <AtmosphericButtons
        setTimeMode={setTimeMode}
        setSeasonMode={setSeasonMode}
        setWeatherMode={setWeatherMode}
        weatherMode={weatherMode}
      />
    </>
  );
}

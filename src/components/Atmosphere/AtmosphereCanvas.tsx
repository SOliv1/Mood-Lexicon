import { type SeasonMode, type TimeMode, type WeatherMode } from "../../theme/atmosphere";
import RainAnimation from "./RainAnimation";
import SnowAnimation from "./SnowAnimation";
import ClearSky from "./ClearSky";
import NightSky from "./NightSky";
import WinterGlow from "./WinterGlow";
import SummerLight from "./SummerLight";

type AtmosphereCanvasProps = {
  timeMode: TimeMode;
  seasonMode: SeasonMode;
  weatherMode: WeatherMode;
};

function getBaseScene(
  timeMode: TimeMode,
  seasonMode: SeasonMode,
  weatherMode: WeatherMode
): "clear" | "summer" | "rain" | "winter" | "snow" | "night" {
  if (timeMode === "night" || timeMode === "dusk") {
    return "night";
  }

  if (weatherMode === "snow") {
    return "snow";
  }

  if (weatherMode === "rain") {
    return "rain";
  }

  if (seasonMode === "winter") {
    return "winter";
  }

  return "summer";
}

export default function AtmosphereCanvas({
  timeMode,
  seasonMode,
  weatherMode,
}: AtmosphereCanvasProps) {
  const baseScene = getBaseScene(timeMode, seasonMode, weatherMode);

  return (
    <div className="global-atmosphere-canvas" aria-hidden="true">
      <div className="daily-scene-rotation">
        <div className={`daily-scene daily-scene-clear ${baseScene === "clear" ? "is-active" : ""}`}>
          <ClearSky />
        </div>
        <div className={`daily-scene daily-scene-summer ${baseScene === "summer" ? "is-active" : ""}`}>
          <SummerLight />
        </div>
        <div className={`daily-scene daily-scene-rain ${baseScene === "rain" ? "is-active" : ""}`}>
          <RainAnimation />
        </div>
        <div className={`daily-scene daily-scene-winter ${baseScene === "winter" ? "is-active" : ""}`}>
          <WinterGlow />
        </div>
        <div className={`daily-scene daily-scene-snow ${baseScene === "snow" ? "is-active" : ""}`}>
          <SnowAnimation />
        </div>
        <div className={`daily-scene daily-scene-night ${baseScene === "night" ? "is-active" : ""}`}>
          <NightSky />
        </div>
      </div>

      <div className="active-atmosphere-layer">
        {weatherMode === "rain" && <RainAnimation />}
        {weatherMode === "snow" && <SnowAnimation />}
        {weatherMode === "clear" && <ClearSky />}
        {timeMode === "night" && <NightSky />}
        {seasonMode === "winter" && <WinterGlow />}
        {seasonMode === "summer" && <SummerLight />}
      </div>
    </div>
  );
}

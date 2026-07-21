import { type CSSProperties } from "react";
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

function getUkSecondsSinceMidnight() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  }).formatToParts(new Date());

  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const hour = Number(byType.hour ?? 0);
  const minute = Number(byType.minute ?? 0);
  const second = Number(byType.second ?? 0);

  return hour * 3600 + minute * 60 + second;
}

export default function AtmosphereCanvas({
  timeMode,
  seasonMode,
  weatherMode,
}: AtmosphereCanvasProps) {
  const dayCycleOffset = `-${getUkSecondsSinceMidnight()}s`;

  return (
    <div
      className="global-atmosphere-canvas"
      style={{ "--day-cycle-offset": dayCycleOffset } as CSSProperties}
      aria-hidden="true"
    >
      <div className="daily-scene-rotation">
        <div className="daily-scene daily-scene-clear">
          <ClearSky />
        </div>
        <div className="daily-scene daily-scene-summer">
          <SummerLight />
        </div>
        <div className="daily-scene daily-scene-rain">
          <RainAnimation />
        </div>
        <div className="daily-scene daily-scene-winter">
          <WinterGlow />
        </div>
        <div className="daily-scene daily-scene-snow">
          <SnowAnimation />
        </div>
        <div className="daily-scene daily-scene-night">
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

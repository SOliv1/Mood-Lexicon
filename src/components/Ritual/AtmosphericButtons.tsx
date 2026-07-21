import "./AtmosphericButtons.css";
import { type TimeMode, type SeasonMode, type WeatherMode } from "../../theme/atmosphere";
import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

type AtmosphericButtonsProps = {
  setTimeMode: (mode: TimeMode) => void;
  setSeasonMode: (mode: SeasonMode) => void;
  setWeatherMode: (mode: WeatherMode) => void;
  weatherMode: WeatherMode;
};

const LATITUDE = 52.06;
const LONGITUDE = -1.98;

function weatherFromCode(code: number): WeatherMode {
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if (code === 0) return "clear";
  if (code >= 50) return "rain";
  return "clear";
}


export default function AtmosphericButtons({
  setTimeMode,
  setSeasonMode,
  setWeatherMode,
  weatherMode,
}: AtmosphericButtonsProps) {
  const [autoWeather, setAutoWeather] = useState(true);
  const [weatherSource, setWeatherSource] = useState<"auto" | "manual">("auto");

  useEffect(() => {
    if (!autoWeather) return;

    let cancelled = false;

    const syncAutoWeather = async () => {
      try {
        const params = {
          latitude: [LATITUDE],
          longitude: [LONGITUDE],
          current: "weather_code",
          timezone: "auto",
        };

        const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params);
        const response = responses[0];
        const current = response.current();
        const code = Number(current?.variables(0)?.value() ?? 0);

        if (!cancelled) {
          setWeatherMode(weatherFromCode(code));
          setWeatherSource("auto");
        }
      } catch {
        if (!cancelled) {
          setWeatherSource("manual");
        }
      }
    };

    syncAutoWeather();
    const id = window.setInterval(syncAutoWeather, 20 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [autoWeather, setWeatherMode]);

  const setManualWeather = (mode: WeatherMode) => {
    setAutoWeather(false);
    setWeatherSource("manual");
    setWeatherMode(mode);
  };

  return (
    <div className="atmos-buttons">
      <h3>Atmosphere Modes</h3>

      <div className="atmos-weather-source">
        <button
          className={`atmos-button ${autoWeather ? "is-active" : ""}`}
          onClick={() => setAutoWeather((prev) => !prev)}
        >
          {autoWeather ? "Auto Weather: ON" : "Auto Weather: OFF"}
        </button>
        <span className="atmos-source-label">Source: {weatherSource}</span>
      </div>

      <div className="atmos-buttons-group">
        <button className="atmos-button" onClick={() => setTimeMode("day")}>
          Day
        </button>
        <button className="atmos-button" onClick={() => setTimeMode("night")}>
          Night
        </button>
      </div>

      <div className="atmos-buttons-group">
        <button className="atmos-button" onClick={() => setSeasonMode("summer")}>
          Summer
        </button>
        <button className="atmos-button" onClick={() => setSeasonMode("winter")}>
          Winter
        </button>
      </div>

      <div className="atmos-buttons-group">
        <button className={`atmos-button ${weatherMode === "clear" ? "is-active" : ""}`} onClick={() => setManualWeather("clear")}>
          Clear
        </button>
        <button className={`atmos-button ${weatherMode === "rain" ? "is-active" : ""}`} onClick={() => setManualWeather("rain")}>
          Rain
        </button>
        <button className={`atmos-button ${weatherMode === "snow" ? "is-active" : ""}`} onClick={() => setManualWeather("snow")}>
          Snow
        </button>
      </div>
    </div>
  );
}

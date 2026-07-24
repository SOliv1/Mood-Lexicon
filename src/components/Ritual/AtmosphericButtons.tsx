import "./AtmosphericButtons.css";
import { timeModeLabels, type TimeMode, type SeasonMode, type WeatherMode } from "../../theme/atmosphere";

type AtmosphericButtonsProps = {
  timeMode: TimeMode;
  seasonMode: SeasonMode;
  autoWeather: boolean;
  weatherSource: "auto" | "manual";
  setAutoWeather: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  setWeatherSource: (source: "auto" | "manual") => void;
  setTimeMode: (mode: TimeMode) => void;
  setSeasonMode: (mode: SeasonMode) => void;
  setWeatherMode: (mode: WeatherMode) => void;
  weatherMode: WeatherMode;
};

export default function AtmosphericButtons({
  timeMode,
  seasonMode,
  autoWeather,
  weatherSource,
  setAutoWeather,
  setWeatherSource,
  setTimeMode,
  setSeasonMode,
  setWeatherMode,
  weatherMode,
}: AtmosphericButtonsProps) {
  const setManualWeather = (mode: WeatherMode) => {
    setAutoWeather(false);
    setWeatherSource("manual");
    setWeatherMode(mode);
  };

  const modeColors = {
    morning: "#FFF2C7",
    day: "#FFE8A3",
    golden: "#FFD27A",
    sunset: "#FFB88E",
    dusk: "#7283A8",
    night: "#2C3E50",
    summer: "#A2D9B2",
    winter: "#A7C6D8",
    clear: "#FFD97A",
    rain: "#6FA8DC",
    snow: "#FFFFFF",
  };


  return (
    <div className="atmos-buttons">
      <h3>Atmosphere Modes</h3>

      <div className="atmos-weather-source">
        <button
          className={`atmos-button ${autoWeather ? "is-active" : ""}`}
          onClick={() => {
            const nextAutoWeather = !autoWeather;
            setAutoWeather(nextAutoWeather);
            setWeatherSource(nextAutoWeather ? "auto" : "manual");
          }}
        >
          {autoWeather ? "Auto Weather: ON" : "Auto Weather: OFF"}
        </button>
        <span className="atmos-source-label">Source: {weatherSource}</span>
      </div>

      <div className="atmos-buttons-group">
        {([
          "morning",
          "day",
          "golden",
          "sunset",
          "dusk",
          "night",
        ] as TimeMode[]).map((mode) => (
          <button
            key={mode}
            className={`atmos-button ${timeMode === mode ? "is-active" : ""}`}
            style={{
              background: modeColors[mode],
              color: mode === "dusk" || mode === "night" ? "#fff" : "#1f2933",
            }}
            onClick={() => setTimeMode(mode)}
          >
            {timeModeLabels[mode]}
          </button>
        ))}
      </div>

      <div className="atmos-buttons-group">
        <button
          className={`atmos-button ${seasonMode === "summer" ? "is-active" : ""}`}
          style={{ background: modeColors.summer }}
          onClick={() => setSeasonMode("summer")}
        >
          Summer
        </button>
        <button
          className={`atmos-button ${seasonMode === "winter" ? "is-active" : ""}`}
          style={{ background: modeColors.winter }}
          onClick={() => setSeasonMode("winter")}
        >
          Winter
        </button>
      </div>

      <div className="atmos-buttons-group">
        <button
          className={`atmos-button ${weatherMode === "clear" ? "is-active" : ""}`}
          style={{ background: modeColors.clear }}
          onClick={() => setManualWeather("clear")}
        >
          Clear
        </button>
        <button
          className={`atmos-button ${weatherMode === "rain" ? "is-active" : ""}`}
          style={{ background: modeColors.rain }}
          onClick={() => setManualWeather("rain")}
        >
          Rain
        </button>
        <button
          className={`atmos-button ${weatherMode === "snow" ? "is-active" : ""}`}
          style={{
            background: modeColors.snow,
            border: "2px solid #ccc",
            color: "#333",
          }}
          onClick={() => setManualWeather("snow")}
        >
          Snow
        </button>
      </div>
    </div>
  );
}

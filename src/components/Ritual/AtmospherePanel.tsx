import React, { useMemo } from 'react';
import './AtmospherePanel.css';
import './Snow.css';
import {
  atmosphere,
  isDarkTimeMode,
  timeModeLabels,
  type TimeMode,
  type SeasonMode,
  type WeatherMode,
} from '../../theme/atmosphere';

interface Props {
  timeMode: TimeMode;
  seasonMode: SeasonMode;
  weatherMode: WeatherMode;
  temperature: number | null;
  weatherLabel: string;
  currentTime: string;
}

export default function AtmospherePanel({
  timeMode,
  seasonMode,
  weatherMode,
  temperature,
  weatherLabel,
  currentTime,
}: Props) {
  const border = atmosphere.season[seasonMode];
  const overlay = atmosphere.weather[weatherMode];
  const panelMode = isDarkTimeMode(timeMode) ? 'night' : 'day';

  const finalMode = `${timeModeLabels[timeMode]} • ${seasonMode} • ${weatherMode}`;

  const panelTint: Record<WeatherMode, string> = {
    clear: 'rgba(255, 217, 122, 0.3)',
    rain: 'rgba(111, 168, 220, 0.3)',
    snow: 'rgba(255, 255, 255, 0.5)',
  };

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 29) % 100}%`,
        delay: `${(i % 7) * 0.28}s`,
        duration: `${3.8 + (i % 4) * 0.45}s`,
      })),
    []
  );

  return (
    <div
      className={`atmosphere-panel atmosphere-panel-${panelMode} atmosphere-time-${timeMode} atmosphere-weather-${weatherMode}`}
      style={{
        borderLeft: `6px solid ${border}`,
        boxShadow: `0 8px 28px rgba(0, 0, 0, 0.14), inset 0 0 32px ${overlay}`,
        overflow: "hidden",
        transition: "all 0.4s ease"
      }}
    >
      {weatherMode === "snow" && (
        <div className="snow atmosphere-snow" aria-hidden="true">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: flake.left,
                animationDelay: flake.delay,
                animationDuration: flake.duration,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="atmos-panel"
        style={{
          background: panelTint[weatherMode],
          transition: "background 0.4s ease",
          padding: "1rem",
          borderRadius: "16px",
          backdropFilter: "blur(12px)"
        }}
      >

      <div className="atmosphere-title">Atmosphere</div>

      <div className="atmosphere-temp">
        {temperature === null ? "--" : temperature}
        <span>°C</span>
      </div>

      <div className="atmosphere-summary">{weatherLabel}</div>

      <div className="atmosphere-row">
        <span className="atmosphere-label">Time:</span>
        <span className="atmosphere-value">{currentTime} · {timeModeLabels[timeMode]}</span>
      </div>

      <div className="atmosphere-row">
        <span className="atmosphere-label">Season:</span>
        <span className="atmosphere-value">{seasonMode}</span>
      </div>

      <div className="atmosphere-row">
        <span className="atmosphere-label">Weather:</span>
        <span className="atmosphere-value">{weatherMode}</span>
      </div>

      <div className="atmosphere-final">{finalMode}</div>
      </div>
    </div>
  );
}

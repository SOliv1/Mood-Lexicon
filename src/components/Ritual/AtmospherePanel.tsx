import React from 'react';
import './AtmospherePanel.css';
import './Snow.css';
import {
  atmosphere,
  type TimeMode,
  type SeasonMode,
  type WeatherMode,
} from '../../theme/atmosphere';

interface Props {
  timeMode: TimeMode;
  seasonMode: SeasonMode;
  weatherMode: WeatherMode;
}

export default function AtmospherePanel({ timeMode, seasonMode, weatherMode }: Props) {
  const background = atmosphere.time[timeMode];
  const border = atmosphere.season[seasonMode];
  const overlay = atmosphere.weather[weatherMode];

  const finalMode = `${timeMode} • ${seasonMode} • ${weatherMode}`;

  const snowflakes = Array.from({ length: 20 }).map((_, i) => (
    <div
      key={i}
      className="snowflake"
      style={{ left: `${Math.random() * 100}%`, animationDelay: `${i * 0.2}s` }}
    />
  ));

  return (
    <div
      className="atmosphere-panel"
      style={{
        backgroundColor: background,
        borderLeft: `6px solid ${border}`,
        boxShadow: `inset 0 0 40px ${overlay}`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s ease"
      }}
    >
      {weatherMode === "snow" && <div className="snow">{snowflakes}</div>}

      <div className="atmosphere-title">Atmosphere Panel</div>

      <div className="atmosphere-row">
        <span className="atmosphere-label">Time:</span>
        <span className="atmosphere-value">{timeMode}</span>
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
  );
}

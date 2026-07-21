import React from 'react';
import './AtmospherePanel.css';
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

  return (
    <div
      className={`atmosphere-panel atmosphere-panel-${timeMode}`}
      style={{
        backgroundColor: background,
        borderLeft: `6px solid ${border}`,
        boxShadow: `inset 0 0 40px ${overlay}`,
        transition: "all 0.4s ease"
      }}
    >
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

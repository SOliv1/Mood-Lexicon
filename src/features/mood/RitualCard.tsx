import React from "react";
import "./RitualCard.css";

interface RitualCardProps {
  feeling: string;
  setFeeling: (value: string) => void;
  isInputFading?: boolean;
  showAbsorbedIcon?: boolean;
  effectTick?: number;
  onCheckMood: () => void;
  season?: string; // Winter, Spring, Summer, Autumn, Harvest
}

const RitualCard: React.FC<RitualCardProps> = ({
  feeling,
  setFeeling,
  isInputFading = false,
  showAbsorbedIcon = false,
  effectTick = 0,
  onCheckMood,
  season = "Summer"
}) => {
  const seasonClass = `ritual-${season.toLowerCase()}`;

  return (
    <div className={`ritual-container ${seasonClass}`}>
      <div className="ritual-flame">🕯️</div>

      <input
        className={`ritual-input ${isInputFading ? "is-fading-out" : ""}`}
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="How are you feeling?"
      />

      {showAbsorbedIcon && (
        <span
          key={effectTick}
          className="ritual-status-icon"
          role="status"
          aria-live="polite"
          aria-label="Ritual complete, words absorbed"
        >
          <span className="ritual-status-candle" aria-hidden="true">🕯️</span>
          <span className="ritual-status-sparkle" aria-hidden="true">✧</span>
        </span>
      )}

      <button className="ritual-button" onClick={onCheckMood}>
        Light Ritual
      </button>
    </div>
  );
};

export default RitualCard;

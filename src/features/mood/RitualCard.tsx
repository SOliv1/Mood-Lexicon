import React from "react";
import "./RitualCard.css";

interface RitualCardProps {
  feeling: string;
  setFeeling: (value: string) => void;
  onCheckMood: () => void;
  season?: string; // Winter, Spring, Summer, Autumn, Harvest
}

const RitualCard: React.FC<RitualCardProps> = ({
  feeling,
  setFeeling,
  onCheckMood,
  season = "Summer"
}) => {
  const seasonClass = `ritual-${season.toLowerCase()}`;

  return (
    <div className={`ritual-container ${seasonClass}`}>
      <div className="ritual-flame">🕯️</div>

      <input
        className="ritual-input"
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="How are you feeling?"
      />

      <button className="ritual-button" onClick={onCheckMood}>
        Light Ritual
      </button>
    </div>
  );
};

export default RitualCard;

import { NavLink } from "react-router-dom";
import { getSeason } from "../../utils/getSeason";
import "./SeasonalHeader.css";

const seasonLabels: Record<string, string> = {
  winter: "Winter Studio",
  spring: "Spring Studio",
  summer: "Summer Studio",
  autumn: "Autumn Studio",
};

export default function SeasonalHeader() {
  const season = getSeason();

  return (
    <header className={`seasonal-header seasonal-header-${season}`}>
      <div className="seasonal-brand">
        <NavLink to="/" className="seasonal-logo-link" aria-label="Go to home page">
          <img
            className="seasonal-logo"
            src="/logos/icon-96.png"
            alt="Mood Lexicon logo"
          />
        </NavLink>
        <div className="seasonal-brand-copy">
          <p>{seasonLabels[season] ?? "Seasonal Studio"}</p>
          <h1>Mood Lexicon</h1>
        </div>
      </div>

      <nav className="seasonal-nav" aria-label="Primary">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/splash">Arrival Ritual</NavLink>
      </nav>
    </header>
  );
}
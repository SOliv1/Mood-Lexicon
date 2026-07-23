import { Link } from "react-router-dom";
import { getSeason } from "../utils/getSeason";
import "./LexiconSplashPage.css";

const splashLines: Record<string, string> = {
  winter: "Soft winter light. Quiet words. A still beginning.",
  spring: "Fresh language unfolding like spring branches.",
  summer: "Warm clarity and bright emotional vocabulary.",
  autumn: "Gathered words, rich tones, grounded reflection.",
};

export default function LexiconSplashPage() {
  const season = getSeason();

  return (
    <section className={`lexicon-splash lexicon-splash-${season}`}>
      <div className="splash-panel">
        <p className="splash-kicker">Reflections in Light</p>
        <h1>Mood Lexicon</h1>
        <p>{splashLines[season] ?? splashLines.winter}</p>

        <div className="splash-actions">
          <Link to="/onboarding" className="splash-button splash-primary">Begin Journey</Link>
          <Link to="/" className="splash-button splash-secondary">Enter Home</Link>
        </div>
      </div>
    </section>
  );
}
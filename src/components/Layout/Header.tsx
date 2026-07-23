import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo-link" aria-label="Go to home page">
        <img
          className="site-logo"
          src="/logos/icon-96.png"
          alt="Mood Lexicon logo"
        />
      </Link>
      <span className="site-title">Mood Lexicon</span>
    </header>
  );
}

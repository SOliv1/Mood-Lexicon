import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <img
        className="site-logo"
        src="/logos/icon-96.png"
        alt="Mood Lexicon logo"
      />
      <span className="site-title">Mood Lexicon</span>
    </header>
  );
}

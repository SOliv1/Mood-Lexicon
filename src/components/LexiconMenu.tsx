import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./LexiconMenu.css";

export default function LexiconMenu() {
  const [open, setOpen] = useState(false);
  const hiddenContactEmail = "s.olvier!@icloud.com";

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="lexicon-menu">
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="menu-panel" role="menu" aria-label="Mood Lexicon menu">
          <div className="menu-panel-header">
            <span className="menu-panel-title">Menu</span>
            <button type="button" className="menu-close" onClick={closeMenu} aria-label="Close navigation menu">
              ✕
            </button>
          </div>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/splash" onClick={closeMenu}>Arrival Ritual</NavLink>
          <Link to={{ pathname: "/", hash: "#light-ritual" }} onClick={closeMenu}>Light Ritual</Link>
          <Link to={{ pathname: "/", hash: "#atmosphere" }} onClick={closeMenu}>Atmosphere</Link>
          <Link to={{ pathname: "/", hash: "#atmosphere-modes" }} onClick={closeMenu}>Season & Weather</Link>
          <Link to="/" onClick={closeMenu}>Living Lexicon</Link>
          <a href={`mailto:${hiddenContactEmail}`} onClick={closeMenu}>Contact</a>
          <a href="https://soliv1.github.io/moodsboard-reflections-family" target="_blank" rel="noreferrer noopener">MoodsBoard</a>
          <a href="https://sparkling-gratitude-production-e9a3.up.railway.app/" target="_blank" rel="noreferrer noopener">Reflections-In-Light-Constellations</a>
          <a href="https://seasonal.studio" target="_blank" rel="noreferrer noopener">Seasonal Studio</a>
          <a href="https://centre-notes.netlify.app" target="_blank" rel="noreferrer noopener">Centre Notes</a>
          <a href="https://soliv1.github.io/Seasonal-mind-space" target="_blank" rel="noreferrer noopener">Seasonal MindSpace</a>
          <a href="https://daily-reflections.app" target="_blank" rel="noreferrer noopener">Daily Reflections</a>
        </div>
      )}
    </div>
  );
}

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

          <div className="menu-scroll-fade">
            <div className="menu-scroll-content">
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
              <NavLink to="/about" onClick={closeMenu}>About</NavLink>
              <NavLink to="/splash" onClick={closeMenu}>Arrival Ritual</NavLink>
              <Link to={{ pathname: "/", hash: "#light-ritual" }} onClick={closeMenu}>Light Ritual</Link>
              <Link to={{ pathname: "/", hash: "#grounding-compass" }} onClick={closeMenu}>Grounding Compass</Link>
              <Link to={{ pathname: "/", hash: "#site-footer" }} onClick={closeMenu}>Family Links</Link>
              <Link to={{ pathname: "/", hash: "#atmosphere" }} onClick={closeMenu}>Atmosphere</Link>
              <Link to={{ pathname: "/", hash: "#atmosphere-modes" }} onClick={closeMenu}>Season & Weather</Link>
              <Link to="/" onClick={closeMenu}>Living Lexicon</Link>
              <a href={`mailto:${hiddenContactEmail}`} onClick={closeMenu}>Contact</a>

              <div className="menu-external-boundary" aria-hidden="true" />
              <p className="menu-external-title">Leaving Mood Lexicon · Explore Other Websites</p>

              <a className="menu-external-link menu-site-moodsboard" href="https://soliv1.github.io/moodsboard-reflections-family" target="_blank" rel="noreferrer noopener">MoodsBoard</a>
              <a className="menu-external-link menu-site-constellations" href="https://sparkling-gratitude-production-e9a3.up.railway.app/" target="_blank" rel="noreferrer noopener">Reflections-In-Light-Constellations</a>
              <a className="menu-external-link menu-site-seasonal-studio" href="https://seasonal.studio" target="_blank" rel="noreferrer noopener">Seasonal Studio</a>
              <a className="menu-external-link menu-site-centre-notes" href="https://centre-notes.netlify.app" target="_blank" rel="noreferrer noopener">Centre Notes</a>
              <a className="menu-external-link menu-site-mindspace" href="https://soliv1.github.io/Seasonal-mind-space" target="_blank" rel="noreferrer noopener">Seasonal MindSpace</a>
              <a className="menu-external-link menu-site-daily-reflections" href="https://daily-reflections.app" target="_blank" rel="noreferrer noopener">Daily Reflections</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import "./Footer.css";

const familyLinks = [
  {
    label: "Moodsboard",
    href: "https://soliv1.github.io/moodsboard-reflections-family",
  },
  {
    label: "Seasonal Studio",
    href: "https://seasonal.studio",
  },
  {
    label: "Centre Notes",
    href: "https://centre-notes.netlify.app",
  },
  {
    label: "Seasonal Mind Space",
    href: "https://soliv1.github.io/Seasonal-mind-space",
  },
  {
    label: "Daily Reflections",
    href: "https://soliv1.github.io/Daily-Reflections-App",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const contactEmail = "s.olvier!@icloud.com";

  return (
    <footer className="reflections-footer" id="site-footer">
      <p className="footer-kicker">Reflections in Light Family</p>
      <p className="footer-signature">
        You&rsquo;re in the <strong>Reflections in Light</strong> family, a
        sanctuary for thought, rhythm, and renewal.
      </p>
      <p className="footer-meta">Mood Lexicon chapter · © {year} Reflections in Light</p>

      <div className="footer-utility-links">
        <a className="footer-home-link" href="#home">Return to Home</a>
        <a className="footer-home-link" href="/#grounding-compass">Grounding Compass</a>
        <a className="footer-home-link" href={`mailto:${contactEmail}`}>Contact</a>
      </div>

      <nav className="footer-links" aria-label="Reflections in Light apps">
        {familyLinks.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}


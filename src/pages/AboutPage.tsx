import { getSeason } from "../utils/getSeason";
import "./AboutPage.css";

const seasonalHeadlines: Record<string, string> = {
  winter: "A Winter Lexicon of Quiet Light",
  spring: "A Spring Lexicon of New Language",
  summer: "A Summer Lexicon of Warm Clarity",
  autumn: "An Autumn Lexicon of Gathered Meaning",
};

export default function AboutPage() {
  const season = getSeason();

  return (
    <div className={`about-page about-${season}`}>
      <img
        src="/icons/semantic-compass.svg"
        alt="Semantic compass"
        className="semantic-compass"
      />
      <h1>Mood Lexicon</h1>

      <h1>{seasonalHeadlines[season] ?? "Mood Lexicon"}</h1>

      <section>
        <p>
          Mood Lexicon is a space for exploring language through feeling.
          Each word carries a tone; calm, uplifted, abundant, ethereal, and the
          Lexicon helps you sense how meaning shifts like light across a room.
        </p>
        <p>
          You can browse curated mood categories or add your own words and watch
          the Lexicon place them gently where they belong. It’s simple,
          reflective, and atmospheric; a small daily ritual of learning and
          noticing.
        </p>
        <p>
          Mood Lexicon is part of the Reflections in Light Family: MoodsBoard,
          Centre Notes, Seasonal MindSpace, Daily Reflections, and Seasonal
          Studio @ KUK.
        </p>
      </section>

      <section>
        <h2>How to Use</h2>
        <ul>
          <li>Browse mood categories</li>
          <li>Learn synonyms and antonyms</li>
          <li>Add your own words</li>
          <li>Watch the Lexicon classify them</li>
        </ul>
      </section>

      <footer>
        <p>Mood Lexicon: Part of the Reflections in Light Family © 2026</p>
      </footer>
    </div>
  );
}

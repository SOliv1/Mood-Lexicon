// src/pages/AboutSeasonal.tsx

import { getSeason } from "../utils/getSeason";

export default function AboutSeasonal() {
  const season = getSeason();

  const tones = {
    winter: {
      title: "A Quiet Winter Lexicon",
      text: "Mood Lexicon is a calm space for gentle discovery — like soft frost light across a room."
    },
    spring: {
      title: "A Fresh Spring Lexicon",
      text: "Mood Lexicon opens like early light — a place to explore new words and subtle meanings."
    },
    summer: {
      title: "A Warm Summer Lexicon",
      text: "Mood Lexicon feels bright and spacious — language unfolding with warmth and clarity."
    },
    autumn: {
      title: "An Autumn Lexicon",
      text: "Mood Lexicon carries a soft richness — words gathered like seasonal colour and tone."
    }
  };

  const tone = tones[season];

  return (
    <div className={`about-seasonal ${season}`}>
      <h1>{tone.title}</h1>
      <p>{tone.text}</p>

      <p>
        Browse mood categories, learn synonyms and antonyms, or add your own words
        and watch the Lexicon place them gently where they belong.
      </p>

      <p>
        Part of the Reflections in Light Family — MoodsBoard, Centre Notes,
        Seasonal MindSpace, Daily Reflections, Seasonal Studio @ KUK.
      </p>
    </div>
  );
}

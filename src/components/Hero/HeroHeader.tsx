import type React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cycleMoodTheme } from "../../features/mood/moodLexiconSlice";
import { moodThemes, type MoodTheme } from "./moodThemes";
import "./Hero.css";

type HeroHeaderProps = {
  currentMood?: string;
};

export default function HeroHeader({ currentMood }: HeroHeaderProps) {
  const dispatch = useDispatch();
  const [localMood, setLocalMood] = useState(currentMood ?? moodThemes[0]?.id ?? "");
  const activeMood = currentMood ?? localMood;
  const theme = moodThemes.find((m: MoodTheme) => m.id === activeMood) ?? moodThemes[0];

  if (!theme) return null;

  const nextMood = () => {
    const currentIndex = moodThemes.findIndex((m: MoodTheme) => m.id === activeMood);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % moodThemes.length;
    return moodThemes[nextIndex].id;
  };

  const changeMoodTheme = () => {
    if (currentMood) {
      dispatch(cycleMoodTheme());
      return;
    }

    setLocalMood(nextMood());
  };

  const style = {
    background: `linear-gradient(
      to bottom,
      ${theme.gradient.from},
      ${theme.gradient.to}
    )`,
    transition: `background ${theme.motion.speed}s ease`,
    animation: `breathe ${theme.motion.speed}s ease-in-out infinite`,
    "--intensity": theme.motion.intensity
  } as React.CSSProperties;

  return (
    <header className="hero-header" style={style}>
      <div className="hero-header-content">
        <div>
          <h1>{theme.name}</h1>
          <p>{theme.lexicon.tone}</p>
        </div>

        <button
          className="hero-mood-toggle"
          onClick={changeMoodTheme}
        >
          Change Mood Theme
        </button>
      </div>
    </header>
  );
}

import { moodThemes } from "../../data/moods/moodThemes";
export default function LexiconPanel({ currentMood }: { currentMood: string }) {
  const theme = moodThemes.find((m) => m.id === currentMood);

  if (!theme) return null;

  return (
    <div className="lexicon-panel" style={{ borderColor: theme.color }}>
      <h3>{theme.name}</h3>
      <p className="tone">{theme.lexicon.tone}</p>

      <div className="word-group">
        <h4>Synonyms</h4>
        <ul>{theme.lexicon.synonyms.map((w) => <li key={w}>{w}</li>)}</ul>
      </div>

      <div className="word-group">
        <h4>Antonyms</h4>
        <ul>{theme.lexicon.antonyms.map((w) => <li key={w}>{w}</li>)}</ul>
      </div>
    </div>
  );
}

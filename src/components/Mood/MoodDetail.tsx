import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function MoodDetail() {
  const mood = useSelector((state: RootState) => state.moodLexicon.selectedMood);

  if (!mood) return null;

  return (
    <section className={`lexicon lexicon-${mood.id}`}>
      <h2 className="lexicon-title">{mood.name}</h2>

      <div className="lexicon-section">
        <h3>Synonyms</h3>
        <ul>
          {mood.synonyms.map((s: string) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="lexicon-section">
        <h3>Related</h3>
        <ul>
          {mood.related.map((r: string) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="lexicon-section">
        <h3>Behaviours</h3>
        <ul>
          {mood.behaviours.map((b: string) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="lexicon-section">
        <h3>Actions</h3>
        <ul>
          {mood.actions.map((a: string) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="lexicon-section">
        <h3>Phrases</h3>
        <ul>
          {mood.phrases.map((p: string) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="lexicon-section">
        <h3>Quotes</h3>
        <ul>
          {mood.quotes.map((q: string) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

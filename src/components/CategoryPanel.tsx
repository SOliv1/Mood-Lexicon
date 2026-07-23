import "./CategoryPanel.css";

type UserWordEntry = {
  word: string;
  synonyms: string[];
  antonyms: string[];
  category: string;
  matchedMood: string;
  tone: string;
};

type CategoryMap = Record<string, UserWordEntry[]>;

type CategoryPanelProps = {
  categories: CategoryMap;
  flashCategory?: string | null;
  flashTick?: number;
};

const categoryOrder = ['calm', 'uplifted', 'ethereal', 'peaceful', 'energetic', 'abundance', 'uncategorised'];

export default function CategoryPanel({ categories, flashCategory, flashTick }: CategoryPanelProps) {
  const orderedCategories = [...categoryOrder, ...Object.keys(categories).filter((category) => !categoryOrder.includes(category))];

  return (
    <section className="category-panel">
      <div className="category-panel-header">
        <p className="panel-eyebrow">Semantic engine</p>
        <h3>New categories, growing from use</h3>
        <p>
          Words are grouped by the closest mood family. Unclear words remain uncategorised until the lexicon learns more.
        </p>
      </div>

      <div className="category-grid">
        {orderedCategories.map((category) => {
          const words = categories[category] ?? [];

          const cardKey = `${category}-${flashCategory === category ? flashTick ?? 0 : 'static'}`;

          return (
            <article key={cardKey} className={`category-card category-${category}${flashCategory === category ? ' is-flashing' : ''}`}>
              <div className="category-card-head">
                <h4>{category}</h4>
                <span>{words.length}</span>
              </div>

              {words.length > 0 ? (
                <ul>
                  {words.map((word) => (
                    <li key={`${category}-${word.word}`}>
                      <strong>{word.word}</strong>
                      <span className="syn">Syn: {word.synonyms.slice(0, 4).join(", ") || "—"}</span>
                      <span className="ant">Ant: {word.antonyms.slice(0, 4).join(", ") || "—"}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No words here yet.</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

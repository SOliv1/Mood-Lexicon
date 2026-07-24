import { useMemo, useState, type CSSProperties } from "react";
import type { Dispatch, SetStateAction } from "react";
import "./GroundingCompass.css";

const canInfluence = [
  "My choices",
  "My words",
  "My breath",
  "My boundaries",
  "My focus",
];

const release = [
  "Other people's reactions",
  "Past outcomes",
  "The weather",
  "Timing outside me",
  "Everything at once",
];

const highlights = [
  {
    title: "Easy to settle into",
    detail: "Two circles of attention for fast emotional grounding.",
  },
  {
    title: "Clear at a glance",
    detail: "Warm/cool contrast helps you see where your energy belongs.",
  },
  {
    title: "Quietly ritual-like",
    detail: "Works alongside Light Ritual without taking it over.",
  },
];

export default function GroundingCompass() {
  const [selectedCanInfluence, setSelectedCanInfluence] = useState<string[]>([]);
  const [selectedRelease, setSelectedRelease] = useState<string[]>([]);

  const totalSelected = selectedCanInfluence.length + selectedRelease.length;
  const influenceStrength = selectedCanInfluence.length / canInfluence.length;
  const releaseStrength = selectedRelease.length / release.length;
  const balance = influenceStrength - releaseStrength;
  const balancePosition = ((balance + 1) / 2) * 100;
  const isBalanced = Math.abs(balance) < 0.2;

  const stateClass = balance > 0.2
    ? "is-influence-leading"
    : balance < -0.2
      ? "is-release-leading"
      : "is-balanced";

  const wheelStyle = {
    "--influence-strength": influenceStrength.toFixed(3),
    "--release-strength": releaseStrength.toFixed(3),
    "--balance-position": `${balancePosition.toFixed(1)}%`,
  } as CSSProperties;

  const guidanceLine = useMemo(() => {
    if (totalSelected === 0) {
      return "Tap items to sort your energy: keep what you can guide, release what you cannot control.";
    }

    if (balance > 0.2) {
      return "Positive influence is leading. You are actively countering and neutralizing stress pressure.";
    }

    if (balance < -0.2) {
      return "Release pressure is leading. Add more influence choices to rebalance and steady yourself.";
    }

    return "Balanced field. Your influence and release are working together in a calm midpoint.";
  }, [balance, totalSelected]);

  const toggleSelected = (
    item: string,
    selectedItems: string[],
    setSelectedItems: Dispatch<SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((current) => current.filter((value) => value !== item));
      return;
    }

    setSelectedItems((current) => [...current, item]);
  };

  const clearSelections = () => {
    setSelectedCanInfluence([]);
    setSelectedRelease([]);
  };

  return (
    <section className={`grounding-compass ${stateClass}`} style={wheelStyle} aria-labelledby="grounding-compass-title">
      <header className="grounding-compass-header">
        <p className="grounding-compass-kicker">Perspective ritual</p>
        <h3 id="grounding-compass-title">Grounding Compass</h3>
        <p>
          A gentle visual reminder of what you can guide right now and what you
          can release for the moment.
        </p>

        <div className="grounding-balance-meter" aria-label="Influence and release balance">
          <span className="grounding-meter-end grounding-meter-release">Release-heavy</span>
          <div className="grounding-meter-track" role="img" aria-hidden="true">
            <div className="grounding-meter-indicator" />
          </div>
          <span className="grounding-meter-end grounding-meter-influence">Influence-led</span>
        </div>

        <p className="grounding-balance-state">
          {totalSelected === 0
            ? "Current direction: not set yet"
            : isBalanced
              ? "Current direction: balanced"
              : balance > 0
                ? "Current direction: influence-led"
                : "Current direction: release-heavy"}
        </p>

        <p className="grounding-compass-instructions">{guidanceLine}</p>
        <button
          type="button"
          className="grounding-reset-button"
          onClick={clearSelections}
          disabled={totalSelected === 0}
        >
          Clear choices
        </button>
      </header>

      <div className="grounding-compass-layout">
        <div className="grounding-wheel" aria-hidden="true">
          <div className="grounding-wheel-surface" />
          <div className="grounding-wheel-center">
            <span>Where do I place my energy?</span>
          </div>
          <div className="grounding-wheel-label grounding-wheel-label-can">I can influence</div>
          <div className="grounding-wheel-label grounding-wheel-label-release">I release</div>
        </div>

        <div className="grounding-lists">
          <article className="grounding-list-card grounding-list-can">
            <h4>Things I can influence</h4>
            <ul>
              {canInfluence.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`grounding-item-button ${selectedCanInfluence.includes(item) ? "is-selected" : ""}`}
                    onClick={() => toggleSelected(item, selectedCanInfluence, setSelectedCanInfluence)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </article>

          <article className="grounding-list-card grounding-list-release">
            <h4>Things I cannot control</h4>
            <ul>
              {release.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`grounding-item-button ${selectedRelease.includes(item) ? "is-selected" : ""}`}
                    onClick={() => toggleSelected(item, selectedRelease, setSelectedRelease)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className="grounding-highlights">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="grounding-highlight-card">
            <h4>{highlight.title}</h4>
            <p>{highlight.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import { type CSSProperties } from "react";

const stars = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${(index * 19) % 100}%`,
  top: `${8 + ((index * 23) % 76)}%`,
  delay: `${(index % 6) * 0.4}s`,
}));

const meteors = Array.from({ length: 1 }, (_, index) => ({
  id: index,
  left: `${68 + index * 10}%`,
  top: `${10 + index * 11}%`,
  delay: `${index * 19 + 5}s`,
  duration: `${32 + index * 5}s`,
}));

const SYNODIC_MONTH_DAYS = 29.530588853;
const PHASE_NAMES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
] as const;

type MoonPhase = {
  label: string;
  waxing: boolean;
  illumination: number;
  shadowShift: number;
  shadowFeather: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function getMoonPhase(now: Date): MoonPhase {
  // Known new moon epoch in UTC used for practical lunar phase approximation.
  const knownNewMoonUtc = Date.UTC(2000, 0, 6, 18, 14, 0);
  const elapsedDays = (now.getTime() - knownNewMoonUtc) / 86_400_000;
  const phase = ((elapsedDays % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;
  const phaseFraction = phase / SYNODIC_MONTH_DAYS;
  const phaseIndex = Math.round(phaseFraction * 8) % 8;
  const waxing = phaseFraction < 0.5;

  // Fraction lit on Earth-facing side from 0 (new) to 1 (full).
  const illumination = 0.5 * (1 - Math.cos(phaseFraction * 2 * Math.PI));

  // Bias quarter phases toward a crisp half-disc while keeping lunar timing continuous.
  const distanceToQuarter = Math.min(
    Math.abs(phaseFraction - 0.25),
    Math.abs(phaseFraction - 0.75)
  );
  const quarterBias = 1 - smoothstep(0, 0.11, distanceToQuarter);

  // Shift magnitude is 0 at new moon, ~50 at quarter, and ~100 near full moon.
  const rawShiftMagnitude = illumination * 104;
  const quarterShiftMagnitude = 50;
  const shiftMagnitude =
    rawShiftMagnitude * (1 - quarterBias) + quarterShiftMagnitude * quarterBias;
  const shadowShift = (waxing ? -1 : 1) * shiftMagnitude;

  // Sharpen the moon edge near quarter phases for a cleaner half-moon silhouette.
  const shadowFeather = 2.8 - quarterBias * 2.1;

  return {
    label: PHASE_NAMES[phaseIndex],
    waxing,
    illumination,
    shadowShift,
    shadowFeather,
  };
}

export default function NightSky() {
  const moon = getMoonPhase(new Date());

  return (
    <div className="atmos-animation atmos-night-sky" aria-hidden="true">
      <div className="atmos-moon-shell">
        <div
          className="atmos-moon"
          data-waxing={moon.waxing}
          aria-label={`${moon.label}, ${Math.round(moon.illumination * 100)}% illuminated`}
          style={{
            "--moon-shadow-shift": `${moon.shadowShift}%`,
            "--moon-shadow-feather": `${moon.shadowFeather}px`,
          } as CSSProperties}
        />
      </div>

      {stars.map((star) => (
        <span
          key={star.id}
          className="atmos-star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="atmos-meteor"
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  );
}

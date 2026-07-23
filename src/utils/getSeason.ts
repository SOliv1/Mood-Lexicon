// src/utils/getSeason.ts

export function getSeason() {
  const month = new Date().getMonth();

  if (month <= 1 || month === 11) return "winter";
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  return "autumn";
}

export type TimeMode = 'morning' | 'day' | 'golden' | 'sunset' | 'dusk' | 'night';
export type SeasonMode = 'summer' | 'winter';
export type WeatherMode = 'clear' | 'rain' | 'snow';

export const timeModeLabels: Record<TimeMode, string> = {
  morning: 'Morning',
  day: 'Day',
  golden: 'Golden Hour',
  sunset: 'Sunset',
  dusk: 'Dusk',
  night: 'Night',
};

export function isDarkTimeMode(timeMode: TimeMode): boolean {
  return timeMode === 'dusk' || timeMode === 'night';
}

export const atmosphere = {
  time: {
    morning: "#f8fbff",
    day: "#f5f9ff",
    golden: "#fff1d6",
    sunset: "#ffd8bd",
    dusk: "#33496e",
    night: "#0b1a33"
  },
  season: {
    summer: "#ffe7b3",   // warm golden tint
    winter: "#dce9f9"    // cold blue tint
  },
  weather: {
    clear: "rgba(255,255,255,0.4)",  // soft glow
    rain: "rgba(100,120,150,0.4)",   // grey-blue mist
    snow: "rgba(255,255,255,0.7)"    // bright frost glow
  }
};

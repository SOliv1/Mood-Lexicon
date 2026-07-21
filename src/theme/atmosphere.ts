export type TimeMode = 'day' | 'night';
export type SeasonMode = 'summer' | 'winter';
export type WeatherMode = 'clear' | 'rain' | 'snow';

export const atmosphere = {
  time: {
    day: "#f5f9ff",      // soft daylight
    night: "#0b1a33"     // deep navy night
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

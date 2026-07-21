export type TimeMode = 'day' | 'night';
export type SeasonMode = 'summer' | 'winter';
export type WeatherMode = 'clear' | 'rain' | 'snow';

export const atmosphere: {
  time: Record<TimeMode, string>;
  season: Record<SeasonMode, string>;
  weather: Record<WeatherMode, string>;
} = {
  time: {
    day: "#fdf6e3",
    night: "#001f3f"
  },
  season: {
    summer: "#ffd27f",
    winter: "#cfe8ff"
  },
  weather: {
    clear: "#ffffff",
    rain: "#b3c7e6",
    snow: "#f2f7ff"
  }
};

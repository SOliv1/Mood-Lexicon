import { useEffect, useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import './App.css';
import { type TimeMode, type SeasonMode, type WeatherMode } from './theme/atmosphere';

const LATITUDE = 52.06;
const LONGITUDE = -1.98;

const timeClasses = ['atmo-time-day', 'atmo-time-night'];
const seasonClasses = ['atmo-season-summer', 'atmo-season-winter'];
const weatherClasses = ['atmo-weather-clear', 'atmo-weather-rain', 'atmo-weather-snow'];

function getSeasonFromDate(date: Date): SeasonMode {
  const month = date.getMonth(); // 0-based
  return month >= 3 && month <= 8 ? 'summer' : 'winter';
}

function App() {
  const [timeMode, setTimeMode] = useState<TimeMode>('day');
  const [seasonMode, setSeasonMode] = useState<SeasonMode>(getSeasonFromDate(new Date()));
  const [weatherMode, setWeatherMode] = useState<WeatherMode>('clear');

  // Real season from current month.
  useEffect(() => {
    const updateSeason = () => setSeasonMode(getSeasonFromDate(new Date()));
    updateSeason();
    const id = window.setInterval(updateSeason, 6 * 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  // Real day/night from sunrise and sunset.
  useEffect(() => {
    let cancelled = false;

    const updateDayMode = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=sunrise,sunset&timezone=auto&forecast_days=1`
        );
        const data = await res.json();
        const sunriseRaw = data?.daily?.sunrise?.[0];
        const sunsetRaw = data?.daily?.sunset?.[0];

        if (sunriseRaw && sunsetRaw) {
          const now = new Date();
          const sunrise = new Date(sunriseRaw);
          const sunset = new Date(sunsetRaw);
          if (!cancelled) {
            setTimeMode(now >= sunrise && now < sunset ? 'day' : 'night');
          }
          return;
        }
      } catch {
        // Fallback below when API is unavailable.
      }

      const hour = new Date().getHours();
      if (!cancelled) {
        setTimeMode(hour >= 6 && hour < 20 ? 'day' : 'night');
      }
    };

    updateDayMode();
    const id = window.setInterval(updateDayMode, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  // Global atmospheric background classes.
  useEffect(() => {
    const root = document.documentElement;
    const nextTimeClass = `atmo-time-${timeMode}`;
    const nextSeasonClass = `atmo-season-${seasonMode}`;
    const nextWeatherClass = `atmo-weather-${weatherMode}`;

    root.classList.remove(...timeClasses, ...seasonClasses, ...weatherClasses);
    root.classList.add(nextTimeClass, nextSeasonClass, nextWeatherClass);

    return () => {
      root.classList.remove(nextTimeClass, nextSeasonClass, nextWeatherClass);
    };
  }, [timeMode, seasonMode, weatherMode]);

  return (
    <>
      <Header />
      <HomePage
        timeMode={timeMode}
        seasonMode={seasonMode}
        weatherMode={weatherMode}
        setTimeMode={setTimeMode}
        setSeasonMode={setSeasonMode}
        setWeatherMode={setWeatherMode}
      />
      <Footer />
    </>
  );
}

export default App;

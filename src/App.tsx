import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LexiconMenu from './components/LexiconMenu';
import MobileBottomNav from './components/Layout/MobileBottomNav';
import Onboarding from './components/Onboarding';
import SeasonalHeader from './components/Layout/SeasonalHeader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LexiconSplashPage from './pages/LexiconSplashPage';
import AtmosphereCanvas from './components/Atmosphere/AtmosphereCanvas';
import './App.css';
import { type TimeMode, type SeasonMode, type WeatherMode } from './theme/atmosphere';

const LATITUDE = 52.06;
const LONGITUDE = -1.98;

const timeClasses = ['atmo-time-day', 'atmo-time-night'];
const seasonClasses = ['atmo-season-summer', 'atmo-season-winter'];
const weatherClasses = ['atmo-weather-clear', 'atmo-weather-rain', 'atmo-weather-snow'];
const ukTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/London',
  timeZoneName: 'short',
});

function getSeasonFromDate(date: Date): SeasonMode {
  const month = date.getMonth(); // 0-based
  return month >= 3 && month <= 8 ? 'summer' : 'winter';
}

function weatherModeFromCode(code: number): WeatherMode {
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if (code === 0 || code === 1) return 'clear';
  if (code >= 50 || [45, 48].includes(code)) return 'rain';
  return 'clear';
}

function weatherLabelFromCode(code: number): string {
  const labels: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Dense drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Heavy showers',
    85: 'Snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
  };

  return labels[code] ?? 'Weather shifting';
}

function App() {
  const location = useLocation();
  const [timeMode, setTimeMode] = useState<TimeMode>('day');
  const [seasonMode, setSeasonMode] = useState<SeasonMode>(getSeasonFromDate(new Date()));
  const [weatherMode, setWeatherMode] = useState<WeatherMode>('clear');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherLabel, setWeatherLabel] = useState('Checking weather');
  const [autoWeather, setAutoWeather] = useState(true);
  const [weatherSource, setWeatherSource] = useState<'auto' | 'manual'>('auto');
  const [currentTime, setCurrentTime] = useState(() => ukTimeFormatter.format(new Date()));

  // Real season from current month.
  useEffect(() => {
    const updateSeason = () => setSeasonMode(getSeasonFromDate(new Date()));
    updateSeason();
    const id = window.setInterval(updateSeason, 6 * 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  // Local clock for the atmosphere panel.
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(ukTimeFormatter.format(new Date()));
    };

    updateTime();
    const id = window.setInterval(updateTime, 30 * 1000);
    return () => window.clearInterval(id);
  }, []);

  // Real current conditions from Open-Meteo.
  useEffect(() => {
    let cancelled = false;

    const updateWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code&timezone=auto&forecast_days=1`
        );
        const data = await res.json();
        const code = Number(data?.current?.weather_code ?? 0);
        const temp = Number(data?.current?.temperature_2m);

        if (!cancelled) {
          if (autoWeather) {
            setWeatherMode(weatherModeFromCode(code));
            setWeatherSource('auto');
          }
          setWeatherLabel(weatherLabelFromCode(code));
          setTemperature(Number.isFinite(temp) ? Math.round(temp) : null);
        }
      } catch {
        if (!cancelled) {
          setWeatherLabel('Manual weather');
        }
      }
    };

    updateWeather();
    const id = window.setInterval(updateWeather, 20 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [autoWeather]);

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

  const isSplashRoute = location.pathname === '/splash';
  const isOnboardingRoute = location.pathname === '/onboarding';
  const isAboutRoute = location.pathname === '/about';
  const showFooter = !isSplashRoute && !isOnboardingRoute;
  const showMenu = !isOnboardingRoute && !isSplashRoute;

  return (
    <div className="app-shell" id="home">
      <AtmosphereCanvas
        timeMode={timeMode}
        seasonMode={seasonMode}
        weatherMode={weatherMode}
      />
      {isAboutRoute ? <SeasonalHeader /> : !isSplashRoute && <Header />}
      {showMenu && <LexiconMenu />}
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                timeMode={timeMode}
                seasonMode={seasonMode}
                weatherMode={weatherMode}
                temperature={temperature}
                weatherLabel={weatherLabel}
                currentTime={currentTime}
                autoWeather={autoWeather}
                weatherSource={weatherSource}
                setAutoWeather={setAutoWeather}
                setWeatherSource={setWeatherSource}
                setTimeMode={setTimeMode}
                setSeasonMode={setSeasonMode}
                setWeatherMode={setWeatherMode}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/splash" element={<LexiconSplashPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <MobileBottomNav />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Get location name
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          .then(res => res.json())
          .then(data => {
            setLocation(data.city || data.locality || "Unknown Location");
          })
          .catch(() => setLocation("Unknown Location"));

        // Get weather data
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather(data.current_weather);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setError("Failed to fetch weather.");
            setLoading(false);
          });
      },
      () => {
        setError("Location permission denied.");
        setLoading(false);
      }
    );
  }, []);

  const getWeatherIcon = (code: number) => {
    // Simplified weather code mapping
    if (code <= 1) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "☁️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌦️";
    return "⛈️";
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear sky";
    if (code <= 1) return "Mainly clear";
    if (code <= 2) return "Partly cloudy";
    if (code <= 3) return "Overcast";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Rain showers";
    return "Thunderstorm";
  };

  if (loading) {
    return (
      <div className="widget-container">
        <div className="widget-header">
          <h3 className="widget-title">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Weather
          </h3>
          <div className="status-busy"></div>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="widget-container bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <div className="widget-header">
          <h3 className="widget-title text-red-700 dark:text-red-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Weather Error
          </h3>
          <div className="status-offline"></div>
        </div>
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="widget-container bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200/50 dark:border-blue-700/50">
      <div className="widget-header">
        <h3 className="widget-title text-blue-700 dark:text-blue-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          Weather
        </h3>
        <div className="status-online"></div>
      </div>

      <div className="widget-content">
        {/* Current temperature display */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">
            {getWeatherIcon(weather.weathercode)}
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
            {Math.round(weather.temperature)}°F
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-300 font-medium">
            {getWeatherDescription(weather.weathercode)}
          </div>
          {location && (
            <div className="text-xs text-blue-500 dark:text-blue-400 mt-1 flex items-center justify-center">
              <svg className="w-0.5 h-1 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          )}
        </div>

        {/* Weather details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Wind Speed</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {Math.round(weather.windspeed)} km/h
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Feels Like</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {Math.round(weather.temperature + (weather.windspeed > 10 ? -2 : 0))}°F
            </span>
          </div>
        </div>

        {/* Last updated */}
        <div className="mt-4 pt-3 border-t border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center justify-between text-xs text-blue-500 dark:text-blue-400">
            <span>Last updated</span>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
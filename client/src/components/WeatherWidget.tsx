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
  const [location, setLocation] = useState<string>("Unknown Location");

  const getWeatherIcon = (weathercode: number) => {
    if (weathercode === 0) return "☀️";
    if (weathercode <= 3) return "⛅";
    if (weathercode <= 48) return "☁️";
    if (weathercode <= 67) return "🌧️";
    if (weathercode <= 77) return "🌨️";
    if (weathercode <= 82) return "🌦️";
    return "⛈️";
  };

  const getWeatherDescription = (weathercode: number) => {
    if (weathercode === 0) return "Clear sky";
    if (weathercode <= 3) return "Partly cloudy";
    if (weathercode <= 48) return "Overcast";
    if (weathercode <= 67) return "Rainy";
    if (weathercode <= 77) return "Snow";
    if (weathercode <= 82) return "Rain showers";
    return "Thunderstorm";
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 80) return "text-red-500";
    if (temp >= 70) return "text-orange-500";
    if (temp >= 60) return "text-yellow-500";
    if (temp >= 50) return "text-green-500";
    if (temp >= 40) return "text-blue-500";
    return "text-blue-600";
  };

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const [weatherResponse, locationResponse] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`
          ),
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
        ]);
        
        const weatherData = await weatherResponse.json();
        const locationData = await locationResponse.json();
        
        setWeather(weatherData.current_weather);
        setLocation(locationData.city || locationData.locality || "Unknown Location");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="glass rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <svg className="mx-auto h-8 w-8 text-red-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">Weather Unavailable</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="glass rounded-xl p-6 border border-white/20 dark:border-gray-700/30 widget-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Weather
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        </div>
        <div className="text-3xl animate-pulse-soft">
          {getWeatherIcon(weather.weathercode)}
        </div>
      </div>

      <div className="space-y-4">
        {/* Temperature */}
        <div className="flex items-end space-x-2">
          <span className={`text-4xl font-bold ${getTemperatureColor(weather.temperature)}`}>
            {Math.round(weather.temperature)}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">°F</span>
        </div>

        {/* Weather Description */}
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {getWeatherDescription(weather.weathercode)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Feels like {Math.round(weather.temperature)}°F
            </p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h1a1 1 0 011 1v2m3 0V2a1 1 0 011-1h1a1 1 0 011 1v2m-9 7h10a1 1 0 001-1V6a1 1 0 00-1-1H6a1 1 0 00-1 1v4a1 1 0 001 1zm8 4l-6-2V9l6 2v10z" />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400">Wind</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(weather.windspeed)} km/h
          </span>
        </div>

        {/* Last Updated */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
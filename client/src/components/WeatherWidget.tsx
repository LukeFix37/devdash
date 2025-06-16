import React, { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather(data.current_weather);
          })
          .catch((err) => {
            console.error(err);
            setError("Failed to fetch weather.");
          });
      },
      () => {
        setError("Location permission denied.");
      }
    );
  }, []);

  if (error) {
    return <div className="p-4 bg-red-500 text-white rounded">{error}</div>;
  }

  if (!weather) {
    return <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded">Loading weather…</div>;
  }

  return (
    <div className="widget-card">
      <h3 className="text-lg font-semibold mb-2">Current Weather</h3>
      <p>🌡️ Temperature: {weather.temperature}°F</p>
      <p>💨 Windspeed: {weather.windspeed} km/h</p>
    </div>
  );
};

export default WeatherWidget;

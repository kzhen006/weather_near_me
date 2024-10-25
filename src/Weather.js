// src/Weather.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const latitude = 25.7617;  // Miami Latitude
      const longitude = -80.1918;  // Miami Longitude
      const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

      try {
        const response = await axios.get(apiURL);
        setWeatherData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error fetching weather data: {error}</p>;

  return (
    <div>
      <h1>Weather Data</h1>
      {weatherData && (
        <div>
          <h2>Hourly Temperature</h2>
          <ul>
            {weatherData.hourly.temperature_2m.map((temp, index) => (
              <li key={index}>Hour {index + 1}: {temp}°C</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
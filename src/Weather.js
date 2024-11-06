import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { WiDaySunny, WiCloudy } from "weather-icons-react";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const latitude = 25.7617;  // Miami Latitude
      const longitude = -80.1918;  // Miami Longitude
      const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

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

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
        Error fetching weather data: {error}
      </Typography>
    );
  }

  // Extract current weather data
  const { current_weather } = weatherData;
  const { temperature_2m = [], relative_humidity_2m = [], wind_speed_10m = [] } = weatherData.hourly || {};

  

  // Helper function to format hours into readable times
  const formatHour = (hourIndex) => {
    const now = new Date();
    now.setHours(now.getHours() + hourIndex); // Increment current hour by hourIndex
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      {/* Header with Current Weather */}
      <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4">Miami Weather</Typography>
          <Typography variant="h5">
            {current_weather ? `${current_weather.temperature}°C` : "N/A"}
          </Typography>
          <Typography variant="body1">
            Wind Speed: {current_weather ? `${current_weather.windspeed} m/s` : "N/A"}
          </Typography>
        </CardContent>
      </Card>

      {/* Hourly Forecast Section */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
            Hourly Forecast
          </Typography>
          <Grid container spacing={2}>
            {temperature_2m.slice(0, 8).map((temp, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
                  <Typography variant="subtitle1">{formatHour(index)}</Typography>
                  {/* Weather Icon Example */}
                  {temp > 30 ? (
                    <WiDaySunny size={32} color="#FFC107" />
                  ) : (
                    <WiCloudy size={32} color="#90A4AE" />
                  )}
                  <Typography variant="h6">{temp}°C</Typography>
                  <Typography variant="body2">Humidity: {relative_humidity_2m[index] || 0}%</Typography>
                  <Typography variant="body2">Wind: {wind_speed_10m[index] || 0} m/s</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      
    </div>
  );
};

export default WeatherApp;


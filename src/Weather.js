import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const currentURL = `https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&current_weather=true&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/New_York`;
      try {
        const response = await axios.get(currentURL);
        setCurrentWeather(response.data.current_weather);
      } catch (err) {
        setError("Error fetching current weather data");
      }
    };

    const fetchHourlyData = async () => {
      const hourlyURL = `https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/New_York`;
      try {
        const response = await axios.get(hourlyURL);
        setHourlyData(response.data.hourly);
      } catch (err) {
        setError("Error fetching hourly data");
      }
    };

    const fetchDailyData = async () => {
      const dailyURL = `https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/New_York`;
      try {
        const response = await axios.get(dailyURL);
        setDailyData(response.data.daily);
      } catch (err) {
        setError("Error fetching daily data");
      }
    };

    // Fetch all data
    fetchCurrentWeather();
    fetchHourlyData();
    fetchDailyData();

    setLoading(false);
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
        {error}
      </Typography>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      {/* Current Weather Data */}
      {currentWeather && (
        <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="h4">Current Temperature</Typography>
            <Typography variant="h5">{currentWeather.temperature}°F</Typography>
          </CardContent>
        </Card>
      )}

      {/* Hourly Weather Data */}
      {hourlyData && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
              Hourly Weather Data
            </Typography>
            <Grid container spacing={2}>
              {hourlyData.time.slice(0, 24).map((time, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
                    <Typography variant="subtitle1">{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                    <Typography variant="body2">Temp: {hourlyData.temperature_2m[index]}°F</Typography>
                    <Typography variant="body2">Humidity: {hourlyData.relative_humidity_2m[index]}%</Typography>
                    <Typography variant="body2">Dew Point: {hourlyData.dew_point_2m[index]}°F</Typography>
                    <Typography variant="body2">Feels Like: {hourlyData.apparent_temperature[index]}°F</Typography>
                    <Typography variant="body2">Precipitation Prob: {hourlyData.precipitation_probability[index]}%</Typography>
                    <Typography variant="body2">Rain: {hourlyData.rain[index] || 0} in</Typography>
                    <Typography variant="body2">Wind Speed: {hourlyData.wind_speed_10m[index]} mph</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Daily Weather Data */}
      {dailyData && (
        <Card style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
              Daily Weather Data
            </Typography>
            <Grid container spacing={2}>
              {dailyData.time.map((date, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
                    <Typography variant="subtitle1">{new Date(date).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Max Temp: {dailyData.temperature_2m_max[index]}°F</Typography>
                    <Typography variant="body2">Min Temp: {dailyData.temperature_2m_min[index]}°F</Typography>
                    <Typography variant="body2">Sunrise: {new Date(dailyData.sunrise[index]).toLocaleTimeString()}</Typography>
                    <Typography variant="body2">Sunset: {new Date(dailyData.sunset[index]).toLocaleTimeString()}</Typography>
                    <Typography variant="body2">UV Index Max: {dailyData.uv_index_max[index]}</Typography>
                    <Typography variant="body2">Rain Sum: {dailyData.rain_sum[index]} in</Typography>
                    <Typography variant="body2">Wind Speed Max: {dailyData.wind_speed_10m_max[index]} mph</Typography>
                    <Typography variant="body2">Wind Gust Max: {dailyData.wind_gusts_10m_max[index]} mph</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherApp;

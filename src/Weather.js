// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";
// import { WiDaySunny, WiCloudy } from "weather-icons-react";

// const WeatherApp = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       const latitude = 25.7617;  // Miami Latitude
//       const longitude = -80.1918;  // Miami Longitude
//       const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,rain&timezone=auto`;

//       try {
//         const response = await axios.get(apiURL);
//         setWeatherData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
//         Error fetching weather data: {error}
//       </Typography>
//     );
//   }

//   // Extract current weather data
//   const { current_weather } = weatherData;
//   const { temperature_2m = [], relative_humidity_2m = [], wind_speed_10m = [], rain = [] } = weatherData.hourly || {};

//   // Helper function to format hours into readable times
//   const formatHour = (hourIndex) => {
//     const now = new Date();
//     now.setHours(now.getHours() + hourIndex); // Increment current hour by hourIndex
//     return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       {/* Header with Current Weather */}
//       <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
//         <CardContent style={{ textAlign: "center" }}>
//           <Typography variant="h4">Miami Weather</Typography>
//           <Typography variant="h5">
//             {current_weather ? `${current_weather.temperature}°C` : "N/A"}
//           </Typography>
//           <Typography variant="body1">
//             Wind Speed: {current_weather ? `${current_weather.windspeed} m/s` : "N/A"}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* Hourly Forecast Section */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Hourly Forecast
//           </Typography>
//           <Grid container spacing={2}>
//             {temperature_2m.slice(0, 8).map((temp, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{formatHour(index)}</Typography>
//                   {/* Weather Icon Example */}
//                   {temp > 30 ? (
//                     <WiDaySunny size={32} color="#FFC107" />
//                   ) : (
//                     <WiCloudy size={32} color="#90A4AE" />
//                   )}
//                   <Typography variant="h6">{temp}°C</Typography>
//                   <Typography variant="body2">Humidity: {relative_humidity_2m[index] || 0}%</Typography>
//                   <Typography variant="body2">Wind: {wind_speed_10m[index] || 0} m/s</Typography>
//                   <Typography variant="body2">Rainfall: {rain[index] || 0} mm</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WeatherApp;

// ========================================================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";

// const WeatherApp = () => {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [historicalData, setHistoricalData] = useState(null);
//   const [longTermData, setLongTermData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const latitude = 26.012501;  // Berlin Latitude
//   const longitude = -80.313614; // Berlin Longitude

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const currentAndForecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;
//         const past10DaysURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;
//         const archiveURL = `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m&timezone=auto`;

//         const [currentResponse, past10DaysResponse, archiveResponse] = await Promise.all([
//           axios.get(currentAndForecastURL),
//           axios.get(past10DaysURL),
//           axios.get(archiveURL),
//         ]);

//         setCurrentWeather(currentResponse.data);
//         setHistoricalData(past10DaysResponse.data.hourly);
//         setLongTermData(archiveResponse.data.hourly);

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
//         Error fetching weather data: {error}
//       </Typography>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       {/* Current Weather */}
//       <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
//         <CardContent style={{ textAlign: "center" }}>
//           <Typography variant="h4">Current Weather</Typography>
//           <Typography variant="h5">
//             {currentWeather.current_weather ? `${currentWeather.current_weather.temperature}°C` : "N/A"}
//           </Typography>
//           <Typography variant="body1">
//             Wind Speed: {currentWeather.current_weather ? `${currentWeather.current_weather.windspeed} m/s` : "N/A"}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* Past 10 Days of Weather */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Last 10 Days of Weather
//           </Typography>
//           <Grid container spacing={2}>
//             {historicalData && historicalData.temperature_2m.slice(0, 24 * 10).map((temp, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">
//                     {new Date(historicalData.time[index]).toLocaleString()}
//                   </Typography>
//                   <Typography variant="body2">Temp: {temp}°C</Typography>
//                   <Typography variant="body2">Humidity: {historicalData.relative_humidity_2m[index]}%</Typography>
//                   <Typography variant="body2">Wind: {historicalData.wind_speed_10m[index]} m/s</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Long-Term Historical Data */}
//       <Card style={{ marginTop: "20px" }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Historical Data (2021)
//           </Typography>
//           <Grid container spacing={2}>
//             {longTermData && longTermData.temperature_2m.slice(0, 24 * 30).map((temp, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">
//                     {new Date(longTermData.time[index]).toLocaleString()}
//                   </Typography>
//                   <Typography variant="body2">Temp: {temp}°C</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WeatherApp;

// ===============================================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";

// const WeatherApp = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const latitude = 25.7743;  // Miami Latitude
//   const longitude = -80.1937; // Miami Longitude

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m&daily=uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&past_days=7`;

//       try {
//         const response = await axios.get(apiURL);
//         setWeatherData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
//         Error fetching weather data: {error}
//       </Typography>
//     );
//   }

//   const { hourly, daily } = weatherData;
  
//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       {/* Current and Past 7 Days Weather Data */}
//       <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
//         <CardContent style={{ textAlign: "center" }}>
//           <Typography variant="h4">Miami Weather (Past 7 Days)</Typography>
//         </CardContent>
//       </Card>

//       {/* Display Hourly Data */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Hourly Weather Data
//           </Typography>
//           <Grid container spacing={2}>
//             {hourly.time.slice(0, 8).map((time, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(time).toLocaleString()}</Typography>
//                   <Typography variant="body2">Temp: {hourly.temperature_2m[index]}°F</Typography>
//                   <Typography variant="body2">Humidity: {hourly.relative_humidity_2m[index]}%</Typography>
//                   <Typography variant="body2">Dew Point: {hourly.dew_point_2m[index]}°F</Typography>
//                   <Typography variant="body2">Feels Like: {hourly.apparent_temperature[index]}°F</Typography>
//                   <Typography variant="body2">Rain: {hourly.rain[index] || 0} in</Typography>
//                   <Typography variant="body2">Showers: {hourly.showers[index] || 0} in</Typography>
//                   <Typography variant="body2">Snowfall: {hourly.snowfall[index] || 0} in</Typography>
//                   <Typography variant="body2">Snow Depth: {hourly.snow_depth[index] || 0} in</Typography>
//                   <Typography variant="body2">Pressure: {hourly.surface_pressure[index]} hPa</Typography>
//                   <Typography variant="body2">Visibility: {hourly.visibility[index]} m</Typography>
//                   <Typography variant="body2">Cloud Cover: {hourly.cloud_cover[index]}%</Typography>
//                   <Typography variant="body2">Wind Speed: {hourly.wind_speed_10m[index]} mph</Typography>
//                   <Typography variant="body2">Wind Gusts: {hourly.wind_gusts_10m[index]} mph</Typography>
//                   <Typography variant="body2">Wind Dir: {hourly.wind_direction_10m[index]}°</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Display Daily Data */}
//       <Card style={{ marginTop: "20px" }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Daily UV Index Max
//           </Typography>
//           <Grid container spacing={2}>
//             {daily.time.map((date, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(date).toLocaleDateString()}</Typography>
//                   <Typography variant="body2">UV Index Max: {daily.uv_index_max[index]}</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WeatherApp;


// ========================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";

// const WeatherApp = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m&daily=sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/New_York&past_days=7`;

//       try {
//         const response = await axios.get(apiURL);
//         setWeatherData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
//         Error fetching weather data: {error}
//       </Typography>
//     );
//   }

//   const { hourly, daily } = weatherData;

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       {/* Weather Summary */}
//       <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
//         <CardContent style={{ textAlign: "center" }}>
//           <Typography variant="h4">Miami Weather (Past 7 Days)</Typography>
//         </CardContent>
//       </Card>

//       {/* Hourly Weather Data */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Hourly Weather Data
//           </Typography>
//           <Grid container spacing={2}>
//             {hourly.time.slice(0, 24).map((time, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(time).toLocaleString()}</Typography>
//                   <Typography variant="body2">Temp: {hourly.temperature_2m[index]}°F</Typography>
//                   <Typography variant="body2">Humidity: {hourly.relative_humidity_2m[index]}%</Typography>
//                   <Typography variant="body2">Dew Point: {hourly.dew_point_2m[index]}°F</Typography>
//                   <Typography variant="body2">Feels Like: {hourly.apparent_temperature[index]}°F</Typography>
//                   <Typography variant="body2">Precip Prob: {hourly.precipitation_probability[index]}%</Typography>
//                   <Typography variant="body2">Rain: {hourly.rain[index] || 0} in</Typography>
//                   <Typography variant="body2">Showers: {hourly.showers[index] || 0} in</Typography>
//                   <Typography variant="body2">Snowfall: {hourly.snowfall[index] || 0} in</Typography>
//                   <Typography variant="body2">Pressure: {hourly.surface_pressure[index]} hPa</Typography>
//                   <Typography variant="body2">Visibility: {hourly.visibility[index]} m</Typography>
//                   <Typography variant="body2">Cloud Cover: {hourly.cloud_cover[index]}%</Typography>
//                   <Typography variant="body2">Wind Speed: {hourly.wind_speed_10m[index]} mph</Typography>
//                   <Typography variant="body2">Wind Gusts: {hourly.wind_gusts_10m[index]} mph</Typography>
//                   <Typography variant="body2">Wind Dir: {hourly.wind_direction_10m[index]}°</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Daily Weather Data */}
//       <Card style={{ marginTop: "20px" }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Daily Weather Data
//           </Typography>
//           <Grid container spacing={2}>
//             {daily.time.map((date, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(date).toLocaleDateString()}</Typography>
//                   <Typography variant="body2">Sunrise: {new Date(daily.sunrise[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">Sunset: {new Date(daily.sunset[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">UV Index Max: {daily.uv_index_max[index]}</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WeatherApp;

// =======================================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";

// const WeatherApp = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&current_weather=true&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/New_York&past_days=7`;

//       try {
//         const response = await axios.get(apiURL);
//         setWeatherData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
//         Error fetching weather data: {error}
//       </Typography>
//     );
//   }

//   const { current_weather, hourly, daily } = weatherData;

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       {/* Current Weather Data */}
//       <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
//         <CardContent style={{ textAlign: "center" }}>
//           <Typography variant="h4">Current Weather</Typography>
//           <Typography variant="h5">{current_weather.temperature}°F</Typography>
//           <Typography variant="body1">Feels Like: {current_weather.apparent_temperature}°F</Typography>
//           <Typography variant="body1">Humidity: {current_weather.relative_humidity}%</Typography>
//           <Typography variant="body1">Wind Speed: {current_weather.wind_speed_10m} mph</Typography>
//           <Typography variant="body1">Wind Direction: {current_weather.wind_direction_10m}°</Typography>
//           <Typography variant="body1">Precipitation: {current_weather.precipitation} in</Typography>
//           <Typography variant="body1">Is Day: {current_weather.is_day ? "Yes" : "No"}</Typography>
//         </CardContent>
//       </Card>

//       {/* Hourly Weather Data */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Hourly Weather Data
//           </Typography>
//           <Grid container spacing={2}>
//             {hourly.time.slice(0, 24).map((time, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(time).toLocaleString()}</Typography>
//                   <Typography variant="body2">Temp: {hourly.temperature_2m[index]}°F</Typography>
//                   <Typography variant="body2">Humidity: {hourly.relative_humidity_2m[index]}%</Typography>
//                   <Typography variant="body2">Dew Point: {hourly.dew_point_2m[index]}°F</Typography>
//                   <Typography variant="body2">Feels Like: {hourly.apparent_temperature[index]}°F</Typography>
//                   <Typography variant="body2">Precipitation Prob: {hourly.precipitation_probability[index]}%</Typography>
//                   <Typography variant="body2">Rain: {hourly.rain[index] || 0} in</Typography>
//                   <Typography variant="body2">Visibility: {hourly.visibility[index]} m</Typography>
//                   <Typography variant="body2">Cloud Cover: {hourly.cloud_cover[index]}%</Typography>
//                   <Typography variant="body2">Wind Speed: {hourly.wind_speed_10m[index]} mph</Typography>
//                   <Typography variant="body2">Wind Gusts: {hourly.wind_gusts_10m[index]} mph</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Daily Weather Data */}
//       <Card style={{ marginTop: "20px" }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Daily Weather Data
//           </Typography>
//           <Grid container spacing={2}>
//             {daily.time.map((date, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(date).toLocaleDateString()}</Typography>
//                   <Typography variant="body2">Max Temp: {daily.temperature_2m_max[index]}°F</Typography>
//                   <Typography variant="body2">Min Temp: {daily.temperature_2m_min[index]}°F</Typography>
//                   <Typography variant="body2">Sunrise: {new Date(daily.sunrise[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">Sunset: {new Date(daily.sunset[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">UV Index Max: {daily.uv_index_max[index]}</Typography>
//                   <Typography variant="body2">Rain Sum: {daily.rain_sum[index]} in</Typography>
//                   <Typography variant="body2">Wind Speed Max: {daily.wind_speed_10m_max[index]} mph</Typography>
//                   <Typography variant="body2">Wind Gust Max: {daily.wind_gusts_10m_max[index]} mph</Typography>
//                   <Typography variant="body2">Wind Dir Dominant: {daily.wind_direction_10m_dominant[index]}°</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WeatherApp;

// ======================================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";

// const WeatherApp = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&current_weather=true&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/New_York&past_days=7`;

//       try {
//         const response = await axios.get(apiURL);
//         setWeatherData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
//         Error fetching weather data: {error}
//       </Typography>
//     );
//   }

//   const { current_weather, hourly, daily } = weatherData;

//   // Filter hourly data to show only entries for the current day
//   const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" format
//   const hourlyDataToday = hourly.time
//     .map((time, index) => ({
//       time,
//       temperature: hourly.temperature_2m[index],
//       humidity: hourly.relative_humidity_2m[index],
//       dewPoint: hourly.dew_point_2m[index],
//       apparentTemperature: hourly.apparent_temperature[index],
//       precipitationProb: hourly.precipitation_probability[index],
//       rain: hourly.rain[index],
//       visibility: hourly.visibility[index],
//       cloudCover: hourly.cloud_cover[index],
//       windSpeed: hourly.wind_speed_10m[index],
//       windGusts: hourly.wind_gusts_10m[index],
//     }))
//     .filter((entry) => entry.time.startsWith(today));

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       {/* Current Weather Data */}
//       <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
//         <CardContent style={{ textAlign: "center" }}>
//           <Typography variant="h4">Current Weather</Typography>
//           <Typography variant="h5">{current_weather.temperature}°F</Typography>
//           <Typography variant="body1">Feels Like: {current_weather.apparent_temperature}°F</Typography>
//           <Typography variant="body1">Humidity: {current_weather.relative_humidity}%</Typography>
//           <Typography variant="body1">Wind Speed: {current_weather.wind_speed_10m} mph</Typography>
//           <Typography variant="body1">Wind Direction: {current_weather.wind_direction_10m}°</Typography>
//           <Typography variant="body1">Precipitation: {current_weather.precipitation} in</Typography>
//           <Typography variant="body1">Is Day: {current_weather.is_day ? "Yes" : "No"}</Typography>
//         </CardContent>
//       </Card>

//       {/* Hourly Weather Data for Today */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Hourly Weather Data for Today
//           </Typography>
//           <Grid container spacing={2}>
//             {hourlyDataToday.map((hour, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
//                   <Typography variant="body2">Temp: {hour.temperature}°F</Typography>
//                   <Typography variant="body2">Humidity: {hour.humidity}%</Typography>
//                   <Typography variant="body2">Dew Point: {hour.dewPoint}°F</Typography>
//                   <Typography variant="body2">Feels Like: {hour.apparentTemperature}°F</Typography>
//                   <Typography variant="body2">Precipitation Prob: {hour.precipitationProb}%</Typography>
//                   <Typography variant="body2">Rain: {hour.rain || 0} in</Typography>
//                   <Typography variant="body2">Visibility: {hour.visibility} m</Typography>
//                   <Typography variant="body2">Cloud Cover: {hour.cloudCover}%</Typography>
//                   <Typography variant="body2">Wind Speed: {hour.windSpeed} mph</Typography>
//                   <Typography variant="body2">Wind Gusts: {hour.windGusts} mph</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Daily Weather Data */}
//       <Card style={{ marginTop: "20px" }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Daily Weather Data
//           </Typography>
//           <Grid container spacing={2}>
//             {daily.time.map((date, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(date).toLocaleDateString()}</Typography>
//                   <Typography variant="body2">Max Temp: {daily.temperature_2m_max[index]}°F</Typography>
//                   <Typography variant="body2">Min Temp: {daily.temperature_2m_min[index]}°F</Typography>
//                   <Typography variant="body2">Sunrise: {new Date(daily.sunrise[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">Sunset: {new Date(daily.sunset[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">UV Index Max: {daily.uv_index_max[index]}</Typography>
//                   <Typography variant="body2">Rain Sum: {daily.rain_sum[index]} in</Typography>
//                   <Typography variant="body2">Wind Speed Max: {daily.wind_speed_10m_max[index]} mph</Typography>
//                   <Typography variant="body2">Wind Gust Max: {daily.wind_gusts_10m_max[index]} mph</Typography>
//                   <Typography variant="body2">Wind Dir Dominant: {daily.wind_direction_10m_dominant[index]}°</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WeatherApp;

// ==========================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";

// const WeatherApp = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&current_weather=true&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/New_York&past_days=7`;

//       try {
//         const response = await axios.get(apiURL);
//         setWeatherData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
//         Error fetching weather data: {error}
//       </Typography>
//     );
//   }

//   const { current_weather, hourly, daily } = weatherData;

//   // Filter hourly data to show only entries for the current day
//   const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" format
//   const hourlyDataToday = hourly.time
//     .map((time, index) => ({
//       time,
//       temperature: hourly.temperature_2m[index],
//       humidity: hourly.relative_humidity_2m[index],
//       dewPoint: hourly.dew_point_2m[index],
//       apparentTemperature: hourly.apparent_temperature[index],
//       precipitationProb: hourly.precipitation_probability[index],
//       rain: hourly.rain[index],
//       visibility: hourly.visibility[index],
//       cloudCover: hourly.cloud_cover[index],
//       windSpeed: hourly.wind_speed_10m[index],
//       windGusts: hourly.wind_gusts_10m[index],
//     }))
//     .filter((entry) => entry.time.startsWith(today));

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       {/* Current Weather Data */}
//       <Card style={{ backgroundColor: "#2196F3", color: "white", marginBottom: "20px" }}>
//         <CardContent style={{ textAlign: "center" }}>
//           <Typography variant="h4">Current Weather</Typography>
//           <Typography variant="h5">{current_weather.temperature}°F</Typography>
//           <Typography variant="body1">Feels Like: {current_weather.apparent_temperature}°F</Typography>
//           <Typography variant="body1">Humidity: {current_weather.relative_humidity}%</Typography>
//           <Typography variant="body1">Wind Speed: {current_weather.wind_speed_10m} mph</Typography>
//           <Typography variant="body1">Wind Direction: {current_weather.wind_direction_10m}°</Typography>
//           <Typography variant="body1">Precipitation: {current_weather.precipitation} in</Typography>
//           <Typography variant="body1">Is Day: {current_weather.is_day ? "Yes" : "No"}</Typography>
//         </CardContent>
//       </Card>

//       {/* Hourly Weather Data for Today */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Hourly Weather Data for Today
//           </Typography>
//           <Grid container spacing={2}>
//             {hourlyDataToday.map((hour, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
//                   <Typography variant="body2">Temp: {hour.temperature}°F</Typography>
//                   <Typography variant="body2">Humidity: {hour.humidity}%</Typography>
//                   <Typography variant="body2">Dew Point: {hour.dewPoint}°F</Typography>
//                   <Typography variant="body2">Feels Like: {hour.apparentTemperature}°F</Typography>
//                   <Typography variant="body2">Precipitation Prob: {hour.precipitationProb}%</Typography>
//                   <Typography variant="body2">Rain: {hour.rain || 0} in</Typography>
//                   <Typography variant="body2">Visibility: {hour.visibility} m</Typography>
//                   <Typography variant="body2">Cloud Cover: {hour.cloudCover}%</Typography>
//                   <Typography variant="body2">Wind Speed: {hour.windSpeed} mph</Typography>
//                   <Typography variant="body2">Wind Gusts: {hour.windGusts} mph</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Daily Weather Data */}
//       <Card style={{ marginTop: "20px" }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
//             Daily Weather Data
//           </Typography>
//           <Grid container spacing={2}>
//             {daily.time.map((date, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Card variant="outlined" style={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="subtitle1">{new Date(date).toLocaleDateString()}</Typography>
//                   <Typography variant="body2">Max Temp: {daily.temperature_2m_max[index]}°F</Typography>
//                   <Typography variant="body2">Min Temp: {daily.temperature_2m_min[index]}°F</Typography>
//                   <Typography variant="body2">Sunrise: {new Date(daily.sunrise[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">Sunset: {new Date(daily.sunset[index]).toLocaleTimeString()}</Typography>
//                   <Typography variant="body2">UV Index Max: {daily.uv_index_max[index]}</Typography>
//                   <Typography variant="body2">Rain Sum: {daily.rain_sum[index]} in</Typography>
//                   <Typography variant="body2">Wind Speed Max: {daily.wind_speed_10m_max[index]} mph</Typography>
//                   <Typography variant="body2">Wind Gust Max: {daily.wind_gusts_10m_max[index]} mph</Typography>
//                   <Typography variant="body2">Wind Dir Dominant: {daily.wind_direction_10m_dominant[index]}°</Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WeatherApp;

// ==================================================================

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
            {/* <Typography variant="body1">Feels Like: {currentWeather.apparent_temperature}°F</Typography> */}
            {/* <Typography variant="body1">Humidity: {currentWeather.relative_humidity}%</Typography> */}
            {/* <Typography variant="body1">Wind Speed: {currentWeather.wind_speed} mph</Typography> */}
            {/* <Typography variant="body1">Wind Direction: {currentWeather.wind_direction}°</Typography> */}
            {/* <Typography variant="body1">Precipitation: {currentWeather.precipitation} in</Typography> */}
            {/* <Typography variant="body1">Is Day: {currentWeather.is_day ? "Yes" : "No"}</Typography> */}
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

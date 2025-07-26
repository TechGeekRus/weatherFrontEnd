// // import './Weather.css'
// import React from 'react'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1'

// function RealTimeApi() {
//   const [location, setLocation] = useState('Memphis')
//   const [weatherData, setWeatherData] = useState(null)
//   const [input, setInput] = useState('')

//   useEffect(() => {
//     fetchCurrentWeather(location)
//   }, [location])

//   async function fetchCurrentWeather(loc) {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/current.json?key=${weatherAPI}&q=${loc}`
//       );
//       setWeatherData(response.data)
//     } catch (error) {
//       console.error('Error fetching current weather:', error)
//       setWeatherData(null)
//     }
//   }

//   function handleSearch() {
//     if (input.trim() !== '') {
//       setLocation(input.trim())
//     }
//   }

//   return (
//     <div>
//       <h2>RealTimeApi</h2>
//       <input
//         type="text"
//         placeholder="Enter location"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {weatherData ? (
//         <div>
//           <h3>{weatherData.location.name}, {weatherData.location.region}</h3>
//           <p>Temperature: {weatherData.current.temp_c}°C</p>
//           <p>Condition: {weatherData.current.condition.text}</p>
//           <img
//             src={weatherData.current.condition.icon}
//             alt={weatherData.current.condition.text}
//           />
//           <p>Humidity: {weatherData.current.humidity}%</p>
//           <p>Wind: {weatherData.current.wind_kph} kph</p>
//         </div>
//       ) : (
//         <p>No data available for "{location}"</p>
//       )}
//     </div>
//   );
// }

// function ForeCastAPI() {
//   const [location, setLocation] = useState('Memphis')
//   const [forecastData, setForecastData] = useState(null)
//   const [input, setInput] = useState('')
//   const [days, setDays] = useState(7)

//   useEffect(() => {
//     fetchForecast(location, days)
//   }, [location, days])

//   async function fetchForecast(loc, days) {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/forecast.json?key=${weatherAPI}&q=${loc}&days=${days}&aqi=no&alerts=no`
//       );
//       setForecastData(response.data)
//     } catch (error) {
//       console.error('Error fetching forecast:', error);
//       setForecastData(null);
//     }
//   }

//   function handleSearch() {
//     if (input.trim() !== '') {
//       setLocation(input.trim())
//     }
//   }

//   function handleDaysChange(e) {
//     setDays(Number(e.target.value))
//   }

//   return (
//     <div>
//       <h2>ForeCastAPI</h2>
//       <input
//         type="text"
//         placeholder="Enter location"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <label>
//         Days:
//         <select value={days} onChange={handleDaysChange}>
//           {[1, 2, 3, 4, 5, 6, 7].map((d) => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//         </select>
//       </label>

//       {forecastData ? (
//         <div>
//           <h3>
//             Forecast for {forecastData.location.name}, {forecastData.location.region}
//           </h3>
//           {forecastData.forecast.forecastday.map((day) => (
//             <div key={day.date} style={{ borderBottom: '1px solid #ccc', marginBottom: '8px' }}>
//               <strong>{day.date}</strong>
//               <p>Avg Temperature: {day.day.avgtemp_c}°C</p>
//               <p>Condition: {day.day.condition.text}</p>
//               <img src={day.day.condition.icon} alt={day.day.condition.text} />
//               <p>Max Wind: {day.day.maxwind_kph} kph</p>
//               <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No forecast data available for "{location}"</p>
//       )}
//     </div>
//   );
// }

// export default function WeatherApp() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Weather App</h1>
//       <RealTimeApi />
//       <hr />
//       <ForeCastAPI />
//     </div>
//   )
// }
// import React from 'react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function RealTimeApi() {
  const [location, setLocation] = useState('Memphis');
  const [weatherData, setWeatherData] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchCurrentWeather(location);
  }, [location]);

  async function fetchCurrentWeather(loc) {
    try {
      const response = await axios.get('/api/weather/current', {
        params: { q: loc },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching current weather:', error);
      setWeatherData(null);
    }
  }

  function handleSearch() {
    if (input.trim() !== '') {
      setLocation(input.trim());
    }
  }

  return (
    <div>
      <h2>Real-Time Weather</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weatherData && weatherData.location && weatherData.current ? (
        <div>
          <h3>
            {weatherData.location.name}, {weatherData.location.region}
          </h3>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_kph} kph</p>
        </div>
      ) : (
        <p>No data available for "{location}"</p>
      )}
    </div>
  );
}

export function ForeCastAPI() {
  const [location, setLocation] = useState('Memphis');
  const [forecastData, setForecastData] = useState(null);
  const [input, setInput] = useState('');
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetchForecast(location, days);
  }, [location, days]);

  async function fetchForecast(loc, daysCount) {
    try {
      const response = await axios.get('/api/weather/forecast', {
        params: { q: loc, days: daysCount },
      });
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      setForecastData(null);
    }
  }

  function handleSearch() {
    if (input.trim() !== '') {
      setLocation(input.trim());
    }
  }

  function handleDaysChange(e) {
    setDays(Number(e.target.value));
  }

  return (
    <div>
      <h2>Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <label>
        Days:
        <select value={days} onChange={handleDaysChange}>
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      {forecastData &&
      forecastData.location &&
      forecastData.forecast &&
      forecastData.forecast.forecastday ? (
        <div>
          <h3>
            Forecast for {forecastData.location.name}, {forecastData.location.region}
          </h3>
          {forecastData.forecast.forecastday.map((day) => (
            <div
              key={day.date}
              style={{ borderBottom: '1px solid #ccc', marginBottom: '8px' }}
            >
              <strong>{day.date}</strong>
              <p>Avg Temperature: {day.day.avgtemp_c}°C</p>
              <p>Condition: {day.day.condition.text}</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>Max Wind: {day.day.maxwind_kph} kph</p>
              <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forecast data available for "{location}"</p>
      )}
    </div>
  );
}

// Default export: Weather component that wraps RealTimeApi and ForeCastAPI
export default function Weather() {
  return (
    <div style={{ padding: '20px' }}>
      <RealTimeApi />
      <hr />
      <ForeCastAPI />
    </div>
  );
}
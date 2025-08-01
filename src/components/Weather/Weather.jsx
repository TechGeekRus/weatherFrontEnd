import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { toast, ToastContainer } from 'react-toastify'


export function RealTimeApi() {
  const [location, setLocation] = useState('Memphis')
  const [weatherData, setWeatherData] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchCurrentWeather(location)
  }, [location]);

  async function fetchCurrentWeather(loc) {
    try {
      const response = await axios.get('http://localhost:3000/api/weather/forecast', {
        params: { q: loc },
      })
      console.log(response)
      setWeatherData(response.data)
      toast.success('Weather loaded successfully!')
    } catch (error) {
      console.error('Error fetching current weather:', error)
      setWeatherData(null)
      toast.error('Failed to fetch weather.')
    }
  }

  function handleSearch() {
    if (input.trim() !== '') {
      setLocation(input.trim())
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
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
      />
      <button onClick={handleSearch}>Search</button>
       <Box><Favorite/></Box>

      {weatherData && weatherData.location && weatherData.current ? (
        <div>
          <h3>
            {weatherData.location.name}, {weatherData.location.region}
          </h3>
          <p>Temperature: {weatherData.current.temp_f}°F</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <p>Feels Like: {weatherData.current.feelslike_f}°F</p>
           <p>Heat Index: {weatherData.current.heatindex_f}°F</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_mph} mph</p>
        </div>
      ) : (
        <p>No data available for '{location}'</p>
      )}
    </div>
  )
}

export function ForeCastAPI() {
  const [location, setLocation] = useState('Memphis')
  const [forecastData, setForecastData] = useState(null)
  const [input, setInput] = useState('')
  const [days, setDays] = useState(3)

  useEffect(() => {
    fetchForecast(location, days)
  }, [location, days])

  async function fetchForecast(loc, daysCount) {
    try {
      const response = await axios.get('http://localhost:3000/api/weather/forecast', {
        params: { q: loc, days: daysCount }
      }) 
     setForecastData(response.data)
     toast.success('Weather loaded successfully!')
    } catch (error) {
      console.error('Error fetching forecast:', error)
      setForecastData(null)
      toast.error('Failed to fetch weather.')
    }
  }

  function handleSearch() {
    if (input.trim() !== '') {
      setLocation(input.trim())
    }
  }

  function handleDaysChange(e) {
    setDays(Number(e.target.value))
  }

  return (
    <div>
      <h2>Weather Forecast</h2>
      <input
        type='text'
        placeholder='Enter location'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
      />
      <button onClick={handleSearch}>Search</button>
      
      <Box>
        <Favorite/>
      </Box>

      <label>
        Days:
        <select value={days} onChange={handleDaysChange}>
          {[1, 2, 3].map((d) => (
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
              <p>Min Temperature: {day.day.mintemp_f}°F</p> 
              <p>Max Temperature: {day.day.maxtemp_f}°F</p> 
              <p>Humidity: {day.day.avghumidity}%</p> 
              <p>Temperature: {day.day.avgtemp_f}°F</p> 
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forecast data available for "{location}"</p>
      )}
    </div>
  )
}

export default function Weather() {
  return (
    <div style={{ 
      // padding: '40px',
        Height: '100%',
        width:'100%',
        backgroundImage: "url(https://www.weather.gov/images/tae/events/20200413/satellite_loop.gif)",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20px',
        position: 'static',
        zIndex: 2,
    }}>
      <ToastContainer/>
      <RealTimeApi />
      <hr />
      <ForeCastAPI />
      <hr />
      <div style={{ position: 'relative',
         width: '100%',
          height: '100%',
           marginTop: '40px' }}>
      </div>
    </div>
  )
}


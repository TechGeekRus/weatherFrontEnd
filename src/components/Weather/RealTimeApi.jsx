import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { toast } from 'react-toastify'

export default function RealTimeApi({ location, setLocation, favorites, toggleFavorite }) {
  const [weatherData, setWeatherData] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchCurrentWeather(location)
  }, [location])

  async function fetchCurrentWeather(loc) {
    try {
      const response = await axios.get('http://localhost:3000/api/weather/forecast', {
        params: { q: loc },
      })
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
      setInput('')        
    }
  }

  return (
    <div>
      <h2>Real-Time Weather</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
      />
      <button onClick={handleSearch}>Search</button>
      <Box component="span">
        <button
          onClick={() => toggleFavorite(location)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: favorites.includes(location) ? 'red' : 'grey',
          }}
          aria-label={favorites.includes(location) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Favorite />
        </button>
      </Box>

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
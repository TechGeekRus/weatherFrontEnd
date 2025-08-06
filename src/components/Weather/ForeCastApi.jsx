import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ForeCastAPI({ location }) {
  const [forecastData, setForecastData] = useState(null)
  const [days, setDays] = useState(3)

  useEffect(() => {
    fetchForecast(location, days)
  }, [location, days])

  async function fetchForecast(loc, daysCount) {
    try {
      const response = await axios.get('http://localhost:3000/api/weather/forecast', {
        params: { q: loc, days: daysCount },
      })
      setForecastData(response.data)
    } catch (error) {
      console.error('Error fetching forecast:', error)
      setForecastData(null)
     
    }
  }

  function handleDaysChange(e) {
    setDays(Number(e.target.value))
  }

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h2>Weather Forecast</h2>
      <label>
        Days:
        <select value={days} onChange={handleDaysChange}>
          {[1, 2, 3].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>
      {forecastData && forecastData.location && forecastData.forecast && forecastData.forecast.forecastday ? (
        <div>
          <h3>
            Forecast for {forecastData.location.name}, {forecastData.location.region}
          </h3>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'stretch',
            marginTop: 12
          }}>
            {forecastData.forecast.forecastday.map(day => (
              <div
                key={day.date}
                style={{
                  border: '1px solid #ccc',
                  padding: '12px',
                  borderRadius: '8px',
                  minWidth: '150px',
                  background: 'rgba(255,255,255,0.90)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  flex: '0 1 180px',
                  textAlign: 'center',
                }}
              >
                <strong>{day.date}</strong>
                <div>
                  <img src={day.day.condition.icon} alt={day.day.condition.text} />
                  <div>{day.day.condition.text}</div>
                </div>
                <p>Min: {day.day.mintemp_f}°F</p>
                <p>Max: {day.day.maxtemp_f}°F</p>
                <p>Avg: {day.day.avgtemp_f}°F</p>
                <p>Humidity: {day.day.avghumidity}%</p>
                <p>Rain: {day.day.daily_chance_of_rain}%</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No forecast data available for "{location}"</p>
      )}
    </div>
  )
}
import React, { useState } from 'react'
import { Favorite } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import RealTimeApi from './RealTimeApi'
import ForeCastAPI from './ForeCastApi'


function FavoritesList({ favorites, setLocation, toggleFavorite }) {
  if (!favorites.length) return null
  return (
    <div style={{ marginBottom: 16 }}>
      <h4>Favorites:</h4>
      {favorites.map(fav => (
        <span key={fav} style={{ marginRight: '12px' }}>
          <button
            onClick={() => setLocation(fav)}
            style={{
              background: 'none',
              border: 'none',
              color: '#115088',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: 0,
              fontSize: '1rem',
            }}
          >
            {fav}
          </button>
          <button
            onClick={() => toggleFavorite(fav)}
            style={{
              background: 'none',
              border: 'none',
              color: 'red',
              cursor: 'pointer',
              padding: '0 4px',
              verticalAlign: 'middle',
              fontSize: '1rem',
            }}
            aria-label="Remove from favorites"
            title="Remove from favorites"
          >
            <Favorite />
          </button>
        </span>
      ))}
    </div>
  )
}

export default function Weather() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites')
    return saved ? JSON.parse(saved) : []
  })
  const [location, setLocation] = useState('Memphis')

  function toggleFavorite(loc) {
    setFavorites(prev => {
      let newFavs
      if (prev.includes(loc)) {
        newFavs = prev.filter(f => f !== loc)
        toast.info(`Removed ${loc} from favorites`)
      } else {
        newFavs = [...prev, loc]
        toast.success(`Added ${loc} to favorites`)
      }
      localStorage.setItem('weatherFavorites', JSON.stringify(newFavs))
      return newFavs
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: "url(https://www.weather.gov/images/tae/events/20200413/satellite_loop.gif)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // vertical center
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: 14,
          boxShadow: '0 4px 30px rgba(0,0,0,0.14)',
          padding: '24px 18px',
          minWidth: 340,
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ToastContainer />
        <FavoritesList
          favorites={favorites}
          setLocation={setLocation}
          toggleFavorite={toggleFavorite}
        />
        <RealTimeApi
          location={location}
          setLocation={setLocation}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        <hr style={{ width: '80%', margin: '24px 0' }} />
        <ForeCastAPI location={location} />
      </div>
    </div>
  )
}
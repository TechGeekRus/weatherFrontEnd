import Weather from "./components/Weather/Weather"
import News from "./components/News/News"
import React from 'react'
import { useEffect, useState } from 'react'
import MainRouter from './MainRouter'
import { jwtDecode } from 'jwt-decode'
import { removeAuthToken, setAxiosAuthToken } from './utils/attachHeaders'


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => { 
    const jwt = window.localStorage.getItem('weatherJwt')
    const currentUser = jwt ? jwtDecode(jwt) : null
    
    if (currentUser && currentUser.exp > (Date.now() / 1000)) {
      setAxiosAuthToken(jwt)
      setUser({
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email
      })
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('weatherJwt')
    removeAuthToken()
  }
  return (  
    <MainRouter user={user} handleLogout={handleLogout} handleLogin={handleLogin} />
  )
}

export default App



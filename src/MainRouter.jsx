import React from 'react'
import {Navigate,  BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import Nav from './components/Nav/Nav'
import Home from './components/Home'
// import Login from './components/Login/Login'
import { useState } from 'react'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Login from './components/Login/Loginv2'
import Weather from './components/Weather/Weather'
import NewsFeed from './components/News/News'


function MainRouter({ user, handleLogout, handleLogin }) {
    const [weatherInput, setWeatherInput] = useState('')
    return (
        <BrowserRouter>
            <Nav user={user} handleLogout={handleLogout} weatherInput={weatherInput} setWeatherInput={setWeatherInput} />
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/sign-up' element={<SignUp />}/>
                <Route path='/login' element={user ? <Navigate to='/weather'/> : <Login handleLogin={handleLogin}/>}/>
                <Route path='/weather' element={<Weather weatherInput ={weatherInput} />}/>
                <Route path="/news" element={<NewsFeed />} />
                <Route path='/profile' element = {
                    <PrivateRoute>
                <Profile user = {user}/>       
                </PrivateRoute>
            }/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter

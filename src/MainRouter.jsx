import React from 'react'
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
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
import Layout from './components/Layout'
import { CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'



function MainRouter({ user, handleLogout, handleLogin }) {
    const [weatherInput, setWeatherInput] = useState('')
    return (

        <BrowserRouter>
        <CssBaseline/>
        <ToastContainer 
        position='top-center'
        autoClose= {5000}/>
            <Nav user={user} handleLogout={handleLogout} weatherInput={weatherInput} setWeatherInput={setWeatherInput} />
            <Routes>
                <Route path='/' element={<Layout><Home /></Layout>} />
                <Route path='/sign-up' element={<Layout><SignUp /></Layout>} />
                <Route path='/login' element={
                    user ? <Navigate to='/weather' /> : <Layout><Login handleLogin={handleLogin} />
                    </Layout>} />
                <Route path='/weather' element={<Layout><Weather weatherInput={weatherInput} /></Layout>} />
                <Route path="/news" element={<Layout><NewsFeed /></Layout>} />
                <Route path='/profile' element={<Layout>
                    <PrivateRoute>
                        <Profile user={user} />
                    </PrivateRoute>
                </Layout>
                } />
            </Routes>
               
        </BrowserRouter>
    )
}

export default MainRouter

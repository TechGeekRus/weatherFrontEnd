import React, { useState } from 'react'
// import './Login.css'
import axios from 'axios'
import isEmail from 'validator/lib/isEmail'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Login({ handleLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate() 


 
  const handleOnSubmit = async (event) => {
    event.preventDefault()
    const newErrors = {}
    if (!email) {
      newErrors.emailError = 'Email must have a value'
    } else if (!isEmail(email)) {
      newErrors.emailError = 'Email must be a valid email'
    }
    if (!password) {
      newErrors.passwordError = 'Password name must have a value'
    } else if (password.length < 8) {
      newErrors.passwordError = 'Password must be at least 8 characters long'
    }
    setErrors(newErrors)
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password
        })
        window.localStorage.setItem('weatherJwt', response.data.payload)
        const user = jwtDecode(response.data.payload)
        handleLogin(user)
        navigate('/weather')
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="container">
      <div className="form-text">Login</div>
      <div className="form-div">
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder='Email'
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
              <div className='errorMessage'>
                {errors.emailError}
              </div>
            </div>
          </div>
          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
              <div className='errorMessage'>
                {errors.passwordError}
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
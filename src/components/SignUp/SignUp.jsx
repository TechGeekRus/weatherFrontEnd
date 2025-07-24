import React, { useState } from 'react'
// import './SignUp.css'
import { isAlpha, isAlphanumeric } from 'validator'
import axios from 'axios'
import isEmail from 'validator/lib/isEmail'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
       
    const handleOnSubmit = async (event) =>{
        event.preventDefault()
        const newErrors ={}
        if(!firstName){
           newErrors.firstNameError= 'First name must have a value'
        }else if(!isAlpha(firstName)){
           newErrors.firstNameError= 'First name must be alphabetical'
        }
        if(!lastName){
            newErrors.lastNameError= 'Last name must have a value'
        }else if(!isAlpha(lastName)){
            newErrors.lastNameError= 'Last name must be alphabetical'
        }
        if(!email){
            newErrors.emailError= 'Email must have a value'
        }else if(!isEmail(email)){
            newErrors.emailError= 'Email must be a valid email'
        }
        if(!username){
            newErrors.usernameError= 'Username must have a value'
        }else if(!isAlphanumeric(username)){
            newErrors.usernameError= 'Username must be alphabetical'
        }
        if(!password){
            newErrors.passwordError= 'Password name must have a value'
        }else if(password.length < 8){
            newErrors.passwordError= 'Password must be at least 8 characters long'
        }
        if(!confirmPassword){
            newErrors.confirmPasswordError= 'Must confirm password'
        }else if(confirmPassword !== password){
            newErrors.confirmPasswordError= "Passwords don't match."
        }
        setErrors(newErrors)
        if(Object.keys(errors).length === 0){ 
            try {
                const response = await axios.post('http://localhost:3000/api/users/signup',{
                    firstName,
                    lastName,
                    email,
                    username,
                    password
                })
                console.log(response.data.payload)
                navigate('/login')
            } catch (error) {
                console.log(error)
            }
        }
        
    }
  return (
    <div className="container">
        <div className="form-text">Sign up</div>
        <div className="form-div">
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group-inline">
                    <div className="inline-container">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text"
                            id="firstName"
                            placeholder='First Name'
                            name="firstName"
                            onChange={e=> setFirstName(e.target.value)}
                            />
                             <div className='errorMessage'>
                                {errors.firstNameError}
                            </div>
                    </div>
                    <div className="inline-container">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text"
                            id="lastName"
                            placeholder='Last Name'
                            name="lastName"
                             onChange={e=> setLastName(e.target.value)}
                            />
                             <div className='errorMessage'>
                                {errors.lastNameError}
                            </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email"
                            placeholder='Email'
                             onChange={e=> setEmail(e.target.value)}
                            />
                            <div className='errorMessage'>
                                {errors.emailError}
                            </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username"
                            placeholder='Username'
                            name="username"
                             onChange={e=> setusername(e.target.value)} 
                            />
                             <div className='errorMessage'>
                                {errors.usernameError}
                            </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder='Password'
                            name="password"
                             onChange={e=> setPassword(e.target.value)}
                            />
                             <div className='errorMessage'>
                                {errors.passwordError}
                            </div>
                    </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            placeholder='Confirm Password'
                            name="confirmPassword" 
                             onChange={e=> setConfirmPassword(e.target.value)}
                            />
                             <div className='errorMessage'>
                                {errors.confirmPasswordError}
                            </div>
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit" >Submit</button>
                </div>
            </form>
        </div>
        </div>
  )
}

export default SignUp
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar
} from '@mui/material';
import { Person } from '@mui/icons-material'
import { useEffect} from 'react'
import Axios from '../../utils/Axios'
import React, { useState } from 'react'

function Profile() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    async function getUserInfo(){
    try {
      if(Axios.defaults.headers.common.Authorization){

        const response = await Axios.get('/users/get-user')
        const {firstName, lastName, username, email} = response.data.payload
        setFirstName(firstName)
        setLastName(lastName)
        setEmail(email)
        setUsername(username)
      }
    } catch (error) {
      console.log(error)
    }
  }
  getUserInfo()
    }  , [])
  

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { firstName, lastName, email, username })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 2
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              backgroundColor: 'primary.main'
            }}
          >
            <Person sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account information
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSave}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              required
            />
          </Box>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: 2
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Profile
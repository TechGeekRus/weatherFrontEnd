import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Axios from '../../utils/Axios';
import { setAxiosAuthToken } from '../../utils/attachHeaders';
import isEmail from 'validator/lib/isEmail';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) {
      newErrors.emailError = 'Email must have a value';
    } else if (!isEmail(email)) {
      newErrors.emailError = 'Email must be a valid email';
    }

    if (!password) {
      newErrors.passwordError = 'Password name must have a value';
    } else if (password.length < 8) {
      newErrors.passwordError = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    // Validation errors found; don't try to submit
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await Axios.post('/users/login', { email, password });
      const jwt = response.data.payload;
      window.localStorage.setItem('weatherJwt', jwt);
      setAxiosAuthToken(jwt);
      const user = jwtDecode(jwt);
      handleLogin(user);
      navigate('/weather');
    } catch (error) {
      // Optionally, you can add error feedback for invalid credentials/server errors
      setErrors(prev => ({
        ...prev,
        serverError: 'Invalid email or password'
      }));
      console.log(error);
    }
  };

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
          maxWidth: 400,
          borderRadius: 2
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
          Login
        </Typography>
        {errors.serverError && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.serverError}
          </Typography>
        )}
        <Box component="form" onSubmit={handleOnSubmit} noValidate>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 0.5 }}
            error={Boolean(errors.emailError)}
            helperText={errors.emailError}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1.5 }}
            error={Boolean(errors.passwordError)}
            helperText={errors.passwordError}
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
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
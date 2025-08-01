import React from 'react'
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
export default function Nav({ user, handleLogout,}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'dark purple'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* Left side - Home */}
          <Box>
            <Button
              component={NavLink}
              to='/'
              sx={{ color: 'white', textTransform: 'none' }}
            >
             Home
            </Button>
            
          </Box>

          <Box sx={{marginRight: '20px'}}>
            {user ? (
              <><Button
              component={NavLink}
              to='/weather'
              sx={{ color: 'white', textTransform: 'none' }}
            >
              Weather
            </Button>
            <Button
              component={NavLink}
              to='/news'
              sx={{ color: 'white', textTransform: 'none' }}
            >
              News
            </Button>
                <Button
                component={NavLink} 
                 to ={'/profile'}
                 sx={{ color: 'white', textTransform: 'none' }}>
                  {user.username}
                </Button>
                <Button
                  component={NavLink}
                  to='/login'
                  onClick={handleLogout}
                  sx={{ color: 'white', textTransform: 'none' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={NavLink}
                  to='/sign-up'
                  sx={{ color: 'white', textTransform: 'none' }}
                >
                  Sign-up
                </Button>
                <Button
                  component={NavLink}
                  to='/login'
                  sx={{ color: 'white', textTransform: 'none' }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
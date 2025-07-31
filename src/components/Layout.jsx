import React from 'react'
import Bird, { BirdAnimation } from './BirdAnimation'
import { Box } from '@mui/material'

function Layout({ children }) {
    return (
        <>
            <Box >
                <BirdAnimation />
                {children}
            </Box>
        </>
    )
}

export default Layout
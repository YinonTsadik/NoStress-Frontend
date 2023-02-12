import React from 'react'

import { Box, Typography, Link } from '@mui/material'

const Copyright: React.FC = () => {
    return (
        <Box sx={{ position: 'fixed', bottom: '1.2vh', width: '100%' }}>
            <Typography variant="body2" color="text.secondary" align="center">
                <Link color="inherit" href="/">
                    NoStress
                </Link>{' '}
                {new Date().getFullYear()}
                {' ©'}
            </Typography>
        </Box>
    )
}

export default Copyright

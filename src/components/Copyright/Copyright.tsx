import React from 'react'

import { Box, Typography, Link } from '@mui/material'

import useStyles from './CopyrightStyles'

const Copyright: React.FC = () => {
    const { classes } = useStyles()
    return (
        <Box className={classes.root}>
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

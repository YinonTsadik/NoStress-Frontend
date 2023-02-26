import React from 'react'

import { Box } from '@mui/material'

import Calendars from './Calendars'
import AddCalendarButton from './AddCalendarButton'

import useStyles from './ButtonsContainerStyles'

const ButtonsContainer: React.FC = () => {
    const { classes } = useStyles()
    return (
        <Box className={classes.root}>
            <Calendars />
            <AddCalendarButton />
        </Box>
    )
}

export default ButtonsContainer

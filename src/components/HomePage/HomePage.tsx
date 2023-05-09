import React from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux'

import { Box } from '@mui/material'

import CreateCalendar from './CreateCalendar'
import ButtonsContainer from './ButtonsContainer'
import BigCalendar from './BigCalendar'
import TasksAndConstraints from './TasksAndConstraints'

import useStyles from './HomePageStyles'

const HomePage: React.FC = () => {
    const { classes } = useStyles()

    const calendarsReducer = useSelector((state: RootState) => state.calendars)

    return (
        <Box className={classes.root}>
            {!Boolean(calendarsReducer.data.length) ? (
                <CreateCalendar />
            ) : (
                <Box>
                    <ButtonsContainer />
                    <BigCalendar />
                    <TasksAndConstraints />
                </Box>
            )}
        </Box>
    )
}

export default HomePage

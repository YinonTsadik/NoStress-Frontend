import React from 'react'

import { Container, Typography, Button } from '@mui/material'

import useStyles from './AddCalendarStyles'

const AddCalendar: React.FC = () => {
    const { classes } = useStyles()

    return (
        <Container className={classes.root}>
            <Typography className={classes.header}>Welcome to NoStress!</Typography>
            <Typography className={classes.subHeader}>
                Your calendars, tasks, constraints
            </Typography>
            <Typography className={classes.subHeader}>
                and events will appear here.
            </Typography>
            <Button className={classes.button}>Add your first calendar</Button>
        </Container>
    )
}

export default AddCalendar

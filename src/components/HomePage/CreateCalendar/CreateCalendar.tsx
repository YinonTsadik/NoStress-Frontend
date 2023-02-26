import React, { useState } from 'react'

import { Container, Typography, Button } from '@mui/material'

import AddCalendarDialog from './AddCalendarDialog'
import useStyles from './CreateCalendarStyles'

const CreateCalendar: React.FC = () => {
    const { classes } = useStyles()

    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <Container className={classes.root}>
            <Typography className={classes.header}>Welcome to NoStress!</Typography>
            <Typography className={classes.subHeader}>
                Your calendars, tasks, constraints
            </Typography>
            <Typography className={classes.subHeader}>
                and events will appear here.
            </Typography>
            <Button onClick={handleOpenDialog} className={classes.button}>
                Create your first calendar
            </Button>
            <AddCalendarDialog open={openDialog} handleClose={handleCloseDialog} />
        </Container>
    )
}

export default CreateCalendar

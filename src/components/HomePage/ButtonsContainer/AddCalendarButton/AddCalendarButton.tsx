import React, { useState } from 'react'

import { Box, Button } from '@mui/material'
import { Add } from '@mui/icons-material'

import AddCalendarDialog from '../../CreateCalendar/AddCalendarDialog'
import useStyles from './AddCalendarButtonStyles'

const AddCalendarButton: React.FC = () => {
    const { classes } = useStyles()

    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <Box className={classes.root}>
            <Button
                onClick={handleOpenDialog}
                endIcon={<Add />}
                className={classes.button}
            >
                <Box className={classes.text}>Add calendar</Box>
            </Button>
            <AddCalendarDialog open={openDialog} handleClose={handleCloseDialog} />
        </Box>
    )
}

export default AddCalendarButton

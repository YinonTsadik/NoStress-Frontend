import React from 'react'

import { DeleteCalendarDialogProps } from '../../../../../../interfaces'

import { Dialog, Typography } from '@mui/material'

import useStyles from '../CalendarStyles'

const DeleteCalendarDialog: React.FC<DeleteCalendarDialogProps> = (props) => {
    const { classes } = useStyles()
    const { open, onClose: handleCloseDialog, calendar } = props

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <Typography>Delete Calendar</Typography>
        </Dialog>
    )
}

export default DeleteCalendarDialog

import React, { useState } from 'react'

import { CalendarProps } from '../../../../../interfaces'

import { useCalendars } from '../../../../../hooks'

import { MenuItem, Box, Typography, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

import EditCalendarDialog from './EditCalendarDialog'
import DeleteCalendarDialog from './DeleteCalendarDialog'

import useStyles from './CalendarStyles'

const Calendar: React.FC<CalendarProps> = (props) => {
    const { classes } = useStyles()
    const { calendar, handleCloseMenu } = props

    const { handleChangeCalendar } = useCalendars()

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleOpenEditDialog = () => {
        setOpenEditDialog(true)
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false)
    }

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleChoose = async () => {
        await handleChangeCalendar(calendar)
        handleCloseMenu()
    }

    const prevDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    }

    return (
        <MenuItem className={classes.root}>
            <Box onClick={handleChoose}>
                <Typography>{calendar.name}</Typography>
                <Typography variant="caption" className={classes.caption}>
                    {`${new Date(
                        calendar.startDate
                    ).toLocaleDateString()} - ${prevDay(
                        new Date(calendar.endDate)
                    ).toLocaleDateString()}`}
                </Typography>
            </Box>
            <IconButton
                onClick={handleOpenEditDialog}
                size="small"
                className={classes.editButton}
            >
                <Edit />
            </IconButton>
            <IconButton
                onClick={handleOpenDeleteDialog}
                size="small"
                className={classes.deleteButton}
            >
                <Delete />
            </IconButton>
            <EditCalendarDialog
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                calendar={calendar}
            />
            <DeleteCalendarDialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                calendar={calendar}
            />
        </MenuItem>
    )
}

export default Calendar

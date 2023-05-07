import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../../../../../redux'
import { bindActionCreators } from 'redux'

import { useSetTasks, useSetConstraints, useSetEvents } from '../../../../../hooks'

import { CalendarProps } from '../../../../../interfaces'

import { MenuItem, Box, Typography, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

import useStyles from './CalendarStyles'

const Calendar: React.FC<CalendarProps> = (props) => {
    const { classes } = useStyles()
    const { calendar, handleCloseMenu } = props

    const dispatch = useDispatch()
    const { setCurrentCalendar } = bindActionCreators(actionCreators, dispatch)

    const handleSetTasks = useSetTasks(calendar.id)
    const handleSetConstraints = useSetConstraints(calendar.id)
    const handleSetEvents = useSetEvents(calendar.id)

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleOpenEditDialog = () => {
        console.log('handleOpenEditDialog')
        setOpenEditDialog(true)
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false)
    }

    const handleOpenDeleteDialog = () => {
        console.log('handleOpenDeleteDialog')
        setOpenDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleChoose = async () => {
        console.log('handleChoose')

        setCurrentCalendar(calendar)

        await handleSetTasks()
        await handleSetConstraints()
        await handleSetEvents()

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
        </MenuItem>
    )
}

export default Calendar

import React from 'react'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../../../../redux'
import { bindActionCreators } from 'redux'

import { CalendarProps } from '../../../../interfaces'

import { MenuItem, Typography, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'

const Calendar: React.FC<CalendarProps> = (props) => {
    const { calendar, handleCloseMenu } = props

    const dispatch = useDispatch()
    const { clearTasks, clearConstraints, clearEvents, setCurrentCalendar } =
        bindActionCreators(actionCreators, dispatch)

    const handleChoose = async () => {
        console.log('handleChoose')

        clearTasks()
        clearConstraints()
        clearEvents()

        setCurrentCalendar(calendar)
        handleCloseMenu()
    }

    const handleEdit = () => {
        console.log('handleEdit')
    }

    return (
        <MenuItem>
            <Typography onClick={handleChoose} sx={{ margin: 'auto' }}>
                {calendar.name}
            </Typography>
            <IconButton onClick={handleEdit} sx={{ ml: 'auto' }}>
                <Edit />
            </IconButton>
        </MenuItem>
    )
}

export default Calendar

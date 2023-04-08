import React from 'react'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../../../../../redux'
import { bindActionCreators } from 'redux'

import { useLazyQuery } from '@apollo/client'
import {
    GET_CALENDAR_TASKS,
    GET_CALENDAR_CONSTRAINTS,
    GET_CALENDAR_EVENTS,
} from '../../../../../graphql'

import { CalendarProps, Task, Constraint, Event } from '../../../../../interfaces'

import { Box, MenuItem, Typography, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'

import useStyles from './CalendarStyles'

const Calendar: React.FC<CalendarProps> = (props) => {
    const { classes } = useStyles()
    const { calendar, handleCloseMenu } = props

    const dispatch = useDispatch()
    const { setCurrentCalendar, setTasks, setConstraints, setEvents } =
        bindActionCreators(actionCreators, dispatch)

    const [getTasks] = useLazyQuery(GET_CALENDAR_TASKS)
    const [getConstraints] = useLazyQuery(GET_CALENDAR_CONSTRAINTS)
    const [getEvents] = useLazyQuery(GET_CALENDAR_EVENTS)

    const handleChoose = async () => {
        setCurrentCalendar(calendar)

        await getTasks({ variables: { calendarID: calendar.id } }).then(
            ({ data }) => {
                if (data.calendarTasks) {
                    const tasks: Task[] = data.calendarTasks.map((task: any) => {
                        const { __typename, ...rest } = task
                        return rest as Task
                    })
                    setTasks(tasks)
                }
            }
        )

        await getConstraints({ variables: { calendarID: calendar.id } }).then(
            ({ data }) => {
                if (data.calendarConstraints) {
                    const constraints: Constraint[] = data.calendarConstraints.map(
                        (constraint: any) => {
                            const { __typename, ...rest } = constraint
                            return rest as Constraint
                        }
                    )
                    setConstraints(constraints)
                }
            }
        )

        await getEvents({ variables: { calendarID: calendar.id } }).then(
            ({ data }) => {
                if (data.calendarEvents) {
                    const events: Event[] = data.calendarEvents.map((event: any) => {
                        const { description, startTime, endTime } = event
                        const formattedEvent: Event = {
                            title: description,
                            start: new Date(startTime),
                            end: new Date(endTime),
                        }
                        return formattedEvent
                    })
                    setEvents(events)
                }
            }
        )

        handleCloseMenu()
    }

    const handleEdit = () => {
        console.log('handleEdit')
    }

    return (
        <Box>
            <MenuItem className={classes.root}>
                <Box onClick={handleChoose} className={classes.root}>
                    <Typography>{calendar.name}</Typography>
                    <Typography variant="caption">
                        {`${new Date(
                            calendar.startDate
                        ).toLocaleDateString()} - ${new Date(
                            calendar.endDate
                        ).toLocaleDateString()}`}
                    </Typography>
                </Box>
                <IconButton onClick={handleEdit}>
                    <Edit />
                </IconButton>
            </MenuItem>
        </Box>
    )
}

export default Calendar

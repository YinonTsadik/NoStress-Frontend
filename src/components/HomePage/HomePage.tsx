import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, actionCreators } from '../../redux'
import { bindActionCreators } from 'redux'

import { useQuery, useLazyQuery } from '@apollo/client'
import {
    GET_USER_CALENDARS,
    GET_CALENDAR_TASKS,
    GET_CALENDAR_CONSTRAINTS,
    GET_CALENDAR_EVENTS,
} from '../../graphql'

import { Calendar, Task, Constraint, Event } from '../../interfaces'

import { Box } from '@mui/material'

import CreateCalendar from './CreateCalendar'
import ButtonsContainer from './ButtonsContainer'
import BigCalendar from './BigCalendar'
import TasksAndConstraints from './TasksAndConstraints'

import useStyles from './HomePageStyles'

const HomePage: React.FC = () => {
    const { classes } = useStyles()

    const dispatch = useDispatch()
    const { setCalendars, setCurrentCalendar, setTasks, setConstraints, setEvents } =
        bindActionCreators(actionCreators, dispatch)

    const userID = useSelector((state: RootState) => state.user.id)
    const calendarsReducer = useSelector((state: RootState) => state.calendars)
    const currentCalendarReducer = useSelector(
        (state: RootState) => state.currentCalendar
    )
    const tasksReducer = useSelector((state: RootState) => state.tasks)
    const constraintsReducer = useSelector((state: RootState) => state.constraints)
    const eventsReducer = useSelector((state: RootState) => state.events)

    const [calendarExist, setCalendarExist] = useState(
        Boolean(calendarsReducer.data.length)
    )

    useEffect(() => {
        setCalendarExist(Boolean(calendarsReducer.data.length))
    }, [calendarsReducer])

    const { data: calendarsData } = useQuery(GET_USER_CALENDARS, {
        variables: { userID },
        fetchPolicy: 'network-only',
    })

    const [getTasks, { data: tasksData }] = useLazyQuery(GET_CALENDAR_TASKS, {
        fetchPolicy: 'network-only',
    })
    const [getConstraints, { data: constraintsData }] = useLazyQuery(
        GET_CALENDAR_CONSTRAINTS,
        { fetchPolicy: 'network-only' }
    )
    const [getEvents, { data: eventsData }] = useLazyQuery(GET_CALENDAR_EVENTS, {
        fetchPolicy: 'network-only',
    })

    useEffect(() => {
        if (calendarsData && !calendarsReducer.loaded) {
            const calendars: Calendar[] = calendarsData.userCalendars.map(
                (calendar: any) => {
                    const { __typename, ...rest } = calendar
                    return rest as Calendar
                }
            )

            setCalendars(calendars)
        }
    }, [calendarsData, calendarsReducer, setCalendars])

    useEffect(() => {
        if (calendarExist && !currentCalendarReducer.loaded) {
            setCurrentCalendar(calendarsReducer.data[0])
        }
    }, [calendarExist, currentCalendarReducer, calendarsReducer, setCurrentCalendar])

    useEffect(() => {
        if (currentCalendarReducer.loaded) {
            getTasks({
                variables: { calendarID: currentCalendarReducer.data.id },
            })
            getConstraints({
                variables: { calendarID: currentCalendarReducer.data.id },
            })
            getEvents({
                variables: { calendarID: currentCalendarReducer.data.id },
            })
        }
    }, [currentCalendarReducer, getTasks, getConstraints, getEvents])

    useEffect(() => {
        if (tasksData && !tasksReducer.loaded) {
            const tasks: Task[] = tasksData.calendarTasks.map((task: any) => {
                const { __typename, ...rest } = task
                return rest as Task
            })

            setTasks(tasks)
        }
    }, [tasksData, tasksReducer, setTasks])

    useEffect(() => {
        if (constraintsData && !constraintsReducer.loaded) {
            const constraints: Constraint[] =
                constraintsData.calendarConstraints.map((constraint: any) => {
                    const { __typename, ...rest } = constraint
                    return rest as Constraint
                })

            setConstraints(constraints)
        }
    }, [constraintsData, constraintsReducer, setConstraints])

    useEffect(() => {
        if (eventsData && !eventsReducer.loaded) {
            const events: Event[] = eventsData.calendarEvents.map((event: any) => {
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
    }, [eventsData, eventsReducer, setEvents])

    return (
        <Box className={classes.root}>
            {!calendarExist ? (
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

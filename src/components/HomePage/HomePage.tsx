import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { RootState, actionCreators } from '../../redux'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { useQuery, useLazyQuery } from '@apollo/client'
import {
    GET_USER_CALENDARS,
    GET_CALENDAR_TASKS,
    GET_CALENDAR_CONSTRAINTS,
    GET_CALENDAR_EVENTS,
} from '../../graphql'

import { Calendar, Task, Constraint } from '../../interfaces'
import { Event } from 'react-big-calendar'

import BigCalendar from './BigCalendar'
import useStyles from './HomePageStyles'

const HomePage: React.FC = () => {
    const { classes } = useStyles()

    const dispatch = useDispatch()
    const { setCalendars, setCurrentCalendar, setTasks, setConstraints } =
        bindActionCreators(actionCreators, dispatch)

    const userID = useSelector((state: RootState) => state.user.id)
    const calendars = useSelector((state: RootState) => state.calendars)
    const calendarExist = Boolean(calendars.length)
    const currentCalendar = useSelector((state: RootState) => state.currentCalendar)

    const { data: calendarsData } = useQuery(GET_USER_CALENDARS, {
        variables: { userID },
    })

    const [getTasks, { data: tasksData }] = useLazyQuery(GET_CALENDAR_TASKS)
    const [getConstraints, { data: constraintsData }] = useLazyQuery(
        GET_CALENDAR_CONSTRAINTS
    )
    const [getEvents, { data: eventsData }] = useLazyQuery(GET_CALENDAR_EVENTS)

    useEffect(() => {
        if (calendarsData && !calendars.length) {
            const calendars: Calendar[] = calendarsData.userCalendars.map(
                (calendar: any) => {
                    const { __typename, ...rest } = calendar
                    return rest as Calendar
                }
            )

            setCalendars(calendars)
        }
    }, [calendarsData, calendars.length, setCalendars])

    useEffect(() => {
        if (calendarExist && !currentCalendar.id) {
            setCurrentCalendar(calendars[0])
        }
    }, [calendarExist, currentCalendar.id, calendars, setCurrentCalendar])

    useEffect(() => {
        if (currentCalendar.id) {
            getTasks({ variables: { calendarID: currentCalendar.id } })
            getConstraints({ variables: { calendarID: currentCalendar.id } })
        }
    }, [currentCalendar, getTasks, getConstraints, getEvents])

    useEffect(() => {
        if (tasksData) {
            const tasks: Task[] = tasksData.calendarTasks.map((task: any) => {
                const { __typename, ...rest } = task
                return rest as Task
            })

            setTasks(tasks)
        }
    }, [tasksData, setTasks])

    useEffect(() => {
        if (constraintsData) {
            const constraints: Constraint[] =
                constraintsData.calendarConstraints.map((constraint: any) => {
                    const { __typename, ...rest } = constraint
                    return rest as Constraint
                })

            setConstraints(constraints)
        }
    }, [constraintsData, setConstraints])

    return (
        <div className={classes.root}>
            <h1>Home</h1>
            {calendarExist && <BigCalendar />}
        </div>
    )
}

export default HomePage

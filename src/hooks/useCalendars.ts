import {
    Calendar,
    CreateCalendarFormValues,
    EditCalendarFormValues,
    Event,
} from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
    GET_USER_CALENDARS,
    CREATE_CALENDAR,
    UPDATE_CALENDAR,
    DELETE_CALENDAR,
    OPTIMIZE,
    GET_CALENDAR_EVENTS,
} from '../graphql'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

import useTasks from './useTasks'
import useConstraints from './useConstraints'

const useCalendars = () => {
    const { handleSetTasks } = useTasks()
    const { handleSetConstraints } = useConstraints()

    const calendars = useSelector((state: RootState) => state.calendars.data)

    const currentCalendar = useSelector(
        (state: RootState) => state.currentCalendar.data
    )

    const [getCalendars] = useLazyQuery(GET_USER_CALENDARS, {
        fetchPolicy: 'network-only',
    })

    const [createCalendar] = useMutation(CREATE_CALENDAR, {
        fetchPolicy: 'network-only',
    })

    const [updateCalendar] = useMutation(UPDATE_CALENDAR, {
        fetchPolicy: 'network-only',
    })

    const [deleteCalendar] = useMutation(DELETE_CALENDAR, {
        fetchPolicy: 'network-only',
    })

    const [optimize] = useMutation(OPTIMIZE, {
        fetchPolicy: 'network-only',
    })

    const [getEvents] = useLazyQuery(GET_CALENDAR_EVENTS, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const {
        setCalendars,
        addCalendar,
        editCalendar,
        removeCalendar,
        setCurrentCalendar,
        clearCurrentCalendar,
        setTasks,
        setConstraints,
        setEvents,
    } = bindActionCreators(actionCreators, dispatch)

    const initialize = async (userID: string) => {
        try {
            const { data } = await getCalendars({ variables: { userID } })

            if (data.userCalendars) {
                const calendars: Calendar[] = data.userCalendars.map(
                    (calendar: any) => {
                        const { __typename, ...rest } = calendar
                        return rest as Calendar
                    }
                )

                setCalendars(calendars)

                console.log('The calendars have been setted successfully!')

                if (calendars.length) {
                    await handleChangeCalendar(calendars[0])
                }
            }
        } catch (error) {
            console.error('An error occurred while initializing calendars:', error)
        }
    }

    const handleChangeCalendar = async (calendar: Calendar) => {
        try {
            setCurrentCalendar(calendar)
            await handleSetTasks(calendar.id)
            await handleSetConstraints(calendar.id)
            await handleSetEvents(calendar.id)

            console.log('Calendar changed successfully!')
        } catch (error) {
            console.error('An error occurred while handling calendar change:', error)
        }
    }

    const handleAddCalendar = async (formData: CreateCalendarFormValues) => {
        try {
            const { data } = await createCalendar({
                variables: { input: { ...formData } },
            })

            if (data.createCalendar) {
                console.log('Calendar created successfully!')
                const { __typename, ...rest } = data.createCalendar

                addCalendar(rest as Calendar)
                setCurrentCalendar(rest as Calendar)
                setTasks([])
                setConstraints([])
                setEvents([])
            }
        } catch (error) {
            console.error('An error occurred while adding a calendar:', error)
        }
    }

    const handleUpdateCalendar = async (formData: EditCalendarFormValues) => {
        try {
            const { data } = await updateCalendar({
                variables: { input: { ...formData } },
            })

            if (data.updateCalendar) {
                console.log('Calendar updated successfully!')
                const { __typename, ...rest } = data.updateCalendar
                editCalendar(rest as Calendar)

                if (formData.id === currentCalendar.id) {
                    setCurrentCalendar(rest as Calendar)
                }
            }
        } catch (error) {
            console.error('An error occurred while updating the calendar:', error)
        }
    }

    const handleDeletecalendar = async (id: string) => {
        try {
            const { data } = await deleteCalendar({ variables: { id } })

            if (data.deleteCalendar) {
                console.log('Calendar deleted successfully!')
                const { __typename, ...rest } = data.deleteCalendar
                removeCalendar(rest as Calendar)

                if (id === currentCalendar.id) {
                    if (calendars.length) {
                        await handleChangeCalendar(calendars[0])
                    } else {
                        clearCurrentCalendar()
                    }
                }
            }
        } catch (error) {
            console.error('An error occurred while deleting the calendar:', error)
        }
    }

    const handleOptimize = async (calendarID: string) => {
        try {
            const { data } = await optimize({ variables: { calendarID } })

            if (data.optimize) {
                console.log('Optimized successfully!')
            }
        } catch (error) {
            console.error('An error occurred while optimizing:', error)
        }
    }

    const handleSetEvents = async (calendarID: string) => {
        try {
            const { data } = await getEvents({ variables: { calendarID } })

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

                console.log('The events have been setted successfully!')
            }
        } catch (error) {
            console.error('An error occurred while setting events:', error)
        }
    }

    return {
        initialize,
        handleChangeCalendar,
        handleAddCalendar,
        handleUpdateCalendar,
        handleDeletecalendar,
        handleOptimize,
        handleSetEvents,
    }
}

export default useCalendars

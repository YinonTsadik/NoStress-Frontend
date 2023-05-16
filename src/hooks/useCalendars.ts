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
        console.log('here 1')
        await getCalendars({ variables: { userID } }).then(({ data }) => {
            if (data.userCalendars) {
                const calendars: Calendar[] = data.userCalendars.map(
                    (calendar: any) => {
                        const { __typename, ...rest } = calendar
                        return rest as Calendar
                    }
                )

                setCalendars(calendars)

                if (calendars.length) {
                    handleChangeCalendar(calendars[0])
                }
            }
        })
    }

    const handleChangeCalendar = async (calendar: Calendar) => {
        console.log('here 2')
        setCurrentCalendar(calendar)
        await handleSetTasks(calendar.id)
        await handleSetConstraints(calendar.id)
        await handleSetEvents(calendar.id)
    }

    const handleAddCalendar = async (formData: CreateCalendarFormValues) => {
        await createCalendar({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.createCalendar) {
                console.log('Calendar created successfully!')
                const { __typename, ...rest } = data.createCalendar

                addCalendar(rest as Calendar)
                setCurrentCalendar(rest as Calendar)
                setTasks([])
                setConstraints([])
                setEvents([])
            }
        })
    }

    const handleUpdateCalendar = async (formData: EditCalendarFormValues) => {
        await updateCalendar({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.updateCalendar) {
                console.log('Calendar updated successfully!')
                const { __typename, ...rest } = data.updateCalendar
                editCalendar(rest as Calendar)

                if (formData.id === currentCalendar.id) {
                    setCurrentCalendar(rest as Calendar)
                }
            }
        })
    }

    const handleDeletecalendar = async (id: string) => {
        await deleteCalendar({ variables: { id } }).then(({ data }) => {
            if (data.deleteCalendar) {
                console.log('Calendar deleted successfully!')
                const { __typename, ...rest } = data.deleteCalendar
                removeCalendar(rest as Calendar)

                if (id === currentCalendar.id) {
                    if (calendars.length) {
                        handleChangeCalendar(calendars[0])
                    } else {
                        clearCurrentCalendar()
                    }
                }
            }
        })
    }

    const handleOptimize = async (calendarID: string) => {
        // await optimize({ variables: { calendarID } }).then(({ data }) => {
        //     if (data.optimize) {
        //         console.log('Optimized successfully!')
        //     }
        // })
    }

    const handleSetEvents = async (calendarID: string) => {
        console.log('here 5')
        await getEvents({ variables: { calendarID } }).then(({ data }) => {
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
        })
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

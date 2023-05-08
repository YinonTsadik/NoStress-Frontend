import {
    Calendar,
    CreateCalendarFormValues,
    EditCalendarFormValues,
    Event,
} from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
    CREATE_CALENDAR,
    UPDATE_CALENDAR,
    OPTIMIZE,
    GET_CALENDAR_EVENTS,
} from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

const useCalendars = () => {
    const [createCalendar] = useMutation(CREATE_CALENDAR, {
        fetchPolicy: 'network-only',
    })

    const [updateCalendar] = useMutation(UPDATE_CALENDAR, {
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
        addCalendar,
        editCalendar,
        setCurrentCalendar,
        setTasks,
        setConstraints,
        setEvents,
    } = bindActionCreators(actionCreators, dispatch)

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
            }
        })
    }

    const handleOptimize = async (calendarID: string) => {
        await optimize({ variables: { calendarID } }).then(({ data }) => {
            if (data.optimize) {
                console.log('Optimized successfully!')
            }
        })
    }

    const handleSetEvents = async (calendarID: string) => {
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
        handleAddCalendar,
        handleUpdateCalendar,
        handleOptimize,
        handleSetEvents,
    }
}

export default useCalendars

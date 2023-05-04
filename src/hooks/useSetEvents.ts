import { useLazyQuery } from '@apollo/client'
import { GET_CALENDAR_EVENTS } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

import { Event } from '../interfaces'

const useSetEvents = (calendarID: string) => {
    const [getEvents] = useLazyQuery(GET_CALENDAR_EVENTS)

    const dispatch = useDispatch()
    const { setEvents } = bindActionCreators(actionCreators, dispatch)

    const handleSetEvents = async () => {
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

    return handleSetEvents
}

export default useSetEvents

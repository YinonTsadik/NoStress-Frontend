import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_CALENDAR_EVENTS, OPTIMIZE } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

import { Event } from '../interfaces'

const useOptimize = (calendarID: string) => {
    const dispatch = useDispatch()
    const { setEvents } = bindActionCreators(actionCreators, dispatch)

    const [optimize] = useMutation(OPTIMIZE)
    const [getEvents] = useLazyQuery(GET_CALENDAR_EVENTS)

    const handleOptimize = async () => {
        // await optimize({ variables: { calendarID } }).then(({ data }) => {
        //     if (data.optimize) {
        //         console.log('Optimized successfully!')
        //     }
        // })

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

    return handleOptimize
}

export default useOptimize

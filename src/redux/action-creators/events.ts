import { Dispatch } from 'redux'

import { Event } from '../../interfaces'
import { EventsActions } from '../actions'
import { EventsActionType } from '../action-types'

export const setEvents = (events: Event[]) => {
    return (dispatch: Dispatch<EventsActions>) => {
        dispatch({
            type: EventsActionType.SET_EVENTS,
            payload: events,
        })
    }
}

export const clearEvents = () => {
    return (dispatch: Dispatch<EventsActions>) => {
        dispatch({
            type: EventsActionType.CLEAR_EVENTS,
        })
    }
}

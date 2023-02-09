import { EventsActionType } from '../action-types'
import { Event } from '../../interfaces'

interface SetEvents {
    type: EventsActionType.SET_EVENTS
    payload: Event[]
}

interface ClearEvents {
    type: EventsActionType.CLEAR_EVENTS
}

export type EventsActions = SetEvents | ClearEvents

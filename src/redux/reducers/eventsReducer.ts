import { EventsReducerPayload, Event } from '../../interfaces'
import { EventsActions } from '../actions'
import { EventsActionType } from '../action-types'

const initialState: EventsReducerPayload = {
    data: new Array<Event>(),
    fetched: false,
}

const eventsReducer = (state = initialState, action: EventsActions) => {
    switch (action.type) {
        case EventsActionType.SET_EVENTS:
            return {
                data: action.payload,
                fetched: true,
            } as EventsReducerPayload

        case EventsActionType.CLEAR_EVENTS:
            return { ...initialState }

        default:
            return state
    }
}

export default eventsReducer

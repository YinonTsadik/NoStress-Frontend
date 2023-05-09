import { EventsReducer, Event } from '../../interfaces'
import { EventsActions } from '../actions'
import { EventsActionType } from '../action-types'

const initialState: EventsReducer = {
    data: new Array<Event>(),
}

const eventsReducer = (state = initialState, action: EventsActions) => {
    switch (action.type) {
        case EventsActionType.SET_EVENTS:
            return { data: action.payload }

        case EventsActionType.CLEAR_EVENTS:
            return { ...initialState }

        default:
            return state
    }
}

export default eventsReducer

import { CalendarsReducer, Calendar } from '../../interfaces'
import { CalendarsActions } from '../actions'
import { CalendarsActionType } from '../action-types'

const initialState: CalendarsReducer = {
    data: new Array<Calendar>(),
    loaded: false,
}

const calendarsReducer = (state = initialState, action: CalendarsActions) => {
    switch (action.type) {
        case CalendarsActionType.SET_CALENDARS:
            return {
                data: action.payload,
                loaded: true,
            } as CalendarsReducer

        case CalendarsActionType.ADD_CALENDAR:
            return {
                data: [...state.data, action.payload],
                loaded: true,
            } as CalendarsReducer

        case CalendarsActionType.CLEAR_CALENDARS:
            return { ...initialState }

        default:
            return state
    }
}

export default calendarsReducer

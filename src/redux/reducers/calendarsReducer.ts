import { CalendarsReducer, Calendar } from '../../interfaces'
import { CalendarsActions } from '../actions'
import { CalendarsActionType } from '../action-types'

const initialState: CalendarsReducer = {
    data: new Array<Calendar>(),
}

const calendarsReducer = (state = initialState, action: CalendarsActions) => {
    switch (action.type) {
        case CalendarsActionType.SET_CALENDARS:
            return { data: action.payload }

        case CalendarsActionType.ADD_CALENDAR:
            return { data: [...state.data, action.payload] }

        case CalendarsActionType.EDIT_CALENDAR:
            return {
                data: state.data.map((calendar) => {
                    return calendar.id === action.payload.id
                        ? { ...action.payload }
                        : calendar
                }),
            }

        case CalendarsActionType.REMOVE_CALENDAR:
            return {
                data: state.data.filter(
                    (calendar) => calendar.id !== action.payload.id
                ),
            }

        case CalendarsActionType.CLEAR_CALENDARS:
            return { ...initialState }

        default:
            return state
    }
}

export default calendarsReducer

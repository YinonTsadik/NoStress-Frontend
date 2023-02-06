import { Calendar } from '../../interfaces'
import { CalendarsActions } from '../actions'
import { CalendarsActionType } from '../action-types'

const initialState = new Array<Calendar>()

const calendarsReducer = (state = initialState, action: CalendarsActions) => {
    switch (action.type) {
        case CalendarsActionType.SET_CALENDARS:
            return action.payload
        default:
            return state
    }
}

export default calendarsReducer

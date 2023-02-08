import { Calendar } from '../../interfaces'
import { CurrentCalendarActions } from '../actions'
import { CurrentCalendarActionType } from '../action-types'

const initialState: Calendar = {
    id: '',
    userID: '',
    name: '',
    startDate: new Date(),
    endDate: new Date(),
}

const currentCalendarReducer = (
    state = initialState,
    action: CurrentCalendarActions
) => {
    switch (action.type) {
        case CurrentCalendarActionType.SET_CURRENT_CALENDAR:
            return { ...action.payload }
        default:
            return state
    }
}

export default currentCalendarReducer

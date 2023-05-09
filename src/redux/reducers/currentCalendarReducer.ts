import { CurrentCalendarReducer } from '../../interfaces'
import { CurrentCalendarActions } from '../actions'
import { CurrentCalendarActionType } from '../action-types'

const initialState: CurrentCalendarReducer = {
    data: {
        id: '',
        userID: '',
        name: '',
        startDate: new Date(),
        endDate: new Date(),
    },
}

const currentCalendarReducer = (
    state = initialState,
    action: CurrentCalendarActions
) => {
    switch (action.type) {
        case CurrentCalendarActionType.SET_CURRENT_CALENDAR:
            return { data: action.payload }

        case CurrentCalendarActionType.CLEAR_CURRENT_CALENDAR:
            return { ...initialState }

        default:
            return state
    }
}

export default currentCalendarReducer

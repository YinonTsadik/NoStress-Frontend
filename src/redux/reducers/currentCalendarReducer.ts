import { CurrentCalendarReducerPayload } from '../../interfaces'
import { CurrentCalendarActions } from '../actions'
import { CurrentCalendarActionType } from '../action-types'

const initialState: CurrentCalendarReducerPayload = {
    data: {
        id: '',
        userID: '',
        name: '',
        startDate: new Date(),
        endDate: new Date(),
    },
    fetched: false,
}

const currentCalendarReducer = (
    state = initialState,
    action: CurrentCalendarActions
) => {
    switch (action.type) {
        case CurrentCalendarActionType.SET_CURRENT_CALENDAR:
            return {
                data: action.payload,
                fetched: true,
            } as CurrentCalendarReducerPayload

        case CurrentCalendarActionType.CLEAR_CURRENT_CALENDAR:
            return { ...initialState }

        default:
            return state
    }
}

export default currentCalendarReducer

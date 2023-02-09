import { Dispatch } from 'redux'

import { Calendar } from '../../interfaces'
import { CurrentCalendarActions } from '../actions'
import { CurrentCalendarActionType } from '../action-types'

export const setCurrentCalendar = (calendar: Calendar) => {
    return (dispatch: Dispatch<CurrentCalendarActions>) => {
        dispatch({
            type: CurrentCalendarActionType.SET_CURRENT_CALENDAR,
            payload: calendar,
        })
    }
}

export const clearCurrentCalendar = () => {
    return (dispatch: Dispatch<CurrentCalendarActions>) => {
        dispatch({
            type: CurrentCalendarActionType.CLEAR_CURRENT_CALENDAR,
        })
    }
}

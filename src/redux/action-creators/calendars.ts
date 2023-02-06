import { Dispatch } from 'redux'

import { Calendar } from '../../interfaces'
import { CalendarsActions } from '../actions'
import { CalendarsActionType } from '../action-types'

export const setCalendars = (calendars: Calendar[]) => {
    return (dispatch: Dispatch<CalendarsActions>) => {
        dispatch({
            type: CalendarsActionType.SET_CALENDARS,
            payload: calendars,
        })
    }
}

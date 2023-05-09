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

export const addCalendar = (calendar: Calendar) => {
    return (dispatch: Dispatch<CalendarsActions>) => {
        dispatch({
            type: CalendarsActionType.ADD_CALENDAR,
            payload: calendar,
        })
    }
}

export const editCalendar = (calendar: Calendar) => {
    return (dispatch: Dispatch<CalendarsActions>) => {
        dispatch({
            type: CalendarsActionType.EDIT_CALENDAR,
            payload: calendar,
        })
    }
}

export const removeCalendar = (calendar: Calendar) => {
    return (dispatch: Dispatch<CalendarsActions>) => {
        dispatch({
            type: CalendarsActionType.REMOVE_CALENDAR,
            payload: calendar,
        })
    }
}

export const clearCalendars = () => {
    return (dispatch: Dispatch<CalendarsActions>) => {
        dispatch({
            type: CalendarsActionType.CLEAR_CALENDARS,
        })
    }
}

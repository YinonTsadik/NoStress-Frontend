import { CalendarsActionType } from '../action-types'
import { Calendar } from '../../interfaces'

interface SetCalendars {
    type: CalendarsActionType.SET_CALENDARS
    payload: Calendar[]
}

interface AddCalendar {
    type: CalendarsActionType.ADD_CALENDAR
    payload: Calendar
}

interface ClearCalendars {
    type: CalendarsActionType.CLEAR_CALENDARS
}

export type CalendarsActions = SetCalendars | AddCalendar | ClearCalendars

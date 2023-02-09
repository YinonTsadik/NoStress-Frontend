import { CurrentCalendarActionType } from '../action-types'
import { Calendar } from '../../interfaces'

interface SetCurrentCalendar {
    type: CurrentCalendarActionType.SET_CURRENT_CALENDAR
    payload: Calendar
}

interface ClearCurrentCalendar {
    type: CurrentCalendarActionType.CLEAR_CURRENT_CALENDAR
}

export type CurrentCalendarActions = SetCurrentCalendar | ClearCurrentCalendar

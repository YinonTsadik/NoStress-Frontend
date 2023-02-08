import { CurrentCalendarActionType } from '../action-types'
import { Calendar } from '../../interfaces'

interface SetCurrentCalendar {
    type: CurrentCalendarActionType.SET_CURRENT_CALENDAR
    payload: Calendar
}

export type CurrentCalendarActions = SetCurrentCalendar

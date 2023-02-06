import { CalendarsActionType } from '../action-types'
import { Calendar } from '../../interfaces'

interface SetCalendars {
    type: CalendarsActionType.SET_CALENDARS
    payload: Calendar[]
}

export type CalendarsActions = SetCalendars

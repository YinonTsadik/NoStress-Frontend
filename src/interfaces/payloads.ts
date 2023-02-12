import { Calendar, Task, Constraint, Event } from './modules'

interface ReducerPayload {
    loaded: boolean
}

export interface CalendarsReducerPayload extends ReducerPayload {
    data: Calendar[]
}

export interface CurrentCalendarReducerPayload extends ReducerPayload {
    data: Calendar
}

export interface TasksReducerPayload extends ReducerPayload {
    data: Task[]
}

export interface ConstraintsReducerPayload extends ReducerPayload {
    data: Constraint[]
}

export interface EventsReducerPayload extends ReducerPayload {
    data: Event[]
}

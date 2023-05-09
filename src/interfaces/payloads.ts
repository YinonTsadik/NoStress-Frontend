import { Calendar, Task, Constraint, Event } from './modules'

export interface CalendarsReducer {
    data: Calendar[]
}

export interface CurrentCalendarReducer {
    data: Calendar
}

export interface TasksReducer {
    data: Task[]
}

export interface ConstraintsReducer {
    data: Constraint[]
}

export interface EventsReducer {
    data: Event[]
}

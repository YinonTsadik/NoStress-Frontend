import { Calendar, Task, Constraint, Event } from './modules'

interface Reducer {
    loaded: boolean
}

export interface CalendarsReducer extends Reducer {
    data: Calendar[]
}

export interface CurrentCalendarReducer extends Reducer {
    data: Calendar
}

export interface TasksReducer extends Reducer {
    data: Task[]
}

export interface ConstraintsReducer extends Reducer {
    data: Constraint[]
}

export interface EventsReducer extends Reducer {
    data: Event[]
}

import { Event as EventInterface } from 'react-big-calendar'

export interface User {
    id: string
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface Calendar {
    id: string
    userID: string
    name: string
    startDate: Date
    endDate: Date
}

export interface Task {
    id: string
    calendarID: string
    description: string
    deadline: Date
    workHours: number
}

export enum Type {
    Studies = 'Studies',
    Test = 'Test',
    Work = 'Work',
    Event = 'Event',
    Rest = 'Rest',
    Other = 'Other',
}

export interface Constraint {
    id: string
    calendarID: string
    description: string
    startTime: Date
    endTime: Date
    type: Type
}

export interface Event extends EventInterface {}

export interface AuthenticationDetails {
    isAuthenticated: boolean
    userID: string
}

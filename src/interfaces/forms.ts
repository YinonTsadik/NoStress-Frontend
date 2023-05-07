import { Type } from './modules'

export interface SignInFormValues {
    username: string
    password: string
}

export interface SignUpFormValues {
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface EditProfileFormValues {
    id: string
    firstName: string
    lastName: string
    username: string
}

export interface CreateCalendarFormValues {
    userID: string
    name: string
    startDate: Date | null
    endDate: Date | null
}

export interface EditCalendarFormValues {
    id: string
    name: string
}

export interface CreateTaskFormValues {
    calendarID: string
    description: string
    deadline: Date | null
    workHours: number
}

export interface CreateConstraintFormValues {
    calendarID: string
    description: string
    startTime: Date | null
    endTime: Date | null
    type: Type
}

export type CreateElementFormValues =
    | CreateTaskFormValues
    | CreateConstraintFormValues

export interface EditTaskFormValues {
    id: string
    description: string
    deadline: Date
    workHours: number
}

export interface EditConstraintFormValues {
    id: string
    description: string
    startTime: Date
    endTime: Date
    type: Type
}

export type EditElementFormValues = EditTaskFormValues | EditConstraintFormValues

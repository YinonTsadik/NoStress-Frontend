import { Type } from './modules'

interface FirstAndLastName {
    firstName: string
    lastName: string
}

export interface SignInFormValues {
    username: string
    password: string
}

export interface SignUpFormValues extends FirstAndLastName, SignInFormValues {}

export interface EditProfileFormValues extends FirstAndLastName {
    username: string
}

export interface CreateCalendarFormValues {
    userID: string
    name: string
    startDate: Date
    endDate: Date
}

export interface CreateTaskFormValues {
    calendarID: string
    description: string
    deadline: Date
    workHours: number
}

export interface CreateConstraintFormValues {
    calendarID: string
    description: string
    startTime: Date
    endTime: Date
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

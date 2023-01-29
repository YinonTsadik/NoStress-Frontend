import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            firstName
            lastName
            username
            password
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            firstName
            lastName
            username
            password
        }
    }
`

export const DELETE_USER = gql`
    mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
            id
            firstName
            lastName
            username
            password
        }
    }
`

export const CREATE_CALENDAR = gql`
    mutation CreateCalendar($input: CreateCalendarInput!) {
        createCalendar(input: $input) {
            id
            userID
            name
            startDate
            endDate
        }
    }
`

export const UPDATE_CALENDAR = gql`
    mutation UpdateCalendar($input: UpdateCalendarInput!) {
        updateCalendar(input: $input) {
            id
            userID
            name
            startDate
            endDate
        }
    }
`

export const DELETE_CALENDAR = gql`
    mutation DeleteCalendar($id: String!) {
        deleteCalendar(id: $id) {
            id
            userID
            name
            startDate
            endDate
        }
    }
`

export const CREATE_TASK = gql`
    mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
            id
            calendarID
            description
            deadline
            workHours
        }
    }
`

export const UPDATE_TASK = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
        updateTask(input: $input) {
            id
            calendarID
            description
            deadline
            workHours
        }
    }
`

export const DELETE_TASK = gql`
    mutation DeleteTask($id: String!) {
        deleteTask(id: $id) {
            id
            calendarID
            description
            deadline
            workHours
        }
    }
`

export const CREATE_CONSTRAINT = gql`
    mutation CreateConstraint($input: CreateConstraintInput!) {
        createConstraint(input: $input) {
            id
            calendarID
            description
            startTime
            endTime
            type
        }
    }
`

export const UPDATE_CONSTRAINT = gql`
    mutation UpdateConstraint($input: UpdateConstraintInput!) {
        updateConstraint(input: $input) {
            id
            calendarID
            description
            startTime
            endTime
            type
        }
    }
`

export const DELETE_CONSTRAINT = gql`
    mutation DeleteConstraint($id: String!) {
        deleteConstraint(id: $id) {
            id
            calendarID
            description
            startTime
            endTime
            type
        }
    }
`

export const OPTIMIZE = gql`
    mutation Optimize($calendarID: String!) {
        optimize(calendarID: $calendarID)
    }
`

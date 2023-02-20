import { gql } from '@apollo/client'

export const GET_USERS = gql`
    query GetUsers {
        getUsers {
            id
            firstName
            lastName
            username
            password
        }
    }
`

export const GET_USER_BY_NAME = gql`
    query GetUserByName($name: String!) {
        getUserByName(name: $name) {
            id
            firstName
            lastName
            username
            password
        }
    }
`

export const GET_USERNAMES = gql`
    query Usernames {
        usernames
    }
`

export const USER_AUTHENTICATION = gql`
    query User($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            id
            firstName
            lastName
            username
            password
        }
    }
`

export const GET_USER_CALENDARS = gql`
    query UserCalendars($userID: String!) {
        userCalendars(userID: $userID) {
            id
            userID
            name
            startDate
            endDate
        }
    }
`

export const GET_CALENDAR_TASKS = gql`
    query CalendarTasks($calendarID: String!) {
        calendarTasks(calendarID: $calendarID) {
            id
            calendarID
            description
            deadline
            workHours
        }
    }
`

export const GET_CALENDAR_CONSTRAINTS = gql`
    query CalendarConstraints($calendarID: String!) {
        calendarConstraints(calendarID: $calendarID) {
            id
            calendarID
            description
            startTime
            endTime
            type
        }
    }
`

export const GET_CALENDAR_EVENTS = gql`
    query CalendarEvents($calendarID: String!) {
        calendarEvents(calendarID: $calendarID) {
            id
            description
            startTime
            endTime
        }
    }
`

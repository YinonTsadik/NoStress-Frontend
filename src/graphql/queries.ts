import { gql } from '@apollo/client'

export const GET_ALL_USERNAMES = gql`
    query Query {
        usernames
    }
`
export const USER_AUTHENTICATION = gql`
    query Query($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            id
            firstName
            lastName
            username
        }
    }
`

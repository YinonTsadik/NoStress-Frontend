import { gql } from '@apollo/client'

export const GET_ALL_USERNAMES = gql`
    query Query {
        usernames
    }
`
export const CHECK_AUTH_DEATAILS = gql`
    query Query($username: String!, $password: String!) {
        checkAuthDetails(username: $username, password: $password) {
            id
            first_name
            last_name
            username
        }
    }
`

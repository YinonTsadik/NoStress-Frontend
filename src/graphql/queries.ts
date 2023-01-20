import { gql } from '@apollo/client'

export const GET_ALL_USERNAMES = gql`
    query Query {
        usernames
    }
`

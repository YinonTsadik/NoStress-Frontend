import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation Mutation($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            firstName
            lastName
            username
        }
    }
`

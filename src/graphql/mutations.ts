import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation Mutation($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            first_name
            last_name
            username
        }
    }
`

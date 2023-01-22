import { useQuery } from '@apollo/client'
import { GET_ALL_USERNAMES } from '../../graphql'
import { Container } from '@mui/material'
import SignUpForm from '../../components/SignUpForm'

export default function SignUp() {
    const { data } = useQuery(GET_ALL_USERNAMES)

    return (
        <Container>
            <SignUpForm usernames={data ? data.usernames : []} />
        </Container>
    )
}

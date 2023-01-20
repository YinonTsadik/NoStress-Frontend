import { useQuery } from '@apollo/client'
import { GET_ALL_USERNAMES } from '../../graphql'
import SignUpForm from '../../components/SignUpForm'

export default function SignUp() {
    const { data, loading } = useQuery(GET_ALL_USERNAMES)

    return <div>{loading ? <></> : <SignUpForm usernames={data.usernames} />}</div>
}

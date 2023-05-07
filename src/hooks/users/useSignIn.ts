import { SignInFormValues, User } from '../../interfaces'

import { useLazyQuery } from '@apollo/client'
import { USER_AUTHENTICATION } from '../../graphql'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

const useSignIn = () => {
    const [checkAuthentication] = useLazyQuery(USER_AUTHENTICATION, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { signIn } = bindActionCreators(actionCreators, dispatch)

    const handleSignIn = async (formData: SignInFormValues) => {
        return new Promise<boolean>((resolve) => {
            checkAuthentication({
                variables: { ...formData },
            }).then(({ data }) => {
                if (data.user) {
                    console.log('Logged in successfully!')
                    const { __typename, ...rest } = data.user
                    signIn(rest as User)
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    return handleSignIn
}

export default useSignIn

import {
    User,
    AuthenticationDetails,
    SignInFormValues,
    SignUpFormValues,
    EditProfileFormValues,
} from '../interfaces'

import { useLazyQuery, useMutation } from '@apollo/client'
import { USER_AUTHENTICATION, CREATE_USER, UPDATE_USER } from '../graphql'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../redux'

const useUsers = () => {
    const [checkAuthentication] = useLazyQuery(USER_AUTHENTICATION, {
        fetchPolicy: 'network-only',
    })

    const [createUser] = useMutation(CREATE_USER, {
        fetchPolicy: 'network-only',
    })

    const [updateUser] = useMutation(UPDATE_USER, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { signIn } = bindActionCreators(actionCreators, dispatch)

    const handleSignIn = async (
        formData: SignInFormValues
    ): Promise<AuthenticationDetails> => {
        try {
            const { data } = await checkAuthentication({
                variables: { ...formData },
            })

            if (data.user) {
                console.log('Signed in successfully!')
                const { __typename, ...rest } = data.user
                signIn(rest as User)
                return { isAuthenticated: true, userID: data.user.id }
            } else {
                return { isAuthenticated: false, userID: '' }
            }
        } catch (error) {
            console.error('An error occurred while signing in:', error)
            return { isAuthenticated: false, userID: '' }
        }
    }

    const handleSignUp = async (
        formData: SignUpFormValues
    ): Promise<AuthenticationDetails> => {
        try {
            const { data } = await createUser({
                variables: { input: { ...formData } },
            })

            if (data.createUser) {
                console.log('Signed up successfully!')
                const { __typename, ...rest } = data.createUser
                signIn(rest as User)
                return { isAuthenticated: true, userID: data.createUser.id }
            } else {
                return { isAuthenticated: false, userID: '' }
            }
        } catch (error) {
            console.error('An error occurred while signing up:', error)
            return { isAuthenticated: false, userID: '' }
        }
    }

    const handleUpdateUser = async (formData: EditProfileFormValues) => {
        try {
            const { data } = await updateUser({
                variables: { input: { ...formData } },
            })

            if (data.updateUser) {
                console.log('User updated successfully!')
                const { __typename, ...rest } = data.updateUser
                signIn(rest as User)
            }
        } catch (error) {
            console.error('An error occurred while updating the user:', error)
        }
    }

    return { handleSignIn, handleSignUp, handleUpdateUser }
}

export default useUsers

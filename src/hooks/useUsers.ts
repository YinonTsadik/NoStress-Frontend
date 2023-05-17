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

    const handleSignIn = async (formData: SignInFormValues) => {
        return new Promise<AuthenticationDetails>((resolve) => {
            checkAuthentication({
                variables: { ...formData },
            }).then(({ data }) => {
                if (data.user) {
                    console.log('Logged in successfully!')
                    const { __typename, ...rest } = data.user
                    signIn(rest as User)
                    resolve({ isAuthenticated: true, userID: data.user.id })
                } else {
                    resolve({ isAuthenticated: false, userID: '' })
                }
            })
        })
    }

    const handleSignUp = async (formData: SignUpFormValues) => {
        return new Promise<AuthenticationDetails>((resolve) => {
            createUser({
                variables: { input: { ...formData } },
            }).then(({ data }) => {
                if (data.createUser) {
                    console.log('Signed up successfully!')
                    const { __typename, ...rest } = data.createUser
                    signIn(rest as User)
                    resolve({ isAuthenticated: true, userID: data.createUser.id })
                } else {
                    resolve({ isAuthenticated: false, userID: '' })
                }
            })
        })
    }

    const handleUpdateUser = async (formData: EditProfileFormValues) => {
        await updateUser({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.updateUser) {
                console.log('User updated successfully!')
                const { __typename, ...rest } = data.updateUser
                signIn(rest as User)
            }
        })
    }

    return { handleSignIn, handleSignUp, handleUpdateUser }
}

export default useUsers

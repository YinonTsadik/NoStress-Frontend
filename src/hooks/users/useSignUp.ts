import { SignUpFormValues, User } from '../../interfaces'

import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../graphql'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

const useSignUp = () => {
    const [createUser] = useMutation(CREATE_USER, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { signIn } = bindActionCreators(actionCreators, dispatch)

    const handleSignUp = async (formData: SignUpFormValues) => {
        return new Promise<boolean>((resolve) => {
            createUser({
                variables: { ...formData },
            }).then(({ data }) => {
                if (data.createUser) {
                    console.log('Signed up successfully!')
                    const { __typename, ...rest } = data.createUser
                    signIn(rest as User)
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    return handleSignUp
}

export default useSignUp

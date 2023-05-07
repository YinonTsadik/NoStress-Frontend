import { EditProfileFormValues, User } from '../../interfaces'

import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../../redux'
import { bindActionCreators } from 'redux'

const useUpdateUser = () => {
    const [updateUser] = useMutation(UPDATE_USER, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { signIn: editUser } = bindActionCreators(actionCreators, dispatch)

    const handleUpdateUser = async (formData: EditProfileFormValues) => {
        await updateUser({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.updateUser) {
                console.log('User updated successfully!')
                const { __typename, ...rest } = data.updateUser
                editUser(rest as User)
            }
        })
    }

    return handleUpdateUser
}

export default useUpdateUser

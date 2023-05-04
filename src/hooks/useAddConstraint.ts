import { CreateConstraintFormValues, Constraint } from '../interfaces'

import { useMutation } from '@apollo/client'
import { CREATE_CONSTRAINT } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

const useAddConstraint = () => {
    const [createConstraint] = useMutation(CREATE_CONSTRAINT)

    const dispatch = useDispatch()
    const { addConstraint } = bindActionCreators(actionCreators, dispatch)

    const handleAddConstraint = async (
        constraintFormData: CreateConstraintFormValues
    ) => {
        await createConstraint({
            variables: { input: { ...constraintFormData } },
        }).then(({ data }) => {
            if (data.createConstraint) {
                console.log('Task created successfully!')
                const { __typename, ...rest } = data.createConstraint
                addConstraint(rest as Constraint)
            }
        })
    }

    return handleAddConstraint
}

export default useAddConstraint

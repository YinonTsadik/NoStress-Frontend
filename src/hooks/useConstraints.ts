import { Constraint, CreateConstraintFormValues } from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import { CREATE_CONSTRAINT, GET_CALENDAR_CONSTRAINTS } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

const useConstraints = () => {
    const [createConstraint] = useMutation(CREATE_CONSTRAINT, {
        fetchPolicy: 'network-only',
    })

    const [getConstraints] = useLazyQuery(GET_CALENDAR_CONSTRAINTS, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { addConstraint, setConstraints } = bindActionCreators(
        actionCreators,
        dispatch
    )

    const handleAddConstraint = async (formData: CreateConstraintFormValues) => {
        await createConstraint({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.createConstraint) {
                console.log('Task created successfully!')
                const { __typename, ...rest } = data.createConstraint
                addConstraint(rest as Constraint)
            }
        })
    }

    const handleSetConstraints = async (calendarID: string) => {
        await getConstraints({ variables: { calendarID } }).then(({ data }) => {
            if (data.calendarConstraints) {
                const constraints: Constraint[] = data.calendarConstraints.map(
                    (task: any) => {
                        const { __typename, ...rest } = task
                        return rest as Constraint
                    }
                )
                setConstraints(constraints)
            }
        })
    }

    return { handleAddConstraint, handleSetConstraints }
}

export default useConstraints

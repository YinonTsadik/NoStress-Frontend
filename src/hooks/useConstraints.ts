import { Constraint, CreateConstraintFormValues } from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_CALENDAR_CONSTRAINTS, CREATE_CONSTRAINT } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

const useConstraints = () => {
    const [getConstraints] = useLazyQuery(GET_CALENDAR_CONSTRAINTS, {
        fetchPolicy: 'network-only',
    })

    const [createConstraint] = useMutation(CREATE_CONSTRAINT, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { setConstraints, addConstraint } = bindActionCreators(
        actionCreators,
        dispatch
    )

    const handleSetConstraints = async (calendarID: string) => {
        console.log(' here 4')
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

    const handleAddConstraint = async (formData: CreateConstraintFormValues) => {
        await createConstraint({
            variables: { input: { ...formData } },
        }).then(({ data }) => {
            if (data.createConstraint) {
                console.log('Constraint created successfully!')
                const { __typename, ...rest } = data.createConstraint
                addConstraint(rest as Constraint)
            }
        })
    }

    return { handleSetConstraints, handleAddConstraint }
}

export default useConstraints

import {
    Constraint,
    CreateConstraintFormValues,
    EditConstraintFormValues,
} from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
    GET_CALENDAR_CONSTRAINTS,
    CREATE_CONSTRAINT,
    UPDATE_CONSTRAINT,
    DELETE_CONSTRAINT,
} from '../graphql'

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

    const [updateConstraint] = useMutation(UPDATE_CONSTRAINT, {
        fetchPolicy: 'network-only',
    })

    const [deleteConstraint] = useMutation(DELETE_CONSTRAINT, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { setConstraints, addConstraint, editConstraint, removeConstraint } =
        bindActionCreators(actionCreators, dispatch)

    const handleSetConstraints = async (calendarID: string) => {
        console.log('here 4')

        try {
            const { data } = await getConstraints({ variables: { calendarID } })

            if (data.calendarConstraints) {
                const constraints: Constraint[] = data.calendarConstraints.map(
                    (constraint: any) => {
                        const { __typename, ...rest } = constraint
                        return rest as Constraint
                    }
                )

                setConstraints(constraints)
            }
        } catch (error) {
            console.error('An error occurred while setting constraints:', error)
        }
    }

    const handleAddConstraint = async (formData: CreateConstraintFormValues) => {
        try {
            const { data } = await createConstraint({
                variables: { input: { ...formData } },
            })

            if (data.createConstraint) {
                console.log('Constraint created successfully!')
                const { __typename, ...rest } = data.createConstraint
                addConstraint(rest as Constraint)
            }
        } catch (error) {
            console.error('An error occurred while adding a constraint:', error)
        }
    }

    const handleUpdateConstraint = async (formData: EditConstraintFormValues) => {
        try {
            const { data } = await updateConstraint({
                variables: { input: { ...formData } },
            })

            if (data.updateConstraint) {
                console.log('Constraint updated successfully!')
                const { __typename, ...rest } = data.updateConstraint
                editConstraint(rest as Constraint)
            }
        } catch (error) {
            console.error('An error occurred while updating a constraint:', error)
        }
    }

    const handleDeleteConstraint = async (id: string) => {
        try {
            const { data } = await deleteConstraint({ variables: { id } })

            if (data.deleteConstraint) {
                console.log('Constraint deleted successfully!')
                const { __typename, ...rest } = data.deleteConstraint
                removeConstraint(rest as Constraint)
            }
        } catch (error) {
            console.error('An error occurred while deleting a constraint:', error)
        }
    }

    return {
        handleSetConstraints,
        handleAddConstraint,
        handleUpdateConstraint,
        handleDeleteConstraint,
    }
}

export default useConstraints

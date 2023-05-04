import { useLazyQuery } from '@apollo/client'
import { GET_CALENDAR_CONSTRAINTS } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

import { Constraint } from '../interfaces'

const useSetConstraints = (calendarID: string) => {
    const [getConstraints] = useLazyQuery(GET_CALENDAR_CONSTRAINTS)

    const dispatch = useDispatch()
    const { setConstraints } = bindActionCreators(actionCreators, dispatch)

    const handleSetConstraints = async () => {
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

    return handleSetConstraints
}

export default useSetConstraints

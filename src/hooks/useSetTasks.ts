import { useLazyQuery } from '@apollo/client'
import { GET_CALENDAR_TASKS } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

import { Task } from '../interfaces'

const useSetTasks = (calendarID: string) => {
    const [getTasks] = useLazyQuery(GET_CALENDAR_TASKS, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { setTasks } = bindActionCreators(actionCreators, dispatch)

    const handleSetTasks = async () => {
        await getTasks({ variables: { calendarID } }).then(({ data }) => {
            if (data.calendarTasks) {
                const tasks: Task[] = data.calendarTasks.map((task: any) => {
                    const { __typename, ...rest } = task
                    return rest as Task
                })
                setTasks(tasks)
            }
        })
    }

    return handleSetTasks
}

export default useSetTasks

import { Task, CreateTaskFormValues } from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_CALENDAR_TASKS, CREATE_TASK } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

const useTasks = () => {
    const [getTasks] = useLazyQuery(GET_CALENDAR_TASKS, {
        fetchPolicy: 'network-only',
    })

    const [createTask] = useMutation(CREATE_TASK, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { setTasks, addTask } = bindActionCreators(actionCreators, dispatch)

    const handleSetTasks = async (calendarID: string) => {
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

    const handleAddTask = async (formData: CreateTaskFormValues) => {
        await createTask({ variables: { input: { ...formData } } }).then(
            ({ data }) => {
                if (data.createTask) {
                    console.log('Task created successfully!')
                    const { __typename, ...rest } = data.createTask
                    addTask(rest as Task)
                }
            }
        )
    }

    return { handleSetTasks, handleAddTask }
}

export default useTasks

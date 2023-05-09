import { Task, CreateTaskFormValues } from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import { CREATE_TASK, GET_CALENDAR_TASKS } from '../graphql'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../redux'
import { bindActionCreators } from 'redux'

const useTasks = () => {
    const [createTask] = useMutation(CREATE_TASK, {
        fetchPolicy: 'network-only',
    })

    const [getTasks] = useLazyQuery(GET_CALENDAR_TASKS, {
        fetchPolicy: 'network-only',
    })

    const dispatch = useDispatch()
    const { addTask, setTasks } = bindActionCreators(actionCreators, dispatch)

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

    const handleSetTasks = async (calendarID: string) => {
        await getTasks({ variables: { calendarID } })
            .then(({ data }) => {
                console.log('here')
                if (data.calendarTasks) {
                    const tasks: Task[] = data.calendarTasks.map((task: any) => {
                        const { __typename, ...rest } = task
                        return rest as Task
                    })
                    setTasks(tasks)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return { handleAddTask, handleSetTasks }
}

export default useTasks

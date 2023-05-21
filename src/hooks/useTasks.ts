import { Task, CreateTaskFormValues, EditTaskFormValues } from '../interfaces'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
    GET_CALENDAR_TASKS,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from '../graphql'

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

    const [updateTask] = useMutation(UPDATE_TASK, { fetchPolicy: 'network-only' })

    const [deleteTask] = useMutation(DELETE_TASK, { fetchPolicy: 'network-only' })

    const dispatch = useDispatch()
    const { setTasks, addTask, editTask, removeTask } = bindActionCreators(
        actionCreators,
        dispatch
    )

    const handleSetTasks = async (calendarID: string) => {
        try {
            const { data } = await getTasks({ variables: { calendarID } })

            if (data.calendarTasks) {
                const tasks: Task[] = data.calendarTasks.map((task: any) => {
                    const { __typename, ...rest } = task
                    return rest as Task
                })

                setTasks(tasks)

                console.log('The tasks have been setted successfully!')
            }
        } catch (error) {
            console.error('An error occurred while setting tasks:', error)
        }
    }

    const handleAddTask = async (formData: CreateTaskFormValues) => {
        try {
            const { data } = await createTask({
                variables: { input: { ...formData } },
            })

            if (data.createTask) {
                console.log('Task created successfully!')
                const { __typename, ...rest } = data.createTask
                addTask(rest as Task)
            }
        } catch (error) {
            console.error('An error occurred while adding the task:', error)
        }
    }

    const handleUpdateTask = async (formData: EditTaskFormValues) => {
        try {
            const { data } = await updateTask({
                variables: { input: { ...formData } },
            })

            if (data.updateTask) {
                console.log('Task updated successfully!')
                const { __typename, ...rest } = data.updateTask
                editTask(rest as Task)
            }
        } catch (error) {
            console.error('An error occurred while updating the task:', error)
        }
    }

    const handleDeleteTask = async (id: string) => {
        try {
            const { data } = await deleteTask({ variables: { id } })

            if (data.deleteTask) {
                console.log('Task deleted successfully!')
                const { __typename, ...rest } = data.deleteTask
                removeTask(rest as Task)
            }
        } catch (error) {
            console.error('An error occurred while deleting the task:', error)
        }
    }

    return { handleSetTasks, handleAddTask, handleUpdateTask, handleDeleteTask }
}

export default useTasks

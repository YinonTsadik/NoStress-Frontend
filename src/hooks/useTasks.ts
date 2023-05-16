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
        console.log('here 3')
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

    const handleUpdateTask = async (formData: EditTaskFormValues) => {
        await updateTask({ variables: { input: { ...formData } } }).then(
            ({ data }) => {
                if (data.updateTask) {
                    console.log('Task updated successfully!')
                    const { __typename, ...rest } = data.updateTask
                    editTask(rest as Task)
                }
            }
        )
    }

    const handleDeleteTask = async (id: string) => {
        await deleteTask({ variables: { id } }).then(({ data }) => {
            if (data.deleteTask) {
                console.log('Task deleted successfully!')
                const { __typename, ...rest } = data.deleteTask
                removeTask(rest as Task)
            }
        })
    }

    return { handleSetTasks, handleAddTask, handleUpdateTask, handleDeleteTask }
}

export default useTasks

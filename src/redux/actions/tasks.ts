import { TasksActionType } from '../action-types'
import { Task } from '../../interfaces'

interface SetTasks {
    type: TasksActionType.SET_TASKS
    payload: Task[]
}

interface AddTask {
    type: TasksActionType.ADD_TASK
    payload: Task
}

interface EditTask {
    type: TasksActionType.EDIT_TASK
    payload: Task
}

interface DeleteTask {
    type: TasksActionType.DELETE_TASK
    payload: Task
}

interface ClearTasks {
    type: TasksActionType.CLEAR_TASKS
}

export type TasksActions = SetTasks | AddTask | EditTask | DeleteTask | ClearTasks

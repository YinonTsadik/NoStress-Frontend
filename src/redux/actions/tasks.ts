import { TasksActionType } from '../action-types'
import { Task } from '../../interfaces'

interface SetTasks {
    type: TasksActionType.SET_TASKS
    payload: Task[]
}

interface ClearTasks {
    type: TasksActionType.CLEAR_TASKS
}

export type TasksActions = SetTasks | ClearTasks

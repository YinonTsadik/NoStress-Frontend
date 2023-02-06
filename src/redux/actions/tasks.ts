import { TasksActionType } from '../action-types'
import { Task } from '../../interfaces'

interface SetTasks {
    type: TasksActionType.SET_TASKS
    payload: Task[]
}

export type TasksActions = SetTasks

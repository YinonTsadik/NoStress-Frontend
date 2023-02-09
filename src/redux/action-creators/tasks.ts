import { Dispatch } from 'redux'

import { Task } from '../../interfaces'
import { TasksActions } from '../actions'
import { TasksActionType } from '../action-types'

export const setTasks = (tasks: Task[]) => {
    return (dispatch: Dispatch<TasksActions>) => {
        dispatch({
            type: TasksActionType.SET_TASKS,
            payload: tasks,
        })
    }
}

export const clearTasks = () => {
    return (dispatch: Dispatch<TasksActions>) => {
        dispatch({
            type: TasksActionType.CLEAR_TASKS,
        })
    }
}

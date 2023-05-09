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

export const addTask = (task: Task) => {
    return (dispatch: Dispatch<TasksActions>) => {
        dispatch({
            type: TasksActionType.ADD_TASK,
            payload: task,
        })
    }
}

export const editTask = (task: Task) => {
    return (dispatch: Dispatch<TasksActions>) => {
        dispatch({
            type: TasksActionType.EDIT_TASK,
            payload: task,
        })
    }
}

export const removeTask = (task: Task) => {
    return (dispatch: Dispatch<TasksActions>) => {
        dispatch({
            type: TasksActionType.REMOVE_TASK,
            payload: task,
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

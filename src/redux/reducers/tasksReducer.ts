import { Task } from '../../interfaces'
import { TasksActions } from '../actions'
import { TasksActionType } from '../action-types'

const initialState = new Array<Task>()

const tasksReducer = (state = initialState, action: TasksActions) => {
    switch (action.type) {
        case TasksActionType.SET_TASKS:
            return action.payload
        default:
            return state
    }
}

export default tasksReducer

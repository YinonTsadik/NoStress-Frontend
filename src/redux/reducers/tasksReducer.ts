import { TasksReducer, Task } from '../../interfaces'
import { TasksActions } from '../actions'
import { TasksActionType } from '../action-types'

const initialState: TasksReducer = {
    data: new Array<Task>(),
    loaded: false,
}

const tasksReducer = (state = initialState, action: TasksActions) => {
    switch (action.type) {
        case TasksActionType.SET_TASKS:
            return {
                data: action.payload,
                loaded: true,
            } as TasksReducer

        case TasksActionType.CLEAR_TASKS:
            return { ...initialState }

        default:
            return state
    }
}

export default tasksReducer

import { TasksReducer, Task } from '../../interfaces'
import { TasksActions } from '../actions'
import { TasksActionType } from '../action-types'

const initialState: TasksReducer = {
    data: new Array<Task>(),
}

const tasksReducer = (state = initialState, action: TasksActions) => {
    switch (action.type) {
        case TasksActionType.SET_TASKS:
            return { data: action.payload }

        case TasksActionType.ADD_TASK:
            return { data: [...state.data, action.payload] }

        case TasksActionType.EDIT_TASK:
            return {
                data: state.data.map((task) => {
                    return task.id === action.payload.id
                        ? { ...action.payload }
                        : task
                }),
            }

        case TasksActionType.REMOVE_TASK:
            return {
                data: state.data.filter((task) => task.id !== action.payload.id),
            }

        case TasksActionType.CLEAR_TASKS:
            return { ...initialState }

        default:
            return state
    }
}

export default tasksReducer

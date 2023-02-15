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
            }

        case TasksActionType.ADD_TASK:
            return {
                ...state,
                data: [...state.data, action.payload],
            }

        case TasksActionType.EDIT_TASK:
            return {
                ...state,
                data: state.data.map((task) => {
                    return task.id === action.payload.id
                        ? { ...action.payload }
                        : task
                }),
            }

        case TasksActionType.DELETE_TASK:
            return {
                ...state,
                data: state.data.filter((task) => task.id !== action.payload.id),
            }

        case TasksActionType.CLEAR_TASKS:
            return { ...initialState }

        default:
            return state
    }
}

export default tasksReducer

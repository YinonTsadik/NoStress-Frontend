import { ConstraintsReducer, Constraint } from '../../interfaces'
import { ConstraintsActions } from '../actions'
import { ConstraintsActionType } from '../action-types'

const initialState: ConstraintsReducer = {
    data: new Array<Constraint>(),
    loaded: false,
}

const constraintsReducer = (state = initialState, action: ConstraintsActions) => {
    switch (action.type) {
        case ConstraintsActionType.SET_CONSTRAINTS:
            return {
                data: action.payload,
                loaded: true,
            }

        case ConstraintsActionType.ADD_CONSTRAINT:
            return {
                ...state,
                data: [...state.data, action.payload],
            }

        case ConstraintsActionType.EDIT_CONSTRAINT:
            return {
                ...state,
                data: state.data.map((constraint) => {
                    return constraint.id === action.payload.id
                        ? { ...action.payload }
                        : constraint
                }),
            }

        case ConstraintsActionType.DELETE_CONSTRAINT:
            return {
                ...state,
                data: state.data.filter(
                    (constraint) => constraint.id !== action.payload.id
                ),
            }

        case ConstraintsActionType.CLEAR_CONSTRAINTS:
            return { ...initialState }

        default:
            return state
    }
}

export default constraintsReducer

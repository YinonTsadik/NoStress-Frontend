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
            } as ConstraintsReducer

        case ConstraintsActionType.CLEAR_CONSTRAINTS:
            return { ...initialState }

        default:
            return state
    }
}

export default constraintsReducer

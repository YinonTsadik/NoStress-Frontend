import { Constraint } from '../../interfaces'
import { ConstraintsActions } from '../actions'
import { ConstraintsActionType } from '../action-types'

const initialState = new Array<Constraint>()

const constraintsReducer = (state = initialState, action: ConstraintsActions) => {
    switch (action.type) {
        case ConstraintsActionType.SET_CONSTRAINTS:
            return action.payload
        default:
            return state
    }
}

export default constraintsReducer

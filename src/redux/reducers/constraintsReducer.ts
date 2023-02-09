import { ConstraintsReducerPayload, Constraint } from '../../interfaces'
import { ConstraintsActions } from '../actions'
import { ConstraintsActionType } from '../action-types'

const initialState: ConstraintsReducerPayload = {
    data: new Array<Constraint>(),
    fetched: false,
}

const constraintsReducer = (state = initialState, action: ConstraintsActions) => {
    switch (action.type) {
        case ConstraintsActionType.SET_CONSTRAINTS:
            return {
                data: action.payload,
                fetched: true,
            } as ConstraintsReducerPayload

        case ConstraintsActionType.CLEAR_CONSTRAINTS:
            return { ...initialState }

        default:
            return state
    }
}

export default constraintsReducer

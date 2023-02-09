import { Dispatch } from 'redux'

import { Constraint } from '../../interfaces'
import { ConstraintsActions } from '../actions'
import { ConstraintsActionType } from '../action-types'

export const setConstraints = (constraints: Constraint[]) => {
    return (dispatch: Dispatch<ConstraintsActions>) => {
        dispatch({
            type: ConstraintsActionType.SET_CONSTRAINTS,
            payload: constraints,
        })
    }
}

export const clearConstraints = () => {
    return (dispatch: Dispatch<ConstraintsActions>) => {
        dispatch({
            type: ConstraintsActionType.CLEAR_CONSTRAINTS,
        })
    }
}

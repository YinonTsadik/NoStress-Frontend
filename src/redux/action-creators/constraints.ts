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

export const addConstraint = (constraint: Constraint) => {
    return (dispatch: Dispatch<ConstraintsActions>) => {
        dispatch({
            type: ConstraintsActionType.ADD_CONSTRAINT,
            payload: constraint,
        })
    }
}

export const editConstraint = (constraint: Constraint) => {
    return (dispatch: Dispatch<ConstraintsActions>) => {
        dispatch({
            type: ConstraintsActionType.EDIT_CONSTRAINT,
            payload: constraint,
        })
    }
}

export const removeConstraint = (constraint: Constraint) => {
    return (dispatch: Dispatch<ConstraintsActions>) => {
        dispatch({
            type: ConstraintsActionType.REMOVE_CONSTRAINT,
            payload: constraint,
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

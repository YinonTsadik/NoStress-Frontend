import { ConstraintsActionType } from '../action-types'
import { Constraint } from '../../interfaces'

interface SetConstraints {
    type: ConstraintsActionType.SET_CONSTRAINTS
    payload: Constraint[]
}

interface AddConstraint {
    type: ConstraintsActionType.ADD_CONSTRAINT
    payload: Constraint
}

interface EditConstraint {
    type: ConstraintsActionType.EDIT_CONSTRAINT
    payload: Constraint
}

interface RemoveConstraint {
    type: ConstraintsActionType.REMOVE_CONSTRAINT
    payload: Constraint
}

interface ClearConstraints {
    type: ConstraintsActionType.CLEAR_CONSTRAINTS
}

export type ConstraintsActions =
    | SetConstraints
    | AddConstraint
    | EditConstraint
    | RemoveConstraint
    | ClearConstraints

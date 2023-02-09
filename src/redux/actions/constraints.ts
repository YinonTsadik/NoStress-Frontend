import { ConstraintsActionType } from '../action-types'
import { Constraint } from '../../interfaces'

interface SetConstraints {
    type: ConstraintsActionType.SET_CONSTRAINTS
    payload: Constraint[]
}

interface ClearConstraints {
    type: ConstraintsActionType.CLEAR_CONSTRAINTS
}

export type ConstraintsActions = SetConstraints | ClearConstraints

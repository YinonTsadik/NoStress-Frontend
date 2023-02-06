import { ConstraintsActionType } from '../action-types'
import { Constraint } from '../../interfaces'

interface SetConstraints {
    type: ConstraintsActionType.SET_CONSTRAINTS
    payload: Constraint[]
}

export type ConstraintsActions = SetConstraints

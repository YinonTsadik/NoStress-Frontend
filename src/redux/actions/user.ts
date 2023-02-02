import { UserActionType } from '../action-types'
import { User } from '../../interfaces'

interface SignIn {
    type: UserActionType.SIGN_IN
    payload: User
}

interface SignOut {
    type: UserActionType.SIGN_OUT
}

export type UserActions = SignIn | SignOut

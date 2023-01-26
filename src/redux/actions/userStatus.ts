import { UserStatusActionType } from '../action-types'

interface SignIn {
    type: UserStatusActionType.SIGN_IN
}

interface SignOut {
    type: UserStatusActionType.SIGN_OUT
}

export type UserStatusActions = SignIn | SignOut

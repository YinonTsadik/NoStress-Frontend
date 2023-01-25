import { UserStatusActionType } from '../action-types'

// User Status
interface SignIn {
    type: UserStatusActionType.SIGN_IN
}

interface SignOut {
    type: UserStatusActionType.SIGN_OUT
}

export type UserStatusAction = SignIn | SignOut

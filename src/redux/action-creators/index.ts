import { Dispatch } from 'redux'

import { UserStatusAction } from '../actions'
import { UserStatusActionType } from '../action-types'

// User Status
export const signIn = () => {
    return (dispatch: Dispatch<UserStatusAction>) => {
        dispatch({ type: UserStatusActionType.SIGN_IN })
    }
}

export const signOut = () => {
    return (dispatch: Dispatch<UserStatusAction>) => {
        dispatch({ type: UserStatusActionType.SIGN_OUT })
    }
}

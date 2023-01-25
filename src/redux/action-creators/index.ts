import { Dispatch } from 'redux'

import { UserStatusActions } from '../actions'
import { UserStatusActionType } from '../action-types'

// User Status
export const signIn = () => {
    return (dispatch: Dispatch<UserStatusActions>) => {
        dispatch({ type: UserStatusActionType.SIGN_IN })
    }
}

export const signOut = () => {
    return (dispatch: Dispatch<UserStatusActions>) => {
        dispatch({ type: UserStatusActionType.SIGN_OUT })
    }
}

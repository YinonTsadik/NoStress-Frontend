import { Dispatch } from 'redux'

import { User } from '../../interfaces'
import { UserActions } from '../actions'
import { UserActionType } from '../action-types'

export const signIn = (user: User) => {
    return (dispatch: Dispatch<UserActions>) => {
        dispatch({ type: UserActionType.SIGN_IN, payload: user })
    }
}

export const signOut = () => {
    return (dispatch: Dispatch<UserActions>) => {
        dispatch({ type: UserActionType.SIGN_OUT })
    }
}

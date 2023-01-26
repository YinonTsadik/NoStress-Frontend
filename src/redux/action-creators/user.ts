import { Dispatch } from 'redux'

import { User } from '../../interfaces/modules'
import { UserActions } from '../actions'
import { UserActionType } from '../action-types'

export const setUser = (user: User) => {
    return (dispatch: Dispatch<UserActions>) => {
        dispatch({ type: UserActionType.SET_USER, payload: user })
    }
}

import { UserStatusActions } from '../actions'
import { UserStatusActionType } from '../action-types'

const initialState: boolean = false

const userStatusReducer = (state = initialState, action: UserStatusActions) => {
    switch (action.type) {
        case UserStatusActionType.SIGN_IN:
            return true
        case UserStatusActionType.SIGN_OUT:
            return false
        default:
            return state
    }
}

export default userStatusReducer

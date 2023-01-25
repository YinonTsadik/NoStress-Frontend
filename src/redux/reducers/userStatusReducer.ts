import { UserStatusAction } from '../actions'
import { UserStatusActionType } from '../action-types'

const initialState: boolean = false

const userStatusReducer = (state = initialState, action: UserStatusAction) => {
    switch (action.type) {
        case UserStatusActionType.SIGN_IN:
            return !state
        case UserStatusActionType.SIGN_OUT:
            return !state
        default:
            return state
    }
}

export default userStatusReducer

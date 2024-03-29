import { User } from '../../interfaces'
import { UserActions } from '../actions'
import { UserActionType } from '../action-types'

const initialState: User = {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
}

const userReducer = (state = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionType.SIGN_IN:
            return { ...action.payload }

        case UserActionType.SIGN_OUT:
            return { ...initialState }

        default:
            return state
    }
}

export default userReducer

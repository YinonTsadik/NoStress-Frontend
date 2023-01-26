import { User } from '../../interfaces/modules'
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
        case UserActionType.SET_USER:
            return action.payload ? { ...action.payload } : state
        default:
            return state
    }
}

export default userReducer

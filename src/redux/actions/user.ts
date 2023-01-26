import { UserActionType } from '../action-types'
import { User } from '../../interfaces/modules'

interface SetUser {
    type: UserActionType
    payload: User
}

export type UserActions = SetUser

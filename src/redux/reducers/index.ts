import { combineReducers } from 'redux'

import userStatusReducer from './userStatusReducer'
import userReducer from './userReducer'

const reducers = combineReducers({
    userStatus: userStatusReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof reducers>

export default reducers

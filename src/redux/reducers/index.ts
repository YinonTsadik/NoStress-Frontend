import { combineReducers } from 'redux'

import userStatusReducer from './userStatusReducer'

const reducers = combineReducers({ userStatus: userStatusReducer })

export type RootState = ReturnType<typeof reducers>

export default reducers

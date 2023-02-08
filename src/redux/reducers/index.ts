import { combineReducers } from 'redux'

import userReducer from './userReducer'
import calendarsReducer from './calendarsReducer'
import currentCalendarReducer from './currentCalendarReducer'
import tasksReducer from './tasksReducer'
import constraintsReducer from './constraintsReducer'

const reducers = combineReducers({
    user: userReducer,
    calendars: calendarsReducer,
    currentCalendar: currentCalendarReducer,
    tasks: tasksReducer,
    constraints: constraintsReducer,
})

export default reducers

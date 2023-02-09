import { combineReducers } from 'redux'

import userReducer from './userReducer'
import calendarsReducer from './calendarsReducer'
import currentCalendarReducer from './currentCalendarReducer'
import tasksReducer from './tasksReducer'
import constraintsReducer from './constraintsReducer'
import eventsReducer from './eventsReducer'

const reducers = combineReducers({
    user: userReducer,
    calendars: calendarsReducer,
    currentCalendar: currentCalendarReducer,
    tasks: tasksReducer,
    constraints: constraintsReducer,
    events: eventsReducer,
})

export default reducers

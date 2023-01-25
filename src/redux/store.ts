import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import reducers from './reducers'

const store = configureStore({
    reducer: reducers,
    middleware: [thunk],
    preloadedState: {},
})

export default store

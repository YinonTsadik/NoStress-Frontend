import store from './store'
import reducers from './reducers'
import * as actionCreators from './action-creators'

export default store
export type RootState = ReturnType<typeof reducers>
export { actionCreators }

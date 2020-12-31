/* store用来存储state的地方 */
import { createStore } from 'redux'
import AppReducer from '../reducers'

const store = createStore(AppReducer)

export default store
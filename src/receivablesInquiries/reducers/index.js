import { combineReducers } from 'redux'
import { receivableList, excutorList } from './receivable'
import receListReducer from '../actions/receivableList'

export default combineReducers({
    receivableList,
    receListReducer,
    excutorList
})




import { combineReducers } from 'redux'
import { receivableList, receSearchOptions, excutorList } from './receivable'
import receListReducer from '../actions/receivableList'

export default combineReducers({
    receivableList,
    receSearchOptions,
    receListReducer,
    excutorList
})




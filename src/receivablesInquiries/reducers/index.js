import { combineReducers } from 'redux'
import { receivableList, receSalerList, excutorList } from './receivable'
import receListReducer from '../actions/receivableList'

export default combineReducers({
    receivableList,
    receListReducer,
    receSalerList,
    excutorList
})




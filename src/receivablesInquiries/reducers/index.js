import { combineReducers } from 'redux'
import { receivableList, receSearchOptions, reservationList, campaignList, extendBusinessList } from './receivable'
import receListReducer from '../actions/receivableList'

export default combineReducers({
    receivableList,
    receSearchOptions,
    receListReducer
})




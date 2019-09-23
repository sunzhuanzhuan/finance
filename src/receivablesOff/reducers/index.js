import { combineReducers } from 'redux'
import { receivableOffList, receMetaData, salerData } from './receivableOff'
import receAddReducer from '../actions/receivableAdd';
export default combineReducers({
    receivableOffList, 
    receMetaData,
    salerData, 
    receAddReducer
})




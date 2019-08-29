import { combineReducers } from 'redux'
import { receivableOffList, receMetaData } from './receivableOff'
import receAddReducer from '../actions/receivableAdd';
export default combineReducers({
    receivableOffList, 
    receMetaData,
    receAddReducer
})




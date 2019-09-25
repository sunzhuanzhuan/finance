import { combineReducers } from 'redux'
import { receivableOffList, receMetaData, salerData, companyInfo } from './receivableOff'
import receAddReducer from '../actions/receivableAdd';
export default combineReducers({
    receivableOffList, 
    receMetaData,
    salerData, 
    companyInfo, 
    receAddReducer
})




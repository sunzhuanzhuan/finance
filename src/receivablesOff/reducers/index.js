import { combineReducers } from 'redux'
import { receivableOffList, receMetaData, salerData, companyInfo, giftAmount, warehouseAmount, regionList } from './receivableOff'
import receAddReducer from '../actions/receivableAdd';
export default combineReducers({
    receivableOffList, 
    receMetaData,
    salerData, 
    companyInfo, 
    giftAmount, 
    warehouseAmount, 
    regionList, 
    receAddReducer
})




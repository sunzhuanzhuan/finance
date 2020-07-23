import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
	getReceivableOffList_success,
	getReceMetaData_success,
	getSalerData_success,
	getCompanyInfo_success,
	getOffItemInfo_success,
	getGiftAmount_success,
	getWarehouseAmount_success, 
	getRegionTeamName_success,
	getBusinessType_success
} from '../actions/receivableOff';

const receivableOffList = handleActions({
	[getReceivableOffList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

const receMetaData = handleActions({
	[getReceMetaData_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

const salerData = handleActions({
	[getSalerData_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, [])

const companyInfo = handleActions({
	[getCompanyInfo_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

const offItemInfo = handleActions({
	[getOffItemInfo_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

const giftAmount = handleActions({
	[getGiftAmount_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

const warehouseAmount = handleActions({
	[getWarehouseAmount_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, [])

const regionList = handleActions({
	[getRegionTeamName_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, [])

const businessType = handleActions({
	[getBusinessType_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, [])

export default combineReducers({
    receivableOffList, 
    receMetaData,
    salerData, 
    companyInfo, 
    giftAmount, 
    warehouseAmount, 
    regionList, 
    businessType,
})
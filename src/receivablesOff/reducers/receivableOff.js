import { handleActions } from 'redux-actions';
import {
	getReceivableOffList_success,
	getReceMetaData_success,
	getSalerData_success,
	getCompanyInfo_success,
	getOffItemInfo_success
} from '../actions/receivableOff';

export const receivableOffList = handleActions({
	[getReceivableOffList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const receMetaData = handleActions({
	[getReceMetaData_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const salerData = handleActions({
	[getSalerData_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, [])

export const companyInfo = handleActions({
	[getCompanyInfo_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const offItemInfo = handleActions({
	[getOffItemInfo_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
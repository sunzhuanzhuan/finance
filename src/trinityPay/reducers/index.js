import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getPrePayData_success,
	getPrePayDetail_success,
	getPrePaySearchItem_success,
	getDatePayData_success,
	getDatePayDetail_success,
	getDatePaySearchItem_success
} from '../actions';

//预付款
export const prePayData = handleActions({
	[getPrePayData_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const prePayDetail = handleActions({
	[getPrePayDetail_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const prePaySearchItem = handleActions({
	[getPrePaySearchItem_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//周期付款
export const datePayData = handleActions({
	[getDatePayData_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const datePayDetail = handleActions({
	[getDatePayDetail_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const datePaySearchItem = handleActions({
	[getDatePaySearchItem_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
export default combineReducers({
	prePayData,
	prePayDetail,
	prePaySearchItem,
	//周期付款
	datePayData,
	datePayDetail,
	datePaySearchItem,
})

import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getPrePayData_success,
	getPrePayDetail_success,
	getSearchItem_success
} from '../actions';

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

export const SearchItem = handleActions({
	[getSearchItem_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export default combineReducers({
	prePayData,
	prePayDetail,
	SearchItem
})

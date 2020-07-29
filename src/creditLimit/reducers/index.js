import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
	getCreditQuerySalerData_success,
	getCreditQueryRegionList_success
} from '../actions';
import creditLimitListInfo from '../actions/creditTabListAction';

export const creditSalerData = handleActions({
	[getCreditQuerySalerData_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, [])
export const creditRegionData = handleActions({
	[getCreditQueryRegionList_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, [])
export default combineReducers({
	creditLimitListInfo, 
	creditSalerData,
	creditRegionData
})
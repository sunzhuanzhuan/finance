import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getFinanceRateList_success
} from '../actions';

export const rateListInfo = handleActions({
	[getFinanceRateList_success]: (state, action) => {
		return [...action.payload.data]
	}
}, [])

export default combineReducers({
	rateListInfo
})

import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	postTrinityProfitRateAll_success
} from '../actions';

//预付款
export const trinityProfitRateAll = handleActions({
	[postTrinityProfitRateAll_success]: (state, action) => {
		return [...action.payload.data ]
	}
}, [])

export default combineReducers({
	trinityProfitRateAll
})

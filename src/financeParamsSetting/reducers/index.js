import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getFinanceParamsVal_success
} from '../actions';

export const financeParamsVal = handleActions({
	[getFinanceParamsVal_success]: (state, action) => {
		return [...action.payload.data]
	}
}, [])

export default combineReducers({
	financeParamsVal
})

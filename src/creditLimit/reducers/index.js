import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
	getCreditQueryOptions_success,
} from '../actions';
import creditLimitListInfo from '../actions/creditTabListAction';

const creditQueryOptions = handleActions({
	[getCreditQueryOptions_success]: (_, action) => {
		return { ...action.payload.data }
	}
}, {})

export default combineReducers({
	creditLimitListInfo, 
	creditQueryOptions
})
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
	getCrediLimitListInfo_success,
} from '../actions';

const creditLimitListInfo = handleActions({
	[getCrediLimitListInfo_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export default combineReducers({
    creditLimitListInfo, 
})
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getPrePayData_success
} from '../actions';

export const prePayData = handleActions({
	[getPrePayData_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})


export default combineReducers({
	prePayData
})

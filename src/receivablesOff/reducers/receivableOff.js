import { handleActions } from 'redux-actions';
import {
	getReceivableOffList_success,
	getReceMetaData_success
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

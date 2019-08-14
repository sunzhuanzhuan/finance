import { handleActions } from 'redux-actions';
import {
	getReceivableOffList_success,
} from '../actions/receivableOff';

export const receivableOffList = handleActions({
	[getReceivableOffList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})


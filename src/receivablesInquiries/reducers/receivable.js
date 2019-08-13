import { handleActions } from 'redux-actions';
import {
	getReceivableList_success,
} from '../actions/receivable';

export const receivableList = handleActions({
	[getReceivableList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})


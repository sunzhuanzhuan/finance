import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getRelatedInvoiceData_success
} from '../actions/relatedInvoice';

export const relatedInvoiceData = handleActions({
	[getRelatedInvoiceData_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})


export default combineReducers({
	relatedInvoiceData
})

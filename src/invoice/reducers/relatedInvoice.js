import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getRelatedInvoiceData_success,
	getRelatedInvoiceSearchItem_success,
} from '../actions/relatedInvoice';

export const relatedInvoiceData = handleActions({
	[getRelatedInvoiceData_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const relatedInvoiceSearchItem = handleActions({
	[getRelatedInvoiceSearchItem_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export default {
	relatedInvoiceData,
	relatedInvoiceSearchItem,
}

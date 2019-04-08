import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getRelatedInvoiceData,
	getRelatedInvoiceData_success
} = createHttpAction('getRelatedInvoiceData', Interface.getRelatedInvoiceData, {
	method: 'get',
	ignoreToast: true
});

export const {
	getAvailableInvoiceData,
	getAvailableInvoiceData_success
} = createHttpAction('getAvailableInvoiceData', Interface.getAvailableInvoiceData, {
	method: 'get',
	ignoreToast: true
});

export const {
	getRelatedInvoiceSearchItem,
	getRelatedInvoiceSearchItem_success
} = createHttpAction('getRelatedInvoiceSearchItem', Interface.getRelatedInvoiceSearchItem, {
	method: 'get',
	ignoreToast: true
});

export const {
	postRelatedInvoiceRelate,
	postRelatedInvoiceRelate_success
} = createHttpAction('postRelatedInvoiceRelate', Interface.postRelatedInvoiceRelate, {
	method: 'post',
	ignoreToast: true
});



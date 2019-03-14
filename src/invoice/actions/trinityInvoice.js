import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getTrinityInvoiceData,
	getTrinityInvoiceData_success
} = createHttpAction('getTrinityInvoiceData', Interface.getTrinityInvoiceData, {
	method: 'get',
	ignoreToast: true
});

export const {
	getTrinityInvoiceSearchItem,
	getTrinityInvoiceSearchItem_success
} = createHttpAction('getTrinityInvoiceSearchItem', Interface.getTrinityInvoiceSearchItem, {
	method: 'get',
	ignoreToast: true
});

export const {
	postTrinityInvoiceAdd,
	postTrinityInvoiceAdd_success
} = createHttpAction('postTrinityInvoiceAdd', Interface.postTrinityInvoiceAdd, {
	method: 'post',
	ignoreToast: true
});

export const {
	postTrinityInvoiceEdit,
	postTrinityInvoiceEdit_success
} = createHttpAction('postTrinityInvoiceEdit', Interface.postTrinityInvoiceEdit, {
	method: 'post',
	ignoreToast: true
});

export const {
	postTrinityInvoiceDel,
	postTrinityInvoiceDel_success
} = createHttpAction('postTrinityInvoiceDel', Interface.postTrinityInvoiceDel, {
	method: 'post',
	ignoreToast: true
});

export const {
	postTrinityInvoiceReset,
	postTrinityInvoiceReset_success
} = createHttpAction('postTrinityInvoiceReset', Interface.postTrinityInvoiceReset, {
	method: 'post',
	ignoreToast: true
});


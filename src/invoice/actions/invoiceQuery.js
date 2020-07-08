
import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getInvoiceQueryList,
	getInvoiceQueryList_success
} = createHttpAction('getInvoiceQueryList', Interface.getUserInvoiceSearch, {
	method: 'get'
});
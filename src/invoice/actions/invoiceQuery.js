
import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getUserInvoiceSearch,
	getUserInvoiceSearch_success
} = createHttpAction('getUserInvoiceSearch', Interface.getUserInvoiceSearch, {
	method: 'post'
});
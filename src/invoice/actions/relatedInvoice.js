import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getRelatedInvoiceData,
	getRelatedInvoiceData_success
} = createHttpAction('getRelatedInvoiceData', Interface.getRelatedInvoiceData, {
	method: 'get',
	ignoreToast: true
});


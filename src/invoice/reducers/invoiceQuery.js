import { handleAction } from 'redux-actions';

//发票查询列表
const invoiceQueryList = handleAction('getInvoiceQueryList_success', (_, action) => {
	return {
		...action.payload.data
	}
}, {})

export default {
	invoiceQueryList
}

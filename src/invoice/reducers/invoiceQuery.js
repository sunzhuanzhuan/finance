import { handleAction } from 'redux-actions';

//发票查询列表
const invoiceList = handleAction('getUserInvoiceSearch_success', (_, action) => {
	return {
		...action.payload.data
	}
}, {})

export default {
	invoiceList
}

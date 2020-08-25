import { handleAction } from 'redux-actions';

//发票查询条件
const invoiceQueryOptions = handleAction('getInvoiceQueryMetaData_success', (_, action) => {
	return {
		...action.payload.data
	}
}, {})

//发票查询列表统计数据
const invoiceQueryStatistics = handleAction('getInvoiceQueryStatistics_success', (_, action) => {
	return {
		...action.payload.data
	}
}, {})

//发票查询列表
const invoiceQueryList = handleAction('getInvoiceQueryList_success', (_, action) => {
	return {
		...action.payload.data
	}
}, {})

export default {
	invoiceQueryList,
	invoiceQueryOptions,
	invoiceQueryStatistics
}

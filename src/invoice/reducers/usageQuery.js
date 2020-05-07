import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux'

//主账号发票列表
const userInvoiceList = handleAction('getUserInvoiceSearch_success', (state, action) => {
	return {
		...action.payload.data
	}
}, {})
//三方发票列表
const trinityInvoiceList = handleAction('getTrinityInvoiceSearch_success', (state, action) => {
	return {
		...action.payload.data
	}
}, {})
const userInvoiceSum = handleAction('userInvoiceSearchAgg_success', (state, action) => {
	return {
		...action.payload.data.aggregation
	}
}, {})
//三方发票列表统计数据
const trinityInvoiceSum = handleAction('trinityInvoiceSearchAgg_success', (state, action) => {
	return {
		...action.payload.data.aggregation
	}
}, {})
export default {
	userInvoiceList,
	trinityInvoiceList,
	userInvoiceSum,
	trinityInvoiceSum
}

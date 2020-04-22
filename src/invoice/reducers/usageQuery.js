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

export default {
	userInvoiceList,
	trinityInvoiceList
}

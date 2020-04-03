import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getFinanceRateList,
	getFinanceRateList_success
} = createHttpAction('getFinanceRateList', Interface.getFinanceRateList, {
	method: 'get'
});

export const {
	addFinanceRate,
	addFinanceRate_success
} = createHttpAction('addFinanceRate', Interface.addFinanceRate, {
	method: 'post'
});

export const {
	editFinanceRate,
	editFinanceRate_success
} = createHttpAction('editFinanceRate', Interface.editFinanceRate, {
	method: 'post'
});
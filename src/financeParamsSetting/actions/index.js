import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getFinanceParamsVal,
	getFinanceParamsVal_success
} = createHttpAction('getFinanceParamsVal', Interface.getFinanceParamsVal, {
	method: 'post'
});

export const {
	setFinanceParamsVal,
	setFinanceParamsVal_success
} = createHttpAction('setFinanceParamsVal', Interface.setFinanceParamsVal, {
	method: 'post'
});


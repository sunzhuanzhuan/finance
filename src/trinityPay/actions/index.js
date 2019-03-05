import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getPrePayData,
	getPrePayData_success
} = createHttpAction('getPrePayData', Interface.getPrePayData, {
	method: 'get',
	ignoreToast: true
});

export const {
	getPrePaySuccess,
	getPrePaySuccess_success
} = createHttpAction('getPrePaySuccess', Interface.getPrePaySuccess, {
	method: 'get',
	ignoreToast: true
});
export const {
	getPrePayFail,
	getPrePayFail_success
} = createHttpAction('getPrePayFail', Interface.getPrePayFail, {
	method: 'get',
	ignoreToast: true
});

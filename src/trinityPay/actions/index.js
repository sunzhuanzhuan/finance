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
	getPrePayDetail,
	getPrePayDetail_success
} = createHttpAction('getPrePayDetail', Interface.getPrePayDetail, {
	method: 'get',
	ignoreToast: true
});

export const {
	getPrePayExport,
	getPrePayExport_success
} = createHttpAction('getPrePayExport', Interface.getPrePayExport, {
	method: 'get',
	ignoreToast: true
});

export const {
	postPrePayEdit,
	postPrePayEdit_success
} = createHttpAction('postPrePayEdit', Interface.postPrePayEdit, {
	method: 'post',
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

export const {
	getPrePayBackout,
	getPrePayBackout_success
} = createHttpAction('getPrePayBackout', Interface.getPrePayBackout, {
	method: 'get',
	ignoreToast: true
});

export const {
	getSearchItem,
	getSearchItem_success
} = createHttpAction('getSearchItem', Interface.getSearchItem, {
	method: 'get',
	ignoreToast: true
});

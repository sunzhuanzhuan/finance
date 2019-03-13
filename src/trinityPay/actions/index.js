import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
//预付款
export const {
	getPrePayData,
	getPrePayData_success
} = createHttpAction('getPrePayData', Interface.getPrePayData, {
	method: 'get',
	ignoreToast: true
});

export const {
	getPrePaySearchItem,
	getPrePaySearchItem_success
} = createHttpAction('getPrePaySearchItem', Interface.getPrePaySearchItem, {
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
	postPrePaySuccess,
	postPrePaySuccess_success
} = createHttpAction('postPrePaySuccess', Interface.postPrePaySuccess, {
	method: 'post',
	ignoreToast: true
});

export const {
	postPrePayFail,
	postPrePayFail_success
} = createHttpAction('postPrePayFail', Interface.postPrePayFail, {
	method: 'post',
	ignoreToast: true
});

export const {
	postPrePayBackout,
	postPrePayBackout_success
} = createHttpAction('postPrePayBackout', Interface.postPrePayBackout, {
	method: 'post',
	ignoreToast: true
});

export const {
	getPrimaryAccount,
	getPrimaryAccount_success
} = createHttpAction('getPrimaryAccount', Interface.getPrimaryAccount, {
	method: 'get',
	ignoreToast: true
});
//周期付款
export const {
	getDatePayData,
	getDatePayData_success
} = createHttpAction('getDatePayData', Interface.getDatePayData, {
	method: 'get',
	ignoreToast: true
});

export const {
	getDatePaySearchItem,
	getDatePaySearchItem_success
} = createHttpAction('getDatePaySearchItem', Interface.getDatePaySearchItem, {
	method: 'get',
	ignoreToast: true
});

export const {
	getDatePayDetail,
	getDatePayDetail_success
} = createHttpAction('getDatePayDetail', Interface.getDatePayDetail, {
	method: 'get',
	ignoreToast: true
});

export const {
	getDatePayExport,
	getDatePayExport_success
} = createHttpAction('getDatePayExport', Interface.getDatePayExport, {
	method: 'get',
	ignoreToast: true
});

export const {
	postDatePayEdit,
	postDatePayEdit_success
} = createHttpAction('postDatePayEdit', Interface.postDatePayEdit, {
	method: 'post',
	ignoreToast: true
});

export const {
	postDatePaySuccess,
	postDatePaySuccess_success
} = createHttpAction('postDatePaySuccess', Interface.postDatePaySuccess, {
	method: 'post',
	ignoreToast: true
});

export const {
	postDatePayFail,
	postDatePayFail_success
} = createHttpAction('postDatePayFail', Interface.postDatePayFail, {
	method: 'post',
	ignoreToast: true
});

export const {
	postDatePayBackout,
	postDatePayBackout_success
} = createHttpAction('postDatePayBackout', Interface.postDatePayBackout, {
	method: 'post',
	ignoreToast: true
});
//三方订单明细
export const {
	getDealOrderData,
	getDealOrderData_success
} = createHttpAction('getDealOrderData', Interface.getDealOrderData, {
	method: 'get',
	ignoreToast: true
});

export const {
	getDealOrderSearchItem,
	getDealOrderSearchItem_success
} = createHttpAction('getDealOrderSearchItem', Interface.getDealOrderSearchItem, {
	method: 'get',
	ignoreToast: true
});

export const {
	getDealOrderExport,
	getDealOrderExport_success
} = createHttpAction('getDealOrderExport', Interface.getDealOrderExport, {
	method: 'get',
	ignoreToast: true
});


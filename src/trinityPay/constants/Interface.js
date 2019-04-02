export default {
	//预付款
	getPrePayData: '/trinity/publicPaymentSlip/list',
	getPrePayExport: '/finance/advance/paymentSlip/export',
	getPrimaryAccount: '/trinity/publicPaymentSlip/getUserByName',
	//周期付款
	getDatePayData: '/trinity/publicPaymentSlip/list',
	getDatePayExport: '/finance/periodic/paymentSlip/export',
	//公共操作方法
	getPaySearchItem: '/trinity/publicPaymentSlip/searchItem',
	getAgentListByCPId: '/trinity/publicPaymentSlip/getAgentListByCPId',
	getPayDetail: '/trinity/publicPaymentSlip/info',
	postPayEdit: '/trinity/publicPaymentSlip/edit',
	postPaySuccess: '/trinity/publicPaymentSlip/paySuccess',
	postPayFail: '/trinity/publicPaymentSlip/payFail',
	postPayRevoke: '/trinity/publicPaymentSlip/paymentRevoke',
	//三方订单明细
	getDealOrderData: '/trinity/publicOrderTrade/list',
	getDealOrderSearchItem: '/trinity/publicPaymentSlip/searchItem',
	getDealOrderExport: '/finance/periodic/paymentSlip/orderExport',
}

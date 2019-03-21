export default {
	//预付款
	getPrePayData: '/finance/advance/paymentSlip/list',
	getPrePaySearchItem: '/finance/advance/paymentSlip/searchItem',
	getPrePayDetail: '/finance/advance/paymentSlip/info',
	getPrePayExport: '/finance/advance/paymentSlip/export',
	postPrePayEdit: '/finance/advance/paymentSlip/edit',
	postPrePaySuccess: '/finance/advance/paymentSlip/paymentSuccess',
	postPrePayFail: '/finance/advance/paymentSlip/paymentFail',
	postPrePayBackout: '/finance/advance/paymentSlip/paymentBackout',
	getPrimaryAccount: '/finance/advance/paymentSlip/primaryAccount',
	//周期付款
	getDatePayData: '/finance/periodic/paymentSlip/list',
	getDatePaySearchItem: '/finance/periodic/paymentSlip/searchItem',
	getDatePayDetail: '/finance/periodic/paymentSlip/info',
	getDatePayExport: '/finance/periodic/paymentSlip/export',
	postDatePayEdit: '/finance/periodic/paymentSlip/edit',
	postDatePaySuccess: '/finance/periodic/paymentSlip/paymentSuccess',
	postDatePayFail: '/finance/periodic/paymentSlip/paymentFail',
	postDatePayBackout: '/finance/periodic/paymentSlip/paymentBackout',
	//三方订单明细
	getDealOrderData: '/finance/periodic/paymentSlip/orderList',
	getDealOrderSearchItem: '/finance/periodic/paymentSlip/orderSearchItem',
	getDealOrderExport: '/finance/periodic/paymentSlip/orderExport',
	//getToken
	getPayToken: '/toolbox-gateway/file/v1/getToken',
}

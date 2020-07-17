export default {
	getCompensateAuthorizations: '/rbac/getAuthorizations',
	getReparationSaleList: '/finance/reparation/saleList',
	getReparationStatus: '/finance/reparation/status',
	getReparationInfo: '/finance/reparation/info',
	postReparationComplete: '/finance/reparation/complete',
	postReparationRefuse: '/finance/reparation/refuse',
	//关联发票
	getRelatedInvoiceData: '/trinity/publicInvoiceRelation/associatedList',
	getAvailableInvoiceData: '/trinity/publicInvoiceRelation/availableList',
	postDeleteInvoiceRelate: '/trinity/publicInvoiceRelation/delRelation',
	postAddRelation: '/trinity/publicInvoiceRelation/addRelation',
	//三方平台发票管理
	getTrinityInvoiceData: '/trinity/publicInvoice/list',
	postTrinityInvoiceAdd: '/trinity/publicInvoice/add',
	postTrinityInvoiceEdit: '/trinity/publicInvoice/edit',
	postTrinityInvoiceDel: '/trinity/publicInvoice/del',
	postTrinityInvoiceExport: '/trinity/publicInvoice/export',
	//公共
	getTrinityInvoiceSearchItem: '/trinity/publicInvoice/searchItem',
	getTrinityInvoiceExport: '/trinity/publicInvoice/export',

	getUserInvoiceSearch: '/finance/invoice/balance/userInvoiceSearch',//主账号发票列表
	getTrinityInvoiceSearch: '/finance/invoice/balance/trinityInvoiceSearch',//三方发票列表
	exportInvoice: '/finance/invoice/balance/export',//导出查询的发票数据
	ownerAdminListInvoice: '/finance/invoice/balance/ownerAdminList',//媒介经理联想搜索
	userIdentityNameList: '/finance/invoice/balance/userIdentityNameList',//主账号联想搜索
	beneficiaryCompanyList: '/finance/invoice/balance/beneficiaryCompanyList',//发票开具方联想搜索
	userInvoiceSearchAgg: '/finance/invoice/balance/userInvoiceSearchAgg',//主账号发票列表统计数据
	trinityInvoiceSearchAgg: '/finance/invoice/balance/trinityInvoiceSearchAgg',//三方发票列表统计数据

	//发票查询
	getInvoiceQueryMetaData: '/finance/invoice/invoice/metadata',//发票查询条件options
	getInvoiceQueryCompanyId: '/finance/commonApi/getCompanyIndistinct',//发票查询条件公司简称
	getInvoiceQueryInvoiceTitle: '/finance/invoice/application/invoiceTitleList',//发票查询条件发票抬头
	getInvoiceQueryStatistics: '/finance/invoice/invoice/listStat',//发票查询列表统计数据
	getInvoiceQueryList: '/finance/invoice/invoice/list',//发票查询列表
	getInvoiceQueryOffline: '/finance/invoice/invoice/operate',//发票查询列表线下使用操作
}

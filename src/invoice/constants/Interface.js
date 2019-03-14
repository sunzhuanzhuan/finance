export default {
	getCompensateAuthorizations: '/rbac/getAuthorizations',
	getReparationSaleList: '/finance/reparation/saleList',
	getReparationStatus: '/finance/reparation/status',
	getReparationInfo: '/finance/reparation/info',
	postReparationComplete: '/finance/reparation/complete',
	postReparationRefuse: '/finance/reparation/refuse',
	//关联发票
	getRelatedInvoiceData: '/finance/invoice/relation/list',
	getRelatedInvoiceSearchItem: '/finance/invoice/relation/searchItem',
	postRelatedInvoiceRelate: '/finance/invoice/relation/relate',
	//三方平台发票管理
	getTrinityInvoiceSearchItem: '/finance/invoice/searchItem',
	getTrinityInvoiceData: '/finance/invoice/list',
	postTrinityInvoiceAdd: '/finance/invoice/add',
	postTrinityInvoiceEdit: '/finance/invoice/edit',
	postTrinityInvoiceDel: '/finance/invoice/del',
	postTrinityInvoiceReset: '/finance/invoice/reset'
}

export default {
	/* 公司详情 */
	getCompanyMetadata: '/finance/warehouse/metadata',
	getCompanyData: '/finance/commonApi/getCompanyCommonData',
	getCompanyDetail: '/finance/account/detail',
	getBillings: '/finance/account/billing',
	getBillDetail: '/finance/account/billDetail',
	getReadjustPriceAccount: '/finance/readjust/readjustPriceAccount',
	getReadjustPriceAccountBill: '/finance/readjust/readjustPriceAccountBill',
	getGiftAccount: '/finance/account/gitAndReparationAccount',
	getGoldenAccount: '/finance/warehouse/getWarehouseList',
	getGoldenFlow: '/finance/warehouse/getWarehouseBillList',
	getFreezeDetail: 'finance/account/freezeDetail',
	getReceivableDetail: '/finance/receivables/debt/detail',
	getCompanyReceivableList: '/finance/receivables/debt/billList',
	getReceivableOption: '/finance/receivables/verification/searchItem',
	/* 调价 */
	getCompanyDetailAuthorizations: '/rbac/getAuthorizations',
	getGoldenMetadata: '/finance/readjust/metadata',
	getProject: '/finance/commonApi/getProject',
	getPlatform: '/finance/readjust/platform',
	getGoldenToken: '/finance/readjust/upload',
	getRequirement: '/finance/commonApi/getRequirement',
	getApplicationList: '/finance/readjust/applicationList',
	getApplyOrderList: '/finance/readjust/applyOrderList',
	postApplyReadjust: '/finance/readjust/applyReadjustPrice',
	postPassByOrderIds: '/finance/readjust/passByOrderIds',
	postPassByReadjust: '/finance/readjust/passByReadjustId',
	getApplicationDetail: '/finance/readjust/applicationOrderDetail',
	postPreviewMinSellPrice: '/finance/readjust/previewMinSellPrice',
	postRejectByReadjustId: '/finance/readjust/rejectByReadjustId',
	postRejectByOrderIds: '/finance/readjust/rejectByOrderIds',
	getExport: '/finance/readjust/export',
	getGoldenUserList: '/finance/invoice/application/createUserList',
	getGoldenCompanyId: '/finance/commonApi/getCompanyIndistinct',
	postImportApplication: '/finance/readjust/importOperateApplication',
	getPlatformListIcon: '/operator-gateway/common/v1/platformList',
}

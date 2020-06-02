
import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//主账号发票列表
export const {
	getUserInvoiceSearch,
	getUserInvoiceSearch_success
} = createHttpAction('getUserInvoiceSearch', Interface.getUserInvoiceSearch);
//三方发票列表
export const {
	getTrinityInvoiceSearch,
	getTrinityInvoiceSearch_success
} = createHttpAction('getTrinityInvoiceSearch', Interface.getTrinityInvoiceSearch);
//导出查询的发票数据
export const {
	exportInvoice,
	exportInvoice_success
} = createHttpAction('exportInvoice', Interface.exportInvoice);
//媒介经理联想搜索
export const {
	ownerAdminListInvoice,
	ownerAdminListInvoice_success
} = createHttpAction('ownerAdminListInvoice', Interface.ownerAdminListInvoice);
//主账号联想搜索
export const {
	userIdentityNameList,
	userIdentityNameList_success
} = createHttpAction('userIdentityNameList', Interface.userIdentityNameList);
//发票开具方联想搜索
export const {
	beneficiaryCompanyList,
	beneficiaryCompanyList_success
} = createHttpAction('beneficiaryCompanyList', Interface.beneficiaryCompanyList);
//主账号发票列表统计数据
export const {
	userInvoiceSearchAgg,
	userInvoiceSearchAgg_success
} = createHttpAction('userInvoiceSearchAgg', Interface.userInvoiceSearchAgg);
//三方发票列表统计数据
export const {
	trinityInvoiceSearchAgg,
	trinityInvoiceSearchAgg_success
} = createHttpAction('trinityInvoiceSearchAgg', Interface.trinityInvoiceSearchAgg);

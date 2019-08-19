import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

// 应收款查询列表
export const {
	getReceivableList,
	getReceivableList_success
} = createHttpAction('getReceivableList', Interface.getReceivableList, {
	method: 'get'
});

// 应收款查询筛选项
export const {
	getReceSearchOptions,
	getReceSearchOptions_success
} = createHttpAction('getReceSearchOptions', Interface.getReceSearchOptions, {
	method: 'get'
});
//----------------------------应收款详情------------------------
// 预约订单应收款查询
export const {
	getReservationList,
	getReservationList_success
} = createHttpAction('getReservationList', Interface.getReservationList, {
	method: 'get'
});

// 微闪投应收款查询
export const {
	getCampaignList,
	getCampaignList_success
} = createHttpAction('getCampaignList', Interface.getCampaignList, {
	method: 'get'
});

// 拓展业务应收款查询
export const {
	getExtendBusinessList,
	getExtendBusinessList_success
} = createHttpAction('getExtendBusinessList', Interface.getExtendBusinessList, {
	method: 'get'
});
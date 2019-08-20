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
	reservationList,
	reservationList_success
} = createHttpAction('reservationList', Interface.getReservationList, {
	method: 'get'
});

// 微闪投应收款查询
export const {
	campaignList,
	campaignList_success
} = createHttpAction('campaignList', Interface.getCampaignList, {
	method: 'get'
});

// 拓展业务应收款查询
export const {
	extendBusinessList,
	extendBusinessList_success
} = createHttpAction('extendBusinessList', Interface.getExtendBusinessList, {
	method: 'get'
});
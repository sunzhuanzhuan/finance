import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//核销列表
export const {
	getReceivableOffList,
	getReceivableOffList_success
} = createHttpAction('getReceivableOffList', Interface.getReceivableOffList, {
	method: 'get'
});

//修改核销
export const {
	editReceOffItem,
	editReceOffItem_success
} = createHttpAction('editReceOffItem', Interface.editReceOffItem, {
	method: 'post'
});

//核销筛选项
export const {
	getReceMetaData,
	getReceMetaData_success
} = createHttpAction('getReceMetaData', Interface.getReceMetaData, {
	method: 'get'
});

//销售
export const {
	getSalerData,
	getSalerData_success
} = createHttpAction('getSalerData', Interface.getSalerData, {
	method: 'get'
});

//所属项目 核销订单明细页面
export const {
	getProjectData,
	getProjectData_success
} = createHttpAction('getProjectData', Interface.getProjectData, {
	method: 'get'
});

//品牌列表
export const {
	getBrandData,
	getBrandData_success
} = createHttpAction('getBrandData', Interface.getBrandData, {
	method: 'get'
});

//新增核销 根据厂商ID获取厂商详细信息（销售/区域）
export const {
	getCompanyInfo,
	getCompanyInfo_success
} = createHttpAction('getCompanyInfo', Interface.getCompanyInfo, {
	method: 'get'
});

//新增核销 根据账号名称获取账号id信息
export const {
	getAccountInfo,
	getAccountInfo_success
} = createHttpAction('getAccountInfo', Interface.getAccountInfo, {
	method: 'get'
});

//获取核销详情
export const {
	getOffItemInfo,
	getOffItemInfo_success
} = createHttpAction('getOffItemInfo', Interface.getOffItemInfo, {
	method: 'get'
});

//获取赠送帐户余额
export const {
	getGiftAmount,
	getGiftAmount_success
} = createHttpAction('getGiftAmount', Interface.getGiftAmount, {
	method: 'get'
});

//获取小金库帐户余额
export const {
	getWarehouseAmount,
	getWarehouseAmount_success
} = createHttpAction('getWarehouseAmount', Interface.getWarehouseAmount, {
	method: 'get'
});

//获取需求名称（不需要厂商ID）
export const {
	getRequirementWithoutId,
	getRequirementWithoutId_success
} = createHttpAction('getRequirementWithoutId', Interface.getRequirementWithoutId, {
	method: 'get'
});

//获取区域
export const {
	getRegionTeamName,
	getRegionTeamName_success
} = createHttpAction('getRegionTeamName', Interface.getRegionTeamName, {
	method: 'get'
});

//获取活动类型
export const {
	getBusinessType,
	getBusinessType_success
} = createHttpAction('getBusinessType', Interface.getBusinessType, {
	method: 'get'
});
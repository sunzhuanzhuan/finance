import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//销售选择接口
export const {
	getCreditQuerySalerData,
	getCreditQuerySalerData_success
} = createHttpAction('getCreditQuerySalerData', Interface.getCreditQuerySalerData, {
	method: 'get'
});

//公司全称查询接口
export const {
	getCompanyFullNameSelectData,
	getCompanyFullNameSelectData_success
} = createHttpAction('getCompanyFullNameSelectData', Interface.getCompanyFullNameSelectData, {
	method: 'get'
});

//PO查询接口
export const {
	getPoListSelectData,
	getPoListSelectData_success
} = createHttpAction('getPoListSelectData', Interface.getPoListSelectData, {
	method: 'get'
});

//区域查询接口
export const {
	getCreditQueryRegionList,
	getCreditQueryRegionList_success
} = createHttpAction('getCreditQueryRegionList', Interface.getCreditQueryRegionList, {
	method: 'get'
});


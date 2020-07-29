import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//导出查询接口
export const {
	getCreditExportInfo,
} = createHttpAction('getCreditExportInfo', Interface.getCreditExportInfo, {
	method: 'get',
	ignoreToast: true
});

//销售选择接口
export const {
	getCreditQuerySalerData,
	getCreditQuerySalerData_success
} = createHttpAction('getCreditQuerySalerData', Interface.getCreditQuerySalerData, {
	method: 'get'
});

//公司全称查询接口
export const {
	getCompanyFullNameSelectData
} = createHttpAction('getCompanyFullNameSelectData', Interface.getCompanyFullNameSelectData, {
	method: 'get'
});

//PO查询接口
export const {
	getPoListSelectData,
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


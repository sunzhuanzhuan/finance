import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//获取搜索条件选择项
export const {
	getCreditQueryOptions,
	getCreditQueryOptions_success
} = createHttpAction('getCreditQueryOptions', Interface.getCreditQueryOptions, {
	method: 'get'
});

//销售选择接口
export const {
	getCreditQuerySalerData,
	getCreditQuerySalerData_success
} = createHttpAction('getCreditQuerySalerData', Interface.getCreditQuerySalerData, {
	method: 'get'
});


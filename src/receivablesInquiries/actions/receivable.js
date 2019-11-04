import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

// 应收款查询列表
export const {
	getReceivableList,
	getReceivableList_success
} = createHttpAction('getReceivableList', Interface.getReceivableList, {
	method: 'get'
});

// 应收款查询列表导出
export const {
	getReceExportInfo,
	getReceExportInfo_success
} = createHttpAction('getReceExportInfo', Interface.getReceExportInfo, {
	method: 'get'
});

// 应收款查询销售搜索接口
export const {
	getReceSaleList,
	getReceSaleList_success
} = createHttpAction('getReceSaleList', Interface.getReceSaleList, {
	method: 'get'
});

//----------------------------应收款详情------------------------
// 获取执行人列表
export const {
	getExecutorList,
	getExecutorList_success
} = createHttpAction('getExecutorList', Interface.getExecutorList, {
	method: 'get'
});

// 应收款详情导出信息查询
export const {
	getReceDetailExportInfo,
	getReceDetailExportInfo_success
} = createHttpAction('getReceDetailExportInfo', Interface.getReceDetailExportInfo, {
	method: 'get'
});
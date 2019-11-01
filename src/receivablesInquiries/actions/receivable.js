import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

// 应收款查询列表
export const {
	getReceivableList,
	getReceivableList_success
} = createHttpAction('getReceivableList', Interface.getReceivableList, {
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

// 应收款列表导出信息查询
export const {
	getReceListExportInfo,
	getReceListExportInfo_success
} = createHttpAction('getReceListExportInfo', Interface.getReceListExportInfo, {
	method: 'get'
});

// 应收款详情导出信息查询
export const {
	getReceDetailExportInfo,
	getReceDetailExportInfo_success
} = createHttpAction('getReceDetailExportInfo', Interface.getReceDetailExportInfo, {
	method: 'get'
});
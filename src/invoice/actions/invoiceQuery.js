
import Interface from '../constants/Interface';
import { createHttpAction } from 'redux-action-extend';

//发票查询条件options
export const {
	getInvoiceQueryMetaData,
	getInvoiceQueryMetaData_success
} = createHttpAction('getInvoiceQueryMetaData', Interface.getInvoiceQueryMetaData, {
	method: 'get'
});

//发票查询条件发票抬头
export const {
	getInvoiceQueryInvoiceTitle,
	getInvoiceQueryInvoiceTitle_success
} = createHttpAction('getInvoiceQueryInvoiceTitle', Interface.getInvoiceQueryInvoiceTitle, {
	method: 'get'
});

//发票查询列表统计数据
export const {
	getInvoiceQueryStatistics,
	getInvoiceQueryStatistics_success
} = createHttpAction('getInvoiceQueryStatistics', Interface.getInvoiceQueryStatistics, {
	method: 'get'
});

//发票查询列表
export const {
	getInvoiceQueryList,
	getInvoiceQueryList_success
} = createHttpAction('getInvoiceQueryList', Interface.getInvoiceQueryList, {
	method: 'get'
});

//发票查询列表线下使用操作
export const {
	getInvoiceQueryOperate,
	getInvoiceQueryOperate_success
} = createHttpAction('getInvoiceQueryOperate', Interface.getInvoiceQueryOperate, {
	method: 'post'
});

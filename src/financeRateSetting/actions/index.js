import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//获取策略列表
export const {
	getFinanceRateList,
	getFinanceRateList_success
} = createHttpAction('getFinanceRateList', Interface.getFinanceRateList, {
	method: 'get'
});

//添加策略
export const {
	addFinanceRate,
	addFinanceRate_success
} = createHttpAction('addFinanceRate', Interface.addFinanceRate, {
	method: 'post'
});

//修改策略
export const {
	editFinanceRate,
	editFinanceRate_success
} = createHttpAction('editFinanceRate', Interface.editFinanceRate, {
	method: 'post'
});

//策略已绑定账号列表 
export const {
	getProfitStrategyAccountList,
	getProfitStrategyAccountList_success
} = createHttpAction('getProfitStrategyAccountList', Interface.getProfitStrategyAccountList_success, {
	method: 'post'
});

//获取添加账号页面列表 
export const {
	getAccountListToBind,
	getAccountListToBind_success
} = createHttpAction('getAccountListToBind', Interface.getAccountListToBind, {
	method: 'post'
});

//账号名称查询接口
export const {
	getAccountListInfo,
	getAccountListInfo_success
} = createHttpAction('getAccountListInfo', Interface.getAccountListInfo, {
	method: 'post'
});

//主账号名称查询接口
export const {
	getMainAccountListInfo,
	getMainAccountListInfo_success
} = createHttpAction('getMainAccountListInfo', Interface.getMainAccountListInfo, {
	method: 'post'
});

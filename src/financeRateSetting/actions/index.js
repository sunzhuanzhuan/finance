import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//获取策略列表
export const {
	getFinanceRateList,
	getFinanceRateList_success
} = createHttpAction('getFinanceRateList', Interface.getFinanceRateList, {
	method: 'post'
});

//添加/编辑策略
export const {
	saveFinanceRate,
	saveFinanceRate_success
} = createHttpAction('saveFinanceRate', Interface.saveFinanceRate, {
	method: 'post'
});

//是否可删除策略（策略下是否有账号）
export const {
	isProfitStrategyHasAccounts,
	isProfitStrategyHasAccounts_success
} = createHttpAction('isProfitStrategyHasAccounts', Interface.isProfitStrategyHasAccounts, {
	method: 'get'
});

//删除策略
export const {
	delProfitStrategy,
	delProfitStrategy_success
} = createHttpAction('delProfitStrategy', Interface.delProfitStrategy, {
	method: 'post'
});

//策略已绑定账号列表 
export const {
	getProfitStrategyAccountList,
	getProfitStrategyAccountList_success
} = createHttpAction('getProfitStrategyAccountList', Interface.getProfitStrategyAccountList, {
	method: 'get'
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
	method: 'get'
});

//主账号名称查询接口
export const {
	getMainAccountListInfo,
	getMainAccountListInfo_success
} = createHttpAction('getMainAccountListInfo', Interface.getMainAccountListInfo, {
	method: 'get'
});

//策略下绑定账号
export const {
	bindProfitStrategyAccount,
	bindProfitStrategyAccount_success
} = createHttpAction('bindProfitStrategyAccount', Interface.bindProfitStrategyAccount, {
	method: 'post'
});

//删除策略下账号
export const {
	deleteProfitStrategyAccount,
	deleteProfitStrategyAccount_success
} = createHttpAction('deleteProfitStrategyAccount', Interface.deleteProfitStrategyAccount, {
	method: 'post'
});

//清空策略下账号
export const {
	clearProfitStrategyAccount,
	clearProfitStrategyAccount_success
} = createHttpAction('clearProfitStrategyAccount', Interface.clearProfitStrategyAccount, {
	method: 'post'
});
export default {
	getFinanceRateList: '/operator-gateway/profit/v1/queryStrategyList',
	saveFinanceRate: '/operator-gateway/profit/v1/saveOrUpdateStrategy',
	isProfitStrategyHasAccounts: '/operator-gateway/profit/v1/queryAccountNumByStrategyId',
	delProfitStrategy: '/operator-gateway/profit/v1/delStrategyInfoByStrategyId',
	getAccountListToBind: '/operator-gateway/profit/v1/queryAccountListForBind',
	getProfitStrategyAccountList: '/operator-gateway/profit/v1/getAccountByProfitStrategy',
	getAccountListInfo: '/operator-gateway/account/v1/likeBySnsName',
	getMainAccountListInfo: '/operator-gateway/mcn/v1/likeMcnByIdentityName',
	bindProfitStrategyAccount: '/operator-gateway/profit/v1/bindAccount',
	deleteProfitStrategyAccount: '/operator-gateway/profit/v1/unbindAccount',
	clearProfitStrategyAccount: '/operator-gateway/profit/v1/clearAccount',

}

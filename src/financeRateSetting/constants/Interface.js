export default {
	getFinanceRateList: '/operator-gateway/profit/v1/queryStrategyList',
	addFinanceRate: '/operator-gateway/profit/v1/saveOrUpdateStrategy',
	isProfitStrategyHasAccounts: '/operator-gateway/profit/v1/queryAccountNumByStrategyId',
	delProfitStrategy: '/operator-gateway/profit/v1/delStrategyInfoByStrategyId',
	getAccountListToBind: '/operator-gateway/profit/v1/queryAccountListForBind',
	getProfitStrategyAccountList: '/operator-gateway/profit/v1/getAccountByProfitStrategy',
	getAccountListInfo: '/operator-gateway/account/v1/likeBySnsName',
	getMainAccountListInfo: '/operator-gateway/mcn/v1/likeMcnByIdentityName',
	deleteProfitStrategyAccount: '',

}

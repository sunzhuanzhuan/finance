import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
//预付款
export const {
	postTrinityProfitRateAll,
	postTrinityProfitRateAll_success
} = createHttpAction('postTrinityProfitRateAll', Interface.postTrinityProfitRateAll, {
	method: 'post'
});

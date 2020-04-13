import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getFinanceRateList_success,
	getAccountListToBind_success,
	clearAccountListToBind,
	getProfitStrategyAccountList_success
} from '../actions';

export const rateListInfo = handleActions({
	[getFinanceRateList_success]: (_, action) => {
		return {...action.payload.data}
	}
}, {})

export const unBindAccountListInfo = handleActions({
	[getAccountListToBind_success]: (_, action) => {
		return {...action.payload.data}
	}, 
	[clearAccountListToBind]: () => {
		return {}
	}
}, {});

export const profitStrategyAccountInfo = handleActions({
	[getProfitStrategyAccountList_success]: (_, action) => {
		return {...action.payload.data}
	}
}, {});


export default combineReducers({
	rateListInfo, 
	unBindAccountListInfo,
	profitStrategyAccountInfo
})


import api from "../../api/index";
import { GET_ACCOUNT_DETAIL,SEARCH_ITEM } from "../constants/ActionType";
// import Interface from '../constants/Interface';
import { createHttpAction } from 'redux-action-extend';
//获取账务详情
export const getAccountDetail = () => dispatch => {
	return api.get('/finance/order/accountDetail').then(response => {
		const { data } = response;
		dispatch({
			type: GET_ACCOUNT_DETAIL,
			payload: data
		});

	})
}
//获取账务详情
export const getSearchDetail = () => dispatch => {
	return api.get('/finance/order/searchItem').then(response => {
		const { data } = response;
		dispatch({
			type: SEARCH_ITEM,
			payload: data
		});

	})
}
export const {
	getAccountList,
	getAccountList_success
} = createHttpAction('getAccountList', '/finance/order/accountList', {
  method: 'get',
});

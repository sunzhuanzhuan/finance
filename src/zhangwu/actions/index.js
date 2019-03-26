
import api from "../../api/index";
import { GET_ACCOUNT_DETAIL,GET_ACCOUNT_LIST } from "../constants/ActionType";
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
// export const getAccountList = () => dispatch => {
// 	return api.get('/finance/order/accountList').then(response => {
// 		const { data } = response;
// 		dispatch({
// 			type: GET_ACCOUNT_LIST,
// 			payload: data
// 		});

// 	})
// }
export const {
	getAccountList,
	getAccountList_success
} = createHttpAction('getAccountList', '/finance/order/accountList', {
  method: 'get',
});

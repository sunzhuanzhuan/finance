
import api from "../../api/index";
import {GET_ACCOUNT_DETAIL} from "../constants/ActionType";

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

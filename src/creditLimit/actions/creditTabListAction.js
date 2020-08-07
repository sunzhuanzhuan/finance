import Interface from '../constants/Interface'
import api from '../../api/index';
import qs from 'qs';
const GET_CREDIT_LIST = 'GET_CREDIT_LIST';
const CLEAR_CREDIT_MESSAGE = 'CLEAR_CREDIT_MESSAGE';
// 获取核销单详情各方列表
export function getCrediLimitListInfo(params = {}) {
	const { productLine } = params;

	return dispatch => {
		return api.get(`${Interface.getCrediLimitListInfo}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_CREDIT_LIST,
				listData: result.data,
				key: productLine,
			})
		})
		.catch( ({errorMsg}) => {
			dispatch({
				type: GET_CREDIT_LIST,
				key: productLine,
				errorMsg
			})
		});
	}
}

export function clearCreditLimitMessage() {
	return dispatch => {
		dispatch({
			type: CLEAR_CREDIT_MESSAGE
		})
	}
}

export default function creditLimitListInfo(state = {}, action) {
	const { listData, key, type, errorMsg } = action;
    switch (type) {
        case GET_CREDIT_LIST:
			return { ...state, [`creditTab-${key}`]: listData, errorMsg, updateKey: +new Date() + Math.random()};
		case CLEAR_CREDIT_MESSAGE:
			return { ...state, errorMsg: '' };
        default:
            return state;
    }
}
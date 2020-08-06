import Interface from '../constants/Interface'
import api from '../../api/index';
import qs from 'qs';
const GET_CREDIT_LIST = 'GET_CREDIT_LIST';
// 获取核销单详情各方列表
export function getCrediLimitListInfo(params = {}) {
	const { productLine } = params;

	return dispatch => {
		return api.get(`${Interface.getCrediLimitListInfo}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_CREDIT_LIST,
				listData: result.data,
				key: productLine
			})
		})
		.catch( () => {
			dispatch({
				type: GET_CREDIT_LIST,
				listData: {},
				key: productLine
			})
		});
	}
}

export default function creditLimitListInfo(state = {}, action) {
	const { listData, key, type } = action;
    switch (type) {
        case GET_CREDIT_LIST:
			return { ...state, [`creditTab-${key}`]: listData, updateKey: +new Date() + Math.random()};
        default:
            return state;
    }
}
import Interface from '../constants/Interface'
import api from '../../api/index';
import qs from 'qs';
const GET_RECE_LIST = 'GET_RECE_LIST';
const CLEAR_RECE_LIST = 'CLEAR_RECE_LIST';
// 获取核销单详情各方列表
export function getReceDetailList(params = {}) {
	const { product_line } = params;

	return dispatch => {
		return api.get(`${Interface.getReceDetailList}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_RECE_LIST,
				listData: result.data,
				key: product_line
			})
		})
		.catch( () => {
			dispatch({
				type: GET_RECE_LIST,
				listData: {},
				key: product_line
			})
		});
	}
}

export function clearReceDetailList() {
	return dispatch => {
		dispatch({
			type: CLEAR_RECE_LIST,
		})
	}
}

export default function receListReducer(state = {}, action) {
	const { listData, key, type } = action;
    switch (type) {
        case GET_RECE_LIST:
			return { ...state, [`receDetail-${key}`]: listData, updateKey: +new Date() + Math.random()};
		case CLEAR_RECE_LIST:
			return { 
				...state, 
				'receDetail-3': {}, 
				'receDetail-2': {}, 
				'receDetail-7': {}, 
				updateKey: +new Date() + Math.random()
			};
        default:
            return state;
    }
}
import Interface from '../constants/Interface'
import api from '../../api/index';
import qs from 'qs';
const GET_RECE_ADD_LIST = 'GET_RECE_ADD_LIST';
const GET_RECE_DETAIL_LIST = 'GET_RECE_DETAIL_LIST';
const CLEAR_RECE_LIST = 'CLEAR_RECE_LIST';
const ADD_RECE_OFF_ITEM = 'ADD_RECE_OFF_ITEM';
// 获取核销单详情各方列表
export function getReceOffDetailList(params = {}) {
	const { product_line } = params;

	return dispatch => {
		return api.get(`${Interface.getReceOffDetailList}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_RECE_DETAIL_LIST,
				listData: result.data,
				key: product_line
			})
		})
		.catch( () => {
			dispatch({
				type: GET_RECE_DETAIL_LIST,
				listData: {},
				key: product_line
			})
		});
	}
}
// 获取添加核销申请各方列表
export function getReceAddList(params = {}) {
	const { product_line } = params;

	return dispatch => {
		return api.get(`${Interface.getReceAddOffList}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_RECE_ADD_LIST,
				listData: result.data,
				key: product_line
			})
		})
		.catch( () => {
			dispatch({
				type: GET_RECE_ADD_LIST,
				listData: {},
				key: product_line
			})
		});
	}
}

export function clearReceList() {
	return dispatch => {
		dispatch({
			type: CLEAR_RECE_LIST,
		})
	}
}

// 添加核销
export function addReceOffItem(newInfo = {}, key) {

	return dispatch => {
		return api.post(Interface.addReceOffItem, newInfo)
		.then(() => {
			dispatch({
				type: ADD_RECE_OFF_ITEM,
				newInfo,
				key
			})
		})
	}
}

export default function receAddReducer(state = {}, action) {
	const { listData, key, type } = action;
    switch (type) {
        case GET_RECE_DETAIL_LIST:
			return { ...state, [`receDetailInfo-${key}`]: listData, updateKey: +new Date() + Math.random()};
		case GET_RECE_ADD_LIST:
			return { 
				...state, 
				[`receAddInfo-${key}`]: listData, 
				updateKey: +new Date() + Math.random()
			};
		case CLEAR_RECE_LIST:
			return { 
				...state, 
				// 'receAddInfo-3': {}, 
				// 'receAddInfo-2': {}, 
				// 'receAddInfo-7': {}, 
				'receDetailInfo-3': {}, 
				'receDetailInfo-2': {}, 
				'receDetailInfo-7': {}, 
				updateKey: +new Date() + Math.random()
			};
		case ADD_RECE_OFF_ITEM: 
			return {
				...state
			};
        default:
            return state;
    }
}
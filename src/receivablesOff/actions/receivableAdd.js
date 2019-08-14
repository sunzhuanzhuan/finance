import Interface from '../constants/Interface'
import api from '../../api/index';
import qs from 'qs';
const GET_PROGRESS = 'GET_PROGRESS';
const GET_RECE_ADD_LIST = 'GET_RECE_ADD_LIST';
const CLEAR_RECE_ADD_LIST = 'CLEAR_RECE_ADD_LIST';
export function getReceAddList(params = {}) {
	const { key } = params;

	return dispatch => {
		dispatch({type: GET_PROGRESS, progress: 1, errorMsg: ''});
		return api.get(`${Interface.getReceAddOffList}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_RECE_ADD_LIST,
				listData: result.data,
				key,
				progress: 2,
				errorMsg: ''
			})
		})
		.catch( ({ errorMsg }) => {
			dispatch({
				type: GET_RECE_ADD_LIST,
				listData: {},
				key,
				progress: 3,
				errorMsg
			})
		});
	}
}

export function clearReceAddList() {
	return dispatch => {
		dispatch({
			type: CLEAR_RECE_ADD_LIST,
		})
	}
}

export default function receAddReducer(state = {}, action) {
    const { listData, key, progress, errorMsg } = action;
    switch (action.type) {
		case GET_PROGRESS:
			return { ...state, progress, errorMsg }
        case GET_RECE_ADD_LIST:
			return { ...state, [`receAddInfo-${key}`]: listData, progress, errorMsg, updateKey: +new Date() + Math.random()};
		case CLEAR_RECE_ADD_LIST:
			return { 
				...state, 
				'receAddInfo-yuyueyuyue': {}, 
				'receAddInfo-weishantou': {}, 
				'receAddInfo-tuozhanyewu': {}, 
				updateKey: +new Date() + Math.random()
			};
        default:
            return state;
    }
}


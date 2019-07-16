import Interface from '../constants/Interface'
import api from '../../api/index';
import qs from 'qs';
const GET_ALL_LIST = 'GET_ALL_LIST';
const GET_UNDEAL_LIST = 'GET_UNDEAL_LIST';
const GET_DEALING_LIST = 'GET_DEALING_LIST';
const GET_DEALED_LIST = 'GET_DEALED_LIST';
export function getApplyList(params = {}) {
	console.log('sldkfjlsdkjflsjkdf', params)
	const { status } = params;
	let type;
	switch(parseInt(status)) {
		case 1:
			type = GET_UNDEAL_LIST;
			break;
		case 2:
			type = GET_DEALING_LIST;
			break;
		case 3:
			type = GET_DEALED_LIST;
			break;
		default:
			type = GET_ALL_LIST;
			break
	}

	return dispatch => {
		return api.get(`${Interface.getApplicationList}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type,
				listData: result.data
			})
		})
		.catch( () => {
			dispatch({
				type,
				listData: {}
			})
		});
	}
}

export default function applyListReducer(state = {}, action) {
    const { listData } = action;
    switch (action.type) {
        case GET_ALL_LIST:
			return { ...state, allListInfo: listData, updateKey: +new Date() + Math.random()};
		case GET_UNDEAL_LIST:
			return { ...state, undealListInfo: listData, updateKey: +new Date() + Math.random()};
		case GET_DEALING_LIST:
			return { ...state, dealingListInfo: listData, updateKey: +new Date() + Math.random()};
		case GET_DEALED_LIST:
            return { ...state, dealedListInfo: listData, updateKey: +new Date() + Math.random()};
        default:
            return state;
    }
}


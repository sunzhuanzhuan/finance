import { handleActions } from 'redux-actions';
import {
	getCompleteList_success,
	getCompleteDetail_success
} from '../actions/completePercent';

export const completeData = handleActions({
	[getCompleteList_success]: (state, action) => {
		let { data } = action.payload;
		if (Object.prototype.toString.call(data.list) === '[object Array]') {
			return { ...action.payload.data, list: [] }
		}
		let list = Object.values(data.list).map((item, index) => {
			item.identifying = index + 1;
			item.actionFlag = `${item.position_name}_${item.business_name}`;
			return item
		});
		poll(list);
		return { ...action.payload.data, list }
	}
}, {})

export const completeDetail = handleActions({
	[getCompleteDetail_success]: (state, action) => {
		return { ...action.payload.data[0] }
	}
}, {})

function poll(list) {
	let key = list[0].actionFlag, cur = 0;
	list.forEach((item, index) => {
		if (index >= list.length - 1) {
			list[cur].action = index - cur + 1;
			return
		}
		if (item.actionFlag === key) return;
		list[cur].action = index - cur;
		cur = index;
		key = item.actionFlag;
		return
	})
}

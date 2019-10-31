import { handleActions } from 'redux-actions';
import {
	getReceivableList_success,
	getReceSearchOptions_success,
} from '../actions/receivable';

// 应收款查询列表
export const receivableList = handleActions({
	[getReceivableList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});

// 应收款查询筛选项option
export const receSearchOptions = handleActions({
	[getReceSearchOptions_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});


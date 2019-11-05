import { handleActions } from 'redux-actions';
import {
	getReceivableList_success,
	getExecutorList_success, 
	getReceSaleList_success
} from '../actions/receivable';

// 应收款查询列表
export const receivableList = handleActions({
	[getReceivableList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});

// 获取销售列表
export const receSalerList = handleActions({
	[getReceSaleList_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, []);

// 获取执行人列表
export const excutorList = handleActions({
	[getExecutorList_success]: (state, action) => {
		return [ ...action.payload.data ]
	}
}, []);

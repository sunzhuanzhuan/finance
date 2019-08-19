import { handleActions } from 'redux-actions';
import {
	getReceivableList_success,
	getReceSearchOptions_success,
	getReservationList_success,
	getCampaignList_success,
	getExtendBusinessList_success
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

//----------------------------应收款详情------------------------

// 预约订单应收款查询
export const reservationList = handleActions({
	[getReservationList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});

// 微闪投应收款查询
export const campaignList = handleActions({
	[getCampaignList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});

// 拓展业务应收款查询
export const extendBusinessList = handleActions({
	[getExtendBusinessList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});

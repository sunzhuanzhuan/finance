import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

//核销列表
export const {
	getReceivableOffList,
	getReceivableOffList_success
} = createHttpAction('getReceivableOffList', Interface.getReceivableOffList, {
	method: 'get'
});

//核销筛选项
export const {
	getReceMetaData,
	getReceMetaData_success
} = createHttpAction('getReceMetaData', Interface.getReceMetaData, {
	method: 'get'
});
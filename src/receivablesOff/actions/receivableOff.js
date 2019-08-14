import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getReceivableOffList,
	getReceivableOffList_success
} = createHttpAction('getReceivableOffList', Interface.getReceivableOffList, {
	method: 'get'
});

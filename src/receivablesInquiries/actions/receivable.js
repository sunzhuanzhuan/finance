import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getReceivableList,
	getReceivableList_success
} = createHttpAction('getReceivableList', Interface.getReceivableList, {
	method: 'get'
});

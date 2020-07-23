import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'


export const {
	getCrediLimitListInfo,
	getCrediLimitListInfo_success
} = createHttpAction('getCrediLimitListInfo', Interface.getReceivableAddListExportInfo, {
	method: 'get'
});
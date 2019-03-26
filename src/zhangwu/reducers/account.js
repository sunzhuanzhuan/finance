
import { GET_ACCOUNT_DETAIL ,GET_ACCOUNT_LIST} from '../constants/ActionType'
import { 
	getAccountList_success
   } from '../actions'
  import { handleActions } from 'redux-actions';

//获取账务详情
export const accountDetail = (state = {}, action) => {
    switch (action.type) {
		case GET_ACCOUNT_DETAIL:
            return action.payload;
        default:
            return state;
    }
}

//获取账务列表
// export const accountList = (state = [], action) => {
//     switch (action.type) {
// 		case getAccountList_success:
//             return action.payload;
//         default:
//             return state;
//     }
// }

//获取账号名称模糊搜索
export const accountList = handleActions({
	[getAccountList_success]: (state, action) => (action.payload.data)
}, "")

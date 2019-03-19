
import { GET_ACCOUNT_DETAIL ,GET_ACCOUNT_LIST} from '../constants/ActionType'


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
export const accountList = (state = [], action) => {
    switch (action.type) {
		case GET_ACCOUNT_LIST:
            return action.payload;
        default:
            return state;
    }
}


import { GET_ACCOUNT_DETAIL } from '../constants/ActionType'


//获取账务详情
export const accountDetail = (state = {}, action) => {
    switch (action.type) {
		case GET_ACCOUNT_DETAIL:
            return action.payload;
        default:
            return state;
    }
}

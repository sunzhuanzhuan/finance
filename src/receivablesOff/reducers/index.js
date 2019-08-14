import { combineReducers } from 'redux'
import { receivableOffList } from './receivableOff'
import receAddReducer from '../actions/receivableAdd';
export default combineReducers({
    receivableOffList, 
    receAddReducer
})




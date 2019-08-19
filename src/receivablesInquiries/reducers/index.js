import { combineReducers } from 'redux'
import { receivableList, receSearchOptions, reservationList, campaignList, extendBusinessList } from './receivable'

export default combineReducers({
    receivableList,
    receSearchOptions,
    reservationList,
    campaignList,
    extendBusinessList
})




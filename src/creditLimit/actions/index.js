import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
	getCreditQueryOptions,
	getCreditQueryOptions_success
} = createHttpAction('getCreditQueryOptions', Interface.getCreditQueryOptions, {
	method: 'get'
});
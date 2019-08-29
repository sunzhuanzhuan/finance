import Interface from '../constants/Interface'
import api from '../../api/index';
import qs from 'qs';
const GET_RECE_ADD_LIST = 'GET_RECE_ADD_LIST';
const GET_RECE_DETAIL_LIST = 'GET_RECE_DETAIL_LIST';
const CLEAR_RECE_LIST = 'CLEAR_RECE_LIST';

export function getReceOffDetailList(params = {}) {
	const { key } = params;

	return dispatch => {
		return api.get(`${Interface.getReceOffDetailList}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_RECE_DETAIL_LIST,
				listData: result.data,
				key,
			})
		})
		.catch( () => {
			dispatch({
				type: GET_RECE_DETAIL_LIST,
				listData: {},
				key,
			})
		});
	}
}
export function getReceAddList(params = {}) {
	const { key } = params;

	return dispatch => {
		return api.get(`${Interface.getReceAddOffList}?${qs.stringify(params)}`)
		.then(result => {
			dispatch({
				type: GET_RECE_ADD_LIST,
				listData: result.data,
				key,
				errorMsg: ''
			})
		})
		.catch( () => {
			dispatch({
				type: GET_RECE_ADD_LIST,
				listData: {},
				key
			})
		});
	}
}

export function clearReceList() {
	return dispatch => {
		dispatch({
			type: CLEAR_RECE_LIST,
		})
	}
}

export default function receAddReducer(state = {}, action) {
    const { listData, key } = action;
    switch (action.type) {
        case GET_RECE_DETAIL_LIST:
			return { ...state, 
				// [`receDetailInfo-${key}`]: listData, 
				[`receDetailInfo-${key}`]: fakeData[`receDetailInfo-${key}`], 
				updateKey: +new Date() + Math.random()};
		case GET_RECE_ADD_LIST:
			return { ...state, [`receAddInfo-${key}`]: listData, updateKey: +new Date() + Math.random()};
		case CLEAR_RECE_LIST:
			return { 
				...state, 
				'receAddInfo-yuyueyuyue': {}, 
				'receAddInfo-weishantou': {}, 
				'receAddInfo-tuozhanyewu': {}, 
				'receDetailInfo-yuyueyuyue': {}, 
				'receDetailInfo-weishantou': {}, 
				'receDetailInfo-tuozhanyewu': {}, 
				updateKey: +new Date() + Math.random()
			};
        default:
            return state;
    }
}

const fakeData = {
	'receDetailInfo-yuyueyuyue': {
        "list": [
            {
                "verification_id": 78,
                "verification_code": "ZQ201907250001", // 核销编号
                "company_name": 2, // 厂商简称
                "sale_name": 10, // 所属销售
                "region":"区域", // (待确认)
                "type": 1, // 核销类型(需要对照配置信息表)
                "can_verification_amount": 4, // 可核销金额
                "total_verification_amount": 4, // 本次核销金额
                "debt_amount": 7, // 核销账户金额
                "gift_amount": 1, // 赠送/返点账户抵扣金额
                "warehouse_amount": "500.00", // 小金库抵扣金额
                "is_record_sale_income": 1, // 是否计提提成
                "is_decrease_company_gmv": 1, // 是否扣减公司GMV
                "is_decrease_sale_gmv": 1, // 是否扣减销售GMV
                "created_at": "2019-07-25 18:47:04", // 核销时间
                "operator_name": "校长", // 核销人员
                "order_id": "41053", // 订单ID
                "project_name": "ccc", // 项目
                "brand_name": null, // 品牌
                "requirement_name": "底价001", // 需求名称
                "requirement_id": "26634",
                "weibo_name": "douyin_yw001", // 账号名称
                "account_id": "109151",
                "platform_name": "抖音", // 平台名称
                "platform_id": "115",
                "invoice_application_id" :1, // 发票申请单ID
                "execution_completed_time":1, // 执行完成时间 
                "inspection_deducted_amount":123, // 质检返款
                "verification_amount": 4, // 应收款金额
                "quoted_price": "58738.00", // 对外报价
                "deal_price": "58738.00", // 执行价
                "gift":1, // 赠送账户结算
                "cash": 3,// 现金账户结算
                "reparation_amount": "123", // 赔偿 
                "manual_qc_amount": 123, // 手工质检金额
                "has_verification_amount": "0.00", // 已核销金额
                "has_payback_amount": "0.00" // 已回款金额
            }
        ],
        "statistic": {
            "verification_total": "4800.00", // 核销次数
            "order_amount": "3800.00", // 订单数
            "verification_amount_total": "1000.00", // 核销金额
            "debt_amount_total": "3300.00", // 核销账户金额
            "gift_amount_total": "-3300.00", // 赠送/返点账户抵扣
            "warehouse_amount_total": "-3300.00" // 小金库抵扣
        },
        "page": 1,
        "page_size": 20,
        "total": 1
	},
	'receDetailInfo-weishantou': {
        "list": [
            {
                "verification_id": 78,
                "verification_code": "ZQ201907250001", // 核销编号
                "company_name": 2, // 厂商简称
                "sale_name": 10, // 所属销售
                "region":"区域", // (待确认)
                "type": 1, // 核销类型(需要对照配置信息表)
                "can_verification_amount": 4, // 可核销金额
                "total_verification_amount": 4, // 本次核销金额
                "debt_amount": 7, // 核销账户金额
                "gift_amount": 1, // 赠送/返点账户抵扣金额
                "warehouse_amount": "500.00", // 小金库抵扣金额
                "is_record_sale_income": 1, // 是否计提提成
                "is_decrease_company_gmv": 1, // 是否扣减公司GMV
                "is_decrease_sale_gmv": 1, // 是否扣减销售GMV
                "created_at": "2019-07-25 18:47:04", // 核销时间
                "operator_name": "校长", // 核销人员
                "campaign_id": "41053", // 活动ID
                "project_name": "ccc", // 项目
                "brand_name": null, // 品牌
                "weibo_name": "douyin_yw001", // 账号名称
                "account_id": "109151",
                "platform_name": "抖音", // 平台名称
                "platform_id": "115",
                "invoice_application_id" :1, // 发票申请单ID
                "settlement_time":1, // 活动结算时间 
                "verification_amount": 4, // 应收款金额
                "inspection_deducted_amount":123, // 质检返款（待确认） 
                "deal_price": "58738.00", // 执行价（待确认）
                "gift":1, // 赠送账户结算
                "cash": 3,// 现金账户结算
                "manual_qc_amount": 123, // 手工质检金额
                "has_verification_amount": "0.00", // 已核销金额
                "has_payback_amount": "0.00" // 已回款金额
            }
        ],
       
        "page": 1,
        "page_size": 20,
        "total": 1
	},
	'receDetailInfo-tuozhanyewu': {
        "list": [
            {
                "verification_id": 78,
                "verification_code": "ZQ201907250001", // 核销编号
                "company_name": 2, // 厂商简称
                "sale_name": 10, // 所属销售
                "region":"区域", // (待确认)
                "type": 1, // 核销类型(需要对照配置信息表)
                "can_verification_amount": 4, // 可核销金额
                "total_verification_amount": 4, // 本次核销金额
                "debt_amount": 7, // 核销账户金额
                "gift_amount": 1, // 赠送/返点账户抵扣金额
                "warehouse_amount": "500.00", // 小金库抵扣金额
                "is_record_sale_income": 1, // 是否计提提成
                "is_decrease_company_gmv": 1, // 是否扣减公司GMV
                "is_decrease_sale_gmv": 1, // 是否扣减销售GMV
                "created_at": "2019-07-25 18:47:04", // 核销时间
                "operator_name": "校长", // 核销人员
                "id": "41053", // 活动ID
                "business_name":1, // 活动名称
                "status":1, // 活动状态
                "project_name": "ccc", // 项目
                "brand_name": null, // 品牌
                "invoice_application_id" :1, // 发票申请单ID
                "pass_time":1, // 审核时间 
                "verification_amount": 4, // 应收款金额
                "cost": "58738.00", // 活动费用
                "gift":1, // 赠送账户结算
                "cash": 3,// 现金账户结算
                "has_verification_amount": "0.00", // 已核销金额
                "has_payback_amount": "0.00" // 已回款金额
            }
        ],
       
        "page": 1,
        "page_size": 20,
        "total": 1
    }
}
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { Link, browserHistory } from 'react-router'
import { Link } from 'react-router-dom'
import qs from 'qs'
// import PropTypes from 'prop-types'
import * as zhangActions from '../actions/index';
import Query from'../components/query'
// import { zhangListFunc } from '../constants/column';
import { Row, Col ,Icon} from "antd";
import './list.less'
// import ZhangWuTable from '../components/table'
import './detail.less'
// import { SH2 } from '@/base/SectionHeader';
class Detail extends Component {
	constructor(props) {
		super(props)

	}
	componentWillMount=()=>{
		this.props.actions.getAccountDetail()
	}
	
	render(){
		let {detail}=this.props;
		return<div className='detail'>
			<Row>
				<Col span={2}>
				<Icon type="left-circle-o" />
				<span className="title">订单详情</span>
				</Col>
				
				
			</Row>
			{/* 订单 */}
			<Row className='orderBox'>
				<Col span={3} className='zhangwu_col'>
					订单id:{detail.order?detail.order.order_id:''}
					<span>{detail.order?detail.order.order_type:''}</span> 
				</Col>
				<Col span={6}>三方标识:{detail.order?detail.order.trinity_type:''}</Col>
				<Col span={6}>订单执行状态:{detail.order?detail.order.execution_status:''}</Col>
				
				<Col span={6}>{detail.order?detail.order.execution_completed_time:''}</Col>
			</Row>
			
			<Row >
				<Col span={12} className='colHeight'>
				<div>
					<span>账号报价</span>
					<span>微播易到手价</span>
					<span>三方平台下单价</span>
				</div>
				￥{detail.order?detail.order.total_account_quote_price:''}
					<span>=</span>
					<span>￥{detail.order?detail.order.private_account_quote_price:''}</span>
				<span>+</span>
				<span>￥{detail.order?detail.order.public_account_quote_price:''}</span></Col>
				
				<Col span={12} className='colHeight'>
				<div>
					<span>应约价</span>
					<span>对外报价(博主)</span>
					<span>对外报价(三方)</span>
				</div>
				<span>￥{detail.order?detail.order.total_quote_price:''}</span>
				<span>=</span>
				<span>￥{detail.order?detail.order.private_quote_price:''}</span>
				<span>+</span>
				<span>￥{detail.order?detail.order.public_quote_price:''}</span></Col>
			</Row>
			{/* <Row className='colHeightTitle'>
				<Col span={4}>订单成本价</Col>
				<Col span={4}>博主成本价</Col>
				<Col span={4}>三方成本价</Col>
				<Col span={4}>执行价</Col>
				<Col span={4}></Col>
				<Col span={4}>执行价(三方)</Col>
			</Row> */}
			<Row className='colHeight'>
				<Col span={12}>
				<div>
					<span>订单成本价</span>
					<span>博主成本价</span>
					<span>三方成本价</span>
				</div>
				<span>￥{detail.order?detail.order.total_cost_price:''}</span>
				<span>=</span>
				<span>￥{detail.order?detail.order.private_cost_price:''}</span>
				<span>+</span>
				<span>￥{detail.order?detail.order.public_cost_price:''}</span></Col>
				<Col span={12} className='colHeight'>
				<div>
					<span>执行价</span>
					<span>执行价(博主)</span>
					<span>执行价(三方)</span>
				</div>
				<span>￥{detail.order?detail.order.total_deal_price:''}</span>
				<span>=</span>
				<span>￥{detail.order?detail.order.private_deal_price:''}</span>
				<span>+</span>
				<span>￥{detail.order?detail.order.public_deal_price:''}</span></Col>
			</Row>
			
			
			<Row className='company'>
				应收
				
			</Row>
			<Row className='companyTitle'>
				<Col span={8}>
					公司简称:{detail.company?detail.company.company_name:''}
				</Col>
				<Col span={8}>所属销售:{detail.company?detail.company.sale_manager_name:''} </Col>
				
			</Row>
			<Row className='colHeightTitle'>
				
			</Row>
			<Row className='colHeight'>
				<div>
					<span>订单实收</span>
					<span>执行价</span>
					<span>质检返款</span>
					<span>使用赠送</span>
					<span>赔偿</span>
					<span>手工质检返款(结案前)</span>
				</div>
				<Col span={24}>
				<span>￥{detail.company?detail.company.real_consumption:''}</span>
				<span>=</span>
				
				<span>￥{detail.order?detail.order.total_deal_price:''}</span>
				<span>-</span>
				
				<span>￥{detail.company?detail.company.deducted_deal_price:''}</span>
				<span>-</span>
				
				<span>￥{detail.company?detail.company.gift_price:''}</span>
				<span>-</span>
				
				<span>￥{detail.company?detail.company.reparation_price:''}</span>
				<span>-</span>
				
				<span>￥{detail.company?detail.company.before_close_case_manual_qc:''}</span>
				</Col>
			</Row>
			
			<Row className='colHeight'>
				<div>
				<span span={8}>手工质检(结案后):{detail.company?detail.company.after_close_case_manual_qc:''}</span>
				</div>
				<Col span={6}>应开票:￥{detail.company?detail.company.total_invoice_amount:''}</Col>
				<Col span={6}>已开发票:￥{detail.company?detail.company.already_invoice_amount:''}</Col>
				<Col span={6}>回款金额:￥{detail.company?detail.company.payback_amount:''}{detail.company?detail.company.is_payback:''}</Col>
				<Col span={6}>{detail.company?detail.company.payback_time:''}</Col>
			</Row>
		
			
			<Row className='account'>
				应付
			</Row>
			<Row className='accountTitle'>
				<Col span={5}>
					账号:{detail.account?detail.account.weibo_name:''}
				</Col>
				<Col span={5}>ID:{detail.account?detail.account.public_quote_price:''} </Col>
				<Col span={5}>媒介经理:{detail.account?detail.account.media_manager_name:''} </Col>
				<Col span={5}>合作方类型:{detail.account?detail.account.partner_type:''} </Col>
				<Col span={4}>付款公司:{detail.account?detail.account.payment_company_name:''} </Col>
				
			</Row>
			
			<Row className='colHeight'>
				<div>
					<span>剩余成本价</span>
					<span>博主成本价</span>
					<span>质检扣款</span>
					<span>成本调整</span>
					<span>订单扣款(打款前)</span>
					<span>订单补款(打款后)</span>
				</div>
				<Col span={24}>
				<span>￥{detail.account?detail.account.remaining_price:''}</span>
				
				
				<span>￥{detail.account?detail.order.private_cost_price:''}</span>
				
				
				<span>￥{detail.account?detail.account.deducted_cost_price:''}</span>
				
				
				<span>￥{detail.account?detail.account.cost_deduction:''}</span>
				
				<span>
				￥{detail.account?detail.account.before_payment_adjust_amount:''}</span>
				
				<span>
				￥{detail.account?detail.account.after_payment_adjust_amount:''}</span>
				</Col>
			</Row>
			<Row className='colHeight'>
				<div>
					<span>应回发票:{detail.account?detail.account.total_invoice_amount:''}</span>
					<span>待回发票:{detail.account?detail.account.public_quote_price:''}</span>
				</div>
				<div>
				<span>打款单ID:{detail.account?detail.account.payment_id:''}</span>
				<span>打款类型:{detail.account?detail.account.payment_type:''}</span>
				<span>打款状态:{detail.account?detail.account.payment_status:''}</span>
			
				<span>打款金额:{detail.account?detail.account.payment_amount:''}</span>
				<span>打款时间:{detail.account?detail.account.payment_time:''}</span>
				</div>
			</Row>
			<Row className='colHeight'>
				<Col span={24}>
				订单扣补款(打款后):{detail.account?detail.account.after_payment_adjust_amount:''}</Col>
				<div>
				
				<span>打款单ID:{detail.account?detail.account.payment_id:''}</span>
				<span>打款类型:{detail.account?detail.account.payment_type:''}</span>
				<span>打款状态:{detail.account?detail.account.payment_status:''}</span>
			
				<span>打款金额:{detail.account?detail.account.payment_amount:''}</span>
				<span>打款时间:{detail.account?detail.account.payment_time:''}</span>
				</div>
			</Row>
			
			
			<Row className='accountTitle'>
				<Col span={6}>三方平台:{detail.trinity?detail.trinity.weibo_type:''} </Col>
				<Col span={6}>三方代理:{detail.trinity?detail.trinity.agent_name:''} </Col>
				<Col span={6}>付款公司:{detail.trinity?detail.trinity.payment_company_name:''} </Col>
				<Col span={6}>合作方式:{detail.trinity?detail.trinity.cooperation_type:''} </Col>
				
			</Row>
			<Row className='colHeight'>
				<Col span={8}>剩余成本:{detail.trinity?detail.trinity.actual_public_cost_price:''} </Col>
				<Col span={8}>三方成本:{detail.trinity?detail.order.public_cost_price:''} </Col>
				<Col span={8}>成本调整:{detail.trinity?detail.trinity.public_cost_adjustment:''} </Col>
			</Row> 
	</div>
	}
}

const mapStateToProps = (state) => {
	return {
		detail: state.zhangWu.accountDetail
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...zhangActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail)

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
import { Row, Col ,Icon,Spin, message} from "antd";
import './list.less'
// import ZhangWuTable from '../components/table'
import './detail.less'
class Detail extends Component {
	constructor(props) {
		super(props)

	}
	componentWillMount=()=>{
		const search =qs.parse(this.props.location.search.substring(1));
		this.props.actions.getAccountDetail(search.order_id).catch(result => {
			if(result && result.errorMsg)
				message.error(result.errorMsg)
		})
	}
	handleList=()=>{
		// console.log(record)
		// this.props.history.push({
		// 	pathname: '/finance/zhangwu/list',
		// });
		this.props.history.goBack();

	}
	componentWillUnmount=()=>{
		this.props.actions.getResetDetail()
	}
	getPaymentIdComp = (payment_id, payment_link) => {
		return payment_link ? <a target='_blank' href={payment_link}>{payment_id}</a> : <span>{payment_id}</span>
	}
	getPaymentDeductionAmount = (data) => {
		return isNaN(data) || !data ? data : Math.abs(data).toFixed(2);
	}
	getCompByPartnerType = (account = {}) => {
		const { partner_type } = account;
		if(partner_type == 1) {
			return [
				<Col key='invoice_type_name' span={4}>回票类型:{account?account.invoice_type_name:''} </Col>,
				<Col key='tax_rate' span={3}>回票税率:{account?account.tax_rate:''} </Col>	
			]
		}else if(partner_type == 4) {
			return [
				<Col key='work_room_service_rate' span={4}>工作室平均服务费率:{account?account.work_room_service_rate:''} </Col>,
				<Col key='work_room_average_return_rate' span={3}>工作室平均发票税率:{account?account.work_room_average_return_rate:''} </Col>	
			]
		}else {
			return null
		}
	}

	render(){
		let {detail}=this.props;
		return<div className='detail'>
		{
			Object.keys(detail).length>0?<div><Row className='titleRow'>
				<Col span={2} onClick={this.handleList}>
				<Icon type="left-circle-o" style={{cursor:'pointer'}} />
				<span className="title" style={{cursor:'pointer'}}>订单详情</span>
				</Col>
				
				
			</Row>
			{/* 订单 */}
			<Row className='orderBox borderBottomNode'>
				<Col span={4} className='marLeft26'>
					订单id:{detail.order?detail.order.order_id:''}
					<span className='orderStatus'>{detail.order?detail.order.product_line_desc:''}</span> 
				</Col>
				<Col span={3} className='marLeft26'>
					{ detail.order?detail.order.formula_version_desc:'' }
				</Col>
				<Col span={5}>三方标识:{detail.order?detail.order.trinity_type:''}</Col>
				<Col span={5}>订单执行状态:{detail.order?detail.order.execution_status:''}</Col>
				
				<Col span={5}>执行完成时间:{detail.order?detail.order.execution_completed_time:''}</Col>
			</Row>
			
			<Row >
				<Col span={12} className='colHeightTitle' style={{borderBottom:'none',borderRight:'none'}}>
				
					<div className='padLeft32 inlineBlock'>
						<span className='displayInline'>账号报价</span>
						<span className='displayInline coloRed'>
						￥{detail.order?detail.order.total_account_quote_price:''}
						</span>
						
					</div>
					<span className='equalSign'>=</span>
					<div className='inlineBlock'>
						<span className='displayInline'>微播易到手价</span>
						<span className='displayInline'>￥{detail.order?detail.order.private_account_quote_price:''}</span>
					</div>
					<span className='plusSign'>+</span>
					<div className='inlineBlock'>
						<span className='displayInline'>三方平台下单价</span>
						<span className='displayInline'>￥{detail.order?detail.order.public_account_quote_price:''}</span>
					</div>
				
				</Col>
				
				<Col span={12} className='colHeightTitle' style={{borderBottom:'none'}}>
					
					<div className='padLeft32 inlineBlock'>
						<span className='displayInline'>订单不含税成本价</span>
						<span className='displayInline coloRed'>￥{detail.order?detail.order.total_without_tax_cost_price:''}</span>
					</div>
					<span className='equalSign'>=</span>
					<div className='inlineBlock'>
						<span className='displayInline'>博主不含税成本价</span>
						<span className='displayInline'>￥{detail.order?detail.order.private_without_tax_cost_price:''}</span>
					</div>
					<span className='plusSign'>+</span>
					<div className='inlineBlock'>
						<span className='displayInline'>三方不含税成本价</span>
						<span className='displayInline'>￥{detail.order?detail.order.public_without_tax_cost_price:''}</span>
					</div>
					
				</Col>
			</Row>
			
			<Row>
				<Col span={12} className='colHeightTitle'  style={{borderRight:'none'}}>
				
				<div className='padLeft32 inlineBlock'>
					<span className='displayInline'>订单成本价</span>
					<span className='displayInline coloRed'>￥{detail.order?detail.order.total_cost_price:''}</span>
				</div>
				<span className='equalSign'>=</span>
				<div className='inlineBlock'>
					<span className='displayInline'>博主成本价</span>
					<span className='displayInline'>￥{detail.order?detail.order.private_cost_price:''}</span>
				</div>
				<span className='plusSign'>+</span>
				<div className='inlineBlock'>
					<span className='displayInline'>三方成本价</span>
					<span className='displayInline'>￥{detail.order?detail.order.public_cost_price:''}</span>
				</div>
				
				</Col>
				<Col span={12} className='colHeightTitle' style={{borderBottom:'none'}}>
					
					<div className='padLeft32 inlineBlock'>
						<span className='displayInline'>对外报价</span>
						<span className='displayInline coloRed'>￥{detail.order?detail.order.total_quote_price:''}</span>
					</div>
					<span className='equalSign'>=</span>
					<div className='inlineBlock'>
						<span className='displayInline'>对外报价(博主)</span>
						<span className='displayInline'>￥{detail.order?detail.order.private_quote_price:''}</span>
					</div>
					<span className='plusSign'>+</span>
					<div className='inlineBlock'>
						<span className='displayInline'>对外报价(三方)</span>
						<span className='displayInline'>￥{detail.order?detail.order.public_quote_price:''}</span>
					</div>
					
				</Col>
			</Row>

			<Row>
				<Col span={12} className='colHeightTitle'  style={{borderRight:'none'}}>
				
				<div className='padLeft32 inlineBlock'>
					<span className='displayInline'>订单进项税</span>
					<span className='displayInline coloRed'>￥{detail.order?detail.order.total_input_tax:''}</span>
				</div>
				<span className='equalSign'>=</span>
				<div className='inlineBlock'>
					<span className='displayInline'>博主进项税</span>
					<span className='displayInline'>￥{detail.order?detail.order.private_input_tax:''}</span>
				</div>
				<span className='plusSign'>+</span>
				<div className='inlineBlock'>
					<span className='displayInline'>三方进项税</span>
					<span className='displayInline'>￥{detail.order?detail.order.public_input_tax:''}</span>
				</div>
				
				</Col>
				<Col span={12} className='colHeightTitle'>
					<div className='padLeft32 inlineBlock'>
						<span className='displayInline'>执行价</span>
						<span className='displayInline coloRed'>￥{detail.order?detail.order.total_deal_price:''}</span>
					</div>
					<span className='equalSign'>=</span>
					<div className='inlineBlock'>
						<span className='displayInline'>执行价(博主)</span>
						<span className='displayInline'>￥{detail.order?detail.order.private_deal_price:''}</span>
					</div>
					<span className='plusSign'>+</span>
					<div className='inlineBlock'>
						<span className='displayInline'>执行价(三方)</span>
						<span className='displayInline'>￥{detail.order?detail.order.public_deal_price:''}</span>
					</div>
					
				</Col>
			</Row>
			
			
			<Row className='company paddUp20'>
				应收
				
			</Row>
			<Row className='companyTitle borderBottomNode'>
				<Col span={8} className='marLeft26'>
					公司简称:{detail.company?detail.company.company_name:''}
				</Col>
				<Col span={8}>所属销售:{detail.company?detail.company.sale_manager_name:''} </Col>
				
			</Row>
			
			<Row className='colHeightTitle receivableColTitle' style={{borderBottom:'none'}}>
			
				<Col span={24}>
					<div className='pad30'>
						<span className='displayInline'>订单实收</span>
						<span className='displayInline'>￥{detail.company?detail.company.real_consumption:''}</span>
					</div>
					<span>=</span>
					<div className='pad30'>
						<span className='displayInline'>使用信用帐户</span>
						<span className='displayInline'>￥{detail.company?detail.company.credit_amount:''}</span>
					</div>

					<span>+</span>
					<div className='pad30'>
						<span className='displayInline'>使用现金帐户</span>
						<span className='displayInline'>￥{detail.company?detail.company.cash_amount:''}</span>
					</div>
					<div>
						<div className='pad30'>
							<span className='displayInline'>执行价</span>
							<span className='displayInline'>￥{detail.order?detail.order.total_deal_price:''}</span>
						</div>
						
						<div className='pad30'>
							<span className='displayInline'>质检返款</span>
							<span className='displayInline'>￥{detail.company?detail.company.deducted_deal_price:''}</span>
						</div>
						
						<div className='pad30'>
							<span className='displayInline'>使用赠送</span>
							<span className='displayInline'>￥{detail.company?detail.company.gift_amount:''}</span>
						</div>
					
						<div className='pad30'>
							<span className='displayInline'>赔偿</span>
							<span className='displayInline'>￥{detail.company?detail.company.reparation_amount:''}</span>
						</div>
						
						<div className='pad30'>
							<span className='displayInline'>手工质检返款(结案前)</span>
							<span className='displayInline'>￥{detail.company?detail.company.before_close_case_manual_qc:''}</span>
						</div>

						<div className='pad30'>
							<span className='displayInline'>手工质检返款(结案后)</span>
							<span className='displayInline'>￥{detail.company?detail.company.after_close_case_manual_qc:''}</span>
						</div>

						<div className='pad30'>
							<span className='displayInline'>应收款核销金额</span>
							<span className='displayInline'>￥{detail.company?detail.company.has_verification_amount:''}</span>
						</div>

						<div className='pad30'>
							<span className='displayInline'>应收款金额</span>
							<span className='displayInline'>￥{detail.company?detail.company.receivables_amount:''}</span>
						</div>
					</div>
				</Col>
			</Row>
			
			<Row className='colHeightLow' style={{paddingLeft:'26px'}}>
				<Col span={6}>应开发票金额:￥{detail.company?detail.company.total_invoice_amount:''}</Col>
				<Col span={6}>已关联发票金额:￥{detail.company?detail.company.already_invoice_amount:''}</Col>
				<Col span={6}>回款金额:￥{detail.company?detail.company.payback_amount:''}
				<span className='paybackStatus'>{detail.company?detail.company.is_payback:''}</span>
				</Col>
				<Col span={6}>{detail.company?detail.company.payback_time:''}</Col>
			</Row>
		
			
			<Row className='account paddUp20'>
				应付
			</Row>
			<Row className='accountTitle borderBottomNode'>
				<Col span={3} className='marLeft26'>
					主账号:{detail.account?detail.account.identity_name:''}
				</Col>
				<Col span={4}>账号:{detail.account?detail.account.weibo_name:''} </Col>
				<Col span={3}>平台:{detail.account?detail.account.platform_name:''} </Col>
				<Col span={3}>媒介经理:{detail.account?detail.account.media_manager_name:''} </Col>
				<Col span={5}>付款公司:{detail.account?detail.account.payment_company_name:''} </Col>
				<Col span={4}>结算标识:{detail.account?detail.account.is_settle_at_private_price_desc:''} </Col>
				
			</Row>
			<Row className='accountTitle borderBottomNode'>
				<Col span={3} className='marLeft26'>
					应约时合作方式:{detail.account?detail.account.partner_type_name:''}
				</Col>
				{
					this.getCompByPartnerType(detail.account)
				}
			</Row>
			
			<Row className='colHeightTitle' style={{borderBottom:'none'}}>
				
				<Col span={24}>
				<div className='pad20'>
					<span className='displayInline'>{detail.account?detail.account.private_payment_price_name:''}</span>
					<span className='displayInline'>￥{detail.account?detail.account.remaining_price:''}</span>
				</div>
				<span>=</span>
				
				<div className='pad20'>
					<span className='displayInline'>订单原价（博主）</span>
					<span className='displayInline'>￥{
						detail.account && detail.order ? 
							detail.account.is_settle_at_private_price == 1 ? 
								detail.order.private_income_price : detail.order.private_cost_price : ''
						}
					</span>
				</div>
				
				<span>-</span>
				<div className='pad20'>
					<span className='displayInline'>质检扣款</span>
					<span className='displayInline'>￥{detail.account?detail.account.deducted_cost_price:''}</span>
				</div>
				<span>-</span>
				<div className='pad20'>
					<span className='displayInline'>成本调整</span>
					<span className='displayInline'>￥{detail.account?detail.account.cost_deduction:''}</span>
				</div>
				<span>-</span>
			
				<div className='pad20'>
					<span className='displayInline'>订单扣款(打款前)</span>
					<span className='displayInline'>￥{detail.account?detail.account.before_payment_subtract_amount:''}</span>
				</div>
				<span>+</span>
				<div className='pad20'>
					<span className='displayInline'>订单补款(打款前)</span>
					<span className='displayInline'>￥{detail.account?detail.account.before_payment_add_amount:''}</span>
				</div>
				<span>-</span>
				<div className='pad20'>
					<span className='displayInline'>支付方式变更扣款</span>
					<span className='displayInline'>￥{detail.account?this.getPaymentDeductionAmount(detail.account.payment_deduction_amount):''}</span>
				</div>
				
				</Col>
			</Row>
			{
				detail.account && detail.account.payment_list.length>0?detail.account.payment_list.map((item,index)=>{
					return <div key={index} className='payment'>
					<span className='pad32'>打款单ID:{this.getPaymentIdComp(item.payment_id, item.payment_link)}</span>
					<span className='pad60'>打款类型:{item.payment_type}</span>
					<span className='pad32'>应回发票:{item.total_invoice_amount}</span>
					<span className='pad60'>发票盈余:{item.invoice_surplus}</span>
					<span className=''>
						打款金额:￥{item.payment_amount}
						<span className='paybackStatus'>{item.payment_status}</span>
					</span>
					<span className='pad60'>打款时间:{item.payment_time}</span>
				</div>})
				:null
			}
			<Row className='colHeight' style={{height:'40px',lineHeight:'40px'}}>
				<div className='pad32'>
					订单扣补款(打款后):￥{detail.account?detail.account.after_payment_adjust_amount:''}
				</div>
			</Row>
			{
				detail.account?detail.account.after_payment_list.map((item,index)=>{
					return <div key={index} className='payment'>
					<span className='pad32'>打款单ID:{this.getPaymentIdComp(item.payment_id, item.payment_link)}</span>
					<span className='pad60'>打款类型:{item.payment_type}</span>
					
				
					<span className='pad60' style={{paddingLeft:'300px'}}>
						打款金额:￥{item.payment_amount}
						<span className='paybackStatus'>{item.payment_status}</span>
					</span>
					<span className='pad60'>打款时间:{item.payment_time}</span>
				</div>})
				:null
			}
			<Row className='accountTitle borderBottomNode' style={{marginTop:'20px'}}>
				<Col className='marLeft26' span={4}>三方下单平台:{detail.trinity?detail.trinity.cooperation_platform_name:''} </Col>
				<Col span={4}>三方代理:{detail.trinity?detail.trinity.agent_name:''} </Col>
				<Col span={4}>付款公司:{detail.trinity?detail.trinity.payment_company_name:''} </Col>
				<Col span={3}>合作方式:{detail.trinity?detail.trinity.cooperation_type:''} </Col>
				<Col span={4}>应约时回票类型:{detail.trinity?detail.trinity.agent_invoice_type:''} </Col>
				<Col span={3}>回票税率:{detail.trinity?detail.trinity.agent_tax_rate:''} </Col>
			</Row>
			<Row className='colHeightTitle'>
				<Col span={24}>
					<div className='pad32'>
						<span className='displayInline'>三方应打款金额</span>
						<span className='displayInline'>￥{detail.trinity?detail.trinity.actual_public_cost_price:''} </span>
					</div>
					<span>=</span>
					<div className='pad60'>
						<span className='displayInline'>订单原价(三方)</span>
						<span className='displayInline'>￥{detail.trinity?detail.order.public_cost_price:''}</span>
					</div>
					<span>+</span>
					<div className='pad60'>
						<span className='displayInline'>成本调整</span>
						<span className='displayInline'>￥{detail.trinity?detail.trinity.public_cost_adjustment:''} </span>
					</div>
				</Col>
			</Row> 
			{
				detail.trinity?detail.trinity.payment_list.map((item,index)=>{
					return <Row key={index} className='payment'>
						<div>
							<span className='pad32'>打款单ID:{this.getPaymentIdComp(item.payment_id, item.payment_link)}</span>
							<span className='pad60'>打款类型:{item.payment_type}</span>
							<span className='pad60'>回票方式:{item.return_invoice_type} </span>
						
							<span className='' style={{}}>
								打款金额:￥{item.payment_amount}
								<span className='paybackStatus'>{item.payment_status}</span>
							</span>
							<span className='pad60'>打款时间:{item.payment_time}</span>
						</div>
					</Row>
				}):null
			}
			</div>
			:<Spin size="large" className="centerSpin"/>
		}
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

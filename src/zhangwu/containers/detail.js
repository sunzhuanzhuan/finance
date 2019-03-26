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
import numeral from "numeral";
class Detail extends Component {
	constructor(props) {
		super(props)

	}
	componentWillMount=()=>{
		this.props.actions.getAccountDetail()
	}
	handleList=()=>{
		// console.log(record)
		this.props.history.push({
			pathname: '/finance/zhangwu/list',
		});
	}
	render(){
		let {detail}=this.props;
		return<div className='detail'>
			<Row className='titleRow'>
				<Col span={2} onClick={this.handleList}>
				<Icon type="left-circle-o" />
				<span className="title">订单详情</span>
				</Col>
				
				
			</Row>
			{/* 订单 */}
			<Row className='orderBox'>
				<Col span={3} className='marLeft26'>
					订单id:{detail.order?detail.order.order_id:''}
					<span>{detail.order?detail.order.order_type:''}</span> 
				</Col>
				<Col span={6}>三方标识:{detail.order?detail.order.trinity_type:''}</Col>
				<Col span={6}>订单执行状态:{detail.order?detail.order.execution_status:''}</Col>
				
				<Col span={6}>{detail.order?detail.order.execution_completed_time:''}</Col>
			</Row>
			
			<Row >
				<Col span={12} className='colHeight' style={{borderBottom:'none',borderRight:'none'}}>
				
					<div className='pad32'>
						<span>账号报价</span>
						<span className='displayInline coloRed'>
						￥{numeral(detail.order?detail.order.total_account_quote_price:'').format('0,0.00')}
						</span>
						
					</div>
					<span>=</span>
					<div className='padd60'>
						<span className='displayInline'>微播易到手价</span>
						<span className='displayInline'>￥{numeral(detail.order?detail.order.private_account_quote_price:'').format('0,0.00')}</span>
					</div>
					<span>+</span>
					<div className='padd60'>
						<span className='displayInline'>三方平台下单价</span>
						<span className='displayInline'>￥{numeral(detail.order?detail.order.public_account_quote_price:'').format('0,0.00')}</span>
					</div>
				
				</Col>
				
				<Col span={12} className='colHeight' style={{borderBottom:'none'}}>
					
					<div className='pad32'>
						<span className='displayInline'>对外报价</span>
						<span className='displayInline coloRed'>￥{numeral(detail.order?detail.order.total_quote_price:'').format('0,0.00')}</span>
					</div>
					<span>=</span>
					<div className='padd60'>
						<span className='displayInline'>对外报价(博主)</span>
						<span className='displayInline'>￥{numeral(detail.order?detail.order.private_quote_price:'').format('0,0.00')}</span>
					</div>
					<span>+</span>
					<div className='padd60'>
						<span className='displayInline'>对外报价(三方)</span>
						<span className='displayInline'>￥{numeral(detail.order?detail.order.public_quote_price:'').format('0,0.00')}</span>
					</div>
					
				</Col>
			</Row>
			
			<Row>
				<Col span={12} className='colHeight'  style={{borderRight:'none'}}>
				
				<div className='pad32'>
					<span className='displayInline'>订单成本价</span>
					<span className='displayInline coloRed'>￥{numeral(detail.order?detail.order.total_cost_price:'').format('0,0.00')}</span>
				</div>
				<span>=</span>
				<div className='padd60'>
					<span className='displayInline'>博主成本价</span>
					<span className='displayInline'>￥{numeral(detail.order?detail.order.private_cost_price:'').format('0,0.00')}</span>
				</div>
				<span>+</span>
				<div className='padd60'>
					<span className='displayInline'>三方成本价</span>
					<span className='displayInline'>￥{numeral(detail.order?detail.order.public_cost_price:'').format('0,0.00')}</span>
				</div>
				
				</Col>
				<Col span={12} className='colHeight'>
					<div className='pad32'>
						<span className='displayInline'>执行价</span>
						<span className='displayInline coloRed'>￥{numeral(detail.order?detail.order.total_deal_price:'').format('0,0.00')}</span>
					</div>
					<span>=</span>
					<div className='padd60'>
						<span className='displayInline'>执行价(博主)</span>
						<span className='displayInline'>￥{numeral(detail.order?detail.order.private_deal_price:'').format('0,0.00')}</span>
					</div>
					<span>+</span>
					<div className='padd60'>
						<span className='displayInline'>执行价(三方)</span>
						<span className='displayInline'>￥{numeral(detail.order?detail.order.public_deal_price:'').format('0,0.00')}</span>
					</div>
					
				</Col>
			</Row>
			
			
			<Row className='company paddUp20'>
				应收
				
			</Row>
			<Row className='companyTitle'>
				<Col span={8} className='marLeft26'>
					公司简称:{detail.company?detail.company.company_name:''}
				</Col>
				<Col span={8}>所属销售:{detail.company?detail.company.sale_manager_name:''} </Col>
				
			</Row>
			
			<Row className='colHeight' style={{borderBottom:'none'}}>
			
				<Col span={24}>
				<div className='pad32'>
					<span className='displayInline'>订单实收</span>
					<span className='displayInline'>￥{numeral(detail.company?detail.company.real_consumption:'').format('0,0.00')}</span>
				</div>
				<span>=</span>
				<div className='padd60'>
					<span className='displayInline'>执行价</span>
					<span className='displayInline'>￥{numeral(detail.order?detail.order.total_deal_price:'').format('0,0.00')}</span>
				</div>
				
				<span>-</span>
				<div className='padd60'>
					<span className='displayInline'>质检返款</span>
					<span className='displayInline'>￥{numeral(detail.company?detail.company.deducted_deal_price:'').format('0,0.00')}</span>
				</div>
				
				<span>-</span>
				<div className='padd60'>
					<span className='displayInline'>使用赠送</span>
					<span className='displayInline'>￥{numeral(detail.company?detail.company.gift_price:'').format('0,0.00')}</span>
				</div>
			
				<span>-</span>
				<div className='padd60'>
					<span className='displayInline'>赔偿</span>
					<span className='displayInline'>￥{numeral(detail.company?detail.company.reparation_price:'').format('0,0.00')}</span>
				</div>
				
				<span>-</span>
				<div className='pad32'>
					<span className='displayInline'>手工质检返款(结案前)</span>
					<span className='displayInline'>￥{numeral(detail.company?detail.company.before_close_case_manual_qc:'').format('0,0.00')}</span>
				</div>
				
				</Col>
			</Row>
			
			<Row className='colHeight' style={{paddingLeft:'26px'}}>
			
				<div>
					<span span={8}>手工质检(结案后):￥{numeral(detail.company?detail.company.after_close_case_manual_qc:'').format('0,0.00')}</span>
				</div>
				<Col span={6}>应开票:￥{numeral(detail.company?detail.company.total_invoice_amount:'').format('0,0.00')}</Col>
				<Col span={6}>已开发票:￥{numeral(detail.company?detail.company.already_invoice_amount:'').format('0,0.00')}</Col>
				<Col span={6}>回款金额:￥{numeral(detail.company?detail.company.payback_amount:'').format('0,0.00')}
				<span className='paybackStatus'>{detail.company?detail.company.is_payback:''}</span>
				</Col>
				<Col span={6}>{detail.company?detail.company.payback_time:''}</Col>
			</Row>
		
			
			<Row className='account paddUp20'>
				应付
			</Row>
			<Row className='accountTitle'>
				<Col span={5} className='marLeft26'>
					账号:{detail.account?detail.account.weibo_name:''}
				</Col>
				<Col span={4}>ID:{detail.account?detail.account.public_quote_price:''} </Col>
				<Col span={4}>媒介经理:{detail.account?detail.account.media_manager_name:''} </Col>
				<Col span={5}>合作方类型:{detail.account?detail.account.partner_type:''} </Col>
				<Col span={4}>付款公司:{detail.account?detail.account.payment_company_name:''} </Col>
				
			</Row>
			
			<Row className='colHeight' style={{borderBottom:'none'}}>
				
				<Col span={24}>
				<div className='pad32'>
					<span className='displayInline'>剩余成本价</span>
					<span className='displayInline'>￥{numeral(detail.account?detail.account.remaining_price:'').format('0,0.00')}</span>
				</div>
				<span>=</span>
				
				<div className='padd60'>
					<span className='displayInline'>博主成本价</span>
					<span className='displayInline'>￥{numeral(detail.account?detail.order.private_cost_price:'').format('0,0.00')}</span>
				</div>
				
				<span>-</span>
				<div className='padd60'>
					<span className='displayInline'>质检扣款</span>
					<span className='displayInline'>￥{numeral(detail.account?detail.account.deducted_cost_price:'').format('0,0.00')}</span>
				</div>
				<span>-</span>
				<div className='padd60'>
					<span className='displayInline'>成本调整</span>
					<span className='displayInline'>￥{numeral(detail.account?detail.account.cost_deduction:'').format('0,0.00')}</span>
				</div>
				<span>-</span>
			
				<div className='padd60'>
					<span className='displayInline'>订单扣款(打款前)</span>
					<span className='displayInline'>￥{numeral(detail.account?detail.account.before_payment_adjust_amount:'').format('0,0.00')}</span>
				</div>
				<span>+</span>
				<div className='padd60'>
					<span className='displayInline'>订单补款(打款后)</span>
					<span className='displayInline'>￥{numeral(detail.account?detail.account.after_payment_adjust_amount:'').format('0,0.00')}</span>
				</div>
				
				</Col>
			</Row>
			<Row className='colHeight' style={{ height:'40px',lineHeight:'40px'}}>
				<div>
					<span className='pad32'>应回发票:{numeral(detail.account?detail.account.total_invoice_amount:'').format('0,0.00')}</span>
					<span className='padd60'>待回发票:{numeral(detail.account?detail.account.public_quote_price:'').format('0,0.00')}</span>
				</div>
			</Row>
				{detail.account?detail.account.payment_list.map((item,index)=>{
					return <div key={index} className='payment'>
					<span className='pad32'>打款单ID:{item.payment_id}</span>
					<span className='padd60'>打款类型:{item.payment_type}</span>
					
				
					<span className='padd60' style={{paddingLeft:'300px'}}>
						打款金额:{numeral(item.payment_amount).format('0,0.00')}
						<span className='paybackStatus'>{item.payment_status}</span>
					</span>
					<span className='padd60'>打款时间:{item.payment_time}</span>
				</div>})
				:null}
				
			
			<Row className='colHeight' style={{height:'40px',lineHeight:'40px'}}>
				<div className='pad32'>
				订单扣补款(打款后):￥{numeral(detail.account?detail.account.after_payment_adjust_amount:'').format('0,0.00')}
				</div>
				
			</Row>
			{detail.account?detail.account.after_payment_list.map((item,index)=>{
					return <div key={index} className='payment'>
					<span className='pad32'>打款单ID:{item.payment_id}</span>
					<span className='padd60'>打款类型:{item.payment_type}</span>
					
				
					<span className='padd60' style={{paddingLeft:'300px'}}>
						打款金额:{numeral(item.payment_amount).format('0,0.00')}
						<span className='paybackStatus'>{item.payment_status}</span>
					</span>
					<span className='padd60'>打款时间:{item.payment_time}</span>
				</div>})
				:null}
			
			<Row className='accountTitle'>
				<Col span={5} className='marLeft26'>平台:{detail.trinity?detail.trinity.weibo_type:''} </Col>
				<Col span={5}>三方下单平台:{detail.trinity?detail.trinity.weibo_type:''} </Col>
				<Col span={5}>三方代理:{detail.trinity?detail.trinity.agent_name:''} </Col>
				<Col span={4}>付款公司:{detail.trinity?detail.trinity.payment_company_name:''} </Col>
				<Col span={4}>合作方式:{detail.trinity?detail.trinity.cooperation_type:''} </Col>
				
			</Row>
			<Row className='colHeight'>
				
				<Col span={24}>
					<div className='pad32'>
						<span className='displayInline'>剩余成本</span>
						<span className='displayInline'>￥{numeral(detail.trinity?detail.trinity.actual_public_cost_price:'').format('0,0.00')} </span>
					</div>
					<span>=</span>
					<div className='padd60'>
						<span className='displayInline'>三方成本</span>
						<span className='displayInline'>￥{numeral(detail.trinity?detail.order.public_cost_price:'').format('0,0.00')}</span>
					</div>
					<span>+</span>
					<div className='padd60'>
						<span className='displayInline'>成本调整</span>
						<span className='displayInline'>￥{numeral(detail.trinity?detail.trinity.public_cost_adjustment:'').format('0,0.00')} </span>
					</div>
				
				</Col>
			</Row> 
			{
				detail.trinity?detail.trinity.payment_list.map((item,index)=>{
					return <Row key={index} className='payment'>
						<div>
							<span className='pad32'>打款单ID:{item.payment_id}</span>
							<span className='padd60'>打款类型:{item.payment_type}</span>
							
						
							<span className='padd60' style={{paddingLeft:'300px'}}>
								打款金额:{numeral(item.payment_amount).format('0,0.00')}
								<span className='paybackStatus'>{item.payment_status}</span>
							</span>
							<span className='padd60'>打款时间:{item.payment_time}</span>
						</div>
					</Row>
				}):null
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

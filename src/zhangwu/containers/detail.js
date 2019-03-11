import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { Link, browserHistory } from 'react-router'
import { Link } from 'react-router-dom'
import qs from 'qs'
import PropTypes from 'prop-types'
import * as zhangActions from '../actions/index';
import Query from'../components/query'
import { zhangListFunc } from '../constants/column';
import { Row, Col } from "antd";
import './list.less'
import ZhangWuTable from '../components/table'
import './detail.less'

class List extends Component {
	constructor(props) {
		super(props)

	}
	
	render(){
		return<div>
			{/* 订单 */}
			<Row className='zhangwu_title'>
				<Col span={3} className='zhangwu_col'>
					订单ID:
				</Col>
				<Col span={3}>订单类型: </Col>
				<Col span={6}>订单执行状态:</Col>
				<Col span={6}>三方标识:</Col>
				<Col span={6}>执行完成时间:</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>账号报价:</Col>
				<Col span={8}>微播易到手价:</Col>
				<Col span={8}>三方平台下单价:</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>订单成本价:</Col>
				<Col span={8}>博主成本价:</Col>
				<Col span={8}>三方成本价:</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>执行价:</Col>
				<Col span={8}>执行价(博主):</Col>
				<Col span={8}>执行价(三方):</Col>
			</Row>
			{/* 公司 */}
			<Row className='zhangwu_title'>
				<Col span={8}>
					公司简称:
				</Col>
				<Col span={8}>所属销售: </Col>
				
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>质检返款:</Col>
				<Col span={8}>使用赠送:</Col>
				<Col span={8}>赔偿:</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>手工质检返款(结案前):</Col>
				<Col span={8}>订单实收:</Col>
				<Col span={8}>手工质检(结案后):</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>可发票金额:</Col>
				<Col span={8}>已开发票金额:</Col>
				<Col span={8}></Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>回款状态:</Col>
				<Col span={8}>户款时间:</Col>
				<Col span={8}>户款金额:</Col>
			</Row>
			{/* 账号 */}
			<Row className='zhangwu_title'>
				<Col span={5}>
					账号:
				</Col>
				<Col span={5}>账号ID: </Col>
				<Col span={5}>媒介经理: </Col>
				<Col span={5}>合作方类型: </Col>
				<Col span={4}>付款公司: </Col>
				
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>质检扣款:</Col>
				<Col span={8}>成本调整:</Col>
				<Col span={8}>订单扣补款(打款前):</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>订单扣补款(打款后):</Col>
				<Col span={8}>应回发票:</Col>
				<Col span={8}>待回发票:</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>打款类型:</Col>
				<Col span={8}>打款单ID:</Col>
				<Col span={8}>打款状态:</Col>
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>打款金额:</Col>
				<Col span={8}>打款时间:</Col>
			</Row>
			{/* 平台信息 */}
			<Row className='zhangwu_title'>
				<Col span={6}>三方平台: </Col>
				<Col span={6}>三方代理: </Col>
				<Col span={6}>付款公司: </Col>
				<Col span={6}>合作方式: </Col>
				
			</Row>
			<Row className='zhangwu_col'>
				<Col span={8}>质检扣款:</Col>
				<Col span={8}>成本调整:</Col>
				<Col span={8}>订单扣补款(打款前):</Col>
			</Row>
	</div>
	}
}

const mapStateToProps = (state) => {
	return {
		studioMetadata: state.studioManage.studioMetadata,
		allocationData: state.studioManage.allocationData,
		studioNameCheck: state.studioManage.studioNameCheck,
		allocationStatData: state.studioManage.allocationStatData,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...zhangActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List)

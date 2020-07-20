import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Modal, Form, message } from 'antd';

import * as applyListAction from '../actions/index'
import './ApplyList.less';
import AddInvoiceInfo from '../containers/AddInvoiceInfo'
import { calcSum } from "../../util";

class InvoiceRelateModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAssociateBtnVisible: '',
			creatNewInvoiceVisible: false,
			invoiceApplyId: '',
			totalSpendAmount: '',
			totalRechargeAmount: '',
			totalInvoicedAmount: '',
			applyAmount: '',
			canInvoice: '',
			type: 1,
			totalSum: 0,
			limit: 50,
			receivableCount: 0
		}
	}
	//查询
	handleSelsetSubmit(e) {
		this.props.form.validateFields((_, values) => {
			if (e) { e.preventDefault() }
			let createdAtStart;
			let createdAtEnd;
			if (values['range-picker'] && values['range-picker'].length) {
				createdAtStart = values['range-picker'][0].format('YYYY-MM-DD')
				createdAtEnd = values['range-picker'][1].format('YYYY-MM-DD');
			}
			values.page = 1;
			values.page_size = 20
			let formatValues = {
				...values,
				'created_at_start': createdAtStart,
				'created_at_end': createdAtEnd,
			}
			this.props.actions.getApplyList(formatValues).then(() => {
			}).catch(({ errorMsg }) => {
				message.warning(errorMsg || '请求出错', 1)
			})
		});

	}
	//申请单列表 操作项-是否关联发票
	isAssociate = (type_display, id, company_id, amount, can_invoice, type, receivableCount) => {
		this.setState({
			isAssociateVisible: true,
			isAssociateBtnVisible: type_display,
			invoiceApplyId: id,
			applyAmount: amount,
			canInvoice: can_invoice,
			type: type,
			receivableCount
		}, () => {
			this.props.actions.getAvailableInvoiceList(this.state.invoiceApplyId, [], 1, this.state.limit).catch(({ errorMsg }) => {
				message.warning(errorMsg || '请求出错', 1)
			});
			this.props.actions.getInvoiceStat(company_id).then((data) => {
				this.setState({
					totalSpendAmount: data.total_spend_amount,
					totalRechargeAmount: data.total_recharge_amount,
					totalInvoicedAmount: data.total_invoiced_amount,
				});
			}).catch(({ errorMsg }) => {
				message.warning(errorMsg || '请求出错', 1)
			})
		});

	}
	handleAssociateCancel = () => {
		this.setState({
			isAssociateVisible: false
		});
	}

	//开新发票
	handleCreatNewInvoice = () => {
		this.setState({
			isAssociateBtnVisible: false,
			creatNewInvoiceVisible: true,
			isAssociateVisible: false,

		}, () => {
			this.handleSelectData()
		});


	}
	handleSelectData(value) {
		if (value != undefined) {
			this.props.actions.getAvailableInvoiceList(this.state.invoiceApplyId, value, 1, this.state.limit).catch(({ errorMsg }) => {
				message.warning(errorMsg || '请求出错', 1)
			});
		}

	}
	handleCreatNewInvoiceOk = () => {
		this.setState({
			creatNewInvoiceVisible: false,
			totalSum: 0
		});
	}
	//显示已选开票金额
	handleTotalSum = sum => {
		let total = sum.toFixed(2);
		this.setState({ totalSum: total })
	}
	render() {
		const {
			role,
			availableInvoiceList = [],
		} = this.props;
		let acountAry = [this.state.applyAmount, -this.state.canInvoice];
		return (
			<div>
				<Modal
					title="是否已开发票"
					visible={this.state.isAssociateVisible}
					onCancel={this.handleAssociateCancel.bind(this)}
					footer={null}
					width='580px'
				>
					<div>
						{
							(this.state.totalInvoicedAmount > this.state.totalSpendAmount) || (this.state.totalInvoicedAmount > this.state.totalRechargeAmount) ? <p style={{ fontSize: '12px' }}><span style={{ color: 'red' }}>预警提示：</span>该公司发票已开超，请谨慎操作</p> : null
						}
						<p style={{ fontSize: '12px' }}>该公司总消费：{this.state.totalSpendAmount}元，总充值：{this.state.totalRechargeAmount}元，已开票金额（含合同、邮件审批）：{this.state.totalInvoicedAmount}元</p>
						<p>请确认该发票申请单之前没有开过发票，以免开重，然后再进行下一步操作</p>
						<Row type="flex" justify="center" gutter={16}>
							{this.state.isAssociateBtnVisible == '消费' || this.state.isAssociateBtnVisible == '充值' ? <Col><Button><Link to={"/finance/invoice/associateInvoice?id=" + this.state.invoiceApplyId + "&role=" + role + "&receivable=" + this.state.receivableCount}>已开票，关联现有发票</Link></Button></Col> : ''}
							<Col><Button onClick={this.handleCreatNewInvoice.bind(this)}>未开票，开具新发票</Button></Col>
						</Row>
					</div>
				</Modal>
				<Modal
					title='填写发票信息'
					visible={this.state.creatNewInvoiceVisible}
					onCancel={this.handleCreatNewInvoiceOk.bind(this)}
					onOk={this.handleCreatNewInvoiceOk.bind(this)}
					okText="提交"
					cancelText="取消"
					width='820px'
					closable={false}
					footer={null}
				>
					<div>
						<p>
							<span key='apply-amount' className='modal-tip-title'>发票申请单金额：{this.state.applyAmount}元</span>
							{this.state.type === 5 ? <span>（已开发票金额:{calcSum(acountAry).toFixed(2)}元）</span> : null}
							{this.state.type === 5 ? <span key='can-invoice-amount' className='modal-tip-title'>可开发票金额：{this.state.canInvoice}元</span> : null}
							{this.state.type === 1 || this.state.type === 5 ? <span key='apply-amount' className='modal-tip-title' style={{marginLeft: 10}}>应回款金额：{this.state.receivableCount}元</span> : null}
						</p>
						<p className='modal-tip-title'>已填开票金额：<span className='some-red-span'>{this.state.totalSum}元</span></p>
						<AddInvoiceInfo
							availableInvoiceList={availableInvoiceList}
							handleSelectData={this.handleSelectData.bind(this)}
							id={this.state.invoiceApplyId}
							applyAmount={this.state.applyAmount}
							receivableCount={this.state.receivableCount}
							canInvoice={this.state.canInvoice}
							type={this.state.type}
							handleCreatNewInvoiceOk={this.handleCreatNewInvoiceOk.bind(this)}
							handleSelsetSubmit={this.handleSelsetSubmit.bind(this)}
							handleTotalSum={this.handleTotalSum}
							handleLimit={(limit) => { this.setState({ limit }) }}
						></AddInvoiceInfo>
					</div>

				</Modal>
			</div >
		)
	}
}
const mapStateToProps = (state) => ({
	role: state.invoice.applyList.role,
	availableInvoiceList: state.invoice.availableInvoiceList,

})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...applyListAction
	}, dispatch)
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(InvoiceRelateModal))

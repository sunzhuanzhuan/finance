import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Modal, Form, message, Skeleton } from 'antd';
import * as applyListAction from '../actions/index'
import './ApplyList.less';
import AddInvoiceInfo from '../containers/AddInvoiceInfo'
import { calcSum } from "../../util";
import { shallowEqual } from '@/util';

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
			totalInvoiceVoidAmount: '',
			applyAmount: '',
			realAmount: '',
			canInvoice: '',
			type: 1,
			totalSum: 0,
			limit: 50,
			receivableCount: 0
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { relateModalVisible = '' } = nextProps;
		const { isAssociateVisible = '' } = prevState;
		if(!shallowEqual(relateModalVisible, isAssociateVisible)) {
			return {
				isAssociateVisible: relateModalVisible,
			}
		}
		return null;
	}

	componentDidUpdate(_, prevState) {
		const { isAssociateVisible } = this.state;
		const { isAssociateVisible: prevVisible } = prevState;
		if(isAssociateVisible && !prevVisible) {
			const { relateBaseInfo = {} } = this.props;
			const { type_display, id, company_id, amount, can_invoice, type, receivableCount, real_amount } = relateBaseInfo;
			this.isAssociate(type_display, id, company_id, amount, can_invoice, type, receivableCount, real_amount)
		}
	}

	//申请单列表 操作项-是否关联发票
	isAssociate = (type_display, id, company_id, amount, can_invoice, type, receivableCount, real_amount) => {
		this.setState({
			isAssociateBtnVisible: type_display,
			invoiceApplyId: id,
			applyAmount: amount,
			realAmount: real_amount, 
			canInvoice: can_invoice,
			type: type,
			receivableCount,
			companyInfoLoading: true
		}, () => {
			this.props.actions.getAvailableInvoiceList(this.state.invoiceApplyId, [], 1, this.state.limit).catch(({ errorMsg }) => {
				message.warning(errorMsg || '请求出错', 1)
			});
			this.props.actions.getInvoiceStat(company_id).then((data) => {
				this.setState({
					totalSpendAmount: data.total_spend_amount,
					totalRechargeAmount: data.total_recharge_amount,
					totalInvoicedAmount: data.total_invoiced_amount,
					totalInvoiceVoidAmount: data.total_invoice_void_amount,
					companyInfoLoading: false,
				});
			}).catch(({ errorMsg }) => {
				this.setState({companyInfoLoading: false,})
				message.warning(errorMsg || '请求出错', 1)
			})
		});

	}

	//开新发票
	handleCreatNewInvoice = () => {
		this.props.isShowRelateModal();
		this.setState({
			isAssociateBtnVisible: false,
			creatNewInvoiceVisible: true,
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
			isShowRelateModal
		} = this.props;
		return (
			<div>
				<Modal
					title="是否已开发票"
					visible={this.state.isAssociateVisible}
					onCancel={isShowRelateModal}
					footer={null}
					width='580px'
				>
					<Skeleton loading={this.state.companyInfoLoading}>
						<div>
							{
								(this.state.totalInvoicedAmount > this.state.totalSpendAmount) || (this.state.totalInvoicedAmount > this.state.totalRechargeAmount) ? <p style={{ fontSize: '12px' }}><span style={{ color: 'red' }}>预警提示：</span>该公司发票已开超，请谨慎操作</p> : null
							}
							<p style={{ fontSize: '12px' }}>该公司总消费：{this.state.totalSpendAmount}元，总充值：{this.state.totalRechargeAmount}元，已开票金额（含合同、邮件审批）：{this.state.totalInvoicedAmount}元，总作废金额：{this.state.totalInvoiceVoidAmount}</p>
							<p>请确认该发票申请单之前没有开过发票，以免开重，然后再进行下一步操作</p>
							<Row type="flex" justify="center" gutter={16}>
								{this.state.isAssociateBtnVisible == '消费' || this.state.isAssociateBtnVisible == '充值' ? <Col><Button><Link to={"/finance/invoice/associateInvoice?id=" + this.state.invoiceApplyId + "&role=" + role + "&receivable=" + this.state.receivableCount}>已开票，关联现有发票</Link></Button></Col> : ''}
								<Col><Button onClick={this.handleCreatNewInvoice.bind(this)}>未开票，开具新发票</Button></Col>
							</Row>
						</div>
					</Skeleton>
					
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
							{this.state.type === 1 || this.state.type === 5 ? <span key='apply-amount-b' className='modal-tip-title' style={{marginLeft: 10}}>应回款金额：{this.state.receivableCount}元</span> : null}
						</p>
						<p>
							<span className='modal-tip-title'>已开票金额:{this.state.realAmount}元</span>
							<span>本次可开票的金额：{this.state.canInvoice}元</span>
						</p>
						{/* <p className='modal-tip-title'>已填开票金额：<span className='some-red-span'>{this.state.totalSum}元</span></p> */}
						<AddInvoiceInfo
							availableInvoiceList={availableInvoiceList}
							handleSelectData={this.handleSelectData.bind(this)}
							id={this.state.invoiceApplyId}
							applyAmount={this.state.applyAmount}
							receivableCount={this.state.receivableCount}
							canInvoice={this.state.canInvoice}
							type={this.state.type}
							handleCreatNewInvoiceOk={this.handleCreatNewInvoiceOk.bind(this)}
							handleSelsetSubmit={this.props.refreshData.bind(this)}
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

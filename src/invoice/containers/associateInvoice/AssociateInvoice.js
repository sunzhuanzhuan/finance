import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Divider, Modal, Icon, message } from "antd";
import AssociateInvoiceTabs from "./AssociateInvoiceTabs";
import FixedBottom from "../../components/FixedBottom";
import * as actions from "../../actions/associateInvoice";

import { createInvoiceAssociation } from '../../constants/api';
import './associateInvoice.less';
import MyDialog from "../../components/myDialog";
import qs from "qs";
const { clearTimeout } = window

class AssociateInvoice extends Component {
	state = {
		tabsShow: false,
		stepA: false,
		dialogShow: false
	}
	async componentWillMount() {
		//let { setInvoiceListSelected, getAssociateInvoiceDetail, location: { query: { id } } } = this.props;
		let { setInvoiceListSelected, getAssociateInvoiceDetail } = this.props;
		//修改了获取值的方式
		const search = qs.parse(this.props.location.search.substring(1))
		await getAssociateInvoiceDetail(search.id).catch(({ errorMsg }) => {
			message.warning(errorMsg, 1);
		});
		this.setState({ tabsShow: true })
		setInvoiceListSelected([])

	}
	submitStepValidity = () => {
		let { detail: { can_invoice }, selected, detail: { invoice_type_display } } = this.props;
		let total = this.totalBox.totalValue || 0;
		let type = invoice_type_display || '';
		let isType = this.totalBox.typeTally || false
		if (selected.length <= 0) {
			this.warning('请选择发票后再提交!')
		} else if (parseFloat(total) < parseFloat(can_invoice)) {
			this.warning('已选择发票的可关联金额的总和不等于本次可开票金额!')
		} else if (!isType) {
			this.warning('请保证选择的发票类型都是' + type + '，然后再提交!')
		} else {
			this.submitStepA(true)
		}

	}

	submitStepA = (show) => {
		this.setState({ stepA: show })
	}
	submitStepB = async () => {
		let { detail: { id = 0 } } = this.props;
		this.setState({ stepBLoading: true })
		createInvoiceAssociation({
			id,
			invoices: this.totalBox.totalItem
		}).then((result) => {
			this.setState({ stepBLoading: false })
			this.success(result)
			this.submitStepA(false)
		}).catch(({errorMsg}) => {
			this.setState({ stepBLoading: false })
			this.error(errorMsg)
			this.submitStepA(false)
		})
	}
	error = msg => {
		try {
			if (typeof message.destroy === 'function') {
				message.destroy();
			}
			message.error(msg || '操作失败！');
		}catch (error) {
			console.log(error);
		}
	};
	warning = (message) => {
		Modal.warning({
			title: '提示',
			className: 'warning-box',
			content: (<div className='box'>
				<Icon type="exclamation-circle" />
				<main>
					<p>{message}</p>
				</main>
			</div>),
		});
	}
	success = (data) => {
		message.success(data.message || 'OK', 2, () => {
			let timer = setTimeout(() => {
				clearTimeout(timer)
				this.props.history.push('/finance/invoice/applyList')
			}, 300);
		});
	}
	componentWillReceiveProps(nextProps) {
		let { list: { hashMap }, selected = [], detail: { invoice_type_display } } = nextProps;
		let totalBox = { totalItem: [], totalValue: 0, totalCount: 0, typeTally: true }
		// console.log(nextProps.detail.amount)
		// 计算已选
		totalBox.totalCount = selected.length;
		totalBox.totalValue = selected.reduce((pre, cur) => {
			if (hashMap[cur]['invoice_type_display'] != invoice_type_display) {
				totalBox.typeTally = false
			}
			let _item = {
				invoice_id: hashMap[cur]['invoice_id'],
				amount: hashMap[cur]['amount'],
				invoice_amount: hashMap[cur]['invoice_amount'],
			}
			// console.log(pre)
			// if (pre > nextProps.detail.amount) {
			// 	alert(cur)
			// }
			totalBox.totalItem.push(_item)
			return (pre + _item["invoice_amount"]);
		}, 0) || 0;

		this.totalBox = totalBox

	}
	render() {
		let { detail: {
			id,
			company_name,
			creator_name,
			invoice_title,
			invoice_type_display,
			amount,
			comment,
			receivables_payback_amount,
			can_invoice
		}, selected } = this.props;
		//}, selected, location: { query: { role } } } = this.props;
		//修改了获取值的方式
		const role = qs.parse(this.props.location.search.substring(1)).role
		const dialogProps = {
			visible: this.state.dialogShow,
			visibleCall: () => {
				this.setState({ dialogShow: false });
			},
			type: 3
		};
		return (
			<div className='associate-invoice'>
				<div id="box" style={{ marginBottom: '62px' }} >
					<fieldset>
						<legend>关联发票</legend>
						<Row type="flex" justify="start" gutter={16} style={{ lineHeight: "32px" }} >
							{/* 此处需要改成详情页路由的url */}
							<Col><h4>发票申请单ID：<a href={'/finance/invoice/applyDetail?id=' + id + '&role=' + role}>{id || '-'}</a></h4></Col>
							<Col><h4>公司简称：{company_name || '-'}</h4></Col>
							<Col><h4>销售：{creator_name || '-'}</h4></Col>
							<Col><h4>发票抬头：{invoice_title || '-'}</h4></Col>
							<Col><h4>发票类型：{invoice_type_display || '-'}</h4></Col>
							<Col><h4>发票申请单金额：</h4></Col>
							<Col><b className="totalNumL">{amount || 0}</b></Col>
							<Col><h4>应回款金额：</h4></Col>
							<Col><b className="totalNumL">{receivables_payback_amount}</b></Col>
							<Col><h4>可开票金额：</h4></Col>
							<Col><b className="totalNumL">{can_invoice}</b></Col>
						</Row>
						<Row type="flex" justify="start" gutter={16} style={{ lineHeight: "32px" }} >
							<Col><h4>备注信息：{comment || '无'}</h4></Col>
						</Row>
						<Row type="flex" justify="start" gutter={16}
							style={{ lineHeight: "32px" }}
						>
							<Col><h4>当前已选发票：
								<span className="totalNumM">{this.totalBox ? this.totalBox.totalCount : 0}</span> 张
								<Divider type="vertical" />
								<span className="totalNumM">{this.totalBox ? this.totalBox.totalValue.toFixed(2) : 0}</span> 元
							</h4></Col>
							<Col>{selected.length > 0 ? <Button type="primary" onClick={() => {
								this.setState({ dialogShow: true });
							}}>查看已选</Button>
								: null}
							</Col>
						</Row>
					</fieldset>
					{id ? <AssociateInvoiceTabs /> : null}
				</div>
				<FixedBottom>
					<Button type='primary' disabled={selected.length <= 0}
						onClick={this.submitStepValidity}>提交</Button>
				</FixedBottom>
				{this.state.stepA ? <Modal visible={true}
					confirmLoading={this.state.stepBLoading}
					onCancel={() => { this.submitStepA(false) }}
					width='340px'
					bodyStyle={{ paddingBottom: '5px' }}
					onOk={this.submitStepB}>
					<div className='modal-tip-q'>
						<Icon type="exclamation-circle" />
						<main>
							<h3>是否确认提交？</h3>
						</main>
					</div>
				</Modal> : null}
				{this.state.dialogShow ? <MyDialog {...dialogProps} /> : null}
			</div >
		);
	}
}
export default connect(
	state => ({
		detail: state.invoice.associateInvoiceDetail,
		list: state.invoice.invoiceList,
		selected: state.invoice.invoiceListSelected,
	}),
	actions
)(AssociateInvoice);

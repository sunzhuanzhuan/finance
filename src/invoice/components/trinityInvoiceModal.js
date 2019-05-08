import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions/trinityInvoice";
import { Modal, message, Button, Form, Input, Select, DatePicker } from 'antd'
import numeral from 'numeral'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const format = 'YYYY-MM-DD';
class PreModal extends React.Component {
	constructor() {
		super();
		this.state = {
			isClick: false,
		}
	}
	componentDidMount() {
		const { status, record } = this.props;
		if (status === 'modification') {
			let timer = setTimeout(() => {
				this.props.form.setFieldsValue({
					invoice_source: parseInt(record.invoice_source),
					invoice_number: record.invoice_number,
					business_account_id: parseInt(record.business_account_id),
					invoice_title: parseInt(record.invoice_title),
					beneficiary_company: record.beneficiary_company,
					invoice_content: record.invoice_content,
					invoice_pure_amount: record.invoice_pure_amount,
					invoice_tax_amount: record.invoice_tax_amount,
					invoice_make_out_time: moment(record.invoice_make_out_time, format),
					remark: record.remark
				})
				clearTimeout(timer);
			}, 0);
		}
	}
	titleMapping = (status) => {
		const Mapping = {
			'new': { title: '新增发票', actionName: 'postTrinityInvoiceAdd' },
			'modification': { title: '编辑', actionName: 'postTrinityInvoiceEdit' },
		}
		return Mapping[status]
	}
	handlePureChange = e => {
		this.pureValue = e.target.value;
		if (e.target.value && !isNaN(this.taxValue)) {
			this.props.form.setFieldsValue({
				invoice_tax: numeral(this.taxValue / this.pureValue * 100).format('0.00')
			});
		}
	}
	handleTaxChange = e => {
		this.taxValue = e.target.value;
		if (e.target.value && !isNaN(this.pureValue)) {
			this.props.form.setFieldsValue({
				invoice_tax: numeral(this.taxValue / this.pureValue * 100).format('0.00')
			});
		}
	}
	handleModal = (content) => {
		const { onCancel, status, type } = this.props;
		this.setState({ isClick: true }, () => {
			Modal.confirm({
				title: '提示',
				content,
				onOk: () => {
					this.setState({ isClick: false });
					onCancel();
					this.handleSubmit(status, type);
				},
				onCancel: () => {
					this.setState({ isClick: false });
				},
			})
		})
	}
	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const hide = message.loading('操作中，请稍候...');
				const { search, status, onCancel } = this.props;
				const actionName = this.titleMapping(status).actionName;
				this.props.actions[actionName]({
					business_account_type: 3,
					...values,
					invoice_make_out_time: moment(values.invoice_make_out_time).format(format)
				}).then(() => {
					message.success('操作成功!');
					hide();
					onCancel();
					this.props.queryAction({ ...search.keys }).catch(({ errorMsg }) => {
						message.error(errorMsg || '列表刷新失败，请重试！');
					})
				}).catch(({ errorMsg }) => {
					message.error(errorMsg || '操作失败，请重试！');
				})
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { visible, onCancel, status, SearchItem, modType } = this.props;
		const { isClick } = this.state;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		};
		const options = {
			rules: [{ required: true, message: '该项为必填项！' }],
		}
		const title = this.titleMapping(status).title;

		return <Modal
			wrapClassName='trinityInvoice-modal'
			key={status}
			width={500}
			title={title}
			visible={visible}
			maskClosable={false}
			onCancel={onCancel}
			footer={[
				<Button key="back" onClick={onCancel}>返回</Button>,
				<Button key="submit" type="primary" disabled={isClick} onClick={this.handleSubmit
				}>确认</Button>
			]}
		>
			<Form>
				<FormItem label='发票来源' {...formItemLayout}>
					{getFieldDecorator('invoice_source', { ...options })(
						<Select placeholder="请选择" style={{ width: 200 }} disabled={modType == 2}
						>
							{SearchItem && SearchItem.invoice_source.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票号' {...formItemLayout}>
					{getFieldDecorator('invoice_number', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} disabled={modType == 2} />
					)}
				</FormItem>
				<FormItem label='三方代理商' {...formItemLayout}>
					{getFieldDecorator('business_account_id', { ...options })(
						<Select placeholder="请选择" style={{ width: 200 }} disabled={modType == 2}
						>
							{SearchItem && SearchItem.agent.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票抬头' {...formItemLayout}>
					{getFieldDecorator('invoice_title', { ...options })(
						<Select placeholder="请选择" style={{ width: 200 }} disabled={modType == 2}
						>
							{SearchItem && SearchItem.invoice_title.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票开具方' {...formItemLayout}>
					{getFieldDecorator('beneficiary_company', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} />
					)}
				</FormItem>
				<FormItem label='发票内容' {...formItemLayout}>
					{getFieldDecorator('invoice_content', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} disabled={modType == 2} />
					)}
				</FormItem>
				<FormItem label='发票金额' {...formItemLayout}>
					{getFieldDecorator('invoice_pure_amount', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'元'} onChange={this.handlePureChange} disabled={modType == 2} />
					)}
				</FormItem>
				<FormItem label='发票税额' {...formItemLayout}>
					{getFieldDecorator('invoice_tax_amount', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'元'} onChange={this.handleTaxChange} disabled={modType == 2} />
					)}
				</FormItem>
				{status === 'new' && <FormItem label='发票税率' {...formItemLayout}>
					{getFieldDecorator('invoice_tax')(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'%'} disabled={true} />
					)}
				</FormItem>}
				{status === 'new' && <FormItem label='发票类型' {...formItemLayout}>
					{getFieldDecorator('invoice_type')(
						<Select placeholder="请选择" style={{ width: 200 }}
						>
							{SearchItem && SearchItem.invoice_type.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>}
				<FormItem label='开票日期' {...formItemLayout}>
					{getFieldDecorator('invoice_make_out_time', { ...options })(
						<DatePicker placeholder='请选择' format={format} style={{ width: 200 }} disabled={modType == 2} />
					)}
				</FormItem>
				<FormItem label='备注' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<TextArea placeholder='非必输' autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} disabled={modType == 2} />
					)}
				</FormItem>
			</Form>
		</Modal>
	}
}

const mapStateToProps = (state) => {
	return {
		prePayData: state.trinityPay.prePayData,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PreModal))

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { Modal, message, Button, Form, Input, Select, DatePicker } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PreModal extends React.Component {
	constructor() {
		super();
		this.state = {
			isClick: false,
		}
	}
	titleMapping = (status) => {
		const Mapping = {
			'new': '新增发票',
			'modification': '编辑',
			'check': '发票信息',
		}
		return Mapping[status]
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
				const { search } = this.props;
				this.props.actions.postTrinityInvoiceAdd({ ...values }).then(() => {
					message.success('操作成功!');
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
		const { visible, onCancel, status, SearchItem } = this.props;
		const { isClick } = this.state;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		};
		const options = {
			rules: [{ required: true, message: '该项为必填项！' }],
		}
		const title = this.titleMapping(status);

		return <Modal
			wrapClassName='prePay-modal'
			key={status}
			width={500}
			title={title}
			visible={visible}
			maskClosable={false}
			onCancel={onCancel}
			footer={
				status === 'check' ? [
					<Button key="back" onClick={onCancel}>返回</Button>
				] : [
						<Button key="back" onClick={onCancel}>返回</Button>,
						<Button key="submit" type="primary" disabled={isClick} onClick={this.handleSubmit
						}>确认</Button>
					]}
		>
			{(status === 'new' || status === 'modification') && <Form>
				<FormItem label='发票来源' {...formItemLayout}>
					{getFieldDecorator('invoice_source', { ...options })(
						<Select placeholder="请选择" style={{ width: 200 }}
						>
							{SearchItem && SearchItem.invoice_source.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票号' {...formItemLayout}>
					{getFieldDecorator('invoice_number', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} />
					)}
				</FormItem>
				<FormItem label='三方代理商' {...formItemLayout}>
					{getFieldDecorator('agent_id', { ...options })(
						<Select placeholder="请选择" style={{ width: 200 }}
						>
							{SearchItem && SearchItem.agent.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票抬头' {...formItemLayout}>
					{getFieldDecorator('invoice_title', { ...options })(
						<Select placeholder="请选择" style={{ width: 200 }}
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
						<Input placeholder="请输入" style={{ width: 200 }} />
					)}
				</FormItem>
				<FormItem label='发票金额' {...formItemLayout}>
					{getFieldDecorator('invoice_pure_amount', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'元'} />
					)}
				</FormItem>
				<FormItem label='发票税额' {...formItemLayout}>
					{getFieldDecorator('invoice_tax_amount', { ...options })(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'元'} />
					)}
				</FormItem>
				{status === 'new' && <FormItem label='发票税率' {...formItemLayout}>
					{getFieldDecorator('invoice_tax')(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'%'} />
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
						<DatePicker placeholder='请选择' style={{ width: 200 }} />
					)}
				</FormItem>
				<FormItem label='备注' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<TextArea placeholder='非必输' autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
					)}
				</FormItem>
			</Form>}
			{status === 'check' && 111}

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

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { Modal, Button, Form, Input, Select } from 'antd'
import { OssUpload } from 'wbyui'

const FormItem = Form.Item;
const Option = Select.Option;

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
	handleSubmit = (status, type) => {
		const { search, id, page, prePayData: { list } } = this.props;
		const actionName = this.titleMap(status, type).actionName;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const current = (search.keys && search.keys.payment_status && list.length === 1) ? (page - 1 || page) : page;
				let params = {
					payment_slip_id: id,
					payment_screenshot: values.payment_screenshot
				}
				status == 'revocation' ? params.payment_backout_reason = values.remark : params.payment_remark = values.remark;
				console.log('%cparams: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', params);
				// this.props.actions[actionName](params).then(() => {
				// 	message.success('操作成功!');
				// 	this.props.queryAction({ page: current, ...search.keys });
				// }).catch(({ errorMsg }) => {
				// 	message.error(errorMsg || '操作失败，请重试！');
				// })
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { visible, onCancel, status, SearchItem } = this.props;
		const { isClick } = this.state;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		};
		const title = this.titleMapping(status);

		return <Modal
			wrapClassName='prePay-modal'
			key={status}
			width={640}
			title={title}
			visible={visible}
			maskClosable={false}
			onCancel={onCancel}
			footer={
				[
					<Button key="back" onClick={onCancel}>返回</Button>,
					<Button key="submit" type="primary" disabled={isClick} onClick={() => {
						// this.handleModal(article.content)
					}}>确认</Button>
				]}
		>
			<Form>
				<FormItem label='发票来源' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Select placeholder="请选择" style={{ width: 200 }}
						>
							{SearchItem && SearchItem.is_reset.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票号' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Input placeholder="请输入" style={{ width: 200 }} />
					)}
				</FormItem>
				<FormItem label='三方代理商' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Select placeholder="请选择" style={{ width: 200 }}
						>
							{SearchItem && SearchItem.agent.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票抬头' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Select placeholder="请选择" style={{ width: 200 }}
						>
							{SearchItem && SearchItem.invoice_title.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='发票开具方' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Input placeholder="请输入" style={{ width: 200 }} />
					)}
				</FormItem>
				<FormItem label='发票内容' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Input placeholder="请输入" style={{ width: 200 }} />
					)}
				</FormItem>
				<FormItem label='发票金额' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'元'} />
					)}
				</FormItem>
				<FormItem label='发票税额' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'元'} />
					)}
				</FormItem>
				<FormItem label='发票税率' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Input placeholder="请输入" style={{ width: 200 }} suffix={'%'} />
					)}
				</FormItem>
				<FormItem label='发票类型' {...formItemLayout}>
					{getFieldDecorator('remark')(
						<Select placeholder="请选择" style={{ width: 200 }}
						>
							{SearchItem && SearchItem.invoice_type.map((item) =>
								<Option key={item.value} value={item.value}>{item.name}</Option>)
							}
						</Select>
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

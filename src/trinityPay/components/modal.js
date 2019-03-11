import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { Modal, Button, Form, Input, message } from 'antd'
import { withRouter } from 'react-router-dom';
import { WBYUploadFile } from 'wbyui'
import qs from 'qs'
const FormItem = Form.Item;
const { TextArea } = Input;

class PreModal extends React.Component {
	constructor() {
		super();
		this.state = {
			isClick: false
		}
	}
	titleMap = type => {
		const maps = {
			'succeed': ['打款成功备注及截图', '确定打款成功吗？', 'getPrePaySuccess'],
			'defeated': ['打款失败原因', '确定打款失败吗？', 'getPrePayFail'],
			'revocation': ['打款撤销原因', '确定打款撤销吗？', 'getPrePayBackout']
		};
		return maps[type]
	}
	handleModal = (content) => {
		const { onCancel, type } = this.props;
		this.setState({ isClick: true }, () => {
			Modal.confirm({
				title: '提示',
				content,
				onOk: () => {
					this.setState({ isClick: false });
					onCancel();
					this.handleSubmit(type);
				},
				onCancel: () => {
					this.setState({ isClick: false });
				},
			})
		})
	}
	handleSubmit = (type) => {
		const { search, id, page, prePayData: { list } } = this.props;
		const actionName = this.titleMap(type)[2];
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const current = (search.keys && search.keys.payment_status && list.length === 1) ? (page - 1 || page) : page;
				let params = {
					payment_slip_id: id
				}
				this.props.actions[actionName](params).then(() => {
					message.success('操作成功!');
					this.props.queryAction({ page: current, ...search.keys });
				}).catch(({ errorMsg }) => {
					message.error(errorMsg || '操作失败，请重试！');
				})
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { visible, onCancel, type, key } = this.props;
		const { isClick } = this.state;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		};
		const article = this.titleMap(type);
		return <Modal
			wrapClassName='prePay-modal'
			key={key}
			width={640}
			title={article[0]}
			visible={visible}
			maskClosable={false}
			onCancel={onCancel}
			footer={
				[
					<Button key="back" onClick={onCancel}>返回</Button>,
					<Button key="submit" type="primary" disabled={isClick} onClick={() => {
						this.handleModal(article[1])
					}}>确认</Button>
				]}
		>
			<Form>
				<FormItem label='备注' {...formItemLayout}>
					{getFieldDecorator('comment')(
						<TextArea placeholder='非必输' autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
					)}
				</FormItem>
				{/* <FormItem label='截图' {...formItemLayout}>
					{getFieldDecorator('pics')(
						<WBYUploadFile
							ref={(x) => this.uploadFile = x}
							tok={{
								token: businessToken.upload_token,
								upload_url: businessToken.upload_url
							}}
							onChange={this.handleFileChange}
							listType='text'
							uploadText={'上传'}
							multiple={true}
							size={10}
							len={5}
							accept={".png,.jpg,.jpeg"} />
					)}
				</FormItem> */}
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

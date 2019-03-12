import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { Modal, Button, Form, Input, message } from 'antd'
import { WBYUploadFile } from 'wbyui'
const FormItem = Form.Item;
const { TextArea } = Input;

class PreModal extends React.Component {
	constructor() {
		super();
		this.state = {
			isClick: false
		}
	}
	titleMap = (status, type) => {
		const succeedName = type => {
			const actionMap = {
				'prePay': 'postPrePaySuccess',
				'datePay': 'postDatePaySuccess',
			}
			return actionMap[type]
		}
		const defeatedName = type => {
			const actionMap = {
				'prePay': 'postPrePayFail',
				'datePay': 'postDatePayFail',
			}
			return actionMap[type]
		}
		const revocationName = type => {
			const actionMap = {
				'prePay': 'postPrePayBackout',
				'datePay': 'postDatePayBackout',
			}
			return actionMap[type]
		}
		const maps = {
			'succeed': { title: '打款成功备注及截图', content: '确定打款成功吗？', actionName: succeedName(type) },
			'defeated': { title: '打款失败原因', content: '确定打款失败吗？', actionName: defeatedName(type) },
			'revocation': { title: '打款撤销原因', content: '确定打款撤销吗？', actionName: revocationName(type) },
		};
		return maps[status]
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
		const { visible, onCancel, status, type, key } = this.props;
		const { isClick } = this.state;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		};
		const article = this.titleMap(status, type);
		console.log('%carticle: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', article);
		console.log('%ctype: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', type);
		console.log('%cstatus: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', status);
		return <Modal
			wrapClassName='prePay-modal'
			key={key}
			width={640}
			title={article.title}
			visible={visible}
			maskClosable={false}
			onCancel={onCancel}
			footer={
				[
					<Button key="back" onClick={onCancel}>返回</Button>,
					<Button key="submit" type="primary" disabled={isClick} onClick={() => {
						this.handleModal(article.content)
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

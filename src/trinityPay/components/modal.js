import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { Modal, Button, Form, Input } from 'antd'
import { OssUpload } from 'wbyui'

const FormItem = Form.Item;
const { TextArea } = Input;

class PreModal extends React.Component {
	constructor() {
		super();
		this.state = {
			isClick: false,
			token: undefined,
			array: []
		}
	}
	componentDidMount() {
		const { status } = this.props;
		if (status == 'succeed') {
			this.props.actions.getPayToken().then((res) => {
				const array = [
					{
						uid: "rc-upload-1553065863946-3",
						status: 'done',
						name: "打包.png",
						url: "http://dev-wby-epoch.oss-cn-beijing.aliyuncs.com/B_GZA_ORDER_IMG_NORMAL_UPLOAD/e0dab700134d443086c4b4b8d244af0b.png",
					},
					{
						uid: "rc-upload-1553065863946-6",
						status: 'done',
						name: "name.jpg",
						url: "http://dev-wby-epoch.oss-cn-beijing.aliyuncs.com/B_GZA_ORDER_IMG_NORMAL_UPLOAD/b0ad78703f494c248f772c5b3ff31504.jpg",
					},
					{
						uid: "rc-upload-1553065863946-7",
						status: 'done',
						name: "node eventLoop.png",
						url: "http://dev-wby-epoch.oss-cn-beijing.aliyuncs.com/B_GZA_ORDER_IMG_NORMAL_UPLOAD/b5ff67b059c3415e87eb1215b2d3ef8b.png",
					},
				]
				const { data } = res;
				this.setState({
					token: data,
					array
				})
			})
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
		const { visible, onCancel, status, type, key } = this.props;
		const { isClick, token, array } = this.state;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		};
		const article = this.titleMap(status, type);

		return <Modal
			wrapClassName='prePay-modal'
			key={key}
			width={status == 'succeed' ? 780 : 640}
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
					{getFieldDecorator('remark')(
						<TextArea placeholder='非必输' autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
					)}
				</FormItem>
				{token && <FormItem label='截图' {...formItemLayout}>
					{getFieldDecorator('payment_screenshot', {
						initialValue: array,
						valuePropName: 'fileList',
						getValueFromEvent: e => e.fileList
					})(
						<OssUpload
							len={5}
							listType="picture-card"
							authToken={token}
							rule={{
								bizzCode: 'TRINITY_PROOF_PAYMENT_IMG_UPLOAD',
								suffix: "bmp,jpg,jpeg,gif,png",
								max: 5
							}}
							multiple={true}
						>
						</OssUpload>
					)}
				</FormItem>}
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

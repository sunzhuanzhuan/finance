import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import * as goldenActions from "../../actions/goldenApply";
import { Modal, Button, Form, Input, message, Select, Radio } from "antd";
import { WBYUploadFile } from 'wbyui';
import qs from 'qs';
import numeral from 'numeral';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

class ApplyModal extends React.Component {
	constructor() {
		super();
		this.state = {
			isClick: false,
			loading: false,
			priceType: 1
		}
		this.attachment = '';
		this.priceTypeOption = [
			{ label: '利润率/服务费率调整', value: 1 },
			{ label: '按金额调整', value: 2 },
			{ label: '调整到订单底价', value: 3 },
		];
	}
	componentDidMount() {
		this.attachment = ''
	}
	handleFunction = (action, params) => {
		return func => {
			const hide = message.loading('操作中，请稍候...');
			action({ ...params }).then((res) => {
				func(res);
				hide();
			}).catch(({ errorMsg }) => {
				hide();
				message.error(errorMsg || '操作失败！');
				this.setState({ isClick: false });
			})
		}
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getApplicationDetail({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleApplicationPreview = e => {
		e.preventDefault();
		const { readjustId, companyId, togglePreview } = this.props;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const hide = message.loading('加载中,请稍候...');
				this.queryData({ page: 1, page_size: 50, status: 1, readjust_application_id: readjustId, company_id: companyId }).then(() => {
					const { applicationDetail: { list = [] } } = this.props;
					const order_ids = list.map(item => item.order_id).toString();
					const params = {
						...values,
						order_ids,
						profit_rate: values['profit_rate'] && values['profit_rate'] != 0 ? numeral(values['profit_rate'] / 100).format('0.0000') : 0,
						service_rate: values['service_rate'] && values['service_rate'] != 0 ? numeral(values['service_rate'] / 100).format('0.0000') : 0,
						readjust_application_id: readjustId
					}
					this.props.actions.postPreviewMinSellPrice(params).then(() => {
						togglePreview(true, () => {
							hide();
						})
					}).catch(({ errorMsg }) => {
						hide();
						message.error(errorMsg || '获取预览结果失败，请重试！');
					})
				})
			}
		})
	}
	handlePreview = e => {
		const search = qs.parse(this.props.location.search.substring(1));
		const { curSelectRowKeys, togglePreview } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const hide = message.loading('加载中,请稍候...');
				const order_ids = curSelectRowKeys.toString();
				const params = {
					...values,
					order_ids,
					profit_rate: values['profit_rate'] && values['profit_rate'] != 0 ? numeral(values['profit_rate'] / 100).format('0.0000') : 0,
					service_rate: values['service_rate'] && values['service_rate'] != 0 ? numeral(values['service_rate'] / 100).format('0.0000') : 0,
					readjust_application_id: search.readjust_application_id
				}
				this.props.actions.postPreviewMinSellPrice(params).then(() => {
					togglePreview(true, () => {
						hide();
					})
				}).catch(({ errorMsg }) => {
					hide();
					message.error(errorMsg || '获取预览结果失败，请重试！');
				})
			}
		})
	}
	handleSubmit = (e) => {
		const attachment = this.attachment;
		const search = qs.parse(this.props.location.search.substring(1));
		const { type, queryAction, onCancel, curSelectRowKeys, curSelectRows, handleClear } = this.props;
		const { postApplyReadjust, postPassByOrderIds, postPassByReadjust } = this.props.actions;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (type === 'add') {
					this.setState({ isClick: true });
					const params = {
						...values,
						attachment,
						order_ids: curSelectRowKeys.toString(),
						company_id: curSelectRows[0].company_id,
					};
					delete params['upload'];
					Object.keys(params).forEach(item => { !params[item] && params[item] !== 0 ? delete params[item] : null });
					this.handleFunction(postApplyReadjust, params)((res) => {
						Modal.success({
							title: '',
							content: `申请成功，申请编号${res.data}`,
							onOk: () => {
								onCancel();
								this.props.history.push('/finance/golden/adjustApply');
							}
						});
					})
				} else if (type === 'detail') {
					this.setState({ isClick: true });
					const params = {
						...values,
						order_ids: curSelectRowKeys.toString(),
						profit_rate: values['profit_rate'] && values['profit_rate'] != 0 ? numeral(values['profit_rate'] / 100).format('0.0000') : 0,
						service_rate: values['service_rate'] && values['service_rate'] != 0 ? numeral(values['service_rate'] / 100).format('0.0000') : 0,
						readjust_application_id: search.readjust_application_id
					};
					Object.keys(params).forEach(item => { !params[item] && params[item] !== 0 ? delete params[item] : null });
					this.handleFunction(postPassByOrderIds, params)(() => {
						queryAction({ page: 1, ...search.keys }, () => {
							message.success('操作成功！');
							this.setState({ isClick: false });
							handleClear();
							onCancel();
						})
					})
				} else if (type === 'pass') {
					this.setState({ isClick: true });
					const params = {
						...values,
						profit_rate: values['profit_rate'] && values['profit_rate'] != 0 ? values['profit_rate'] / 100 : 0,
						service_rate: values['service_rate'] && values['service_rate'] != 0 ? values['service_rate'] / 100 : 0,
						readjust_application_id: this.props.readjustId
					};
					Object.keys(params).forEach(item => { !params[item] && params[item] !== 0 ? delete params[item] : null });
					this.handleFunction(postPassByReadjust, params)(() => {
						queryAction({ page: 1, page_size: this.props.page_size, ...search.keys }, () => {
							message.success('操作成功！');
							this.setState({ isClick: false });
							onCancel();
						})
					});
				}
			}
		});
	}
	handleFileChange = (fileList) => {
		this.attachment = (fileList.map(item => item.url)).toString();
	}
	checkProfitCount = (rule, value, callback) => {
		const reg = /^((-30|0)(\.0{1,2})?|[0-9]?\d(\.\d\d?)?|-([0-2]?\d)(\.\d\d?)?)$/;
		if (value) {
			if (reg.test(value.toString())) {
				callback();
				return;
			}
			callback('请填写-30.00到99.99的值！');
		} else {
			callback(' ')
		}
	}
	checkCount = (rule, value, callback) => {
		const reg = /^((100|-30|0)(\.0{1,2})?|[0-9]?\d(\.\d\d?)?|-([0-2]?\d)(\.\d\d?)?)$/;
		if (value) {
			if (reg.test(value.toString())) {
				callback();
				return;
			}
			callback('请填写-30.00到100.00的值！');
		} else {
			callback(' ')
		}
	}
	handleChangePriceType = ({target:{value}}) => {
		this.setState({ priceType: value })
	}
	getPriceTypeOption = total => {
		return this.priceTypeOption
			.filter(item => total > 1 ? item.value !== 2 : item)
			.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)
	}
	getPriceValueItem = (getFieldDecorator, otherLayout, quoteType) => {
		const { priceType } = this.state;
		if( priceType === 3 ) 
			return null;
		return priceType === 1 ? [
			<FormItem key='profit_rate' label='订单利润率' {...otherLayout}>
				{getFieldDecorator('profit_rate', quoteType == 1 ? {
					rules: [
						{ required: true, message: '请输入订单利润率!' },
						{ validator: this.checkProfitCount }
					]
				} : {})(
					<Input addonAfter={'%'} style={{ width: 200 }} disabled={quoteType == 2} />
				)}
			</FormItem>,
			<FormItem key='service_rate' label='服务费率' {...otherLayout}>
				{getFieldDecorator('service_rate', quoteType == 2 ? {
					rules: [
						{ required: true, message: '请输入服务费率!' },
						{ validator: this.checkCount }
					]
				} : {})(
					<Input addonAfter={'%'} style={{ width: 200 }} disabled={quoteType == 1} />
				)}
			</FormItem>
		] : 
		<FormItem label='本次审核最低售卖价' {...otherLayout}>
			{getFieldDecorator('bottom_price', quoteType == 2 ? {
				rules: [
					{ required: true, message: '请输入本次审核最低售卖价!' },
					{ validator: this.checkCount }
				]
			} : {})(
				<Input style={{ width: 200 }} disabled={quoteType == 1} />
			)}
		</FormItem>;
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { isClick, priceType } = this.state;
		const { visible, onCancel, type, goldenToken, quoteType, flag, isApplication, total, goldenMetadata } = this.props;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		};
		const otherLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
		return <Modal
			className='adjust-dialog'
			visible={visible}
			width={700}
			title={type === 'add' ? '批量订单调价申请' : '订单调价处理'}
			onCancel={onCancel}
			maskClosable={false}
			wrapClassName='adjust-dialog-list'
			footer={flag ? [
				<Button key='preview' type="primary" disabled={isClick} onClick={isApplication ? this.handleApplicationPreview : this.handlePreview}>预览结果</Button>,
				<Button key="submit" type="primary" disabled={isClick} onClick={this.handleSubmit}>确认提交</Button>,
				<Button key="back" onClick={onCancel}>取消</Button>
			] : [
					<Button key="submit" type="primary" disabled={isClick} onClick={this.handleSubmit}>确认提交</Button>,
					<Button key="back" onClick={onCancel}>取消</Button>
				]}
		>
			{type === 'add' ? <Form>
				<FormItem label='调价原因' {...formItemLayout}>
					{getFieldDecorator('reason', {
						rules: [
							{ required: true, message: '请输入调价原因!' },
						],
					})(
						<TextArea style={{ width: 400 }} autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
					)}
				</FormItem>
				<FormItem label="附件" {...formItemLayout} >
					{getFieldDecorator('upload')(
						<WBYUploadFile
							ref={x => this.uploadFile = x}
							tok={{
								token: goldenToken.upload_token,
								upload_url: goldenToken.upload_url
							}}
							onChange={this.handleFileChange}
							listType='text'
							uploadText={'上传'}
							multiple={true}
							size={10}
							len={5}
							accept={".png,.jpg,.jpeg"} />
					)}
				</FormItem>
				<div className='tip-message'>
					<p className='red-font'>请上传调价相关的审批邮件等信息</p>
					<p className='red-font'>最多可上传5个附件，单附件不能超过10M，格式：png、jpg、jpeg</p>
				</div>
			</Form> :
				<Form>
					<FormItem label='调价类型' {...otherLayout}>
						{getFieldDecorator('price_type', {
							initialValue: priceType,
							rules: [
								{ required: true, message: '请选择调价类型!' }
							]
						})(
							<RadioGroup onChange={this.handleChangePriceType}>
							{
								this.getPriceTypeOption(total)
							}
							</RadioGroup>
						)}
					</FormItem>
					{
						this.getPriceValueItem(getFieldDecorator, otherLayout, quoteType)
					}
					<FormItem label='备注' {...otherLayout}>
						{getFieldDecorator('remark')(
							<TextArea placeholder='非必输' style={{ width: 400 }} autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
						)}
					</FormItem>
				</Form>}
		</Modal>
	}
}

const mapStateToProps = (state) => {
	return {
		goldenToken: state.companyDetail.goldenToken,
		applicationDetail: state.companyDetail.applicationDetail,
		applicationPreview: state.companyDetail.applicationPreview,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form.create()(ApplyModal)))

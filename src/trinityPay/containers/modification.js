import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { message, Form, Row, Input, Button } from 'antd'
import { modificationColumns } from '../constants'
import './trinityPay.less'
import qs from 'qs'
const FormItem = Form.Item;

class Modification extends React.Component {
	constructor() {
		super();
		this.state = {
			type: undefined
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { setFieldsValue } = this.props.form;
		const ary = modificationColumns(search.type);

		this.setState({ type: search.type });
		this.queryData({ payment_slip_id: search.payment_slip_id }, () => {
			const { prePayDetail } = this.props;
			let obj = {};
			ary.forEach(item => {
				if (item === 'payment_screenshot') obj[item] = prePayDetail[item].toString();
				else obj[item] = prePayDetail[item];
			});
			setFieldsValue({ ...obj });
		});
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getPrePayDetail({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '详情加载失败，请重试！');
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const obj = {
					payment_slip_id: values['payment_slip_id'],
					payment_remark: values['payment_remark'],
					payment_screenshot: values['payment_screenshot']
				}
				const hide = message.loading('请稍候...');
				this.props.actions.postPrePayEdit({ ...obj }).then(() => {
					message.success('修改成功！');
					hide();
				}).catch(({ errorMsg }) => {
					message.error(errorMsg || '修改失败！');
					hide();
				})
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { type } = this.state;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 16 }
		};
		return <div className='modification-container'>
			<fieldset className='fieldset_css'>
				<legend>{type == 'prePay' ? '三方预付打款单修改' : type == 'datePay' ? '三方周期打款单修改' : null}</legend>
				<Form onSubmit={this.handleSubmit}>
					<Row>
						<FormItem label='打款单ID' {...formItemLayout}>
							{getFieldDecorator('payment_slip_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款单类型' {...formItemLayout}>
							{getFieldDecorator('id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='收款方类型' {...formItemLayout}>
							{getFieldDecorator('receipt_way')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					{type == 'prePay' && <Row>
						<FormItem label='订单ID' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					{type == 'prePay' && <Row>
						<FormItem label='订单类型' {...formItemLayout}>
							{getFieldDecorator('product_line_desc')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					{type == 'prePay' && <Row>
						<FormItem label='三方平台订单ID' {...formItemLayout}>
							{getFieldDecorator('sanfang')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					{type == 'datePay' && <Row>
						<FormItem label='结算单ID' {...formItemLayout}>
							{getFieldDecorator('item_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					<Row>
						<FormItem label='平台' {...formItemLayout}>
							{getFieldDecorator('platform_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='三方代理商' {...formItemLayout}>
							{getFieldDecorator('agent_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					{type == 'prePay' && <Row>
						<FormItem label='需求ID' {...formItemLayout}>
							{getFieldDecorator('reservation_requirement_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					{type == 'prePay' && <Row>
						<FormItem label='需求名称' {...formItemLayout}>
							{getFieldDecorator('reservation_requirement_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					{type == 'prePay' && <Row>
						<FormItem label='公司简称' {...formItemLayout}>
							{getFieldDecorator('company_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					{type == 'prePay' && <Row>
						<FormItem label='所属销售' {...formItemLayout}>
							{getFieldDecorator('salesperson_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					<Row>
						<FormItem label='打款金额' {...formItemLayout}>
							{getFieldDecorator('payment_amount')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='收款方式' {...formItemLayout}>
							{getFieldDecorator('receipt_way')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='收款户名' {...formItemLayout}>
							{getFieldDecorator('receipt_account_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='收款账号' {...formItemLayout}>
							{getFieldDecorator('receipt_account')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='开户行' {...formItemLayout}>
							{getFieldDecorator('opening_bank')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='开户支行' {...formItemLayout}>
							{getFieldDecorator('opening_bank_branch')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row><Row>
						<FormItem label='申请时间' {...formItemLayout}>
							{getFieldDecorator('application_time')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款状态' {...formItemLayout}>
							{getFieldDecorator('payment_status_desc')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='付款时间' {...formItemLayout}>
							{getFieldDecorator('payment_time')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款成功截图' {...formItemLayout}>
							{getFieldDecorator('payment_screenshot', {
								rules: [{ required: true, message: '打款撤销备注为必填项!' }]
							})(
								<Input />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款备注' {...formItemLayout}>
							{getFieldDecorator('payment_remark', {
								rules: [{ required: true, message: '打款撤销备注为必填项!' }]
							})(
								<Input />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='付款公司' {...formItemLayout}>
							{getFieldDecorator('payment_company')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='回票方式' {...formItemLayout}>
							{getFieldDecorator('invoice_way_desc')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='应回发票' {...formItemLayout}>
							{getFieldDecorator('invoice_amount')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row><Row>
						<FormItem label='发票盈余' {...formItemLayout}>
							{getFieldDecorator('invoice_surplus')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='发票开具方' {...formItemLayout}>
							{getFieldDecorator('beneficiary_company')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					{type == 'prePay' && <Row>
						<FormItem label='主账号' {...formItemLayout}>
							{getFieldDecorator('user_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					{type == 'prePay' && <Row>
						<FormItem label='媒介经理' {...formItemLayout}>
							{getFieldDecorator('media_manager_name')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>}
					<Row>
						<FormItem label='打款撤销备注' {...formItemLayout}>
							{getFieldDecorator('payment_backout_reason', {
								rules: [{ required: true, message: '打款撤销备注为必填项!' }]
							})(
								<Input />
							)}
						</FormItem>
					</Row>
					<Row style={{ textAlign: 'center', paddingTop: '20px' }}>
						<Button htmlType="submit" type='primary'>确定</Button>
						<Button className='left-gap' type='default' onClick={() => {
							this.props.history.goBack();
						}}>取消</Button>
					</Row>
				</Form>
			</fieldset>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		prePayDetail: state.trinityPay.prePayDetail,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Modification))

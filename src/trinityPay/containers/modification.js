import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { message, Form, Row, Input, Button } from 'antd'
import { detailColumns } from '../constants'
import './trinityPay.less'
import qs from 'qs'
const FormItem = Form.Item;

class Modification extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getPrePayData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '详情失败，请重试！');
		})
	}
	handleSubmit = () => {
		console.log('success');
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 16 }
		};
		return <div className='modification-container'>
			<fieldset className='fieldset_css'>
				<legend>三方预付打款单修改</legend>
				<Form>
					<Row>
						<FormItem label='打款单ID' {...formItemLayout}>
							{getFieldDecorator('id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='订单ID' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='订单类型' {...formItemLayout}>
							{getFieldDecorator('order_type')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='三方平台订单ID' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='平台' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='三方代理商' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='需求ID' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='需求名称' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='公司简称' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='所属销售' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款金额' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='收款方式' {...formItemLayout}>
							{getFieldDecorator('id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='收款户名' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='收款账号' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='开户行' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='开户支行' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row><Row>
						<FormItem label='申请时间' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款状态' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款成功/失败时间' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款截图' {...formItemLayout}>
							{getFieldDecorator('order_id', {
								rules: [{ required: true, message: '打款撤销备注为必填项!' }]
							})(
								<Input />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款备注' {...formItemLayout}>
							{getFieldDecorator('order_id', {
								rules: [{ required: true, message: '打款撤销备注为必填项!' }]
							})(
								<Input />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='付款公司' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='回票方式' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='应回发票' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row><Row>
						<FormItem label='发票盈余' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='发票开具方' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='主账号' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='媒介经理' {...formItemLayout}>
							{getFieldDecorator('order_id')(
								<Input disabled={true} />
							)}
						</FormItem>
					</Row>
					<Row>
						<FormItem label='打款撤销备注' {...formItemLayout}>
							{getFieldDecorator('order_id', {
								rules: [{ required: true, message: '打款撤销备注为必填项!' }]
							})(
								<Input />
							)}
						</FormItem>
					</Row>
				</Form>
				<Row style={{ textAlign: 'center', paddingTop: '20px' }}>
					<Button type='primary' onClick={this.handleSubmit}>确定</Button>
					<Button className='left-gap' type='default' onClick={() => {
						this.props.history.goBack();
					}}>取消</Button>
				</Row>
			</fieldset>
		</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Modification))

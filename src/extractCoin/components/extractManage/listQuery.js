import React from 'react'
import { Row, Col, Form, Select, Button, message, Input, Icon } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class ExtractQuery extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	getMultipleValues = value => {
		if(value) {
			const dealVal = value.replace(/(^\s*)|(\s*$)/g, " ");
			const arr = dealVal ? dealVal.split(' ').filter(item => item) : []
			return arr;
		}
		return value;
	}
	handleSearch = (e) => {
		const { questAction, handlefilterParams } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			let params = { 
				...values,
				'withdraw_id': values['withdraw_id'] ? this.getMultipleValues(values['withdraw_id']) : '',
				'order_id': values['order_id'] ? this.getMultipleValues(values['order_id']) : '',
			};
			Object.keys(params).forEach(item => { !params[item] && params[item] !== 0 ? delete params[item] : null });
			if (!err) {
				const hide = message.loading('查询中，请稍候...');
				questAction({ ...params, page: 1 }).then(() => {
					handlefilterParams(params);
					hide();
				}).catch(() => {
					message.error('查询失败');
					hide();
				});
			}
		});
	}
	handleClear = () => {
		this.props.form.resetFields();
	}
	render() {
		let { getFieldDecorator } = this.props.form;
		const strConfig = {
			rules: [{ type: 'string', required: false }]
		}
		return <div>
			<Form className='extractManage-search-form'>
				<FormItem label='提现单号'>
					{getFieldDecorator('withdraw_id', strConfig)(
						<Input placeholder="请输入提现单，多个以空格分隔" style={{ width: 196 }} />
					)}
				</FormItem>
				<FormItem label='订单ID'>
					{getFieldDecorator('order_id', strConfig)(
						<Input placeholder="请输入订单，多个以空格分隔" style={{ width: 196 }} />
					)}
				</FormItem>
				<FormItem label='主账号名'>
					{getFieldDecorator('identity_name', strConfig)(
						<Input placeholder="请输入" />
					)}
				</FormItem>
				<FormItem label='状态'>
					{getFieldDecorator('status', { initialValue: '' })(
						<Select style={{ width: 120 }}>
							<Option value="">不限</Option>
							<Option value="1">待审核</Option>
							<Option value="2">待打款</Option>
							<Option value="3">已打款</Option>
							<Option value="4">审核失败</Option>
						</Select>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
					<a className="reset-filter left-gap" onClick={this.handleClear}><Icon type="retweet" />重置搜索框</a>
				</FormItem>	
			</Form>
		</div>
	}
}

export default Form.create()(ExtractQuery);

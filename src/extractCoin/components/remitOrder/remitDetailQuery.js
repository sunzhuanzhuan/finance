import React from 'react'
import { Form, Button, message, Input, Icon } from "antd";
const FormItem = Form.Item;

class RemitDetailQuery extends React.Component {
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
		const { questAction, handlefilterParams, id, pageSize } = this.props;
		e.preventDefault();
		this.props.form.validateFields((_, values) => {
			let params = { 
				...values,
				'withdraw_id': values['withdraw_id'] ? this.getMultipleValues(values['withdraw_id']) : '',
				'order_id': values['order_id'] ? this.getMultipleValues(values['order_id']) : '',
			};
			const hide = message.loading('查询中，请稍候...');
			questAction({ ...params, page: 1, id, pageSize }).then(() => {
				handlefilterParams(params);
				hide();
			}).catch(() => {
				hide();
			});
		});
	}
	handleClear = () => {
		this.props.form.resetFields();
	}
	render() {
		let { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 14 },
		};

		return <div>
			<Form className='remitDetail-search-form'>
				<FormItem label='提现单号'>
					{getFieldDecorator('withdraw_id')(
						<Input style={{width: '200px'}} placeholder="请输入提现单，多个以空格分隔" />
					)}
				</FormItem>
				<FormItem label='订单ID'>
					{getFieldDecorator('order_id')(
						<Input style={{width: '200px'}} placeholder="请输入订单，多个以空格分隔" />
					)}
				</FormItem>
				<FormItem label='主账号名称'>
					{getFieldDecorator('identity_name')(
						<Input placeholder="请输入" />
					)}
				</FormItem>
				<FormItem label='收款人名称'>
					{getFieldDecorator('real_name')(
						<Input placeholder="请输入" />
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

export default Form.create()(RemitDetailQuery);

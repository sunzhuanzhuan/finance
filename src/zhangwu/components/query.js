import React from 'react'
import { Row, Col, Form, Select, Button, DatePicker, message, Icon, Input } from "antd";

import {orderStatus} from '../constants/config'


const FormItem = Form.Item;
const Option = Select.Option;

class ListQuery extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	handleSearch = (e) => {
		const { questAction, page_size, handlefilterParams } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let params = values.month ? { ...values, month: values.month.format('YYYYMM') } : { ...values };
				const hide = message.loading('查询中，请稍候...');
				questAction({ ...params, page: 1, page_size }).then(() => {
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
		// let { handleNew, region, nameList } = this.props;
		// nameList = Object.values(nameList);
		const formItemLayout = {
			labelCol: { span: 12 },
			wrapperCol: { span: 12 },
		};
		return <div className='mission-list-query'>
			<Form>
				<Row type="flex" justify="start" gutter={16}>
					<Col span={6}>
						<FormItem label='订单ID' {...formItemLayout}>
							{getFieldDecorator('month')(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label="订单执行状态" {...formItemLayout} >
							{getFieldDecorator('order_status')(
								<Select placeholder="请选择" style={{ width: 140 }}>
										{orderStatus.map(item =>
											<Option key={item.id} value={item.id}>
												{item.name}
											</Option>)
										}
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label='公司简称' {...formItemLayout}>
							{getFieldDecorator('company', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label='需求名称' {...formItemLayout}>
							{getFieldDecorator('company', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					</Row>
					<Row>
					<Col span={6}>
						<FormItem label='平台' {...formItemLayout}>
							{getFieldDecorator('month')(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label="三方代理商" {...formItemLayout} >
							{getFieldDecorator('order_status')(
								<Select placeholder="请选择" style={{ width: 140 }}>
										{orderStatus.map(item =>
											<Option key={item.id} value={item.id}>
												{item.name}
											</Option>)
										}
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label='所属销售' {...formItemLayout}>
							{getFieldDecorator('company', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label='媒介经理' {...formItemLayout}>
							{getFieldDecorator('company', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					
				</Row>
				<Row>
					<Col span={6}>
						<FormItem label='账号名称' {...formItemLayout}>
							{getFieldDecorator('company', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5} style={{ float:'right' }}>
						<Button type="primary" className='left-gap' onClick={this.handleSearch}>查询</Button>
						<Button style={{ marginLeft: '20px' }} className='left-gap' type="primary" onClick={() => {
							this.props.form.resetFields()
						}}>重置</Button>
					</Col>
				</Row>
			</Form>
		</div>
	}
}

export default Form.create()(ListQuery);

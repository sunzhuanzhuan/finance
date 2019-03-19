import React from 'react'
import { Row, Col, Form, Select, Button, message, Input } from "antd";
import qs from 'qs';
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
		const { questAction, accountList:{ page_size } , handlefilterParams } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let keys = {}, labels = {};
				for (let key in values) {
					if (Object.prototype.toString.call(values[key]) === '[object Object]') {
						if (values[key].key) {
							keys[key] = values[key].key;
							labels[key] = values[key].label;
						}
					} else {
						keys[key] = values[key]
					}
				}
				
				let params = {
					keys: { ...keys },
					labels: { ...labels }
				};
				Object.keys(params['keys']).forEach(item => { !params['keys'][item] && params['keys'][item] !== 0 ? delete params['keys'][item] : null });
				
				const hide = message.loading('查询中，请稍候...');
				
				questAction({ ...params.keys, page: 1, page_size }).then(() => {
					handlefilterParams(...params.keys);
					this.props.history.replace({
						pathname: '/finance/zhangwu/list',
						search: `?${qs.stringify(params)}`,
					})
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
							{getFieldDecorator('order_id')(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label="订单执行状态" {...formItemLayout} >
							{getFieldDecorator('execution_status')(
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
							{getFieldDecorator('company_name', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label='平台' {...formItemLayout}>
							{getFieldDecorator('weibo_type', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					</Row>
					<Row>
					<Col span={5}>
						<FormItem label="三方代理商" {...formItemLayout} >
							{getFieldDecorator('agent_name')(
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
							{getFieldDecorator('sale_manager_name', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem label='媒介经理' {...formItemLayout}>
							{getFieldDecorator('media_manager_name', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					
				</Row>
				<Row>
					<Col span={6}>
						<FormItem label='账号名称' {...formItemLayout}>
							{getFieldDecorator('weibo_name', { initialValue: '' })(
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

import React from 'react'
import { Row, Col, Form, Select, Button, message, DatePicker, Input, Icon } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class RemitQuery extends React.Component {
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
	getStudioOptions = () => {
		const { studioRows } = this.props;
		if(Array.isArray(studioRows) && studioRows.length)
			return studioRows.map(item => {
				const { id, name } = item;
				return (
					<Option value={id} key={id}>{name}</Option>
				)
			})
		return null;
	}
	handleSearch = (e) => {
		const { questAction, handlefilterParams, limit_num } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const hide = message.loading('查询中，请稍候...');
				let params = {
					...values,
					'withdraw_id': values['withdraw_id'] ? this.getMultipleValues(values['withdraw_id']) : '',
					'id': values['id'] ? this.getMultipleValues(values['id']) : '',
					'start_time': values['start_time'] ? values['start_time'].format('YYYY-MM-DD') : '',
					'end_time': values['end_time'] ? values['end_time'].format('YYYY-MM-DD') : ''
				};
				Object.keys(params).forEach(item => { !params[item] && params[item] !== 0 ? delete params[item] : null });
				questAction({ ...params, limit_num, page: 1 }).then(() => {
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
		return <div>
			<Form className='remitOrder-search-form'>
				<Row type="flex" justify="start" gutter={16} style={{ padding: '10px 0' }}>
					<Col className='left-gap'>
						<FormItem label='提现单号'>
							{getFieldDecorator('withdraw_id', { initialValue: '' })(
								<Input placeholder="请输入提现单，多个以空格分隔" style={{ width: 225 }} allowClear />
							)}
						</FormItem>
					</Col>
					<Col className='left-gap'>
						<FormItem label='打款单ID'>
							{getFieldDecorator('id', {
								initialValue: this.props.queryId
							})(
								<Input placeholder="请输入打款单，多个以空格分隔" style={{ width: 225 }} allowClear />
							)}
						</FormItem>
					</Col>
					<Col className='left-gap'>
						<FormItem label="创建时间">
							{getFieldDecorator('start_time')(
								<DatePicker format={'YYYY-MM-DD'} placeholder='开始日期' style={{ width: 120 }} />
							)}~
							{getFieldDecorator('end_time')(
								<DatePicker format={'YYYY-MM-DD'} placeholder='结束日期' style={{ width: 120 }} />
							)}
						</FormItem>
					</Col>
					<Col className='left-gap'>
						<FormItem label='打款状态'>
							{getFieldDecorator('status', { initialValue: '' })(
								<Select style={{ width: 120 }} allowClear>
									<Option value="">不限</Option>
									<Option value="0">待打款</Option>
									<Option value="1">待还款</Option>
									<Option value="2">待结税</Option>
									<Option value="3">已结算</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col className='left-gap'>
						<FormItem label='工作室'>
							{getFieldDecorator('studio_id')(
								<Select 
									showSearch
									style={{ width: 120 }} 
									placeholder='请选择' 
									allowClear
									filterOption={(input, option) => (
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									)}
								>
									{this.getStudioOptions()}
								</Select>
							)}
						</FormItem>
					</Col>
					<Col className='left-gap'>
						<FormItem label="可提金额">
							{getFieldDecorator('payment_amount_min')(
								<Input placeholder="请输入" style={{ width: 120 }} allowClear />
							)}~
							{getFieldDecorator('payment_amount_max')(
								<Input placeholder="请输入" style={{ width: 120 }} allowClear />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row style={{ textAlign: 'center' }}>
					<Col>
						<Button type="primary" onClick={this.handleSearch}>查询</Button>
						<a className="reset-filter left-gap" onClick={this.handleClear}><Icon type="retweet" />重置搜索框</a>
					</Col>
				</Row>
			</Form>
		</div>
	}
}

export default Form.create()(RemitQuery);

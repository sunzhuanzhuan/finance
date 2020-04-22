import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd'
import SearchSelect from '@/base/SearchSelect'
import EmSpan from '@/base/EmSpan'
const { RangePicker } = DatePicker
class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { form } = this.props
		const { getFieldDecorator } = form
		return (
			<span>
				<Col span={8}>
					<Form.Item label={<EmSpan length={4}>发票号</EmSpan>}>
						{getFieldDecorator('invoice_number', {
							rules: [],
						})(<Input placeholder='请输入' />)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={<EmSpan length={6}>发票开具方</EmSpan>}>
						{getFieldDecorator('beneficiary_company', {
							rules: [],
						})(<SearchSelect
							placeholder="请输入"
							action={this.queryMcnByIdentityName}
							wordKey='name'
							filterOption={false}
							style={{ width: '100%' }}
						/>
						)}
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label="发票类型">
						{getFieldDecorator('invoice_type', {})(
							<Select allowClear style={{ width: '100%' }} placeholder='不限'>
								<Select.Option key={1}>专票</Select.Option>
								<Select.Option key={2}>普票</Select.Option>
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label='发票状态' >
						{getFieldDecorator('invoice_status', {})(
							<Select allowClear placeholder='不限'>
								<Select.Option key={1}>专票</Select.Option>
								<Select.Option key={2}>普票</Select.Option>
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="发票录入时间">
						{getFieldDecorator("invoice_created_time", {})(
							<RangePicker style={{ width: '100%' }} />
						)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={'使用时间'}>
						{getFieldDecorator("invoice_use_time", {})(
							<RangePicker style={{ width: '100%' }} />
						)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="打款单ID">
						{getFieldDecorator('order_id', {
							rules: [],
						})(<Input placeholder='请输入' />)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={<EmSpan length={6}>打款类型</EmSpan>}>
						{getFieldDecorator('payment_type', {})(
							<Select allowClear placeholder='不限'>
								<Select.Option key={1}>专票</Select.Option>
								<Select.Option key={2}>普票</Select.Option>
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={'打款时间'}>
						{getFieldDecorator("validTime", {})(
							<RangePicker style={{ width: '100%' }} />
						)}
					</Form.Item>
				</Col>
			</span>
		);
	}
}

export default SearchForm

import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Button, InputNumber } from 'antd'
import SearchSelect from '@/base/SearchSelect'
import EmSpan from '@/base/EmSpan'
const { RangePicker } = DatePicker
class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	beneficiaryCompany = (value) => {
		const { actions, source_type } = this.props
		return actions.beneficiaryCompanyList({
			beneficiary_company: value.name,
			source_type: source_type
		}).then(({ data }) => ({ data: data }))
	}

	render() {
		const { form } = this.props
		const { getFieldDecorator } = form
		return (
			<span>
				<Col span={8}>
					<Form.Item label={<EmSpan length={5}>发票号</EmSpan>}>
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
							action={this.beneficiaryCompany}
							wordKey='name'
							filterOption={false}
							style={{ width: '100%' }}
							mapResultItemToOption={(beneficiary_company) => ({
								value: beneficiary_company,
								label: beneficiary_company
							})}
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
					<Form.Item label={<EmSpan length={5}>发票状态</EmSpan>}>
						{getFieldDecorator('invoice_status', {})(
							<Select allowClear placeholder='不限'>
								<Select.Option key="1">已关联</Select.Option>
								<Select.Option key="0">未关联</Select.Option>
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
					<Form.Item label={'关联时间'}>
						{getFieldDecorator("invoice_use_time", {})(
							<RangePicker style={{ width: '100%' }} />
						)}
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={<EmSpan length={5}>打款单ID</EmSpan>}>
						{getFieldDecorator('payment_id', {
							rules: [],
						})(<InputNumber placeholder='请输入' style={{ width: '100%' }} />)}
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label={<EmSpan length={6}>打款时间</EmSpan>}>
						{getFieldDecorator("payment_time", {})(
							<RangePicker style={{ width: '100%' }} />
						)}
					</Form.Item>
				</Col>
			</span>
		);
	}
}

export default SearchForm

import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Button, } from 'antd'
import SearchSelect from '@/base/SearchSelect'

import { defaultUseTime } from '../../containers/UsageQuery'
console.log("defaultUseTime", defaultUseTime)

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
				<Form.Item label='发票号'>
					{getFieldDecorator('invoice_number', {
						rules: [],
					})(<Input placeholder='请输入' />)}
				</Form.Item>
				<Form.Item label='发票开具方'>
					{getFieldDecorator('beneficiary_company', {
						rules: [],
					})(<SearchSelect
						placeholder="请输入"
						action={this.beneficiaryCompany}
						wordKey='name'
						filterOption={false}
						style={{ width: '170px' }}
						mapResultItemToOption={(beneficiary_company) => ({
							value: beneficiary_company,
							label: beneficiary_company
						})}
					/>
					)}
				</Form.Item>

				<Form.Item label="发票类型">
					{getFieldDecorator('invoice_type', {})(
						<Select allowClear={true} style={{ width: '170px' }} placeholder='不限'>
							<Select.Option key={1}>专票</Select.Option>
							<Select.Option key={2}>普票</Select.Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label='发票状态'>
					{getFieldDecorator('invoice_status', {})(
						<Select allowClear={true} placeholder='不限' style={{ width: '170px' }}>
							<Select.Option key="0">未使用</Select.Option>
							<Select.Option key="1">已使用</Select.Option>
							<Select.Option key="2">使用完</Select.Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="发票录入时间">
					{getFieldDecorator("invoice_created_time", {})(
						<RangePicker style={{ width: '260px' }} />
					)}
				</Form.Item>
				<Form.Item label={'使用时间'}>
					{getFieldDecorator("invoice_use_time", {
						initialValue: defaultUseTime && defaultUseTime.invoice_use_time || []
					})(
						<RangePicker style={{ width: '260px' }} />
					)}
				</Form.Item>
				<Form.Item label='打款单ID'>
					{getFieldDecorator('payment_id', {
						rules: [],
					})(<Input placeholder='请输入' />)}
				</Form.Item>

				<Form.Item label='打款时间'>
					{getFieldDecorator("payment_time", {})(
						<RangePicker style={{ width: '260px' }} />
					)}
				</Form.Item>
			</span>
		);
	}
}

export default SearchForm

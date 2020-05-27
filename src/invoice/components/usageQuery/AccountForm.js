import React, { Component } from 'react'
import { Form, Input, Col, Button, Row, Select } from 'antd'
import SearchSelect from '@/base/SearchSelect'
import SearchForm from './SearchForm'
import './SearchForm.less'
export class AccountForm extends Component {
	onSearch = (e) => {
		e.preventDefault()
		const { searchParams } = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onSearchList({ ...values, page_size: searchParams.page_size, page: 1 }, true)
			}
		})
	}
	onReset = () => {
		this.props.form.resetFields()
		this.props.resetSearchParams()
	}
	userIdAction = (value) => {
		return this.props.actions.userIdentityNameList({
			identity_name: value.name,
		}).then(({ data }) => ({ data: data }))
	}
	ownerAdminActions = (value) => {
		return this.props.actions.ownerAdminListInvoice({
			identity_name: value.name,
		}).then(({ data }) => ({ data: data }))
	}
	render() {
		const { form, actions } = this.props
		const { getFieldDecorator } = form
		return (
			<Form layout="inline" autoComplete="off" className='table-form-item'>
				<SearchForm form={form} actions={actions} source_type={1} />
				<Form.Item label={'打款类型'}>
					{getFieldDecorator('payment_type', {})(
						<Select allowClear={true} placeholder='不限' style={{ width: '150px' }}>
							<Select.Option key={1}>周打款</Select.Option>
							<Select.Option key={2}>快易提</Select.Option>
							<Select.Option key={3}>提前打款</Select.Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label='主账号'>
					{getFieldDecorator('user', {
						rules: [],
					})(<SearchSelect
						placeholder="请输入"
						action={this.userIdAction}
						wordKey='name'
						filterOption={false}
						style={{ width: '200px' }}
						mapResultItemToOption={(one) => ({
							value: one.user_id,
							label: one.identity_name
						})}
					/>
					)}
				</Form.Item>

				<Form.Item label='媒介经理'>
					{getFieldDecorator('owner_admin', {
						rules: [],
					})(<SearchSelect
						placeholder="请输入"
						action={this.ownerAdminActions}
						wordKey='name'
						filterOption={false}
						style={{ width: '200px' }}
						mapResultItemToOption={(one) => ({
							value: one.user_id,
							label: one.real_name
						})}
					/>
					)}
				</Form.Item>
				<Form.Item >
					<div >
						<Button type='primary' onClick={this.onSearch}>查询</Button>
						<Button style={{ margin: '0px 10px' }} onClick={this.onReset}>重置</Button>
						<Button type='primary' onClick={() => this.props.exportInvoiceFile(1)} loading={this.props.downLoading}>导出</Button>
					</div>
				</Form.Item>
			</Form>
		)
	}
}

export default Form.create()(AccountForm)


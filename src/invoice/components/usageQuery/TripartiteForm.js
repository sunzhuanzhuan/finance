import React, { Component } from 'react'
import { Form, Select, Row, Col, Button } from 'antd'
import SearchForm from './SearchForm'
export class TripartiteForm extends Component {
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

	render() {
		const { form, trinityInvoiceSearchItem = {}, actions } = this.props
		const { agent = [] } = trinityInvoiceSearchItem
		const { getFieldDecorator } = form
		return (
			<Form layout="inline" autoComplete="off" className='table-form-item'>
				<SearchForm form={form} actions={actions} source_type={2} />
				<Form.Item label={'打款类型'}>
					{getFieldDecorator('payment_type', {})(
						<Select allowClear={true} placeholder='不限' style={{ width: '170px' }}>
							<Select.Option key={1}>三方预付款</Select.Option>
							<Select.Option key={2}>三方周期付款</Select.Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="三方代理商">
					{getFieldDecorator('business_account_id', {
						rules: [],
					})(
						<Select placeholder='请选择' allowClear={true} style={{ width: '170px' }}>
							{agent.map(one => <Select.Option
								key={one.values}
								value={one.value}> {one.name}
							</Select.Option>)}
						</Select>
					)}
				</Form.Item>
				<Form.Item >
					<div style={{ textAlign: 'right' }}>
						<Button type='primary' onClick={this.onSearch}>查询</Button>
						<Button style={{ margin: '0px 10px' }} onClick={this.onReset}>重置</Button>
						<Button type='primary' onClick={() => this.props.exportInvoiceFile(2)} loading={this.props.downLoading}>导出</Button>
					</div>
				</Form.Item>
			</Form>
		)
	}
}

export default Form.create()(TripartiteForm)

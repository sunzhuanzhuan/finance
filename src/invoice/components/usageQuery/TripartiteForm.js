import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd'
import SearchSelect from '@/base/SearchSelect'
import SearchForm from './SearchForm'
export class TripartiteForm extends Component {
	onSearch = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onSearchList(values)
			}
		})
	}
	onReset = () => {
		this.props.form.resetFields()
		this.props.resetSearchParams()
	}

	render() {
		const { form, trinityInvoiceSearchItem = {} } = this.props
		const { agent = [] } = trinityInvoiceSearchItem
		const { getFieldDecorator } = form
		return (
			<Form className="flex-form-layout" layout="inline" autoComplete="off">
				<Row>
					<SearchForm form={form} />
					<Col span={8}>
						<Form.Item label="三方代理商">
							{getFieldDecorator('business_account_id', {
								rules: [],
							})(
								<Select>
									{agent.map(one => <Select.Option
										key={one.values}
										value={one.value}> {one.name}
									</Select.Option>)}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span={8}></Col>
					<Col span={8}>
						<Form.Item >
							<div style={{ textAlign: 'right' }}>
								<Button type='primary' onClick={this.onSearch}>查询</Button>
								<Button style={{ margin: '0px 10px' }} onClick={this.onReset}>重置</Button>
								<Button type='primary'>导出</Button>
							</div>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default Form.create()(TripartiteForm)

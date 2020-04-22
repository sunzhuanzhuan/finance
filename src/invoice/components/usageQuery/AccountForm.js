import React, { Component } from 'react'
import { Form, Input, Col, Button, Row } from 'antd'
import SearchSelect from '@/base/SearchSelect'
import SearchForm from './SearchForm'
import EmSpan from '@/base/EmSpan'
import { getTimeToObjByArr } from '@/util'
export class AccountForm extends Component {
	onSearch = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(getTimeToObjByArr(values.invoice_created_time, 'invoice_created_time_start', 'invoice_created_time_end'))
			}
		})
	}
	render() {
		const { form } = this.props
		const { getFieldDecorator } = form
		return (
			<Form className="flex-form-layout" layout="inline" autoComplete="off">
				<Row>
					<SearchForm form={form} />
					<Col span={8}>
						<Form.Item label={<EmSpan length={4}>主账号</EmSpan>}>
							{getFieldDecorator('owner_admin_id', {
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
						<Form.Item label={<EmSpan length={6}>订单ID</EmSpan>}>
							{getFieldDecorator('order_id', {
								rules: [],
							})(<Input placeholder='请输入' />)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label={<EmSpan length={4}>媒介经理</EmSpan>}>
							{getFieldDecorator('owner_admin_id', {
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
					<Col span={16}></Col>
					<Col span={8}>
						<Form.Item >
							<div style={{ textAlign: 'right' }}>
								<Button type='primary' onClick={this.onSearch}>查询</Button>
								<Button style={{ margin: '0px 10px' }}>重置</Button>
								<Button type='primary'>导出</Button>
							</div>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default Form.create()(AccountForm)


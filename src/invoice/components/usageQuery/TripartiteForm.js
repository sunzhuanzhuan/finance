import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd'
import SearchSelect from '@/base/SearchSelect'
import SearchForm from './SearchForm'
export class TripartiteForm extends Component {

	render() {
		const { form } = this.props
		const { getFieldDecorator } = form
		return (
			<Form className="flex-form-layout" layout="inline" autoComplete="off">
				<Row>
					<SearchForm form={form} />
					<Col span={8}>
						<Form.Item label="三方代理商">
							{getFieldDecorator('email', {
								rules: [],
							})(<SearchSelect
								placeholder="请输入"
								action={this.queryMcnByIdentityName}
								wordKey='name'
								filterOption={false}
								style={{ width: '100%' }}
							/>)}
						</Form.Item>
					</Col>
					<Col span={8}></Col>
					<Col span={8}>
						<Form.Item >
							<div style={{ textAlign: 'right' }}>
								<Button type='primary'>查询</Button>
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

export default Form.create()(TripartiteForm)

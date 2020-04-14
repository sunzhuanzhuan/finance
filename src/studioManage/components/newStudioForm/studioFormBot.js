import React from 'react'
import { Input, Row, Col, Form, Select, Button, DatePicker } from "antd";

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
class StudioFormBot extends React.Component {
	constructor() {
		super();
		this.state = {
			today: ''
		}
	}
	componentDidMount() {
		let today = this.getDate();
		this.setState({ today })
	}
	checkCount = (rule, value, callback) => {
		const reg = /^(([1-9]\d?(\.\d\d?)?)|(0\.(0[1-9]|[1-9]{1,2})))$/;
		if (value) {
			if (reg.test(value.toString())) {
				callback();
				return;
			}
			callback('请填写大于0小于等于100最多保留两位小数的有效数字！');
		} else {
			callback(' ')
		}
	}
	getSelectOptions = arr => {
		if(!(Array.isArray(arr) && arr.length))
			return null;
		return arr.map(item => <Option key={item.id} value={item.id}>{item.display}</Option>)
	}
	serviceRateValide = (rule, value, callback) => {
		const regex = /^\d+(\.\d{1,8})?$/;
		const valide = value >= 0 && value <= 10000 && regex.test(value)
		if (value) {
			if (valide) {
				callback();
				return;
			}
			callback('输入范围是[0-10000]，最多8位小数的数字,举例:如果想设置6.388%,请输入6.388');
		} else {
			callback(' ')
		}
	}
	getDate = () => {
		let date = new Date();
		let years = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		let today = years + "-" + month + "-" + day;
		return today;
	}
	disabledDate = (current) => {
		var timestamp = new Date(this.state.today).getTime();
		timestamp = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp;
		return current && current.valueOf() < timestamp;
	}
	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { formItemLayout, taxLayout, handleOk, selectOption } = this.props;
		const selectValue = getFieldValue('invoice_type');
		return <div>
			<Row>
				<FormItem label='发票抬头' {...formItemLayout}>
					{getFieldDecorator('invoice_provider', { rules: [{ required: true, message: '请填写发票抬头' }] })(
						<Input placeholder="请输入" />
					)}
				</FormItem>
			</Row>
			<Row type='flex' justify='start' gutter={16}>
				<Col span={6}>
					<FormItem className='invoice_type_item' label='回票类型' {...taxLayout}>
						{getFieldDecorator('invoice_type', { rules: [{ required: true, message: '请选择回票类型' }] })(
							<Select placeholder="请选择" style={{ width: 216 }}>
								{
									this.getSelectOptions(selectOption['invoice_type'])
								}
							</Select>
						)}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<FormItem label="发票税率" {...formItemLayout} >
					{getFieldDecorator('tax_rate', {
						rules: [
							{ required: selectValue == '1', message: '请输入发票税率' },
							{
								validator: this.serviceRateValide,
							}
						],
					})(
						selectValue == '1' ? 
							<Input placeholder='会影响公司成本请谨慎填写' addonAfter={'%'} style={{ width: 216 }} /> 
							: 
							<span>0%</span>
					)}
				</FormItem>
			</Row>
			<Row>
				<FormItem label="服务费率" {...formItemLayout} >
					{getFieldDecorator('service_rate', {
						rules: [
							{ required: true, message: '请输入服务费率' },
							{
								validator: this.serviceRateValide,
							}
						],
					})(
						<Input placeholder='会影响公司成本请谨慎填写' addonAfter={'%'} style={{ width: 216 }} />
					)}
				</FormItem>
			</Row>
			<Row style={{ marginTop: '10px' }}>
				<FormItem label="有效期" {...formItemLayout} >
					{getFieldDecorator('validity_start', { rules: [{ required: true, message: '请选择有效期开始日期' }] })(
						<DatePicker format={'YYYY-MM-DD'} placeholder='开始日期' disabledDate={this.disabledDate} />
					)}~
					{getFieldDecorator('validity_end', { rules: [{ required: true, message: '请选择有效期截止日期' }] })(
						<DatePicker format={'YYYY-MM-DD'} placeholder='结束日期' disabledDate={this.disabledDate} />
					)}
				</FormItem>
			</Row>
			<Row>
				<FormItem label="备注" {...formItemLayout} >
					{getFieldDecorator('remark')(
						<TextArea placeholder="请输入描述" autosize={{ minRows: 3, maxRows: 5 }} maxLength="200" ></TextArea>
					)}
				</FormItem>
			</Row>
			<Row className='top-gap' type='flex' justify='center'>
				<Button type='default' onClick={() => {
					this.props.history.push('/finance/studiomanage/list');
				}}>取消</Button>
				<Button className='left-gap' type='primary' onClick={handleOk}>提交</Button>
			</Row>
		</div>
	}
}
export default StudioFormBot;

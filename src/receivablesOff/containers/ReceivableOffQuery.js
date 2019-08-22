import React from 'react'
import { Form, Input, InputNumber, Button, Row, Select, DatePicker } from "antd";
import SearchSelect from '@/components/SearchSelect';

const { Option } = Select;
const FormItem = Form.Item;

class ReceivableOffQuery extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}
	getSelectOption = key => {
		const { queryOptions } = this.props;
		if(!queryOptions(key)) return null;
		return queryOptions(key).map(item => {
			const { name, value } = item;
			return <Option key={value} value={value}>{name}</Option>
		})
	}
	getFormItem = compType => {
		switch(compType) {
			case 'input':
				return <Input placeholder="请输入" className='common_search_width' />;
			case 'searchSelect':
				return <SearchSelect
							action={this.handleSelectSearch} 
							style={{ width: 170 }}
							placeholder='请选择'
							getPopupContainer={() => document.querySelector('.rece-query')}
							keyWord='company_name'
							dataToList={res => { return res.data }}
							item={['company_id', 'name']}
						/>;
			case 'select':
				return <Select placeholder="请输入" className='common_search_width' />;
			case 'date':
				return <DatePicker placeholder="请输入" className='common_search_width' />;
			default:
				return <Input placeholder="请输入" className='common_search_width' />;
		}
	}
	getFormItemComp = queryItems => {
		const { form, showExport } = this.props;
		const { getFieldDecorator } = form;

		return queryItems.map(item => {
			const {label, compType, key} = item;
			if(compType === 'operate') {
				return (
					<FormItem key={key} className='operate-wrapper'>
						{ showExport ? <Button type='primary' onClick={() => {this.handleSearch('export')}}>导出</Button> : null }
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
					</FormItem>
				)
			}else if(compType === 'order_id_type') {
				return (
					<span key='rangeAndValue' className='order-id-type-wrapper'>
					<FormItem className='order-id-type-item' >
						{getFieldDecorator('receivables_aging_range', { initialValue: undefined })(
							<Select 
								placeholder="请选择" 
								className='range-value'
								filterOption={(input, option) => (
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								)}
							>
								{ this.getSelectOption('receivables_aging_range') }
							</Select>
						)}
					</FormItem>
					<span className='range-value-sign'>{'>'}</span>
					<FormItem className='order-id-type-item' >
						{getFieldDecorator('receivables_amount', { initialValue: undefined })(
							<InputNumber className='range-value' min={0}/>
						)}
					</FormItem>
				</span>
				)
			}
				
			return (
				<FormItem key={key} label={label} >
					{getFieldDecorator(key, { initialValue: undefined })(
						this.getFormItem(compType)
					)}
				</FormItem>
			)
		})
	}
	handleSearch = type => {
		const { form, handleSearch, handleExport } = this.props;

		if(type === 'reset') {
			form.resetFields();
			handleSearch({page: 1, page_size: 20});
		}else if(type === 'search') {
			form.validateFields((errors, values) => {
				if(errors)
					return null;
				Object.assign(values, {page: 1, page_size: 20})
				handleSearch(values);
			})
		}else if(type === 'export') {
			handleExport()
		}
	}

	getFormRowComp = () => {
		const { queryItems = [] } = this.props;
		const queryLen = queryItems.length - 1;
		const valueItems = queryItems.filter(item => item.compType !== 'operate');
		const operateItem = queryItems.filter(item => item.compType === 'operate');
		const rowLen = Math.ceil(queryLen / 4)
		const queryLenArr = new Array(rowLen).join(",").split(",");

		const ValueRow = queryLenArr.map( _ => {
			if( valueItems.length >= 4)
				return (
					<Row key={+new Date() + Math.random()}>
						{this.getFormItemComp(valueItems.splice(0, 4))}
					</Row>
				)
			return null;
		});
		const OperateRow = (
			<Row key='row-second' className='flex-row'>
				<div className='left-comp'>
					{this.getFormItemComp(valueItems)}
				</div>
				<div className='right-comp'>
					{this.getFormItemComp(operateItem)}
				</div>
			</Row>
		);
		return [ValueRow, OperateRow]
	}

	handleSelectSearch = () => {

	}

	render() {
		return (
			<Form className='rece-query rece-add-query'>
				{this.getFormRowComp()}
			</Form>
		)
	}
}

export default Form.create()(ReceivableOffQuery)

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
	componentDidMount() {
		// const { form, initialValue = {} } = this.props;
		// form.setFieldsValue(initialValue);
	}
	getSelectOption = key => {
		const { queryOptions = {} } = this.props;
		if(!queryOptions[key]) return null;
		return queryOptions[key].map(item => {
			const { id, display } = item;
			return <Option key={id} value={id}>{display}</Option>
		})
	}
	getFormItem = item => {
		const { compType, optionKey, actionKey, dataIndex, keyWord } = item;
		const { actionKeyMap = {} } = this.props;
		switch(compType) {
			case 'input':
				return <Input placeholder="请输入" className='common_search_width' />;
			case 'searchSelect':
				return <SearchSelect
							action={actionKeyMap[actionKey]} 
							style={{ width: 170 }}
							placeholder='请选择'
							getPopupContainer={() => document.querySelector('.rece-query')}
							keyWord={keyWord}
							dataToList={res => { return res.data }}
							item={dataIndex}
						/>;
			case 'select':
				return <Select 
						placeholder="请选择" 
						className='common_search_width'
						filterOption={(input, option) => (
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						)}
					>
							{ this.getSelectOption(optionKey) }
					</Select>;
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
			const {label, compType, key, optionKey} = item;
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
					<span key={key} className='order-id-type-wrapper'>
						<FormItem className='order-id-type-item' >
							{getFieldDecorator('prduct_line')(
								<Select 
									allowClear
									placeholder="订单类型" 
									className='range-value'
									filterOption={(input, option) => (
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									)}
								>
									{ this.getSelectOption('prduct_line') }
								</Select>
							)}
						</FormItem>
						<span className='range-value-sign'>{'>'}</span>
						<FormItem className='order-id-type-item' >
							{getFieldDecorator('receivables_amount')(
								<Input className='range-value' placeholder='订单/活动ID'/>
							)}
						</FormItem>
					</span>
				)
			}else if(compType === 'number_range') {
				return (
					<FormItem key={key} label={label} className='number_range_wrapper'>
						<FormItem className='number_range_item' >
							{getFieldDecorator(`${key}_min`)(
								<InputNumber className='range-value' min={0}/>
							)}
						</FormItem>
						<span className='range-value-sign'>{'~'}</span>
						<FormItem className='number_range_item' >
							{getFieldDecorator(`${key}_max`)(
								<InputNumber className='range-value' min={0}/>
							)}
						</FormItem>
					</FormItem>
				)
			}
				
			return (
				<FormItem key={key} label={label} >
					{getFieldDecorator(key)(
						this.getFormItem(item)
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
		return this.getFormItemComp(queryItems)
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

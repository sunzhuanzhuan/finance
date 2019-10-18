import React from 'react'
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import SearchSelect from '@/components/SearchSelect';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ReceivableOffQuery extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}
	getSelectOption = (key, idKey, labelKey) => {
		const { queryOptions = {} } = this.props;

		if(!queryOptions[key] || !Array.isArray(queryOptions[key])) return null;
		return queryOptions[key].map(item => {
			return <Option key={item[idKey]} value={item[idKey]}>{item[labelKey]}</Option>
		})
	}
	getFormItem = item => {
		const { compType, optionKey, actionKey, dataIndex, keyWord, idKey, labelKey, showSearch } = item;
		const { actionKeyMap = {}, className } = this.props;
		switch(compType) {
			case 'input':
				return <Input placeholder="请输入" className='common_search_width' />;
			case 'searchSelect':
				return <SearchSelect
							isNameVal={keyWord === 'campaign_name'}
							action={actionKeyMap[actionKey]} 
							style={{ width: 170 }}
							placeholder='请选择'
							getPopupContainer={() => document.querySelector(`.${className}`)}
							keyWord={keyWord}
							dataToList={res => { return res.data }}
							item={dataIndex}
						/>;
			case 'select':
				return <Select 
						showSearch={showSearch}
						allowClear
						placeholder="请选择" 
						className='common_search_width'
						filterOption={(input, option) => (
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						)}
					>
							{ this.getSelectOption(optionKey, idKey, labelKey) }
					</Select>;
			case 'date':
				return <RangePicker />;
			default:
				return <Input placeholder="请输入" className='common_search_width' />;
		}
	}
	getFormItemComp = queryItems => {
		const { form, showExport } = this.props;
		const { getFieldDecorator } = form;

		return queryItems.map(item => {
			const {label, compType, key, rangeKey = [], idKey, labelKey} = item;
			if(compType === 'operate') {
				return (
					<FormItem key={key} className='operate-wrapper'>
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						{ showExport ? <Button type='primary' onClick={() => {this.handleSearch('export')}}>导出</Button> : null }
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
					</FormItem>
				)
			}else if(compType === 'order_id_type') {
				return (
					<span key={key} className='order-id-type-wrapper'>
						<FormItem className='order-id-type-item' >
							{getFieldDecorator('product_line')(
								<Select 
									allowClear
									placeholder="订单类型" 
									className='range-value'
									filterOption={(input, option) => (
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									)}
								>
									{ this.getSelectOption('product_line', idKey, labelKey) }
								</Select>
							)}
						</FormItem>
						<span className='range-value-sign'>{'>'}</span>
						<FormItem className='order-id-type-item' >
							{getFieldDecorator('order_id')(
								<Input className='range-value' placeholder='订单/活动ID'/>
							)}
						</FormItem>
					</span>
				)
			}else if(compType === 'number_range') {
				return (
					<FormItem key={key} label={label} className='number_range_wrapper'>
						<FormItem className='number_range_item' >
							{getFieldDecorator(rangeKey[0])(
								<InputNumber className='range-value' min={0}/>
							)}
						</FormItem>
						<span className='range-value-sign'>{'~'}</span>
						<FormItem className='number_range_item' >
							{getFieldDecorator(rangeKey[1])(
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
	dealValuesDate = values => {
		const { queryItems = [] } = this.props;
		const valueKeys = Object.keys(values);

		const dateItems = queryItems.filter(item => item.compType === 'date');
		const searchSelectItems = queryItems.filter(item => item.compType === 'searchSelect');
		dateItems.forEach(item => {
			const { key, submitKey = [] } = item;
			const dateKey = valueKeys.find(valuekey => valuekey === key);

			if(values[dateKey] && values[dateKey].length) {
				submitKey.forEach((submitItem, index) => {
					values[submitItem] = values[dateKey][index].format('YYYY-MM-DD')
				})
				delete values[dateKey];
			}
		})

		searchSelectItems.forEach(item => {
			const { key } = item;
			const labelKey = valueKeys.find(valuekey => valuekey === key);
			if(values[labelKey]) {
				values[labelKey] = values[labelKey]['key']
			}
		})
		return values;
	}
	getMultipleIds = (idString) => {
		const trimIdsStr = idString.trim();
		return trimIdsStr.replace(/\s+/g,",");
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
				const dealValues = this.dealValuesDate(values);
				if(dealValues.order_ids)
					dealValues.order_ids = this.getMultipleIds(dealValues.order_ids);
				if(dealValues.id)
					dealValues.id = this.getMultipleIds(dealValues.id);
				Object.assign(dealValues, {page: 1, page_size: 20});
				handleSearch(dealValues);
			})
		}else if(type === 'export') {
			handleExport()
		}
	}

	getFormRowComp = () => {
		const { queryItems = [] } = this.props;
		return this.getFormItemComp(queryItems)
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

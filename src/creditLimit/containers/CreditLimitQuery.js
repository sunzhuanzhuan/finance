import React from 'react'
import { Form, Input, Button, Select, DatePicker, Tooltip } from "antd";
import SearchSelect from '@/components/SearchSelect';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class CreditLimitQuery extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	getSelectOption = (key, idKey, labelKey) => {
		const { queryOptions = {} } = this.props;

		if(!queryOptions[key] || !Array.isArray(queryOptions[key])) return null;
		return queryOptions[key].map(item => {
			return <Option key={item[idKey]} value={item[idKey]}>{item[labelKey]}</Option>
		})
	}
	getFormItem = item => {
		const { compType, optionKey, actionKey, dataIndex, keyWord, idKey, labelKey, showSearch, mode, placeholder } = item;
		const { actionKeyMap = {}, className } = this.props;
		switch(compType) {
			case 'input':
				return <Input placeholder={placeholder || "请输入"} className='common_input_width' />;
			case 'searchSelect':
				return <SearchSelect
							mode={mode}
							action={actionKeyMap[actionKey]} 
							style={{ width: 180 }}
							placeholder={placeholder || '请选择'}
							getPopupContainer={() => document.querySelector(`.${className}`)}
							keyWord={keyWord}
							dataToList={res => { return res.data }}
							item={dataIndex}
						/>;
			case 'select':
				return <Select 
						showSearch={showSearch}
						allowClear
						placeholder={placeholder || '请选择'}
						className='common_input_width'
						filterOption={(input, option) => (
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						)}
					>
							{ this.getSelectOption(optionKey, idKey, labelKey) }
					</Select>;
			case 'date':
				return <RangePicker />;
			default:
				return <Input placeholder="请输入" className='common_input_width' />;
		}
	}
	getFormItemComp = queryItems => {
		const { form, showExport } = this.props;
		const { getFieldDecorator } = form;
		const getLabel = (label) => {
			return label.length > 5 ? 
			<Tooltip title={label}>
				<span>{`${label.substring(0, 5)}...`}</span>
			</Tooltip> : label
		}

		return queryItems.map(item => {
			const {label, compType, key, submitKey, startInitial, endInitial} = item;
			if(compType === 'operate') {
				return (
					<FormItem key={key} className='operate-wrapper'>
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
						{ showExport ? <Button type='ghost' onClick={() => {this.handleSearch('export')}}>导出</Button> : null }
					</FormItem>
				)
			}else if(compType === 'singleDate') {
				return (
					<FormItem key={key} label={getLabel(label)} className='credit-form-normal'>
						<FormItem>
							{getFieldDecorator(submitKey[0], {
								initialValue: startInitial
							})(
								<DatePicker placeholder='开始时间' />
							)}
						</FormItem>
						<span className='range-value-sign'>~</span>
						<FormItem>
							{getFieldDecorator(submitKey[1], {
								initialValue: endInitial
							})(
								<DatePicker placeholder='结束时间' />
							)}
						</FormItem>
					</FormItem>
				)
			}
				
			return (
				<FormItem key={key} label={label} className='credit-form-normal' >
					{getFieldDecorator(key)(
						this.getFormItem(item)
					)}
				</FormItem>
			)
		})
	}
	dealValuesDate = values => {
		const { queryItems = [] } = this.props;
		const dealItems = queryItems.filter(item => item.compType === 'date' || item.compType === 'singleDate' || item.compType === 'searchSelect');

		dealItems.forEach(item => {
			const { key, mode, submitKey = [] } = item;
			if(item.compType === 'date') {
				if(values[key] && values[key].length) {
					submitKey.forEach((submitItem, index) => {
						values[submitItem] = values[key][index].format('YYYY-MM-DD')
					})
					delete values[key];
				}
			}else if(item.compType === 'singleDate') {
				submitKey.forEach((submitItem) => {
					values[submitItem] = values[submitItem] && values[submitItem].format('YYYY-MM-DD')
				})
			}else if(item.compType === 'searchSelect') {
				if(values[key]) {
					values[key] = mode === 'multiple' ? 
						values[key].length ? values[key].map(selectItem => selectItem['key']).toString() : undefined :
						values[key]['key'];
				}
			}
		})
		return values;
	}
	handleSearch = type => {
		const { form, handleSearch, handleExport } = this.props;

		if(type === 'reset') {
			form.resetFields();
			// handleSearch({page: 1, pageSize: 20});
		}else if(type === 'search' || type === 'export') {
			form.validateFields((errors, values) => {
				if(errors)
					return null;
				const dealValues = this.dealValuesDate(values);
				const operateAction = type === 'search' ? handleSearch : type === 'export' ? handleExport : null;
				if(type === 'search') {
					Object.assign(dealValues, {page: 1, pageSize: 20});
				}
				operateAction(dealValues);
			})
		}
	}

	getFormRowComp = () => {
		const { queryItems = [] } = this.props;
		return this.getFormItemComp(queryItems)
	}

	render() {
		return (
			<Form className='credit_query_search'>
				{this.getFormRowComp()}
			</Form>
		)
	}
}

export default Form.create()(CreditLimitQuery)

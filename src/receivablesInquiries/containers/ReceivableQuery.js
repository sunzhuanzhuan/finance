import React from 'react'
import './receivable.less';
import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import SearchSelect from '@/components/SearchSelect';
const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ReceivableQuery extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}
	componentDidMount() {
		const { form, initialValue = {} } = this.props;
		form.setFieldsValue(initialValue);
	}
	getSelectOption = (key, idKey, labelKey) => {
		const { queryOptions = {}, isList } = this.props;
		if(!queryOptions[key]) return null;
		
		return queryOptions[key].map(item => {
			const dealName = key === 'receivables_aging_range' && isList ? `${item[labelKey]}>0` : item[labelKey];
			return <Option key={item[idKey]} value={item[idKey].toString()}>{dealName}</Option>
		})
	}
	getFormItem = item => {
		const { compType, optionKey, actionKey, dataIndex, keyWord, idKey, labelKey, showSearch } = item;
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
			case 'inputNumber':
				return <InputNumber placeholder="请输入" min={0} className='common_search_width' />;
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
			}else if(compType === 'rangeAndValue') {
				return (
					<span key='rangeAndValue' className='range-value-wrapper'>
						<FormItem className='range-value-item' >
							{getFieldDecorator('receivables_aging_range', { initialValue: undefined })(
								<Select 
									placeholder="请选择" 
									className='range-value'
									filterOption={(input, option) => (
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									)}
								>
									{ this.getSelectOption('receivables_aging_range', 'id', 'display') }
								</Select>
							)}
						</FormItem>
						<span className='range-value-sign'>{'>'}</span>
						<FormItem className='range-value-item' >
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
				Object.assign(dealValues, {page: 1, page_size: 20})
				handleSearch(dealValues);
			})
		}else if(type === 'export') {
			handleExport();
		}
	}
	getFormRowComp = () => {
		const { queryItems = [] } = this.props;

		return this.getFormItemComp(queryItems)
	}

	render() {
		return (
			<Form className='rece-query'>
				{this.getFormRowComp()}
			</Form>
		)
	}
}

export default Form.create()(ReceivableQuery);

import React from 'react'
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import SearchSelect from '@/components/SearchSelect';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class QueryComp extends React.Component {
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
			const {label, compType, key} = item;
			if(compType === 'operate') {
				return (
					<FormItem key={key} className='operate-wrapper'>
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
						{ showExport ? <Button type='primary' onClick={() => {this.handleSearch('export')}}>导出</Button> : null }
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
		const dealItems = queryItems.filter(item => item.compType === 'date' || item.compType === 'searchSelect');

		dealItems.forEach(item => {
			const { key, submitKey = [] } = item;
			if(item.compType === 'date') {
				if(values[key] && values[key].length) {
					submitKey.forEach((submitItem, index) => {
						values[submitItem] = values[key][index].format('YYYY-MM-DD')
					})
					delete values[key];
				}
			}else if(item.compType === 'searchSelect') {
				if(values[key]) {
					values[key] = values[key]['key']
				}
			}
		})
		return values;
	}
	handleSearch = type => {
		const { form, handleSearch, handleExport } = this.props;

		if(type === 'reset') {
			form.resetFields();
			// handleSearch({page: 1, page_size: 20});
		}else if(type === 'search') {
			form.validateFields((errors, values) => {
				if(errors)
					return null;
				const dealValues = this.dealValuesDate(values);
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
			<Form className='invoice_query_search'>
				{this.getFormRowComp()}
			</Form>
		)
	}
}

export default Form.create()(QueryComp)

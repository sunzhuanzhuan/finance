import React from 'react'
import './receivable.less';
import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import SearchSelect from '@/components/SearchSelect';
import moment from 'moment';
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

		if(key === 'receivables_aging_range' && isList) {
			const queryArr = [{id: 0, display: '总欠款'}, ...queryOptions[key]];
			return queryArr.map(item => {
				const dealName = `${item[labelKey]}>0`;
				return <Option key={item[idKey]} value={item[idKey].toString()}>{dealName}</Option>
			})
		}
		
		return queryOptions[key].map(item => {
			return <Option key={item[idKey]} value={item[idKey].toString()}>{item[labelKey]}</Option>
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
			case 'singleDate': 
				return <DatePicker />
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
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
						{ showExport ? <Button type='primary' onClick={() => {this.handleSearch('export')}}>导出</Button> : null }
					</FormItem>
				)
			}else if(compType === 'rangeAndValue') {
				return (
					<span key='rangeAndValue' className='range-value-wrapper'>
						<FormItem className='range-value-item' >
							{getFieldDecorator('receivables_aging_range', { initialValue: undefined })(
								<Select 
									allowClear
									placeholder="请选择账龄" 
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
								<InputNumber placeholder="请输入应收款金额"  className='range-value-input' min={0}/>
							)}
						</FormItem>
					</span>
					
				)
			}
				
			return (
				<FormItem key={key} label={label} >
					{getFieldDecorator(key, { initialValue: compType === 'singleDate' ? moment() : undefined })(
						this.getFormItem(item)
					)}
				</FormItem>
			)
		})
	}
	dealValuesDate = values => {
		const { queryItems = [] } = this.props;
		const dealItems = queryItems.filter(item => 
			item.compType === 'date' || 
			item.compType === 'singleDate' || 
			item.compType === 'searchSelect'
		);

		dealItems.forEach(item => {
			const { key, submitKey = [] } = item;
			if(item.compType === 'date') {
				if(values[key] && values[key].length) {
					submitKey.forEach((submitItem, index) => {
						values[submitItem] = values[key][index].format('YYYY-MM-DD')
					})
					delete values[key];
				}
			}else if(item.compType === 'singleDate') {
				values[key] = values[key].format('YYYY-MM-DD');
			}else if(item.compType === 'searchSelect') {
				if(values[key]) {
					values[key] = values[key]['key'];
				}
			}
			
		});

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

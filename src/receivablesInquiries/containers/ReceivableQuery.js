import React from 'react'
import './receivable.less';
import { Form, Input, Button, Row, Select, DatePicker, InputNumber } from "antd";
import SearchSelect from '@/components/SearchSelect';
const { Option } = Select;
const FormItem = Form.Item;

class ReceivableQuery extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}
	getSelectOption = key => {
		const { queryOptions } = this.props;
		if(!queryOptions[key]) return null;
		return queryOptions[key].map(item => {
			const { name, value } = item;
			return <Option key={value} value={value}>{name}</Option>
		})
	}
	getFormItem = item => {
		const { compType, key, dataIndex, optionKey } = item;
		switch(compType) {
			case 'input':
				return <Input placeholder="请输入" className='common_search_width' />;
			case 'searchSelect':
				return <SearchSelect
							action={this.props.action} 
							style={{ width: 170 }}
							placeholder='请选择'
							getPopupContainer={() => document.querySelector('.rece-query')}
							keyWord={key}
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
				return <DatePicker placeholder="请选择" className='common_search_width' />;
			case 'inputNumber':
				return <InputNumber min={0} className='common_search_width' />;
			default:
				return <Input placeholder="请输入" className='common_search_width' />;
		}
	}
	getFormItemComp = queryItems => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return queryItems.map(item => {
			const {label, compType, key} = item;
			if(compType === 'operate')
				return (
					<FormItem key={key} className='operate-wrapper'>
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
					</FormItem>
				)
			return (
				<FormItem key={key} label={label} >
					{getFieldDecorator(key, { initialValue: undefined })(
						this.getFormItem(item)
					)}
				</FormItem>
			)
		})
	}
	handleSearch = type => {
		const { form, handleSearch } = this.props;

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
		}
	}
	getFormRowComp = () => {
		const { queryItems = [] } = this.props;
		const queryLen = queryItems.length;
		const valueItems = queryItems.filter(item => item.compType !== 'operate');
		const operateItem = queryItems.filter(item => item.compType === 'operate');
		const rowLen = Math.ceil(queryLen / 4)
		const queryLenArr = new Array(rowLen).join(",").split(",");

		const ValueRow = queryLenArr.map( (_, index) => {
			if( valueItems.length >= 4)
				return (
					<Row key={index}>
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

	render() {
		return (
			<Form className='rece-query'>
				{this.getFormRowComp()}
			</Form>
		)
	}
}

export default Form.create()(ReceivableQuery);

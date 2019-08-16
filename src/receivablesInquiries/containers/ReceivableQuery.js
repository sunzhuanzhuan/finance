import React from 'react'
import './receivable.less';
import { Form, Input, Button, Row, Select, DatePicker } from "antd";
import SearchSelect from '@/components/SearchSelect';

const FormItem = Form.Item;

class ReceivableQuery extends React.Component {
	constructor() {
		super();
		this.state = {
		};
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
						this.getFormItem(compType)
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
			<Form className='rece-query'>
				{this.getFormRowComp()}
			</Form>
		)
	}
}

export default Form.create()(ReceivableQuery);

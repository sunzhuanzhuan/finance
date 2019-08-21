import React from 'react'
import { Modal, Form, Table, Button, Input, Radio, Checkbox, Select, Icon } from "antd";
import { getOffAddFormItems, getOffOptions } from '../constants';
import { getTotalWidth } from '@/util';
import { Scolltable } from '@/components';
import SearchSelect from '@/components/SearchSelect';
import qs from 'qs';

const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

class ReceOffModal extends React.Component {
	constructor() {
		super();
		this.state = {
			fieldsValues: {}
		};
	}
	componentDidMount() {

	}

	getModalContent = () => {
		const { type, columns, dataSource, handleOk, action, form } = this.props;
		const { getFieldDecorator } = form;
		if(type === 'preview') {
			const totalWidth = getTotalWidth(columns);
			const wrapperClass = 'preview-off';
			return (
				<div className={wrapperClass}>
					<Button type="primary" onClick={handleOk}>清空已选</Button>
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`}
						widthScroll={totalWidth}
					>
						<Table
							className='top-gap'
							bordered
							rowKey='id'
							columns={columns}
							dataSource={dataSource}
							size="small"
							pagination={false}
							scroll={{ y: 760, x: totalWidth * 2 }}
						/>
					</Scolltable>
				</div>
			)
		}else if(type === 'off') {
			const formItemLayout = {
				labelCol: { span: 6 },
				wrapperCol: { span: 14 },
			};
			return (
				<Form {...formItemLayout}>
					{ this.getOffItemsComp() }
				</Form>
			)
		}else if(type === 'add') {
			const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 }, };
			return (
				<Form>
					<FormItem label='公司简称' {...formItemLayout}>
						{getFieldDecorator('company_id', {
							rules: [
								{ required: true, message: '请先输入公司简称!' },
							]
						})(
							<SearchSelect
								selfWidth
								placeholder='请选择公司'
								action={action}
								keyWord='company_name'
								dataToList={res => { return res.data }}
								item={['company_id', 'name']}
								style={{width: 250}}
							/>
						)}
					</FormItem>
				</Form>
			)
		}
	}

	getOffItemsComp = () => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return getOffAddFormItems().map(item => {
			const { key, label, compType, optionKey, required } = item;
			const tips = compType === 'input' ? '请输入' : '请选择'
			return (
				<FormItem key={key} label={label} >
					{getFieldDecorator(key, 
					{ 
						initialValue: undefined,
						rules: [
							{
								required,
								message: `${tips}${label}`,
							}
						],
					})(
						this.getFormItem(compType, optionKey)
					)}
				</FormItem>
			)
		})
	}

	getFormItem = (compType, optionKey) => {
		switch(compType) {
			case 'input':
				return <Input placeholder="请输入"/>;
			case 'select':
				return <Select placeholder="请输入"/>;
			case 'searchSelect':
				return <SearchSelect
							action={this.handleSelectSearch} 
							style={{ width: '100%' }}
							placeholder='请选择'
							getPopupContainer={() => document.querySelector('.rece-query')}
							keyWord='company_name'
							dataToList={res => { return res.data }}
							item={['company_id', 'name']}
						/>;
			case 'checkbox':
				return <CheckboxGroup options={getOffOptions()[optionKey]} />;
			case 'radio':
				return <RadioGroup options={getOffOptions()[optionKey]}/>;
			case 'upload':
				return <div placeholder="请输入"/>;
			case 'textarea':
				return <TextArea autosize={{ minRows: 4, maxRows: 6 }} placeholder="请输入"/>;
			default:
				return <Input placeholder="请输入"/>;
		}
	}

	handleSelectSearch = () => {

	}

	handleOk = () => {
		const { type, form, history } = this.props;

		if(type === 'off') {
			form.validateFields((errs, values) => {
				if(errs) return;
				this.setState({fieldsValues: values, previewVisible: true});
			})
		}else if(type === 'edit') {
			form.validateFields((errs, values) => {
				if(errs) return;
				const { company_id } = values;
				const src = `/finance/receivableoff/add?${qs.stringify({ keys: { company_id } })}`;
				history.push(src);
			})
		}else if(type === 'add') {
			form.validateFields((errs, values) => {
				if(errs) return;
				const { company_id } = values;
				const src = `/finance/receivableoff/add?${qs.stringify({ keys: { company_id } })}`;
				history.push(src);
			})
		}
	}

	handleConfirm = () =>{
		
	}

	handleCancel = () => {
		this.setState({previewVisible: false, fieldsValues: {}});
	}

	render() {
		const { visible, width, title, footer, handleCancel } = this.props;
		const { previewVisible, fieldsValues } = this.state;
		return [
				<Modal
					key='commonModal'
					wrapClassName='rece-off-modal'
					visible={visible}
					width={width}
					title={title}
					footer={footer}
					destroyOnClose
					onCancel={handleCancel}
					onOk={this.handleOk}
				>
					{ this.getModalContent() }
				</Modal>,
				<ConfirmModal 
					key='confirmModal'
					visible={previewVisible} 
					title='应收核销'
					fieldsValues={fieldsValues} 
					onOk={this.handleConfirm} 
					onCancel={this.handleCancel}
				/>
		]
	}
}

export default Form.create()(ReceOffModal)
function ConfirmModal(props) {
	const { visible, title, fieldsValues, onOk, onCancel } = props;
	const allFields = Object.keys(fieldsValues).map(key => {
		const fieldInfo = getOffAddFormItems().find(fieldItem => fieldItem.key === key);
		return `${fieldInfo.label}：${fieldsValues[key] || '-'}`;
	})

	return (
		<Modal
			wrapClassName='rece-off-confirm-modal'
			visible={visible}
			width={600}
			title={title}
			destroyOnClose
			onCancel={onCancel}
			onOk={onOk}
		>
			<div className='fields-info'>
				<Icon type="info-circle" className='fields-icon' />
				<div className='fields-con'>
					{
						allFields.map(item => {
							return <div key={item}>{item}</div>
						})
					}
				</div>
			</div>	
			<div className='fields-tip'>
				核销后无法撤回，请核对以上信息，谨慎操作，是否确认核销操作？
			</div>
		</Modal>
	)
}
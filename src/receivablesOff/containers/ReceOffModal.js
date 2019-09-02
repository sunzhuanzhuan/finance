import React from 'react'
import { Modal, Form, Table, Button, Input, Radio, Checkbox, Select, Icon, InputNumber, Upload } from "antd";
import { getOffAddFormItems } from '../constants';
import { getTotalWidth, shallowEqual } from '@/util';
import { Scolltable } from '@/components';
import SearchSelect from '@/components/SearchSelect';
import qs from 'qs';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

class ReceOffModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		const { initialValue, type } = nextProps;
		const { stateInitValue } = prevState;
		if(type === 'off' && initialValue && !shallowEqual(initialValue, stateInitValue)) {
			const { gift_amount, warehouse_amount } = initialValue;
			return {
				stateInitValue: initialValue,
				gift_amount: Boolean(gift_amount),
				warehouse_amount: Boolean(warehouse_amount),
				no: !gift_amount && !warehouse_amount
			}
		}
		return null
	}
	getModalContent = () => {
		const { type, options = {} } = this.props;
		const { stateInitValue = {} } = this.state;
		if(type === 'preview') {
			return this.getPreviewTableComp();
		}else if(type === 'off') {
			return this.getOffFormComp();
		}else if(type === 'add') {
			return this.getAddComp();
		}else if(type === 'check') {
			return getValueCheckComp(stateInitValue, false, options);
		}
	}
	getPreviewTableComp = () => {
		const { columns, dataSource, handleOk } = this.props;
		const totalWidth = getTotalWidth(columns);
		const wrapperClass = 'rece-off-modal';
		return (
			<div>
				<Button type="primary" onClick={handleOk}>清空已选</Button>
				<Scolltable 
					isMoreThanOne 
					wrapperClass={wrapperClass}
					scrollClassName={`.${wrapperClass} .ant-table-body`}
					widthScroll={totalWidth * 1.3}
				>
					<Table
						className='top-gap'
						bordered
						rowKey='verification_id'
						columns={columns}
						dataSource={dataSource}
						size="small"
						pagination={false}
						scroll={{ y: 760, x: totalWidth }}
					/>
				</Scolltable>
			</div>
		)
	}

	getAddComp = () => {
		const { form, actionKeyMap } = this.props;
		const { getFieldDecorator } = form;
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
							action={actionKeyMap['company']}
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

	handleChecked = (e) => {
		const { target } = e;
		const { value, checked } = target;

		if(checked && value !== 'no') {
			this.setState({no: false});
		}else if(checked && value === 'no') {
			this.setState({gift_amount: false, warehouse_amount: false})
		}
		
		this.setState({[value]: checked}, () => {
			this.handleChangeIptNum();
		});
	}

	getCheckboxItem = (isStatic) => {
		const { form, options = {} } = this.props;
		const { stateInitValue = {} } = this.state;
		const { getFieldDecorator } = form;
		return options['offCheckOption'].map(item => {
			const { display, id } = item;
			const checkedVal = id !== 'no' ? this.state[id] : 
				this.state[id] || 
				(!this.state['gift_amount']) && 
				(!this.state['warehouse_amount']);
			const countTips = `${display}余额500.00，最多可抵扣500.00`;
			return (
				<div key={id} className='checkbox-wrapper'>
					<Checkbox 
						disabled={isStatic}
						checked={checkedVal} 
						value={id} 
						onChange={this.handleChecked}
					>
						{display}
					</Checkbox>
					{
						this.state[id] && id !== 'no' ? 
						<FormItem className='checkbox-form-item'>
							{getFieldDecorator(id, 
							{ 
								initialValue: stateInitValue[id],
								rules: [
									{
										required: this.state[id],
										message: `请输入${display}抵扣金额`,
									}
								],
							})(
								<InputNumber 
									disabled={isStatic} 
									min={0} placeholder="请输入"
									// precision={2}
									onBlur={val => {this.handleChangeIptNum(id, val)}}
								/>
							)}
							<span className='checkbox-item-tips'>{countTips}</span>
						</FormItem> : null
					}
				</div>
				
			)
		})
		
	}

	getOffFormComp = () => {
		const { form, isEdit, options = {} } = this.props;
		const { stateInitValue = {} } = this.state;
		const { getFieldDecorator } = form;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		};
		const formItemLayoutCheck = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};

		return (
			<Form>
				{
					getOffAddFormItems().map(item => {
						const { key, label, compType, optionKey, actionKey, required, disabled, validator } = item;
						const tips = compType === 'input' ? '请输入' : '请选择';
						const isStatic = isEdit && disabled;

						if(key === 'check_box_item')
							return (
								<FormItem required key={key} label={label} {...formItemLayoutCheck} >
									{this.getCheckboxItem(isStatic)}
								</FormItem>
							)
						if(compType === 'unalterable')
								return (
									<FormItem key={key} label={label} {...formItemLayout} >
										{this.getUnalterableItem(stateInitValue[key])}
									</FormItem>
								)
						return (
							<FormItem key={key} label={label} {...formItemLayout} >
								{getFieldDecorator(key, 
								{ 
									initialValue: stateInitValue[key],
									rules: [
										validator ? {
											validator
										} : {
											required,
											message: `${tips}${label}`,
										}
									],
								})(
									this.getFormItem(key, compType, optionKey, actionKey, isStatic, options)
								)}
							</FormItem>
						)
					})
				}
			</Form>
		)
	}

	handleChangeIptNum = () => {
		const { form } = this.props;
		const { stateInitValue = {} } = this.state;
		const offCountObj = form.getFieldsValue(['verification_amount', 'gift_amount', 'warehouse_amount']);
		const { verification_amount = 0, gift_amount = 0, warehouse_amount = 0 } = offCountObj;

		const debt_amount = verification_amount - gift_amount - warehouse_amount;

		Object.assign(stateInitValue, {debt_amount});
		this.setState({stateInitValue});
	}

	getRadioItem = (option = []) => {
		return option.map(item => {
			const {id, display} = item;
			return <Radio key={id} value={id}>{display}</Radio>
		})
	}

	getSelectOptions = (optionKey) => {
		const { options = {} } = this.props;
		if(!options[optionKey]) return null;
		return options[optionKey].map(item => {
			const { id, display } = item;
			return <Option key={id} value={id}>{display}</Option>
		})
	}

	getUnalterableItem = (staticVal = '') => {
		return <div className='unalterableComp'>{staticVal}</div>
	}

	getFormItem = (key, compType, optionKey, actionKey, disabled, options) => {
		switch(compType) {
			case 'unalterable':
				return <Input disabled={disabled} placeholder="请输入"/>;
			case 'inputNumber':
				return <InputNumber 
					disabled={disabled} 
					className='common-input-numner' 
					min={0}
					// max={} 
					placeholder="请输入"
					// precision={2}
					onBlur={value => {this.handleChangeIptNum(key, value)}}
				/>;
			case 'select':
				return <Select 
						disabled={disabled} 
						placeholder="请输入"
						filterOption={(input, option) => (
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						)}
					>
						{this.getSelectOptions(optionKey)}
					</Select>;
			case 'searchSelect':
				return <SearchSelect
							disabled={disabled}
							action={this.props.actionKeyMap[actionKey]} 
							style={{ width: '100%' }}
							placeholder='请选择'
							getPopupContainer={() => document.querySelector('.rece-query')}
							keyWord='company_name'
							dataToList={res => { return res.data }}
							item={['company_id', 'name']}
						/>;
			case 'radio':
				return <RadioGroup 
					disabled={disabled} 
				>
					{this.getRadioItem(options[optionKey])}
				</RadioGroup>;
			case 'upload':
				return  <>
					<Upload 
						action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
						listType='picture' 
						className='upload-list-inline'
						accept="image/png, image/gif, image/jpg"
					>
						<Button>
							<Icon type="upload" /> 上传
						</Button>
					</Upload>
					<div>支持多图，仅支持jpg\gif\png图片文件，单个文件不能超过3M</div>
				</>;
			case 'textarea':
				return <TextArea autosize={{ minRows: 4, maxRows: 6 }} placeholder="请输入"/>;
			default:
				return <Input placeholder="请输入"/>;
		}
	}

	handleOk = () => {
		const { type, form, history } = this.props;

		if(type === 'off') {
			form.validateFields((errs, fieldsValues) => {
				// if(errs) return;
				this.setState({fieldsValues, previewVisible: true, gift_amount: false, warehouse_amount: false});
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

	handleCommonCancel = () => {
		const { handleCancel } = this.props;
		handleCancel();
		this.setState({stateInitValue: undefined});
	}

	handleConfirm = () =>{
		const { fieldsValues } = this.state;
		this.props.handleOk('offVisible', fieldsValues);
		this.setState({previewVisible: false, fieldsValues: undefined});
	}

	handleCancel = () => {
		this.setState({previewVisible: false, fieldsValues: undefined});
	}

	render() {
		const { visible, width, title, footer } = this.props;
		const { previewVisible, fieldsValues } = this.state;
		return [
				<Modal
					key='commonModal'
					wrapClassName='rece-off-modal rece-off-confirm-modal'
					visible={visible}
					width={width}
					title={title}
					footer={footer}
					destroyOnClose
					onCancel={this.handleCommonCancel}
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
	const { visible, title, fieldsValues = {}, onOk, onCancel, options = {} } = props;
	
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
			{getValueCheckComp(fieldsValues, true, options)}
		</Modal>
	)
}

function getValueCheckComp(fieldsValues, isConfirm, options) {
	const className = isConfirm ? 'fields-con' : 'flex-fields-con';
	const checkOption = options['offCheckOption'] || []
	let isShowDeduct;

	const deductItems = checkOption
		.filter(item => item.id !== 'no')
		.map(item => {
			const {id, display} = item;
			if(fieldsValues[id]) {
				isShowDeduct = true;
				return <div key={id}>{`${display}：${fieldsValues[id] || '-'}`}</div>;
			}
		});
	const allFields = getOffAddFormItems().map(item => {
		const { label, key } = item;
		if( key === 'check_box_item')
			return (
				<div key={key} className='deduct-wrapper'>
					<div>{label}：</div>
					{ isShowDeduct ? <div>{deductItems}</div> : '-' }
				</div> 
			)
		return `${label}：${fieldsValues[key] || '-'}`
	})

	return (
		<>
			<div className='fields-info'>
				{ isConfirm ? <Icon type="info-circle" className='fields-icon' /> : null }
				<div className={className}>
					{
						allFields.map(item => {
							return <div key={item}>{item}</div>
						})
					}
				</div>
			</div>	
			{
				isConfirm ? 
				<div className='fields-tip'>
					核销后无法撤回，请核对以上信息，谨慎操作，是否确认核销操作？
				</div> : null
			}
		</>
	)
}

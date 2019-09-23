import React from 'react'
import { Modal, Form, Table, Button, Input, Radio, Checkbox, Select, Icon, InputNumber, Upload, message } from "antd";
import { getOffAddFormItems } from '../constants';
import { getTotalWidth } from '@/util';
import { Scolltable } from '@/components';
import SearchSelect from '@/components/SearchSelect';
import qs from 'qs';
import moment from 'moment';
import numeral from 'numeral';
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
		const { initialValue = {}, visible } = nextProps;
		const { stateVisible } = prevState;
		if(stateVisible !== visible) {
			const { gift_amount, warehouse_amount } = initialValue;
			return {
				stateVisible: visible,
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
							autoFocus
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

	getCheckboxItem = (isStatic, validator) => {
		const { form, options = {} } = this.props;
		const { stateInitValue = {} } = this.state;
		const { getFieldDecorator } = form;
		return options['offCheckOption'].map(item => {
			const { display, id } = item;
			const checkedVal = id !== 'no' ? this.state[id] : 
				this.state[id] || 
				(!this.state['gift_amount']) && 
				(!this.state['warehouse_amount']);
			const account = 500.00;
			const countTips = `${display}余额${account}，最多可抵扣${account}`;
			const errorMsg = [
				`请输入${display}抵扣金额`,
				`${display}的抵扣金额不能大于${display}的余额`
			]
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
										validator: (rule, value, callback) => {
											validator(rule, value, callback, account, errorMsg)
										}
									}
								],
							})(
								<InputNumber 
									disabled={isStatic} 
									placeholder="请输入"
									precision={2}
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
		const { created_at } = stateInitValue;
		const { getFieldDecorator } = form;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		};
		const formItemLayoutCheck = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
		const isSameMonth = moment(created_at).isSame(moment(), 'year') && 
			moment(created_at).isSame(moment(), 'month');

		return (
			<Form>
				{
					getOffAddFormItems().map(item => {
						const { key, label, compType, optionKey, actionKey, required, disabled, validator } = item;
						const tips = compType === 'input' || compType === 'inputNumber' ? '请输入' : '请选择';
						const radioStatic = isEdit && !isSameMonth;
						const isStatic = compType === 'radio' ? radioStatic : isEdit && disabled;
						const formItemCls = compType === 'upload' ? 'upload-form-item' : ''

						if(key === 'check_box_item')
							return (
								<FormItem required key={key} label={label} {...formItemLayoutCheck} >
									{this.getCheckboxItem(isStatic, validator)}
								</FormItem>
							)
						if(compType === 'unalterable')
								return (
									<FormItem key={key} label={label} {...formItemLayout} >
										{this.getUnalterableItem(stateInitValue[key])}
									</FormItem>
								)
						return (
							<FormItem className={formItemCls} key={key} label={label} {...formItemLayout} >
								{getFieldDecorator(key, 
								{ 
									initialValue: stateInitValue[key],
									rules: [
										validator ? {
											required,
											validator: (rule, value, callback) => {
												validator(rule, value, callback, stateInitValue['can_verification_amount'], ['必输输大于0且小于等于本次可核销金额的值'], true)
											}
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

	getErrorTips = msg => {
		try {
			if (typeof message.destroy === 'function') {
				message.destroy();
			}
			message.error(msg || '操作失败！');
		}catch (error) {
			console.log(error);
		}
	};

	handleChangeIptNum = () => {
		const { form } = this.props;
		const { stateInitValue = {} } = this.state;
		const offCountObj = form.getFieldsValue(['verification_amount', 'gift_amount', 'warehouse_amount']);
		const { verification_amount = 0, gift_amount = 0, warehouse_amount = 0 } = offCountObj;
		const totalDiscount = Number(gift_amount) + Number(warehouse_amount);
		const debt_amount = numeral(verification_amount - totalDiscount).format('0.00');
		const isIllegalVal = totalDiscount - verification_amount > 0;

		if(isIllegalVal && totalDiscount && verification_amount)
			this.getErrorTips('抵扣金额的和不能大于本次核销金额!');

		if(verification_amount)
			Object.assign(stateInitValue, {debt_amount});
		this.setState({stateInitValue, isIllegalVal});
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

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
	
		this.setState({
			previewImage: file.url || file.preview,
			previewPicVisible: true,
		});
	};

	handleChangePic = ({ fileList }) => this.setState({ fileList });

	beforeUpload = file => {
		// return false;
	}

	getFormItem = (key, compType, optionKey, actionKey, disabled, options) => {
		switch(compType) {
			case 'unalterable':
				return <Input disabled={disabled} placeholder="请输入"/>;
			case 'inputNumber':
				return <InputNumber 
					disabled={disabled} 
					className='common-input-numner' 
					placeholder="请输入"
					precision={2}
					onBlur={value => {this.handleChangeIptNum(key, value)}}
				/>;
			case 'select':
				return <Select 
						disabled={disabled} 
						placeholder="请选择"
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
				const { fileList = [] } = this.state;
				return  <>
					<Upload 
						multiple
						disabled={fileList.length >= 5}
						action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
						accept="image/png, image/gif, image/jpg" 
						listType="picture-card"
						fileList={fileList}
						onPreview={this.handlePreview}
						onChange={this.handleChangePic}
						beforeUpload={this.beforeUpload}
						// customRequest={this.handleChange}
					>
						<div className="ant-upload-text">上传</div>
					</Upload>
					<div className='upload-infos'>支持最多5张图片上传，仅支持jpg\gif\png图片文件，单个文件不能超过3M</div>
				</>;
			case 'textarea':
				return <TextArea autosize={{ minRows: 4, maxRows: 6 }} placeholder="请输入"/>;
			default:
				return <Input placeholder="请输入"/>;
		}
	}

	handleOk = () => {
		const { type, form, history } = this.props;
		const { stateInitValue } = this.state;

		if(type === 'off') {
			form.validateFields((errs, fieldsValues) => {
				// if(errs) return;
				const { isIllegalVal } = this.state;
				if(isIllegalVal) {
					this.getErrorTips('抵扣金额的和不能大于本次核销金额!');
				}else {
					Object.assign(stateInitValue, fieldsValues);
					this.setState({stateInitValue, previewVisible: true});
				}
			})
		}else if(type === 'add') {
			form.validateFields((errs, values) => {
				if(errs) return;
				const { company_id: { key } } = values;

				const src = `/finance/receivableoff/add?${qs.stringify({ company_id: key })}`;
				history.push(src);
			})
		}
	}

	handleConfirm = () =>{
		const { stateInitValue } = this.state;
		this.props.handleOk('offVisible', stateInitValue);
		this.setState({
			previewVisible: false
		});
	}

	handleCancel = () => {
		this.setState({previewVisible: false, previewPicVisible: false});
	}

	render() {
		const { visible, width, title, footer, handleCancel, options } = this.props;
		const { previewVisible, stateInitValue, previewPicVisible, previewImage } = this.state;
		return [
				<Modal
					key='commonModal'
					wrapClassName='rece-off-modal rece-off-confirm-modal'
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
					options={options}
					fieldsValues={stateInitValue} 
					onOk={this.handleConfirm} 
					onCancel={this.handleCancel}
				/>
				,
				<Modal 
					key='previewPicture' 
					visible={previewPicVisible} 
					footer={null} 
					onCancel={this.handleCancel}
				>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
		]
	}
}

export default Form.create()(ReceOffModal)
function ConfirmModal(props) {
	const { visible, title, fieldsValues = {}, onOk, onCancel, options = {} } = props;
	const itemKeys = [
		'can_verification_amount', 'total_verification_amount', 'check_box_item', 
		'total_debt_amount', 'is_decrease_company_gmv', 'is_decrease_sale_gmv', 
		'is_record_sale_income'
	];
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
			{getValueCheckComp(fieldsValues, true, options, itemKeys)}
		</Modal>
	)
}

function getValueCheckComp(fieldsValues, isConfirm, options, itemKeys) {
	const className = isConfirm ? 'fields-con' : 'flex-fields-con';
	const checkOption = options['offCheckOption'] || []
	let isShowDeduct;
	const getNumeral = value => {
		return value || value == 0 ? numeral(value).format('0.00') : '-';
	}

	const deductItems = checkOption
		.filter(item => item.id !== 'no')
		.map(item => {
			const {id, display} = item;
			if(fieldsValues[id])
				isShowDeduct = true;
			return <div key={id}>{`${display}：${getNumeral(fieldsValues[id])}`}</div>;
		});
	const radioValueMap = {
		0: '否',
		1: '是',
	}
	const allFields = getOffAddFormItems(itemKeys).map(item => {
		const { label, key, compType, isNumber, optionKey } = item;
		let showValue;
		if( key === 'check_box_item')
			return (
				<div key={key} className='deduct-wrapper'>
					<div>{label}：</div>
					{ isShowDeduct ? <div>{deductItems}</div> : '-' }
				</div> 
			)
		if(compType === 'radio') {
			showValue = radioValueMap[fieldsValues[key]] || '-';
		}else if(compType === 'select') {
			const selectOption = options[optionKey] || [];
			const itemInfo = selectOption.find(optItem => optItem.id == fieldsValues[key]) || {};
			showValue = itemInfo.display || '-';
		}else if(isNumber) {
			showValue = getNumeral(fieldsValues[key]);
		}else {
			showValue = fieldsValues[key] || '-';
		}
		return `${label}：${showValue}`;
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

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

import React from 'react'
import { Modal, Form, Table, Button, Input, Radio, Checkbox, Select, Icon, InputNumber, message, Spin } from "antd";
import { WBYUploadFile } from 'wbyui';
import { getOffAddFormItems } from '../constants';
import { getTotalWidth, shallowEqual } from '@/util';
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
			loading: false, 
			attachment: ''
		};
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		const { initialValue = {}, visible } = nextProps;
		const { stateVisible } = prevState;
		if(stateVisible !== visible) {
			const { total_gift_amount, total_warehouse_amount, attachment } = initialValue;
			return {
				stateVisible: visible,
				stateInitValue: initialValue,
				total_gift_amount: Boolean(Number(total_gift_amount)),
				total_warehouse_amount: Boolean(Number(total_warehouse_amount)),
				no: !Number(total_gift_amount) && !Number(total_warehouse_amount),
				attachment: attachment || ''
			}
		}
		return null
	}
	getModalContent = () => {
		const { type, options = {} } = this.props;
		const { stateInitValue = {} } = this.state;
		const checkKey = [
			'company_name', 'sale_name', 'type', 'total_verification_amount', 'check_box_item', 'total_debt_amount', 'is_decrease_company_gmv', 'is_record_sale_income', 'is_decrease_sale_gmv', 'attachment', 'remark'
		]
		if(type === 'preview') {
			return this.getPreviewTableComp();
		}else if(type === 'off') {
			return this.getOffFormComp();
		}else if(type === 'add') {
			return this.getAddComp();
		}else if(type === 'check') {
			return getValueCheckComp(stateInitValue, false, options, checkKey);
		}
	}
	getPreviewTableComp = () => {
		const { columns, dataSource, handleOk } = this.props;
		// const totalWidth = getTotalWidth(columns);
		// const wrapperClass = 'rece-off-modal';
		return (
			<div>
				<Button type="primary" onClick={handleOk}>清空已选</Button>
				<Table
					className='top-gap'
					bordered
					rowKey='order_id'
					columns={columns}
					dataSource={dataSource}
					size="small"
					pagination={false}
					// scroll={{ y: 760 }}
				/>
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
			this.setState({total_gift_amount: false, total_warehouse_amount: false})
		}
		
		this.setState({[value]: checked}, () => {
			this.handleChangeIptNum();
		});
	}

	getCheckboxItem = (isStatic, validator) => {
		const { form, options = {}, discountInfo = {}, isEdit } = this.props;
		const { stateInitValue = {} } = this.state;
		const { getFieldDecorator } = form;
		return options['offCheckOption'].map(item => {
			const { display, id } = item;
			const checkedVal = id !== 'no' ? this.state[id] : 
				this.state[id] || 
				(!this.state['total_gift_amount']) && 
				(!this.state['total_warehouse_amount']);
			const countTips = isEdit ? '' : `${display}余额${discountInfo[id]}，最多可抵扣${discountInfo[id]}`;
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
											validator(rule, value, callback, discountInfo[id], errorMsg)
										}
									}
								],
							})(
								<InputNumber 
									disabled={isStatic} 
									placeholder="请输入"
									min={0}
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

	getUploadInitialVal = initialVal => {
		if(initialVal) {
			return initialVal.split(',').map(item => {
				const valParam = item.split('/') || [];
				return {
					url: item,
					filepath: item.split('.com/')[1],
					name: valParam[valParam.length - 1]
				}
			})
		}
	}

	getOffFormComp = () => {
		const { form, isEdit, options = {} } = this.props;
		const { stateInitValue = {}, loading } = this.state;
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
		const addItems = isEdit ? getOffAddFormItems().filter(item => item.key !== 'can_verification_amount') : getOffAddFormItems();

		return (
			<Spin spinning={loading}>
				<Form>
					{
						addItems.map(item => {
							const { key, label, compType, optionKey, actionKey, required, disabled, validator } = item;
							const tips = compType === 'input' || compType === 'inputNumber' ? '请输入' : '请选择';
							const radioStatic = isEdit && !isSameMonth;
							const isStatic = compType === 'radio' ? radioStatic : isEdit && disabled;

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
							if(compType === 'upload') {
								const { goldenToken = {} } = this.props;
								const helpInfo = <div className='upload-infos'>支持最多5张图片上传，仅支持jpg\gif\png图片文件，单个文件不能超过3M</div>
								return (
									<FormItem className='upload-form-item' help={helpInfo} key={key} label={label} {...formItemLayout} >
										{getFieldDecorator(key,{
											initialValue: this.getUploadInitialVal(stateInitValue[key])
										})(
											<WBYUploadFile
												ref={x => this.uploadFile = x}
												tok={{
													token: goldenToken.upload_token || 'undefined',
													upload_url: goldenToken.upload_url || 'undefined'
												}}
												onChange={this.handleFileChange}
												showUploadList={{
													showPreviewIcon: true,
													showRemoveIcon: true
												}}
												onPreview={this.handlePreview}
												uploadText={'上传'}
												multiple={true}
												size={3}
												len={5}
												accept={".png,.gif,.jpg"} 
												listType="picture-card"
											/>
										)}
									</FormItem>
								)
							}
							const getInitialValue = (initialValue) => {
								if(initialValue || initialValue == 0)
									return compType === 'select' || compType === 'radio' ? Number(initialValue) : initialValue;
							}
							return (
								<FormItem key={key} label={label} {...formItemLayout} >
									{getFieldDecorator(key, 
									{ 
										initialValue: getInitialValue(stateInitValue[key]),
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
			</Spin>
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
		const offCountObj = form.getFieldsValue(['total_verification_amount', 'total_gift_amount', 'total_warehouse_amount']);
		const { total_verification_amount = 0, total_gift_amount = 0, total_warehouse_amount = 0 } = offCountObj;
		const totalDiscount = Number(total_gift_amount) + Number(total_warehouse_amount);
		const total_debt_amount = numeral(total_verification_amount - totalDiscount).format('0.00');
		const isIllegalVal = totalDiscount - total_verification_amount > 0;

		if(isIllegalVal && totalDiscount && total_verification_amount)
			this.getErrorTips('抵扣金额的和不能大于本次核销金额!');

		if(total_verification_amount)
			Object.assign(stateInitValue, {total_debt_amount});
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

	handleFileChange = (fileList) => {
		const newFileInfos = (fileList.map(item => item.url)).toString();
		const { attachment } = this.state;
		if(!shallowEqual(newFileInfos, attachment))
			this.setState({attachment: newFileInfos});
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
			case 'textarea':
				return <TextArea autosize={{ minRows: 4, maxRows: 6 }} placeholder="请输入"/>;
			default:
				return <Input placeholder="请输入"/>;
		}
	}

	handleOk = () => {
		const { type, form, history } = this.props;
		const { stateInitValue, attachment } = this.state;

		if(type === 'off') {
			form.validateFields((errs, fieldsValues) => {
				if(errs) return;
				const { isIllegalVal } = this.state;
				const { total_gift_amount = 0, total_warehouse_amount = 0 } = fieldsValues;
				if(!total_gift_amount) {
					Object.assign(fieldsValues, {total_gift_amount: 0});
				}
				if(!total_warehouse_amount) {
					Object.assign(fieldsValues, {total_warehouse_amount: 0});
				}
				if(isIllegalVal) {
					this.getErrorTips('抵扣金额的和不能大于本次核销金额!');
				}else {
					Object.assign(stateInitValue, fieldsValues, {attachment});
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
		this.setState({
			previewVisible: false,
			loading: true
		});
		this.props.handleOk('offVisible', stateInitValue, () => {this.setState({loading: false})});
	}

	handleCancel = () => {
		this.setState({previewVisible: false, previewPicVisible: false});
	}

	render() {
		const { visible, width, title, footer, handleCancel, options, isEdit, type } = this.props;
		const { previewVisible, stateInitValue, previewPicVisible, previewImage } = this.state;
		return [
				<Modal
					key='commonModal'
					wrapClassName='rece-off-modal rece-off-confirm-modal'
					visible={visible}
					maskClosable={type !== 'off'}
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
					isEdit={isEdit}
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
	const { isEdit, visible, title, fieldsValues = {}, onOk, onCancel, options = {} } = props;
	const allKeys = [
		'can_verification_amount', 'total_verification_amount', 'check_box_item', 
		'total_debt_amount', 'is_decrease_company_gmv', 'is_decrease_sale_gmv', 
		'is_record_sale_income'
	];
	const itemKeys = isEdit ? allKeys.filter(item => item !== 'can_verification_amount') : allKeys;
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
	const discountCls = isConfirm ? '' : 'discount-wrapper';
	const checkOption = options['offCheckOption'] || []
	const getNumeral = value => {
		return value || value == 0 ? numeral(value).format('0.00') : '-';
	}

	let isDiscount = false;
	const deductItems = checkOption
		.filter(item => item.id !== 'no')
		.map(item => {
			const {id, display} = item;
			if(fieldsValues[id])
				isDiscount = true;
			return <div key={id} className={discountCls}>{`${display}：${getNumeral(fieldsValues[id])}`}</div>;
		});
	const radioValueMap = {
		2: '否',
		1: '是',
	}
	const allFields = getOffAddFormItems(itemKeys).map(item => {
		const { label, key, compType, isNumber, optionKey } = item;
		let showValue;
		if( key === 'check_box_item') {
			if(isDiscount) {
				return (
					<div key={key} className='deduct-wrapper'>
						<div>{label}：</div>
						<div>{deductItems}</div>
					</div> 
				)
			}else {
				return (
					<div key={key} className='deduct-wrapper'>
						<div>{label}：</div>
						<div>无抵扣</div>
					</div> 
				)
			}
		}
		if(compType === 'upload') {
			const uploadVal = fieldsValues[key] || '';
			const uploadArr = uploadVal.split(',');
			if(uploadVal) {
				return (
					<div key='upload_wrapper'>
						<span>{label}：</span>
						<span>
							{
								uploadArr.map((uploadItem, index) => {
									if( uploadItem.indexOf('http') > -1 )
										return (
											<img style={{width: 60, height: 60}} src={uploadItem} key={uploadItem + index}/>
										)
									return uploadItem;
								})
							}
						</span>
					</div>
				)
			}else {
				showValue = '-';
			}
			
		}
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
						allFields.map((item, index) => {
							return <div key={item + index}>{item}</div>
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

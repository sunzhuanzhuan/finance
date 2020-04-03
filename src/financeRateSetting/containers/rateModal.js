import React from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import './financeRateSetting.less';
import { accMulRate, percentToValueRate } from '../constants';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class RateModal extends React.Component {
	constructor() {
		super();
		this.basicRateItem = [
			{
				isIncludeLeft: undefined, rangeLeft: undefined, 
				isIncludeRight: undefined, rangeRight: undefined, 
				yinProfitRate: undefined, yangProfitRate: undefined
			}
		];
		this.state = {}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {type} = nextProps;
		if(type !== prevState.type)
			return {
				type
			}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		const { form, initialVal } = prevProps;
		const { type } = this.state;
		if(prevState.type !== type) {
			const celurRules = type === 'add' ? {celurRules: this.basicRateItem} : initialVal;
			form.setFieldsValue(celurRules);
		}
	}

	handleDelRateItem = (index) => {
		const { form } = this.props;
		const delRateList = [...form.getFieldValue('celurRules')];
		delRateList.splice(index, 1);
		form.setFieldsValue({celurRules: delRateList})
	}

	handleAddRateItem = () => {
		const { form } = this.props;
		const currentList = [...form.getFieldValue('celurRules')];
		const addRateList = [...currentList, ...this.basicRateItem];
		form.setFieldsValue({celurRules: addRateList})
	}

	handleChangeRateRangeVal = (value, type, index) => {
		const { form } = this.props;
		const allRateList = [...form.getFieldValue('celurRules')];
		const currentItem = allRateList[index];
		const editItem = {...currentItem};
		const dealType = type === 'yinProfitRate' || type === 'yangProfitRate' ? 'div' : 'number';
		editItem[type] = this.getPercentData(value, dealType);
		allRateList.splice(index, 1, editItem);
		form.setFieldsValue({celurRules: allRateList})
	}

	getPercentData = (data, type) => {
		let floatVal = parseFloat(data);
		if (isNaN(floatVal))
			return undefined;
		if(type === 'mul') {
			return accMulRate(data, 100);
		}else if(type === 'div') {
			return percentToValueRate(data)
		}else if(type === 'number') {
			return floatVal;
		}
	}

	getPolicyRankComp = () => {
		const { form } = this.props;
		const allRateList = form.getFieldValue('celurRules');
		if(!(Array.isArray(allRateList) && allRateList.length))
			return null;
		return allRateList.map((item, index) => {
			const { isIncludeLeft, rangeLeft, isIncludeRight, rangeRight, yinProfitRate, yangProfitRate } = item;
			const isShowDelBtn = allRateList.length && index !== 0;
			return (
				<div key={index} className='rate-range-item'>
					<Select 
						placeholder='请选择' className='rate-select' 
						defaultValue={isIncludeLeft} 
						onChange={value => this.handleChangeRateRangeVal(value, 'isIncludeLeft', index)}
					>
						<Option value={1}>包含</Option>
						<Option value={0}>不包含</Option>
					</Select>
					<InputNumber 
						precision={2} placeholder='请输入' 
						className='rate-ipt' value={rangeLeft} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'rangeLeft', index)} 
					/>
					<span>------</span>
					<Select 
						placeholder='请选择' className='rate-select' 
						defaultValue={isIncludeRight} 
						onChange={value => this.handleChangeRateRangeVal(value, 'isIncludeRight', index)}
					>
						<Option value={1}>包含</Option>
						<Option value={0}>不包含</Option>
					</Select>
					<InputNumber 
						precision={2} placeholder='请输入' 
						className='rate-ipt' value={rangeRight} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'rangeRight', index)} 
					/>
					<span>则阴价利润率为</span>
					<InputNumber 
						precision={2} placeholder='输入数值' 
						className='rate-ipt' value={this.getPercentData(yinProfitRate, 'mul')} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'yinProfitRate', index)} 
					/>
					<span>%，阳价利润率为</span>
					<InputNumber 
						precision={2} placeholder='输入数值' 
						className='rate-ipt' value={this.getPercentData(yangProfitRate, 'mul')} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'yangProfitRate', index)} 
					/>
					<span>%</span>
					{
						isShowDelBtn ? <a className='rate-delete' onClick={() => this.handleDelRateItem(index)}>删除</a> : null
					}
				</div>
			)
		})
	}

	getRateSettingComp = () => {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Form>
				<FormItem label='策略名称'>
					{getFieldDecorator('celuename')(
						<Input placeholder="请输入" />
					)}
				</FormItem>
				<FormItem label='政策阶梯'>
					<div>
						{ this.getPolicyRankComp() }
						<a onClick={this.handleAddRateItem}>添加更多</a>
						<div className='rate-rank-info'>说明：数值设置必须覆盖所有区间即[0, 9999999]元，数值可设置多个区间多个利润率。</div>
					</div>
				</FormItem>
				<FormItem label='备注'>
					{getFieldDecorator('celuebeizhu')(
						<TextArea
							className='rate-remark-ipt'
							placeholder="请输入至少五个字符"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('celurRules')(
						<div></div>
					)}
				</FormItem>
			</Form>
		)
	}

	getModalTitle = (type) => {
		switch(type) {
			case 'add':
				return '新增策略';
			case 'edit':
				return '修改策略';
			default:
				return '提示';
		}
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

	validateFieldsValues = () => {
		const { form } = this.props;
		const fieldsValus = form.getFieldsValue();
		const { celurRules } = fieldsValus;
		const validateResult = {
			error: '',
			fieldsValus
		}
		const { celuename, celuebeizhu } = fieldsValus;
		const firstRateItem = celurRules[0];
		const lastRateItem = celurRules[celurRules.length - 1];
		if(!celuename || (celuename && !(celuename.trim()))) {
			validateResult.error = '请输入策略名称';
			return validateResult;
		}else if(celuename.trim() && celuename.trim().length > 50) {
			validateResult.error = '策略名称最多不超过50个字符';
			return validateResult;
		}else if(firstRateItem['isIncludeLeft'] != 1 || Number(firstRateItem['rangeLeft']) != 0 || lastRateItem['isIncludeRight'] != 1 || Number(lastRateItem['rangeRight']) != 9999999) {
			validateResult.error = '区间设置不符合规则，请重新设置';
			return validateResult;
		}
		celurRules.every((item, index) => {
			let isContinue = true;
			const { isIncludeLeft, rangeLeft, isIncludeRight, rangeRight, yinProfitRate, yangProfitRate } = item;
			const rangeValues = [isIncludeLeft, rangeLeft, isIncludeRight, rangeRight];

			rangeValues.forEach(item => {
				if(item === undefined || item === '') {
					validateResult.error = '有未填写的区间输入框';
					isContinue = false;
				}
			})

			if(celurRules.length > 1 && index < celurRules.length - 1) {
				const nextItem = celurRules[index + 1];
				const { isIncludeLeft: nextIsIncludeLeft, rangeLeft: nextRangeLeft } = nextItem;
				if(isIncludeRight == nextIsIncludeLeft || Number(rangeRight) != Number(nextRangeLeft)) {
					validateResult.error = '区间设置不符合规则，请重新设置';
					isContinue = false;
				}
			}

			if(!yinProfitRate && !yangProfitRate) {
				const rangeText = this.getRangeText(isIncludeLeft, rangeLeft, isIncludeRight, rangeRight);
				validateResult.error = `阴价利润率，阳价利润率不能同时为空，请输入区间${rangeText}利润率`;
				isContinue = false;
			}

			return isContinue;
		})
		if(validateResult.error)
			return validateResult

		if(celuebeizhu && celuebeizhu.length > 255) {
			validateResult.error = '备注最多不超过255个字符';
		}

		return validateResult
	}

	getRangeText = (isIncludeLeft, rangeLeft, isIncludeRight, rangeRight) => {
		const isIncludeArr = [
			{ value: 0, leftSign: '(', rightSign: ')' },
			{ value: 1, leftSign: '[', rightSign: ']' },
		];
		const leftItem = isIncludeArr.find(item => item.value == isIncludeLeft) || {};
		const rightItem = isIncludeArr.find(item => item.value == isIncludeRight) || {};
		return `${leftItem.leftSign}${Number(rangeLeft)}-${Number(rangeRight)}${rightItem.rightSign}`
	}

	handleSaveRateValues = type => {
		const { handleSaveOperation } = this.props;
		const validateResult = this.validateFieldsValues();
		if(validateResult.error) {
			this.getErrorTips(validateResult.error);
			return;
		}
		handleSaveOperation(validateResult.data, type);
	}

	render() {
		const { type, onCancel } = this.props;
		return (
			<Modal
				width={1080}
				maskClosable={false}
				visible={Boolean(type)}
				destroyOnClose={true}
				title={this.getModalTitle(type)}
				onCancel={onCancel}
				onOk={() => this.handleSaveRateValues(type)}
				wrapClassName='reate-setting-modal'
				cancelText=''
			>
				{ this.getRateSettingComp() }
			</Modal>
		)
	}
}

export default Form.create()(RateModal)

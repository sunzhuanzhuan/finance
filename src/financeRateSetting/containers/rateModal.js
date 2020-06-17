import React from 'react';
import { Modal, Form, Input, Select, InputNumber, message, Spin } from 'antd';
import './financeRateSetting.less';
import { isIncludeArr, getDealRateData } from '../constants';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class RateModal extends React.Component {
	constructor() {
		super();
		this.basicRateItem = [
			{
				minInclude: undefined, min: undefined, 
				maxInclude: undefined, max: undefined, 
				privateProfit: undefined, publicProfit: undefined
			}
		];
		this.state = {}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {type, loading} = nextProps;
		if(type !== prevState.type) {
			return {
				type
			}
		}else if(loading !== prevState.loading) {
			return {
				loading
			}
		}else {
			return null;
		}	
	}

	componentDidUpdate(_, prevState) {
		const { form, initialVal } = this.props;
		const { type } = this.state;
		if(prevState.type !== type) {
			const detailVOList = type === 'add' ? {detailVOList: this.basicRateItem} : initialVal;
			form.setFieldsValue(detailVOList);
		}
	}

	handleDelRateItem = (index) => {
		const { form } = this.props;
		const delRateList = [...form.getFieldValue('detailVOList')];
		delRateList.splice(index, 1);
		form.setFieldsValue({detailVOList: delRateList})
	}

	handleAddRateItem = () => {
		const { form } = this.props;
		const currentList = [...form.getFieldValue('detailVOList')];
		const addRateList = [...currentList, ...this.basicRateItem];
		form.setFieldsValue({detailVOList: addRateList})
	}

	handleChangeRateRangeVal = (value, type, index) => {
		const { form } = this.props;
		const allRateList = [...form.getFieldValue('detailVOList')];
		const currentItem = allRateList[index];
		const editItem = {...currentItem};
		const dealType = type === 'privateProfit' || type === 'publicProfit' ? 'div' : 'number';
		editItem[type] = getDealRateData(value, dealType);
		allRateList.splice(index, 1, editItem);
		form.setFieldsValue({detailVOList: allRateList})
	}

	getPolicyRankComp = () => {
		const { form } = this.props;
		const allRateList = form.getFieldValue('detailVOList');
		if(!(Array.isArray(allRateList) && allRateList.length))
			return null;
		return allRateList.map((item, index) => {
			const { minInclude, min, maxInclude, max, privateProfit, publicProfit } = item;
			const isShowDelBtn = allRateList.length && index !== 0;
			return (
				<div key={index} className='rate-range-item'>
					<Select 
						placeholder='请选择' className='rate-select' 
						value={minInclude} 
						onChange={value => this.handleChangeRateRangeVal(value, 'minInclude', index)}
					>
						<Option value={1}>包含</Option>
						<Option value={0}>不包含</Option>
					</Select>
					<InputNumber 
						precision={2} placeholder='请输入' 
						className='rate-ipt' value={min} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'min', index)} 
					/>
					<span>------</span>
					<Select 
						placeholder='请选择' className='rate-select' 
						value={maxInclude} 
						onChange={value => this.handleChangeRateRangeVal(value, 'maxInclude', index)}
					>
						<Option value={1}>包含</Option>
						<Option value={0}>不包含</Option>
					</Select>
					<InputNumber 
						precision={2} placeholder='请输入' 
						className='rate-ipt' value={max} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'max', index)} 
					/>
					<span>则利润率为</span>
					<InputNumber 
						placeholder='输入数值' 
						className='rate-ipt' value={getDealRateData(privateProfit, 'mul')} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'privateProfit', index)} 
					/>
					<span>%，三方平台利润率为</span>
					<InputNumber 
						placeholder='输入数值' 
						className='rate-ipt' value={getDealRateData(publicProfit, 'mul')} 
						onChange={(value) => this.handleChangeRateRangeVal(value, 'publicProfit', index)} 
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
		const { loading } = this.state;
		const { getFieldDecorator } = form;
		return (
			<Spin spinning={Boolean(loading)}>
				<Form>
					<FormItem label='策略名称'>
						{getFieldDecorator('name')(
							<Input placeholder="请输入" />
						)}
					</FormItem>
					<FormItem label='策略阶梯'>
						<div>
							{ this.getPolicyRankComp() }
							<a onClick={this.handleAddRateItem}>添加更多</a>
							<div className='rate-rank-info'>说明：数值设置必须覆盖所有区间[0, 9999999]，数值可设置多个区间多个利润率。</div>
						</div>
					</FormItem>
					<FormItem label='备注'>
						{getFieldDecorator('remark')(
							<TextArea
								className='rate-remark-ipt'
								placeholder="请输入至少五个字符"
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('id')(
							<div></div>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('detailVOList')(
							<div></div>
						)}
					</FormItem>
				</Form>
			</Spin>
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

	isNumberOk = data => {
		const pointReg = /^-?\d+(\.\d{1,10})?$/;
		const isNumber = !isNaN(data) && isFinite(data);
		const result = isNumber && pointReg.test(data) && data >= -1 && data <= 99.9999999999;
		return result;
	}

	isProfitRangeOk = (privateProfit, publicProfit) =>  {
		const valueArr = [privateProfit, publicProfit];
		const notEmptyArr = valueArr.filter(item => typeof item !== 'undefined');

		if(notEmptyArr.length) {
			const judgeValArr = notEmptyArr.filter(item => this.isNumberOk(item));
			return judgeValArr.length === notEmptyArr.length;
		}else {
			return false
		}
	}

	validateFieldsValues = () => {
		const { form } = this.props;
		const fieldsValus = form.getFieldsValue();
		const { detailVOList } = fieldsValus;
		const validateResult = {
			error: '',
			fieldsValus
		}
		const { name, remark } = fieldsValus;
		const firstRateItem = detailVOList[0];
		const lastRateItem = detailVOList[detailVOList.length - 1];
		if(!name || (name && !(name.trim()))) {
			validateResult.error = '请输入策略名称';
			return validateResult;
		}else if(name.trim() && name.trim().length > 50) {
			validateResult.error = '策略名称最多不超过50个字符';
			return validateResult;
		}else if(firstRateItem['minInclude'] != 1 || Number(firstRateItem['min']) != 0 || lastRateItem['maxInclude'] != 1 || Number(lastRateItem['max']) != 9999999) {
			validateResult.error = '区间设置不符合规则，请重新设置';
			return validateResult;
		}
		detailVOList.every((item, index) => {
			let isContinue = true;
			const { minInclude, min, maxInclude, max, privateProfit, publicProfit } = item;
			const rangeValues = [minInclude, min, maxInclude, max];

			rangeValues.forEach(item => {
				if(item === undefined || item === '') {
					validateResult.error = '有未填写的区间输入框';
					isContinue = false;
				}
			})

			if(detailVOList.length > 1 && index < detailVOList.length - 1) {
				const nextItem = detailVOList[index + 1];
				const { minInclude: nextMinInclude, min: nextRangeMin } = nextItem;
				if(min == max ||maxInclude == nextMinInclude || Number(max) != Number(nextRangeMin)) {
					validateResult.error = '区间设置不符合规则，请重新设置';
					isContinue = false;
				}
			}

			if(!(privateProfit || privateProfit == 0) && !(publicProfit || publicProfit == 0)) {
				const rangeText = this.getRangeText(minInclude, min, maxInclude, max);
				validateResult.error = `利润率，三方平台利润率不能同时为空，请输入区间${rangeText}利润率`;
				isContinue = false;
			}

			if(!this.isProfitRangeOk(privateProfit, publicProfit)) {
				validateResult.error = '利润率设置不合法，输入范围【-100% - 9999.99999999%】';
				isContinue = false;
			}

			return isContinue;
		})
		if(validateResult.error)
			return validateResult

		if(remark && remark.length > 255) {
			validateResult.error = '备注最多不超过255个字符';
		}

		return validateResult
	}

	getRangeText = (minInclude, min, maxInclude, max) => {
		const leftItem = isIncludeArr.find(item => item.value == minInclude) || {};
		const rightItem = isIncludeArr.find(item => item.value == maxInclude) || {};
		return `${leftItem.leftSign}${Number(min)}-${Number(max)}${rightItem.rightSign}`
	}

	handleSaveRateValues = () => {
		const { handleSaveOperation } = this.props;
		const validateResult = this.validateFieldsValues();
		if(validateResult.error) {
			this.getErrorTips(validateResult.error);
			return;
		}
		handleSaveOperation(validateResult.fieldsValus);
	}

	render() {
		const { type, onCancel, loading } = this.props;
		return (
			<Modal
				width={1115}
				maskClosable={false}
				visible={Boolean(type)}
				destroyOnClose={true}
				title={this.getModalTitle(type)}
				onCancel={onCancel}
				onOk={this.handleSaveRateValues}
				wrapClassName='reate-setting-modal'
				okButtonProps={{disabled: loading}}
				cancelButtonProps={{disabled: loading}}
			>
				{ this.getRateSettingComp() }
			</Modal>
		)
	}
}

export default Form.create()(RateModal)

import React from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import './financeRateSetting.less';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
class RateModal extends React.Component {
	constructor() {
		super();
		this.state = {
			allRateList: [
				{
					isIncludeLeft: undefined, rangeLeft: undefined, 
					isIncludeRight: undefined, rangeRight: undefined, 
					yinProfitRate: undefined, yangProfitRate: undefined
				}
			]
		}
	}

	handleDelRateItem = (index) => {
		const delRateList = [...this.state.allRateList];
		delRateList.splice(index, 1);
		this.setState({ allRateList: delRateList });
	}

	handleAddRateItem = () => {
		const { allRateList } = this.state;
		this.setState({
			allRateList: [
				...allRateList, 
				{ 
					isIncludeLeft: undefined, rangeLeft: undefined, 
					isIncludeRight: undefined, rangeRight: undefined, 
					yinProfitRate: undefined, yangProfitRate: undefined
				}
			]
		})
	}

	handleChangeRateRangeVal = (value, type, index) => {
		const allRateList = [...this.state.allRateList];
		const editItem = allRateList[index];
		editItem[type] = value;
		this.setState({allRateList});
	}

	getPolicyRankComp = () => {
		const { allRateList = [] } = this.state;
		return allRateList.map((item, index) => {
			const { isIncludeLeft, rangeLeft, isIncludeRight, rangeRight, yinProfitRate, yangProfitRate } = item;
			const isShowDelBtn = allRateList.length && index !== 0;
			return (
				<div key={+new Date() + Math.random()} className='rate-range-item'>
					<Select 
						placeholder='请选择' className='rate-select' 
						defaultValue={isIncludeLeft} 
						onChange={value => this.handleChangeRateRangeVal(value, 'isIncludeLeft', index)}
					>
						<Option value={0}>包含</Option>
						<Option value={1}>不包含</Option>
					</Select>
					<InputNumber 
						precision={2} placeholder='请输入' 
						className='rate-ipt' defaultValue={rangeLeft} 
						onBlur={({target: {value}}) => this.handleChangeRateRangeVal(value, 'rangeLeft', index)} 
					/>
					<span>------</span>
					<Select 
						placeholder='请选择' className='rate-select' 
						defaultValue={isIncludeRight} 
						onChange={value => this.handleChangeRateRangeVal(value, 'isIncludeRight', index)}
					>
						<Option value={0}>包含</Option>
						<Option value={1}>不包含</Option>
					</Select>
					<InputNumber 
						precision={2} placeholder='请输入' 
						className='rate-ipt' defaultValue={rangeRight} 
						onBlur={({target: {value}}) => this.handleChangeRateRangeVal(value, 'rangeRight', index)} 
					/>
					<span>则阴价利润率为</span>
					<InputNumber 
						precision={2} placeholder='输入数值' 
						className='rate-ipt' defaultValue={yinProfitRate} 
						onBlur={({target: {value}}) => this.handleChangeRateRangeVal(value, 'yinProfitRate', index)} 
					/>
					<span>%，阳价利润率为</span>
					<InputNumber 
						precision={2} placeholder='输入数值' 
						className='rate-ipt' defaultValue={yangProfitRate} 
						onBlur={({target: {value}}) => this.handleChangeRateRangeVal(value, 'yangProfitRate', index)} 
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
					{
						<div>
							{ this.getPolicyRankComp() }
							<a onClick={this.handleAddRateItem}>添加更多</a>
							<div className='rate-rank-info'>说明：数值设置必须覆盖所有区间即[0, 9999999]元，数值可设置多个区间多个利润率。</div>
						</div>
						
					}
				</FormItem>
				<FormItem label='备注'>
					{getFieldDecorator('celuebeizhu')(
						<TextArea
							className='rate-remark-ipt'
							placeholder="请输入至少五个字符"
						/>
					)}
				</FormItem>
			</Form>
		)
	}

	getModalContent = (type) => {
		switch (type) {
			case 'add':
			case 'edit':
				return this.getRateSettingComp();
			case 'clear':
				return (
					<div>清空列表</div>
				)
		}
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

	render() {
		const { type, onCancel, handleSaveOperation } = this.props;
		return (
			<Modal
				width={1050}
				maskClosable={false}
				visible={Boolean(type)}
				destroyOnClose={true}
				title={this.getModalTitle(type)}
				onCancel={onCancel}
				onOk={() => handleSaveOperation(type)}
				wrapClassName='reate-setting-modal'
				cancelText=''
			>
				{ this.getModalContent(type) }
			</Modal>
		)
	}
}

export default Form.create()(RateModal)

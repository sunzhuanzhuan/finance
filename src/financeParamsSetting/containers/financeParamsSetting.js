import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Modal, Table, InputNumber, Icon, Spin, Empty, message } from 'antd'
import './financeParamsSetting.less'
import numeral from 'numeral';
import { financeParams, historyCol } from '../constants';

class FinanceParamsSetting extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	
	handleEditParamVal = key => {
		this.setState({ [`${key}-edit`]: true });
	}

	handleChangeParamVal = (key, value) => {
		const dealVal = value || value === 0 ? numeral(value / 100).format('0.0000') : null;

		this.setState({[key]: dealVal});
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

	handleSaveParamVal = (key, label) => {
		const { financeParamsVal = [], setFinanceParamsVal, getFinanceParamsVal } = this.props;
		const editItem = financeParamsVal.find(item => item.key === key) || {};
		if(this.state[key] === null) {
			this.getErrorTips(`${label}不可为空`);
			return;
		}
		Object.assign(editItem, {key, value: this.state[key]});
		this.setState({ loading: true });
		setFinanceParamsVal(editItem).finally(() => {
			this.setState({
				[`${key}-edit`]: false,
				[key]: null,
				loading: false
			})
			getFinanceParamsVal();
		});
	}

	handleCancel = (key) => {
		this.setState({ 
			[`${key}-edit`]: false,
			[key]: null
		});
	}

	handleShowModal = historyData => {
		this.setState({
			visible: true,
			historyData
		})
	}

	handleCloseModal = () => {
		this.setState({
			visible: false,
			historyData: null
		})
	}

	getModalContent = () => {
		const { historyData = [] } = this.state;
		return (
			<Table 
				rowKey='time' 
				columns={historyCol} 
				dataSource={historyData} 
				bordered 
			/>
		)
	}

	getParamsContent = financeParamsVal => {
		return financeParamsVal.map(itemValueInfo => {
			const { key, label, value, history } = itemValueInfo;
			const defaultVal = numeral(value * 100).format('0.00');
			return (
				<div className='params-item' key={key}>
					<div className='item-left'>
						<span>{label}</span>
						{
							this.state[`${key}-edit`] ? 
							[
								<InputNumber 
									key='input' 
									autoFocus
									min={0}
									max={999999999}
									precision={2}
									defaultValue={defaultVal} 
									// formatter={value => `${value}%`}
									onChange={iptValue => this.handleChangeParamVal(key, iptValue)}
								/>,
								<Icon key='ok' type="check" onClick={() => this.handleSaveParamVal(key, label)}/>,
								<Icon key='cancel' type="close-square" onClick={() => this.handleCancel(key)} />
							]
							:
							<a className='item-val' onClick={() => this.handleEditParamVal(key)}>{`${defaultVal}%`}</a>
						}
					</div>
					<div className='item-right'><a onClick={() => this.handleShowModal(history)}>查看修改历史</a></div>
				</div>
			)
		})
	}

	render() {
		const { loading = false, visible } = this.state;
		const { financeParamsVal } = this.props;
		return (
			<div className='finance-params-wrapper'>
				<h2>财务参数设置</h2>
				<Spin spinning={loading}>
					{
						Array.isArray(financeParamsVal) && financeParamsVal.length ?
						<div className='params-content'>
							<div className='params-tips'>说明：点击有下划线内容可修改参数信息</div>
							{ this.getParamsContent(financeParamsVal) }
						</div>
						: 
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					}
				</Spin>
				<Modal
					visible={visible}
					title='查看修改历史'
					destroyOnClose
					footer={null}
					onCancel={this.handleCloseModal}
				>
					{ this.getModalContent() }
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { financeParamsReducer } = state;
	const { financeParamsVal } = financeParamsReducer;
	return {
		// financeParamsVal,
		financeParamsVal: [
			{ 
				label: '工作室服务费率',
				key: 'key1', value: '', 
				history: [
					{
						time: '2019-11-11 20:47',
						operator: '小明',
						base: '10%'
					},
					{
						time: '2019-11-12 20:47',
						operator: '小明',
						base: '10%'
					},
				]
			},
			{ 
				label: '工作室平均回票税率',
				key: 'key2', value: '2', 
				history: [
					{
						time: '2019-11-11 20:47',
						operator: '小明',
						base: '10%'
					}
				]
			},
			{ 
				label: '微播易消项税税率',
				key: 'key3', value: '3', 
				history: [
					{
						time: '2019-11-11 20:47',
						operator: '小明',
						base: '10%'
					},
					{
						time: '2019-11-12 20:47',
						operator: '小明',
						base: '10%'
					}
				]
			},
			{ 
				label: '布谷鸟消项税税率',
				key: 'key4', value: '4', 
				history: [
					{
						time: '2019-11-11 20:47',
						operator: '小明',
						base: '10%'
					}
				]
			},
			{ 
				label: '专票6%->专票3% 扣款税率',
				key: 'key5', value: '5', 
				history: [
					{
						time: '2019-11-11 20:47',
						operator: '小明',
						base: '10%'
					},
					{
						time: '2019-11-12 20:47',
						operator: '小明',
						base: '10%'
					}
					
				]
			},
			{ 
				label: '专票3%->普票0% 扣款税率',
				key: 'key6', value: '6', 
				history: [
					{
						time: '2019-11-11 20:47',
						operator: '小明',
						base: '10%'
					}
				]
			},
			{ 
				label: '普票0%->不回票扣款税率',
				key: 'key7', value: '7', 
				history: [
					{
						time: '2019-11-11 20:47',
						operator: '小明',
						base: '10%'
					},
					{
						time: '2019-11-12 20:47',
						operator: '小明',
						base: '10%'
					},
				]
			},
		],
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(FinanceParamsSetting)

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Modal, Table, Input, Icon, Spin, Empty, message, Statistic } from 'antd';
import './financeParamsSetting.less';
import { financeParams, historyCol } from '../constants';
import { accMul, percentToValue, scientificToNumber } from '@/util';
class FinanceParamsSetting extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.errorTips = {
			1: '输入范围是[0-10000]，最多八位小数的数字,举例:如果想设置6.388%,请输入6.388',
			2: '只允许输入0-999999999最多两位小数的数字'
		}
	}

	componentDidMount() {
		this.props.getFinanceParamsVal();
	}
	
	handleEditParamVal = (key, value) => {
		this.setState({ 
			[`${key}-edit`]: true,
			[key]: value
		});
	}

	handleChangeParamVal = (key, value, isPercent) => {
		if(value === '') {
			this.setState({[key]: value})
			return;
		}
		const dealedVal = isPercent ? percentToValue(value) : value;
		this.setState({[key]: dealedVal.toFixed(10)});
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

	judgeInputVal = (val, isPercent) => {
		const percentRegex = /^\d+(\.\d{1,10})?$/;
		const numRegex = /^\d+(\.\d{1,2})?$/;

		const percentRule = val >= 0 && val <= 100 && percentRegex.test(val);
		const numRule = val >= 0 && val <= 999999999 && numRegex.test(val);

		return isPercent ? percentRule : numRule;
	}

	handleSaveParamVal = (id, itemKey, label, isPercent, itemValue) => {
		const { setFinanceParamsVal, getFinanceParamsVal } = this.props;

		if(this.state[itemKey] == itemValue) {
			this.getErrorTips('数据未发生改变');
			return;
		}
		if(!(this.judgeInputVal(this.state[itemKey], isPercent))) {
			const tips = isPercent ? this.errorTips[1] : this.errorTips[2];
			this.getErrorTips(tips);
			return;
		}

		this.setState({ loading: true });
		setFinanceParamsVal({id, itemKey, itemValue: this.state[itemKey]}).finally(() => {
			this.setState({
				[`${itemKey}-edit`]: false,
				[itemKey]: null,
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

	isShowModal = (historyLabel, itemKey, isPercent) => {
		this.setState({
			visible: !this.state.visible,
			historyLoading: true,
			historyLabel, 
			isPercent
		})

		if(itemKey) {
			this.props.getFinanceEditHistory({itemKey}).then(result => {
				const { data = [] } = result;
				this.setState({historyData: data, historyLoading: false});
			}).catch(() => {
				this.setState({ historyLoading: false });
			})
		}else {
			this.setState({historyData: []})
		}
	}

	getModalContent = () => {
		const { historyData = [], historyLoading = false, historyLabel, isPercent } = this.state;
		return (
			<Spin spinning={historyLoading}>
				<Table 
					rowKey='modifiedAt' 
					columns={historyCol(historyLabel, isPercent)} 
					dataSource={historyData} 
					bordered 
				/>
			</Spin>
		)
	}

	getParamsContent = financeParamsVal => {
		return financeParams.map(itemLabelInfo => {
			const { label, key, isPercent } = itemLabelInfo;
			const itemValueInfo = financeParamsVal.find(item => item.itemKey === key);
			if(!itemValueInfo)
				return null;
			const { id, itemValue, itemKey } = itemValueInfo;
			const defaultVal = isPercent ? scientificToNumber(accMul(itemValue, 100)) : parseFloat(itemValue);
			const wrapperCls = this.state[`${key}-edit`] ? 'params-item params-item-edit' : 'params-item';
			return (
				<div className={wrapperCls} key={key}>
					<div className='item-left'>
						<span className='item-label'>{label}</span>
						{
							this.state[`${key}-edit`] ? 
							<div className='item-value'>
								<div key='input' className='item-input'>
									<Input 
										autoFocus
										addonAfter='%'
										defaultValue={defaultVal} 
										onChange={({target:{value}}) => this.handleChangeParamVal(key, value, isPercent)}
									/>
									<div key='tips' className='editTips'>{isPercent ? this.errorTips[1] : this.errorTips[2]}</div>
								</div>
								{isPercent ? null : <span className='item-sign' key='sign'>元</span>}
								<Icon key='ok' type="check" onClick={() => this.handleSaveParamVal(id, itemKey, label, isPercent, itemValue)}/>
								<Icon key='cancel' type="close-square" onClick={() => this.handleCancel(key)} />
							</div>
							:
							<div className='item-value'>
								<a key='value' className='item-val' onClick={() => this.handleEditParamVal(key, itemValue)}>
									{
										isPercent ? 
											`${defaultVal}%` 
											: 
											<Statistic className='numberStastic' value={defaultVal}/>
									}
								</a>
								{isPercent ? null : <span key='sign'>元</span>}
							</div>	
						}
					</div>
					<div className='item-right'><a onClick={() => this.isShowModal(label, itemKey, isPercent)}>查看修改历史</a></div>
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
					wrapClassName='financeParamsModal'
					title='查看修改历史'
					destroyOnClose
					footer={null}
					onCancel={this.isShowModal}
				>
					{ this.getModalContent() }
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { financeParamsReducer } = state;
	const { financeParamsVal, financeParamHistory } = financeParamsReducer;
	return {
		financeParamsVal,
		financeParamHistory
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(FinanceParamsSetting)

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

	componentDidMount() {
		this.props.getFinanceParamsVal();
	}
	
	handleEditParamVal = key => {
		this.setState({ [`${key}-edit`]: true });
	}

	handleChangeParamVal = (key, value, isPercent) => {
		const dealVal = isPercent && value !== null ? numeral(value / 100).format('0.0000') : value;

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

	handleSaveParamVal = (id, itemKey, label) => {
		const { setFinanceParamsVal, getFinanceParamsVal } = this.props;
		if(this.state[itemKey] === null) {
			this.getErrorTips(`${label}不可为空`);
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
			const defaultVal = isPercent ? numeral(itemValue * 100).format('0.00') : itemValue;
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
									max={isPercent ? 100 : 999999999}
									precision={2}
									defaultValue={defaultVal} 
									// formatter={value => `${value}%`}
									onChange={iptValue => this.handleChangeParamVal(key, iptValue, isPercent)}
								/>,
								<Icon key='ok' type="check" onClick={() => this.handleSaveParamVal(id, itemKey, label)}/>,
								<Icon key='cancel' type="close-square" onClick={() => this.handleCancel(key)} />
							]
							:
							<a className='item-val' onClick={() => this.handleEditParamVal(key)}>{isPercent ? `${defaultVal}%` : defaultVal}</a>
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

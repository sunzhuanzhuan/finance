import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Modal } from 'antd';
import './financeRateSetting.less'
import RateDetailCommon from './rateDetailCommon';
import RateDetailModal from './rateDetailModal';

class FinanceRateDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			selectedRows: undefined,
			deleteMulVisible: false
		}
	}

	getTotalMsg = (accountNum, mainNum, isClear) => {
		return (
			<div>
				<span>{`账号数：${accountNum}个`}</span>
				<span className='total-info-text'>{`主账号数${mainNum}个`}</span>
				{
					isClear ? <a>清空</a> : null
				}
			</div>
		)
	}

	handleOperate = (type, value) => {
		switch (type) {
			case 'addAccount':
				this.setState({
					visible: true
				});
				return;
			case 'search': 
				const { profitStrategyId } = this.props;
				const searchVal = {...value, profitStrategyId};
				this.props.getProfitStrategyAccountList(searchVal);
				return;
			case 'delMulAccount':
				if(Array.isArray(value) && value.length)
					this.setState({
						deleteMulVisible: true,
						selectedRows: value
					})
				return;
			default:
				return;
		}
	}

	handleCancelModal = type => {
		this.setState({
			[type]: false
		})
	}
	
	handleMulDelAccount = () => {
		const { selectedRows = [] } = this.state; 
	}

	getAccountListInfo = () => {
		const { selectedRows = [] } = this.state;
		const showArr = selectedRows.slice(0, 2);
		const showText = showArr.map(item => `${item.accountId} ${item.snsName}`);
		return selectedRows.length > 2 ? `${showText.join('，')}，...等${selectedRows.length}个账号吗？` : `${showText.join('，')}吗？`;
	}

	getDelMulComp = () => {
		const profitStrategyId = '策略id';
		const profitStrategyName = '策略名称';
		return (
			<div>
				<span>{`确定删除${profitStrategyId} ${profitStrategyName}下的`}</span>
				<span>{this.getAccountListInfo()}</span>
			</div>
		)
	}


	render() {
		const { visible, deleteMulVisible, selectedRows } = this.state;
		const profitStrategyId = '策略id';
		const profitStrategyName = '策略名称';
		return (
			<div>
				<RateDetailCommon 
					{...this.props}
					type='detailPage'
					selectedRows={selectedRows}
					profitStrategyId={profitStrategyId}
					profitStrategyName={profitStrategyName}
					handleOperate={this.handleOperate} 
				/>
				<RateDetailModal 
					{ ...this.props }
					visible={visible}
					profitStrategyId={123}
					onCancel={() => this.handleCancelModal('visible')}
				/>
				<Modal
					maskClosable={false}
					visible={deleteMulVisible}
					destroyOnClose={true}
					title='批量删除'
					onOk={this.handleMulDelAccount}
					onCancel={() => this.handleCancelModal('deleteMulVisible')}
					wrapClassName='rate-selected-modal'
				>
					{
						this.getDelMulComp()
					}
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
export default connect(mapStateToProps, mapDispatchToProps)(FinanceRateDetail)

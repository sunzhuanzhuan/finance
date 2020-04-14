import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Modal } from 'antd';
import './financeRateSetting.less'
import RateDetailCommon from './rateDetailCommon';
import RateDetailModal from './rateDetailModal';
import qs from "qs";

class FinanceRateDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			selectedRows: undefined,
			deleteMulVisible: false,
			searchQuery: {
				pageNum: 1, 
				pageSize: 20
			}
		}
	}

	componentDidMount () {
		const { searchQuery } = this.state;
		this.handleSearch(searchQuery);
	}

	handleSearch = (value) => {
		const searchVal = qs.parse(this.props.location.search.substring(1));
		this.setState({loading: true});
		this.props.getProfitStrategyAccountList({...value, profitStrategyId: searchVal.id}).finally(() => {
			this.setState({loading: false});
		});
	}

	handleOperate = (type, baseVal) => {
		const { selectedRows = [] } = this.state;
		switch (type) {
			case 'addAccount':
				this.setState({
					visible: true
				});
				return;
			case 'search': 
				this.handleSearch(baseVal);
				this.setState({searchQuery: baseVal});
				return;
			case 'selectedChange':
				this.setState({selectedRows: baseVal});
				return;
			case 'delMulAccount':
				if(Array.isArray(selectedRows) && selectedRows.length)
					this.setState({
						deleteMulVisible: true,
					})
				return;
			case 'delAccount': 
				const { profitStrategyId } = this.props;
				const { searchQuery } = this.state;
				const delObj = {
					profitStrategyId,
					accountIds: [baseVal]
				};
				this.setState({loading: true});
				this.props.deleteProfitStrategyAccount(delObj).then(() => {
					const deledSelectedRows = selectedRows.filter(item => item.accountId !== baseVal);
					this.setState({selectedRows: deledSelectedRows});
					this.handleSearch(searchQuery);
				}).finally(() => {
					this.setState({loading: false});
				});
				return;
			default:
				return;
		}
	}

	handleCancelModal = type => {
		if(type === 'visible') {
			this.props.clearAccountListToBind();
		}
		this.setState({
			[type]: false
		})
	}
	
	handleMulDelAccount = () => {
		const { selectedRows = [], searchQuery } = this.state; 
		const { profitStrategyId } = this.props;
		const delObj = {
			profitStrategyId,
			accountIds: selectedRows.map(item => item.accountId)
		};
		this.setState({loading: true});
		this.props.deleteProfitStrategyAccount(delObj).then(() => {
			this.setState({selectedRows: []});
			this.handleSearch(searchQuery);
			this.handleCancelModal('deleteMulVisible');
		}).finally(() => {
			this.setState({loading: false});
		});
	}

	getAccountListInfo = () => {
		const { selectedRows = [] } = this.state;
		const showArr = selectedRows.slice(0, 2);
		const showText = showArr.map(item => `${item.accountId} ${item.snsName || ''}`);
		return selectedRows.length > 2 ? `${showText.join('，')}，...等${selectedRows.length}个账号吗？` : `${showText.join('，')}吗？`;
	}

	getDelMulComp = (profitStrategyId = '', profitStrategyName = '') => {
		const profitInfo = profitStrategyId && profitStrategyName ? `${profitStrategyId} ${profitStrategyName}` : '该策略';
		return (
			<div>
				<span>{`确定删除${profitInfo}下的`}</span>
				<span>{this.getAccountListInfo()}</span>
			</div>
		)
	}

	refreshPage = () => {
		const { searchQuery } = this.props;
		this.handleSearch(searchQuery);
	}

	render() {
		const { profitStrategyId = '', profitStrategyName = '' } = this.props;
		const { loading, visible, deleteMulVisible, selectedRows } = this.state;
		return (
			<div>
				<RateDetailCommon 
					{...this.props}
					loading={loading}
					type='detailPage'
					selectedRows={selectedRows}
					profitStrategyId={profitStrategyId}
					profitStrategyName={profitStrategyName}
					handleOperate={this.handleOperate} 
				/>
				<RateDetailModal 
					{ ...this.props }
					visible={visible}
					profitStrategyId={profitStrategyId}
					profitStrategyName={profitStrategyName}
					onCancel={() => this.handleCancelModal('visible')}
					refreshPage={this.refreshPage}
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
						this.getDelMulComp(profitStrategyId, profitStrategyName)
					}
				</Modal>
			</div>
			
		)
	}
}

const mapStateToProps = (state) => {
	const { financeRateReducer } = state;
	const { profitStrategyAccountInfo = {} } = financeRateReducer;
	const { strategyInfo = {} } = profitStrategyAccountInfo;
	const { profitStrategyId, profitStrategyName } = strategyInfo;
	return {
		profitStrategyId, profitStrategyName
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(FinanceRateDetail)

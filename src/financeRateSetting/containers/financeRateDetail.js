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

	handleOperate = (type, value) => {
		switch (type) {
			case 'addAccount':
				this.setState({
					visible: true
				});
				return;
			case 'search': 
				this.handleSearch(value);
				this.setState({searchQuery: value});
				return;
			case 'delMulAccount':
				if(Array.isArray(value) && value.length)
					this.setState({
						deleteMulVisible: true,
						isDeleteAll: false,
						selectedRows: value
					})
				return;
			case 'delAccount': 
				this.setState({loading: true});
				this.props.deleteProfitStrategyAccount().then(() => {
					this.handleSearch(value);
				}).finally(() => {
					this.setState({loading: false});
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
		this.setState({selectedRows: [], isDeleteAll: true});
		this.handleCancelModal('deleteMulVisible');
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
		// const { profitStrategyAccountInfo = {} } = this.props;
		const profitStrategyAccountInfo = {
			aggregation: {
				accountCount: 10,
				mcnCount: 20,
				profitStrategyId: 1233333,
				profitStrategyName: '策略名称'
			}
		}
		const { aggregation = {} } = profitStrategyAccountInfo;
		const { profitStrategyId, profitStrategyName } = aggregation;
		const { loading, visible, deleteMulVisible, selectedRows, isDeleteAll } = this.state;

		return (
			<div>
				<RateDetailCommon 
					{...this.props}
					loading={loading}
					type='detailPage'
					isDeleteAll={isDeleteAll}
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
	const { profitStrategyAccountInfo } = financeParamsReducer;
	return {
		profitStrategyAccountInfo
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(FinanceRateDetail)

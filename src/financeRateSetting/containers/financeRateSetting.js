import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Table, Button } from 'antd'
import './financeRateSetting.less'
import { getRateSettingCol } from '../constants';
import RateModal from './rateModal';

class FinanceRateSetting extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			modalType: null
		}
	}

	handleOperate = (type, item) => {
		switch (type) {
			case 'add': 
			case 'edit': 
				this.setState({
					modalType: type,
					rateInitialVal: item
				})
				return;
			case 'delete': 

				return;
			case 'detail': 
					this.props.history.push('/finance/financeRateSetting/detail');
				return;
			case 'export': 

				return;
			case 'clear': 
				return;
			default: return;
		}
	}

	handleCloseModal = () => {
		const { operateLoading } = this.state;
		if(!operateLoading) 
			this.setState({
				modalType: null
			})
	}

	handleSaveOperation = (type, data) => {
		const { addFinanceRate, editFinanceRate } = this.props;
		const operationAction = type === 'add' ? addFinanceRate : editFinanceRate;
		this.setState({operateLoading: true});
		operationAction(data).then(() => {
			this.handleJump({page: 1, page_size: 20});
			this.setState({operateLoading: false});
		}).catch(() => {
			this.setState({operateLoading: false});
		})
	}

	handleJump = query => {
		const { getFinanceRateList } = this.props;
		this.setState({ loading: true });
		getFinanceRateList(query).then(() => {
			this.setState({loading: false});
		}).catch(() => {
			this.setState({loading: false});
		});
	}

	render() {
		const { rateListInfo: { total = 0, page = 1, page_size = 20, list = []} } = this.props;
		const { loading, operateLoading, modalType, rateInitialVal } = this.state;
		const pagination = {
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200'],
			onChange: current => {
				this.handleJump({ page: current, page_size });
			},
			onShowSizeChange: (_, pageSize) => {
				this.handleJump({ page, page_size: pageSize });
			},
		};

		return (
			<div className='finance-rate-wrapper'>
				<h3>账号特殊利润率设置</h3>
				<Button type='primary' className='rate-add-btn' onClick={() => this.handleOperate('add')}>新增策略</Button>
				<Table 
					rowKey='profitStrategyId' 
					columns={getRateSettingCol(this.handleOperate)} 
					dataSource={list} 
					bordered 
					pagination={pagination} 
					loading={loading}
				/>
				<RateModal 
					loading={operateLoading}
					type={modalType}
					initialVal={rateInitialVal}
					onCancel={this.handleCloseModal}
					handleSaveOperation={this.handleSaveOperation}
				/>
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { financeRateReducer } = state;
	const { rateListInfo } = financeRateReducer;
	return {
		// rateListInfo,
		rateListInfo: {
			total: 20, 
			page: 1, page_size: 20, 
			list: [
				{
					id: 1234,
					name: '策略名称',
					detailVOList: [
						{
							minInclude: 1, min: 0, 
							maxInclude: 1, max: 10, 
							privateProfit: 0.09, publicProfit: 0.09
						},
						{
							minInclude: 1, min: 10, 
							maxInclude: 1, max: 100, 
							privateProfit: 0.09, publicProfit: 0.09
						},
						{
							minInclude: 1, min: 100, 
							maxInclude: 1, max: 1000, 
							privateProfit: 0.09, publicProfit: 0.09
						},
						{
							minInclude: 1, min: 1000, 
							maxInclude: 1, max: 10000, 
							privateProfit: 0.09, publicProfit: 0.09
						},
						{
							minInclude: 1, min: 999.99, 
							maxInclude: 1, max: 999.99, 
							privateProfit: 0.09, publicProfit: 0.09
						}
					],
					celuebeizhu: '策略备注'
				}
			]
		},

	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(FinanceRateSetting)

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Table, Button, Modal } from 'antd';
import './financeRateSetting.less';
import qs from "qs";
import { getRateSettingCol } from '../constants';
import RateModal from './rateModal';

class FinanceRateSetting extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			modalType: null,
			pageInfo: {
				page: { currentPage: 1, pageSize: 20 }
			}
		}
	}

	handleDelInfo = (name, id, isDelete) => {
		if(isDelete) {
			Modal.confirm({
				title: `该${name}下没有添加相关账号信息,确定删除${name}吗？`,
				okText: '确认',
				cancelText: '取消',
				onOk: () => {
					this.setState({loading: true});
					this.props.delProfitStrategy({stragegyId: id}).then(() => {
						const { pageInfo } = this.state;
						this.handleJump(pageInfo);
					}).finally(() => {
						this.setState({loading: false});
					});
				}
			});
		}else {
			Modal.warning({
				title: `请先删除${name}下面添加的账号信息`,
				okText: '确定'
			});
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
				const { id, name } = item;
				this.props.isProfitStrategyHasAccounts({stragegyId: id}).then(result => {
					this.handleDelInfo(name, id, result.data);
				})
				
				return;
			case 'detail': 
				this.props.history.push({
					pathname: '/finance/financeRateSetting/detail',
					search: '?' + qs.stringify({ id: item.id })
				});
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

	handleSaveOperation = data => {
		const { saveFinanceRate } = this.props;
		const { pageInfo } = this.state;
		this.setState({operateLoading: true});
		saveFinanceRate(data).then(() => {
			this.handleJump(pageInfo);
			this.setState({operateLoading: false});
		}).catch(() => {
			this.setState({operateLoading: false});
		})
	}

	handleJump = query => {
		const { getFinanceRateList } = this.props;
		this.setState({ loading: true });
		getFinanceRateList(query).finally(() => {
			this.setState({loading: false});
		})
	}

	render() {
		const { rateListInfo: { total = 0, pageNum = 1, pageSize = 20, list = []} } = this.props;
		const { loading, operateLoading, modalType, rateInitialVal } = this.state;
		const pagination = {
			total: parseInt(total),
			current: parseInt(pageNum),
			pageSize: parseInt(pageSize),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200'],
			onChange: currentPage => {
				const current = {
					page: { currentPage, pageSize }
				}
				this.handleJump(current);
				this.setState({pageInfo: current});
			},
			onShowSizeChange: (_, pageSize) => {
				const current = {
					page: { currentPage: 1, pageSize }
				}
				this.handleJump(current);
				this.setState({pageInfo: current});
			},
		};

		return (
			<div className='finance-rate-wrapper'>
				<h3>账号特殊利润率设置</h3>
				<Button type='primary' className='rate-add-btn' onClick={() => this.handleOperate('add')}>新增策略</Button>
				<Table 
					rowKey='id' 
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
			pageNum: 1, pageSize: 20, 
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

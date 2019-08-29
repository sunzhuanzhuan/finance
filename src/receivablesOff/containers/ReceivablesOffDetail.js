import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { message, Table, Alert, Tabs } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getTabOptions, getOffDetailQueryKeys, getOffQueryItems, getOffDetailCloIndex, getReceOffCol, getTableId } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth } from '@/util';
import { Scolltable } from '@/components';
import { getReceOffDetailList } from '../actions/receivableAdd';
import qs from 'qs';

const { TabPane } = Tabs;

class ReceivablesOffDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: 'yuyueyuyue',
		};
	}
	componentDidMount() {
		const { location } = this.props;
		const search = qs.parse(location.search.substring(1));

		this.queryAllTabsData(Object.assign(search, { page: 1, page_size: 20}));
	}
	queryAllTabsData = queryObj => {
		this.setState({ loading: true });
		Promise.all(this.getAllTabsActions(queryObj)).then(() => {
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	getAllTabsActions = queryObj => {
		return getTabOptions.map(item => {
			const { key } = item;
			return this.props.getReceOffDetailList(Object.assign(queryObj, {key}));
		})
	}
	handleSearch = (key, searchQuery) => {
		this.setState({[`searchQuery-${key}`]: searchQuery});
		Object.assign(searchQuery, {key});
		this.props.getReceOffDetailList(searchQuery).then(() => {
			this.setState({loading: false});
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		});
	}

	handleExportList = () => {
		
	}

	getTabPaneComp = () => {
		const { receAddListInfo = {}, receMetaData = {}, location } = this.props;
		const { loading } = this.state;
		const search = qs.parse(location.search.substring(1));

		return getTabOptions.map(item => {
			const { tab, key } = item;
			const tabInfo = receAddListInfo[`receDetailInfo-${key}`] || {};
			const { list = [], page, total, page_size: tableSize, statistic = {} } = tabInfo;
			const { 
				order_amount = '-', verification_amount_total = '-', debt_amount_total = '-', 
				gift_amount_total = '-', warehouse_amount_total = '-' 
			} = statistic;
			const TotalMsg = <div className='total-info-wrapper'>
					<>订单数：<span className='total-color'>{order_amount}</span></>
					<span className='total-margin'>总核销金额：<span className='total-color'>{verification_amount_total}</span></span>
					<>核销账户金额：<span className='total-color'>{debt_amount_total}</span></>
					<span className='total-margin'>赠送/返点账户抵扣：<span className='total-color'>{gift_amount_total}</span></span>
					<>小金库抵扣：<span className='total-color'>{warehouse_amount_total}</span></>
				</div>;
			const columns = getReceOffCol(getOffDetailCloIndex[key], receMetaData);
			const totalWidth = getTotalWidth(columns);
			const searchStateKey = `searchQuery-${key}`;
			const pagination = {
				onChange: (current) => {
					Object.assign(this.state[searchStateKey], {page: current});
					this.setState({[searchStateKey]: this.state[searchStateKey]});
					this.handleSearch(key, this.state[searchStateKey]);
				},
				onShowSizeChange: (_, pageSize) => {
					Object.assign(this.state[searchStateKey], {page_size: pageSize});
					this.setState({[searchStateKey]: this.state[searchStateKey]});
					this.handleSearch(key, this.state[searchStateKey]);
				},
				total: parseInt(total),
				current: parseInt(page),
				pageSize: parseInt(tableSize),
				showQuickJumper: true,
				showSizeChanger: true,
				pageSizeOptions: ['20', '50', '100', '200']
			};
			const tabTitle = total != undefined ? <div>
				<span>{tab}</span>
				<span>{total}</span>
			</div> : <div>{tab}</div>;
			const wrapperClass = `moreThanOneTable${key}`;
			return (
				<TabPane tab={tabTitle} key={key} className={wrapperClass}>
					<ReceivableOffQuery 
						showExport
						initialValue={search}
						queryItems={getOffQueryItems(getOffDetailQueryKeys[key])}
						handleSearch={searchQuery => {this.handleSearch(key, searchQuery)}} 
						handleExport={this.handleExportList}
					/>
					{ <Alert className='add-list-total-info' message={TotalMsg} type="warning" showIcon /> }
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`}  
						widthScroll={totalWidth}
					>
						<Table 
							className='receivable-table'
							rowKey={getTableId[key]} 
							columns={columns} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
							loading={loading}
							scroll={{ x: totalWidth }}
						/>
					</Scolltable>
				</TabPane>
			)
		})
	}

	handleChangeTab = activeKey => {
		this.setState({activeKey});
	}

	render() {
		const { activeKey } = this.state;
		const comp = <div>
			<span>{`预约订单：${0}个|${0}元`}</span>
			<span className='total-margin'>{`派单活动：${0}个|${0}元`}</span>
			<span>{`公司拓展业务：${0}个|${0}元`}</span>
			<span className='total-margin'>{`当前已选可核销金额 ${0.00}元`}</span>
		</div>;

		return <div className='rece-wrapper rece-detail-wrapper'>
			<div className='rece-title'>核销订单明细</div>
			{/* <Alert message={comp} type="warning" showIcon /> */}
			<Tabs className='rece_tabs' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp()
				}
			</Tabs>
		</div>
	}
}

const mapStateToProps = (state) => {
	const { receivableOff: { receAddReducer: receAddListInfo, receMetaData }} = state;
	
	return {
		receAddListInfo,
		receMetaData
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions, getReceOffDetailList}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesOffDetail)

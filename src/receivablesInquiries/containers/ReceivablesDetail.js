import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { message, Table, Alert, Tabs } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getTabOptions, getQueryItems, getQueryKeys, getReceivableDetailCol, getColKeys, getTableId } from '../constants';
import * as receivableAction from "../actions/receivable";
import * as receivableOffAction from "@/receivablesOff/actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { events, getTotalWidth, downloadByATag } from '@/util';
import { Scolltable } from '@/components';
import qs from 'qs';
import { getReceDetailList, clearReceDetailList } from '../actions/receivableList';

const { TabPane } = Tabs;

class ReceivablesDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: 'reservationList',
			loading: false,
			leftWidth: 40
		};
		events.on('message', this.collapsedListener); 
	}
	collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
	}
	componentDidMount() {
		const { location } = this.props;
		const search = qs.parse(location.search.substring(1)) || {};
		const { receivables_aging_range, company_id = {} } = search;
		const { key } = company_id;
		const basicQuery = {
			initialValus: search,
			basic: {receivables_aging_range, company_id: key}
		};
		const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;

		this.props.getPlatform();
		this.props.getRegionTeamName();
		this.props.getReceMetaData();
		this.props.getExecutorList();
		this.setState({ 
			basicQuery,
			leftWidth
		})
		this.queryAllTabsData({ page: 1, page_size: 20, receivables_aging_range, company_id: key});
	}
	componentWillUnmount() {
		this.props.clearReceDetailList();
	}

	queryAllTabsData = queryObj => {
		this.setState({ loading: true });
		Promise.all(this.getAllTabsActions(queryObj)).then(() => {
			this.setState({ loading: false })
		}).catch(() => {
			this.setState({ loading: false });
		})
	}
	getAllTabsActions = queryObj => {
		return getTabOptions.map(item => {
			const { value } = item;
			return this.props.getReceDetailList(Object.assign(queryObj, {product_line: value}));
		})
	}

	handleSearch = (key, searchQuery) => {
		Object.assign(searchQuery, { product_line: key });
		this.setState({[`searchQuery-${key}`]: searchQuery, loading: true});
		this.props.getReceDetailList(searchQuery).then(() => {
			this.setState({ loading: false })
		}).catch(() => {
			this.setState({ loading: false });
		})
	}

	handleExportList = product_line => {
		const { basicQuery = {} } = this.state;
		const { basic } = basicQuery;
		const exportQuery = this.state[`searchQuery-${product_line}`] || { ...basic, product_line};
		this.props.getReceDetailExportInfo({...exportQuery, flag: 1}).then(() => {
			downloadByATag(`/api/finance/receivables/query/exportForReceivablesSelect?${qs.stringify(exportQuery)}`);
		})
	}

	getTabPaneComp = () => {
		const { receMetaData = {}, location, receListReducer = {}, platformList = [], regionList = [], excutorList = [] } = this.props;
		const search = qs.parse(location.search.substring(1));
		const { loading, leftWidth } = this.state;
		return getTabOptions.map(item => {
			const { tab, key, value } = item;
			const tabInfo = receListReducer[`receDetail-${value}`] || {};
			const { list = [], page, total, page_size: tableSize, statistic = {} } = tabInfo;
			const { total_receivables_amount = 0 } = statistic;
			const totalMsg = `应收款金额${total_receivables_amount}`;
			const columns = getReceivableDetailCol(getColKeys[key]);
			const totalWidth = getTotalWidth(columns);
			const searchQuery = this.state[`searchQuery-${value}`] || { page: 1, page_size: 20 };
			const pagination = {
				onChange: (current) => {
					Object.assign(searchQuery, {page: current});
					this.setState({[`searchQuery-${value}`]: searchQuery});
					this.handleSearch(value, searchQuery);
				},
				onShowSizeChange: (_, pageSize) => {
					Object.assign(searchQuery, {page_size: pageSize});
					this.setState({[`searchQuery-${value}`]: searchQuery});
					this.handleSearch(value, searchQuery);
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
					<ReceivableQuery 
						showExport
						className={wrapperClass}
						initialValue={search}
						queryItems={getQueryItems(getQueryKeys[key])}
						queryOptions={Object.assign(receMetaData, {platformList, regionList, excutorList})} 
						handleSearch={searchQuery => {this.handleSearch(value, searchQuery)}} 
						handleExport={() => {this.handleExportList(value)}}
						actionKeyMap={{
							company: this.props.getGoldenCompanyId,
							project: this.props.getProjectData,
							brand: this.props.getBrandData,
							account: this.props.getAccountInfo,
							requirement: this.props.getRequirementWithoutId,
							saler: this.props.getReceSaleList,
						}}
					/>
					{ <Alert className='list-total-info' message={totalMsg} type="warning" showIcon /> }
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`}
						widthScroll={totalWidth + leftWidth}
					>
						<Table 
							loading={loading}
							className='receivable-table'
							rowKey='order_id' 
							columns={columns} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
							scroll={{ x: totalWidth + 40 }}
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
		// const comp = <div>
		// 	<span>{`预约订单：${0}个|${0}元`}</span>
		// 	<span className='total-margin'>{`派单活动：${0}个|${0}元`}</span>
		// 	<span>{`公司拓展业务：${0}个|${0}元`}</span>
		// 	<span className='total-margin'>{`当前已选可核销金额 ${0.00}元`}</span>
		// </div>;

		return <div className='rece-wrapper rece-detail-wrapper'>
			<div className='rece-title'>应收款订单明细</div>
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
	const { receivable = {}, receivableOff = {}, companyDetail = {} } = state;
	const { receListReducer = {}, excutorList = []  } = receivable;
	const { receMetaData, regionList } = receivableOff;
	const { platformList = [] } = companyDetail;
	return {
		receListReducer,
		receMetaData,
		platformList,
		regionList,
		excutorList,
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableAction, ...goldenActions, ...receivableOffAction, getReceDetailList, clearReceDetailList}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesDetail)

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { message, Table, Alert, Tabs } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getTabOptions, getQueryItems, getQueryKeys, getReceivableDetailCol, getColKeys, getTableId } from '../constants';
import * as receivableAction from "../actions/receivable";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth, downloadByATag } from '@/util';
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
			loading: false
		};
	}
	componentDidMount() {
		const { location } = this.props;
		const search = qs.parse(location.search.substring(1)) || {};

		this.props.getReceSearchOptions();
		this.queryAllTabsData(Object.assign(search, { page: 1, page_size: 20}));
	}
	componentWillUnmount() {
		this.props.clearReceDetailList();
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
			const { value } = item;
			return this.props.getReceDetailList(Object.assign(queryObj, {product_line: value}));
		})
	}

	handleSearch = (key, searchQuery) => {
		this.setState({[`searchQuery-${key}`]: searchQuery, loading: true});
		this.props.getReceDetailList(searchQuery).then(() => {
			this.setState({ loading: false })
		}).catch(() => {
			this.setState({ loading: false });
		})
	}

	handleExportList = key => {
		downloadByATag(`/api/receivables/query/exportCompanyList?${qs.stringify(this.state[`searchQuery-${key}`])}`);
	}

	getTabPaneComp = () => {
		const { receSearchOptions = [], location, receListReducer } = this.props;
		const search = qs.parse(location.search.substring(1));
		const { loading } = this.state;
		return getTabOptions.map(item => {
			const { tab, key } = item;
			const tabInfo = receListReducer[`receDetail-${key}`] || {};
			const { list = [], page, total, page_size: tableSize, statistic = {} } = tabInfo;
			const { total_receivables_amount = 0 } = statistic;
			const totalMsg = `应收款金额${total_receivables_amount}`;
			const columns = getReceivableDetailCol(getColKeys[key]);
			const totalWidth = getTotalWidth(columns);
			const searchQuery = this.state[`searchQuery-${key}`] || { page: 1, page_size: 20 };
			const pagination = {
				onChange: (current) => {
					Object.assign(searchQuery, {page: current});
					this.setState({[`searchQuery-${key}`]: searchQuery});
					this.handleSearch(key, searchQuery);
				},
				onShowSizeChange: (_, pageSize) => {
					Object.assign(searchQuery, {page_size: pageSize});
					this.setState({[`searchQuery-${key}`]: searchQuery});
					this.handleSearch(key, searchQuery);
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
						initialValue={search}
						queryItems={getQueryItems(getQueryKeys[key])}
						queryOptions={receSearchOptions}
						handleSearch={searchQuery => {this.handleSearch(key, searchQuery)}} 
						handleExport={() => {this.handleExportList(key)}}
						actionKeyMap={{
							company: this.props.getGoldenCompanyId
						}}
					/>
					{ <Alert className='list-total-info' message={totalMsg} type="warning" showIcon /> }
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`}
						widthScroll={totalWidth}
					>
						<Table 
							loading={loading}
							className='receivable-table'
							rowKey={getTableId[key]} 
							columns={columns} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
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
	const { receivable = {} } = state;
	const { receSearchOptions = {}, receListReducer = {}  } = receivable;
	return {
		receListReducer,
		receSearchOptions: {
			"product_line": [
				{
					"id": 3,
					"display": "预约订单"
				},
				{
					"id": 2,
					"display": "微闪投"
				},
				{
					"id": 7,
					"display": "公司拓展业务"
				}
			],
			"verification_type": [
				{
					"id": 1,
					"display": "客户整体折让"
				},
				{
					"id": 2,
					"display": "订单折让（赔偿）"
				},
				{
					"id": 3,
					"display": "坏账清理"
				},
				{
					"id": 4,
					"display": "其他"
				}
			],
			"yes_or_no": [
				{
					"id": 1,
					"display": "是"
				},
				{
					"id": 2,
					"display": "否"
				}
			],
			"debt_bill_type": [
				{
					"id": 1,
					"display": "应收款核销"
				}
			],
			"receivables_aging_range": [
				{
					"id": 0,
					"display": "M0"
				},
				{
					"id": 1,
					"display": "M1"
				},
				{
					"id": 2,
					"display": "M2"
				},
				{
					"id": 3,
					"display": "M3"
				},
				{
					"id": 4,
					"display": "M4"
				},
				{
					"id": 5,
					"display": "M5"
				},
				{
					"id": 6,
					"display": "M6"
				},
				{
					"id": 7,
					"display": "M7"
				},
				{
					"id": 8,
					"display": "M8"
				},
				{
					"id": 9,
					"display": "M9"
				},
				{
					"id": 10,
					"display": "M10-M12"
				},
				{
					"id": 11,
					"display": "M12以内"
				},
				{
					"id": 12,
					"display": "M12以上"
				},
				{
					"id": 13,
					"display": "1-2年"
				},
				{
					"id": 14,
					"display": "2-3年"
				},
				{
					"id": 15,
					"display": "3-4年"
				},
				{
					"id": 16,
					"display": "4-5年"
				},
				{
					"id": 17,
					"display": "5年上"
				}
			]
		}
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableAction, ...goldenActions, getReceDetailList, clearReceDetailList}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesDetail)

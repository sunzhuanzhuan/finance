import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { message, Table, Alert, Tabs } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getTabOptions, getOffDetailQueryKeys, getOffQueryItems, getOffDetailCloIndex, getReceOffCol, getTableId } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth, downloadByATag } from '@/util';
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

	handleExportList = key => {
		downloadByATag(`/api/receivables/verification/exportVerificationDetail?${qs.stringify(this.state[`searchQuery-${key}`])}`);
	}

	getTabPaneComp = () => {
		const { receAddListInfo = {}, receMetaData = {}, location } = this.props;
		const { product_line } = receMetaData;
		const { loading } = this.state;
		const search = qs.parse(location.search.substring(1));

		if (!Array.isArray(product_line)) return null;

		return product_line.map(item => {
			const { display, id } = item;
			const tabInfo = receAddListInfo[`receDetailInfo-${id}`] || {};
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
			const columns = getReceOffCol(getOffDetailCloIndex[id], receMetaData);
			const totalWidth = getTotalWidth(columns);
			const searchQuery = this.state[`searchQuery-${id}`] || { page: 1, page_size: 20 };
			const pagination = {
				onChange: (current) => {
					Object.assign(searchQuery, {page: current});
					this.setState({[`searchQuery-${id}`]: searchQuery});
					this.handleSearch(id, searchQuery);
				},
				onShowSizeChange: (_, pageSize) => {
					Object.assign(searchQuery, {page_size: pageSize});
					this.setState({[`searchQuery-${id}`]: searchQuery});
					this.handleSearch(id, searchQuery);
				},
				total: parseInt(total),
				current: parseInt(page),
				pageSize: parseInt(tableSize),
				showQuickJumper: true,
				showSizeChanger: true,
				pageSizeOptions: ['20', '50', '100', '200']
			};
			const tabTitle = total != undefined ? <div>
				<span>{display}</span>
				<span>{total}</span>
			</div> : <div>{display}</div>;
			const wrapperClass = `moreThanOneTable${id}`;
			return (
				<TabPane tab={tabTitle} key={id} className={wrapperClass}>
					<ReceivableOffQuery 
						showExport
						initialValue={search}
						queryItems={getOffQueryItems(getOffDetailQueryKeys[id])}
						handleSearch={searchQuery => {this.handleSearch(id, searchQuery)}} 
						handleExport={ () => {this.handleExportList(id)}}
						actionKeyMap={{
							company: this.props.getGoldenCompanyId
						}}
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
							rowKey={getTableId[id]} 
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

		return <div className='rece-wrapper rece-detail-wrapper'>
			<div className='rece-title'>核销订单明细</div>
			<Tabs className='rece_tabs' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp()
				}
			</Tabs>
		</div>
	}
}

const mapStateToProps = (state) => {
	const { receivableOff = {}} = state;
	const { receAddReducer: receAddListInfo, receMetaData } = receivableOff;
	return {
		receAddListInfo,
		// receMetaData,
		receMetaData: {
			"product_line": [   // 订单类型
				{
					"id": 2,
					"display": "微闪投"
				},
				{
					"id": 3,
					"display": "预约订单"
				},
				{
					"id": 7,
					"display": "拓展业务"
				}
			],
			"verification_type": [   // 核销类型
				{
					"id": 1,
					"display": "客户整体折让"
				},
				{
					"id": 2,
					"display": "订单折让(赔偿)"
				},
				{
					"id": 3,
					"display": "坏账清理"
				},
				{
					"id": 4,
					"display": "其他"
				}
			]
		},
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions, getReceOffDetailList}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesOffDetail)

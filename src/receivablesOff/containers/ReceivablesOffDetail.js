import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { message, Table, Alert, Tabs, Icon } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getTabOptions, getOffDetailQueryKeys, getOffQueryItems, getOffDetailCloIndex, getReceOffCol, getOffOptions } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth, downloadByATag, events } from '@/util';
import { Scolltable } from '@/components';
import { getReceOffDetailList, clearReceList } from '../actions/receivableAdd';
import qs from 'qs';
import numeral from 'numeral';

const { TabPane } = Tabs;

class ReceivablesOffDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: '3',
		};
		events.on('message', this.collapsedListener); 
	}
	collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
	}
	componentDidMount() {
		const { location } = this.props;
		const search = qs.parse(location.search.substring(1)) || {};

		this.props.getPlatform();
		this.props.getReceMetaData();
		this.props.getSalerData();
		this.props.getRegionTeamName();
		this.queryAllTabsData(Object.assign(search, { page: 1, page_size: 20}));
		const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;

		this.setState({leftWidth});
	}
	componentWillUnmount() {
		this.props.clearReceList();
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
			return this.props.getReceOffDetailList(Object.assign(queryObj, {product_line: value}));
		})
	}
	handleSearch = (product_line, searchQuery) => {
		const { location } = this.props;
		const search = qs.parse(location.search.substring(1));
		Object.assign(searchQuery, search, {product_line});
		this.setState({[`searchQuery-${product_line}`]: searchQuery, loading: true});
		this.props.getReceOffDetailList(searchQuery).then(() => {
			this.setState({loading: false});
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		});
	}

	handleExportList = product_line => {
		const { location } = this.props;
		const search = qs.parse(location.search.substring(1));
		Object.assign(search, {product_line});
		const exportQuery = this.state[`searchQuery-${product_line}`] || search;

		this.props.getReceivableDetailExportInfo({...exportQuery, flag: 1}).then(() => {
			downloadByATag(`/api/finance/receivables/verification/exportOrderList?${qs.stringify(exportQuery)}`);
		})
	}

	getTabPaneComp = () => {
		const { receAddListInfo = {}, receMetaData = {}, location, salerData = [], platformList = [], regionList = [] } = this.props;
		const { product_line } = receMetaData;
		const { loading, leftWidth } = this.state;
		const search = qs.parse(location.search.substring(1));

		if (!Array.isArray(product_line)) return null;

		return product_line.map(item => {
			const { display, id } = item;
			const tabInfo = receAddListInfo[`receDetailInfo-${id}`] || {};
			const { list = [], page, total, page_size: tableSize, statistics = {} } = tabInfo;
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
						className={wrapperClass}
						queryOptions={Object.assign(getOffOptions, receMetaData, {salerData, platformList, regionList})} 
						initialValue={search}
						queryItems={getOffQueryItems(getOffDetailQueryKeys[id])}
						handleSearch={searchQuery => {this.handleSearch(id, searchQuery)}} 
						handleExport={ () => {this.handleExportList(id)}}
						actionKeyMap={{
							company: this.props.getGoldenCompanyId,
							project: this.props.getProjectData,
							brand: this.props.getBrandData,
							requirement: this.props.getRequirementWithoutId
						}}
					/>
					<Alert className='add-list-total-info' message={this.getTotalInfoComp(statistics)} type="warning" showIcon />
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`}  
						widthScroll={totalWidth + leftWidth}
					>
						<Table 
							className='receivable-table'
							rowKey={'order_id'} 
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

	getNumberal = data => {
		return numeral(data).format('0.00');
	}

	getTotalInfoComp = statistics => {
		const { 
			order_ids_count = 0, verification_amount_total = 0, debt_amount_total = 0, 
			gift_amount_total = 0, warehouse_amount_total = 0 
		} = statistics;

		return (
			<div className='total-info-wrapper'>
				<>订单数：<span className='total-color'>{order_ids_count}</span></>
				<span className='total-margin'>总核销金额：<span className='total-color'>{this.getNumberal(verification_amount_total)}</span></span>
				<>核销账户抵扣金额：<span className='total-color'>{this.getNumberal(debt_amount_total)}</span></>
				<span className='total-margin'>赠送/返点账户抵扣：<span className='total-color'>{this.getNumberal(gift_amount_total)}</span></span>
				<>小金库抵扣：<span className='total-color'>{this.getNumberal(warehouse_amount_total)}</span></>
			</div>
		)
	}

	getAllTotalInfo = () => {
		const { receMetaData = {}, receAddListInfo = {} } = this.props;
		const { product_line } = receMetaData;

		if (!Array.isArray(product_line)) return {};

		let totalInfoObj = {
			order_ids_count: 0,
			verification_amount_total: 0,
			debt_amount_total: 0,
			gift_amount_total: 0,
			warehouse_amount_total: 0
		}
		product_line.forEach(item => {
			const { id } = item;
			const tabInfo = receAddListInfo[`receDetailInfo-${id}`] || {};
			const { statistics = {} } = tabInfo;
			const { 
				order_ids_count: order, verification_amount_total: verifi, debt_amount_total: debt, 
				gift_amount_total: gift, warehouse_amount_total: warehouse 
			} = statistics;
			totalInfoObj = {
				order_ids_count: totalInfoObj.order_ids_count + (Number(order) || 0),
				verification_amount_total: totalInfoObj.verification_amount_total + (Number(verifi) || 0),
				debt_amount_total: totalInfoObj.debt_amount_total + (Number(debt) || 0),
				gift_amount_total: totalInfoObj.gift_amount_total + (Number(gift) || 0),
				warehouse_amount_total: totalInfoObj.warehouse_amount_total + (Number(warehouse) || 0)
			}
		});

		return totalInfoObj
	}

	render() {
		const { activeKey } = this.state;

		return <div className='rece-wrapper rece-detail-wrapper'>
			<div className='rece-title'>核销订单明细</div>
			<Alert className='add-list-total-info' message={this.getTotalInfoComp(this.getAllTotalInfo())} type="warning" showIcon />
			<Tabs className='rece_tabs' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp()
				}
			</Tabs>
		</div>
	}
}

const mapStateToProps = (state) => {
	const { receivableOff = {}, companyDetail = {} } = state;
	const { receAddReducer: receAddListInfo, receMetaData, salerData, regionList } = receivableOff;
	const { platformList = [] } = companyDetail;
	return {
		receAddListInfo,
		receMetaData,
		salerData,
		platformList,
		regionList
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions, getReceOffDetailList, clearReceList}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesOffDetail)

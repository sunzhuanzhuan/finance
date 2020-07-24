import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './creditLimit.less';
import { Table, Tabs, Alert } from "antd";
import * as creditLimitActions from "../actions";
import { getCrediLimitListInfo } from '../actions/creditTabListAction'
import { getTotalWidth, events } from '@/util';
import { Scolltable } from '@/components';
import { getTabOptions, getCreditQueryItems, getCreditCol } from '../constants';
import CreditLimitQuery from './CreditLimitQuery';

const { TabPane } = Tabs;

class CreditLimit extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: '3',
			leftWidth: 40, 
		};
		events.on('message', this.collapsedListener); 
	}

	collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
	}

	componentDidMount() {
		const { activeKey: product_line } = this.state;
		this.getCreditListData({page: 1, page_size: 20, product_line, company_id: 123});
		const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;
		this.setState({leftWidth});
	}

	getCreditListData = (searchQuery) => {
		this.setState({ loading: true });
		this.props.getCrediLimitListInfo(searchQuery).finally(() => {
			this.setState({ loading: false});
		});
	}

	handleChangeTab = activeKey => {
		const { creditLimitListInfo = {} } = this.props;
		if(!creditLimitListInfo[`creditTab-${activeKey}`]) {
			this.getCreditListData({page: 1, page_size: 20, product_line: activeKey, company_id: 123});
		}
		this.setState({ activeKey });
	}

	handleSearch = (searchQuery) => {
		const { activeKey } = this.state;
		this.setState({ [`searchQuery-${activeKey}`]: searchQuery });
		this.getCreditListData({...searchQuery, product_line: activeKey, company_id: 123});
	}

	handleExport = (searchQuery) => {
		console.log('CreditLimit handleExport searchQuery = ', searchQuery);
	}

	getTabPaneContent = () => {
		const { creditLimitListInfo = {}, creditQueryOptions = {} } = this.props;
		const { leftWidth, loading, activeKey } = this.state;
		const tabListInfo = creditLimitListInfo[`creditTab-${activeKey}`] || {};
		const { total, page, page_size, list = [] } = tabListInfo;
		const totalWidth = getTotalWidth(getCreditCol());
		const searchQuery = this.state[`searchQuery-${activeKey}`];
		const showTotal = (total) => {
			return `共 ${total} 条数据`;
		};
		const paginationObj = {
			onChange: (page) => {
				Object.assign(searchQuery, {page});
				this.handleSearch(searchQuery);
			},
			onShowSizeChange: (_, page_size) => {
				Object.assign(searchQuery, {page_size, page: 1});
				this.handleSearch(searchQuery);
			},
			total: parseInt(total),
			showTotal,
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		const getTotalInfo = (
			<div>
				<span className='credit_info_item'>{`订单/活动：${100}`}</span>
				<span className='credit_info_item'>{`信用额度使用总计：${100}`}</span>
			</div>
		);
		return [
			<CreditLimitQuery
				key='search'
				showExport={true}
				className={'credit_limit_wrapper'}
				queryOptions={creditQueryOptions}
				queryItems={getCreditQueryItems()}
				handleSearch={this.handleSearch}
				handleExport={this.handleExport}
				actionKeyMap={{
					company: this.props.getInvoiceQueryCompanyId,
					invoiceTitle: this.props.getInvoiceQueryInvoiceTitle,
				}}
			/>,
			<Alert key='total' className='credit_total_info' message={getTotalInfo} type="info" showIcon />,
			<Scolltable key='table' scrollClassName='.ant-table-body' widthScroll={totalWidth + leftWidth}>
				<Table
					className='credit_limit_table'
					rowKey='id'
					columns={getCreditCol(activeKey)}
					dataSource={list}
					loading={loading}
					bordered
					pagination={paginationObj}
					scroll={{ x: totalWidth }}
				/>
			</Scolltable>
		]
	}

	getTabPaneComp = () => {
		return getTabOptions.map(item => {
			const { tab, key } = item;
			return (
				<TabPane tab={tab} key={key}>
					{
						this.getTabPaneContent()
					}
				</TabPane>
			)
		})
	}

	render() {
		const { activeKey } = this.state;
		
		return (
			<Tabs className='credit_limit_wrapper' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp()
				}
			</Tabs>
		)
	}
}

const mapStateToProps = (state) => {
	const { creditLimitReducer = {} } = state;
	const { creditLimitListInfo = {}, creditQueryOptions = {} } = creditLimitReducer;
	return {
		creditLimitListInfo,
		creditQueryOptions
	}
}
const mapDispatchToProps = dispatch => (
		bindActionCreators({...creditLimitActions, getCrediLimitListInfo}, dispatch)
	);
export default connect(mapStateToProps, mapDispatchToProps)(CreditLimit)

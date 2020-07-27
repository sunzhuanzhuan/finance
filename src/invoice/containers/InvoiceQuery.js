import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './invoiceQuery.less';
import * as action from '../actions/invoiceQuery'
import { getGoldenCompanyId } from '@/companyDetail/actions/goldenApply';
import QueryComp from '../components/invoiceQuery/queryComp';
import QueryStatistics from '../components/invoiceQuery/queryStatistics';
import { getInvoiceQueryOptions, getInvoiceQueryCol } from '../constants/invoiceQuery';
import { Scolltable } from '@/components';
import { getTotalWidth, events } from '@/util';
import qs from 'qs';
import moment from 'moment';
import apiDownload from '@/api/apiDownload';

export class InvoiceQuery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftWidth: 40,
			selectedRowKeys: [],
			loading: false,
			searchQuery: {page: 1, page_size: 20}
		};
		events.on('message', this.collapsedListener); 
	}

	collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
	}

	componentDidMount() {
		this.props.actions.getInvoiceQueryMetaData();
		this.handleSearch({page: 1, page_size: 20});
		const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;
		this.setState({leftWidth});
	}

	handleSearch = (searchQuery) => {
		this.setState({loading: true, searchQuery});
		this.props.actions.getInvoiceQueryStatistics(searchQuery);
		this.props.actions.getInvoiceQueryList(searchQuery).finally(() => {
			this.setState({loading: false});
		});
	}

	handleExport = (searchQuery = {}) => {
		const { invoice_time_start, invoice_time_end } = searchQuery;
		const startTime = moment(invoice_time_start);
		const endTime = moment(invoice_time_end);
		const overYear = moment.duration(endTime.diff(startTime)).as('y') > 1;
		const replaceStart = moment(invoice_time_start).subtract(1, 'y').format('YYYY-MM-DD');
		const replaceEnd = moment().format('YYYY-MM-DD');
		const startShow = invoice_time_start ? invoice_time_start : replaceStart;
		const tips = `从${startShow}开始，最多只能导出1年的数据，是否继续导出？`

		if(!invoice_time_start || overYear) {
			Modal.confirm({
				title: (
					<div>
						{tips}
					</div>
				),
				okText: '继续',
				onOk: () => {
					if(!invoice_time_start) {
						searchQuery.invoice_time_start = replaceStart;
						searchQuery.invoice_time_end = replaceEnd;
					}
					this.downloadFunc(searchQuery)
				},
			});
		}else {
			this.downloadFunc(searchQuery)
		}
	}
	downloadFunc = (searchQuery) => {
		const timeStamp = moment().format('YYYYMMDD');
		apiDownload({
			url: '/finance/invoice/invoice/export?' + qs.stringify(searchQuery),
			method: 'GET',
		}, `发票查询列表${timeStamp}.xls`)
	}

	handleInvoiceOperate = (invoice_id) => {
		const query = { opt_type: 'offline', invoice_id };
		return this.props.actions.getInvoiceQueryOperate(query).then(() => {
			const { searchQuery } = this.state;
			this.handleSearch(searchQuery)
		})
	}

	isShowBatchModal = () => {
		const { selectedRowKeys } = this.state;
		if(!selectedRowKeys.length) {
			return;
		}
		Modal.confirm({
			width: 420,
			title: '是否对所有勾选的发票号，进行线下使用操作？',
			onOk: () => {
				const selectedStr = selectedRowKeys.join(',');
				return this.handleInvoiceOperate(selectedStr)
			}
		})
	}

	render() {
		const { invoiceQueryList = {}, invoiceQueryOptions = {}, invoiceQueryStatistics = {} } = this.props;
		const { selectedRowKeys, loading, searchQuery, leftWidth } = this.state;
		const { total = 0, page = 1, page_size = 20, list = [] } = invoiceQueryList
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
		const rowSelectionObj = {
			selectedRowKeys: selectedRowKeys,
			onChange: (selectedRowKeys) => {
				this.setState({ selectedRowKeys })
			},
			getCheckboxProps: record => ({
				disabled: record.is_offline_name || record.status !== '1',
			}),
		}
		const totalWidth = getTotalWidth(getInvoiceQueryCol());
		return (
			<div className='invoice_query_wrapper'>
				<QueryComp 
					showExport={true}
					className={'invoice_query_wrapper'}
					queryOptions={invoiceQueryOptions}
					queryItems={getInvoiceQueryOptions()}
					handleSearch={this.handleSearch}
					handleExport={this.handleExport}
					actionKeyMap={{
						company: this.props.actions.getGoldenCompanyId,
						invoiceTitle: this.props.actions.getInvoiceQueryInvoiceTitle,
					}}
				/>
				<QueryStatistics 
					dataSource={invoiceQueryStatistics}
				/>
				<Button className='batch_offline' type='primary' ghost onClick={this.isShowBatchModal}>批量线下使用</Button>
				<Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth + leftWidth}>
					<Table
						className='invoice_query_table'
						rowKey='id'
						rowSelection={rowSelectionObj}
						columns={getInvoiceQueryCol(this.handleInvoiceOperate)}
						dataSource={list}
						loading={loading}
						bordered
						pagination={paginationObj}
						scroll={{ x: totalWidth }}
					/>
				</Scolltable>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { invoice = {} } = state;
	const { invoiceQueryList = {}, invoiceQueryOptions = {}, invoiceQueryStatistics = {} } = invoice;
	return {
		invoiceQueryList,
		invoiceQueryOptions,
		invoiceQueryStatistics
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...action, getGoldenCompanyId }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InvoiceQuery)

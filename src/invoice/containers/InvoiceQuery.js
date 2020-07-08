import React, { Component } from 'react'
import { Table } from 'antd'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './invoiceQuery.less';
import * as action from '../actions/invoiceQuery'
import QueryComp from '../components/invoiceQuery/queryComp';
import QueryStatistics from '../components/invoiceQuery/queryStatistics';
import { getInvoiceQueryOptions, getInvoiceQueryCol } from '../constants/invoiceQuery';

export class InvoiceQuery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			loading: false,
			searchQuery: {page: 1, page_size: 20}
		};
	}

	componentDidMount() {
		this.handleSearch({page: 1, page_size: 20});
	}

	handleSearch = (searchQuery) => {
		this.setState({loading: true, searchQuery});
		this.props.actions.getInvoiceQueryList(searchQuery).finally(() => {
			this.setState({loading: false});
		});
	}

	render() {
		const { invoiceQueryList = {} } = this.props;
		const { selectedRowKeys, loading, searchQuery } = this.state;
		const { total = 0, page = 1, pageSize = 20, list = [] } = invoiceQueryList
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
			current: parseInt(page),
			pageSize: parseInt(pageSize),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		const rowSelectionObj = {
			selectedRowKeys: selectedRowKeys,
			onChange: (selectedRowKeys) => {
				this.setState({ selectedRowKeys })
			},
		}
		return (
			<div className='invoice_query_wrapper'>
				<QueryComp 
					showExport={true}
					queryItems={getInvoiceQueryOptions()}
					handleSearch={this.handleSearch}
					actionKeyMap={{
						company: this.props.getGoldenCompanyId
					}}
				/>
				<QueryStatistics 
					dataSource={{
						sdfwe: 3423423.32
					}}
				/>
				<Table
					className='invoice_query_table'
					rowKey='id'
					rowSelection={rowSelectionObj}
					columns={getInvoiceQueryCol()}
					dataSource={list}
					loading={loading}
					bordered
					pagination={paginationObj}
				></Table>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { invoice = {} } = state;
	const { invoiceQueryList = {} } = invoice;
	return {
		invoiceQueryList
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...action }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InvoiceQuery)

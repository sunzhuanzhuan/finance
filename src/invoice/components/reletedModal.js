import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as relatedInvoiceAction from "../actions/relatedInvoice";
import SearForm from '../../components/SearchForm'
import Statistics from '../components/Statistics'
import { Table, message, Button, Icon } from 'antd'
import { relatedInvoiceSearchFunc } from '../constants/search'
import { readyRelatedFunc, relatedInvoiceFunc } from '../constants/relatedInvoice'
import qs from 'qs'

class RelatedModal extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading, pullReady } = this.state;
		const { relatedInvoiceData: { associated_list = [], list = [], page, page_size = 20, total, statistic }, relatedInvoiceSearchItem } = this.props;
		const relatedInvoiceSearch = relatedInvoiceSearchFunc(relatedInvoiceSearchItem);
		const relatedInvoiceCols = relatedInvoiceFunc(this.handleSubmit);
		const paginationObj = {
			onChange: (current) => {
				this.queryData({ ...search.keys, page: current, page_size });
			},
			onShowSizeChange: (current, size) => {
				this.queryData({ ...search.keys, page: 1, page_size: size });
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return <div className='relatedModal-container'>
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				{pullReady && <SearForm data={relatedInvoiceSearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 12, md: 8, lg: 6, xxl: 6 }} />}
			</fieldset>
			<div className='top-gap'>
				<Table
					rowKey='invoice_number'
					loading={loading}
					columns={relatedInvoiceCols}
					dataSource={list}
					bordered
					pagination={false}
				/>
			</div>
		</div>
	}
}


export default RelatedModal


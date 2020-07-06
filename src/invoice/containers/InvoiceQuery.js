import React, { Component } from 'react'
import { Spin } from 'antd'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './invoiceQuery.less';
import * as action from '../actions/invoiceQuery'
import QueryComp from '../components/invoiceQuery/queryComp';
import QueryStatistics from '../components/invoiceQuery/queryStatistics';
import { getInvoiceQueryOptions } from '../constants/invoiceQuery';

export class InvoiceQuery extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div>
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
						sdfwe: '232423423423.32'
					}}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...action }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InvoiceQuery)

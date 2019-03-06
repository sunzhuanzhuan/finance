import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as relatedInvoiceAction from "../actions/relatedInvoice";
import SearForm from '../../components/SearchForm'
// import Statistics from '../components/Statistics'
import { Table, message, Button } from 'antd'
import { relatedInvoiceSearch } from '../constants/search'
import { readyRelatedFunc, relatedInvoiceFunc } from '../constants/relatedInvoice'
import './relatedInvoice.less'
import qs from 'qs'

class RelatedInvoice extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getRelatedInvoiceData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading } = this.state;
		const { relatedInvoiceData: { list = [], page, page_size = 20, total } } = this.props;
		const readyRelatedCols = readyRelatedFunc();
		const relatedInvoiceCols = relatedInvoiceFunc();
		return <div className='relatedInvoice-container'>
			<fieldset className='fieldset_css'>
				<legend>已选发票</legend>
				<Table
					rowKey='a'
					columns={readyRelatedCols}
					dataSource={list}
					bordered
					pagination={false}
				/>
			</fieldset>
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				<SearForm data={relatedInvoiceSearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 12, md: 8, lg: 6, xxl: 6 }} />
			</fieldset>
			<fieldset className='fieldset_css'>
				<legend>发票列表</legend>
				<Table
					rowKey='a'
					columns={relatedInvoiceCols}
					dataSource={list}
					bordered
					pagination={false}
				/>
			</fieldset>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		relatedInvoiceData: state.invoice.relatedInvoiceData,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...relatedInvoiceAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RelatedInvoice)

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as relatedInvoiceAction from "../actions/relatedInvoice";
import SearForm from '../../components/SearchForm'
import Statistics from '../components/Statistics'
import { Table, message, Button, Icon } from 'antd'
import { relatedInvoiceSearchFunc } from '../constants/search'
import { readyRelatedFunc, relatedInvoiceFunc } from '../constants/relatedInvoice'
import './trinityInvoice.less'
import qs from 'qs'

class RelatedInvoice extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			pullReady: false
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.props.actions.getRelatedInvoiceSearchItem().then(() => {
			this.setState({ pullReady: true });
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '下拉项加载失败，请重试！');
		})
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
	handleSubmit = (invoice_number) => {
		const value = document.getElementById(invoice_number.toString()).value;
		const node = document.getElementsByClassName(invoice_number.toString())[0];
		const reg = /^[1-9]\d+(\.\d\d?)?$/;
		if (reg.test(value)) {
			//1 关联  2取消关联
			this.toggleRelate(1, invoice_number, value);
			// node.style.display = 'none';
		} else {
			message.warning('无效的金额!');
			// node.style.display = 'block';
		}
	}
	handleCancel = (invoice_number) => {
		this.toggleRelate(2, invoice_number)
	}
	toggleRelate = (operation_type, invoice_id, use_amount) => {
		const { payment_slip_id } = qs.parse(this.props.location.search.substring(1));
		this.props.actions.postRelatedInvoiceRelate({ operation_type, payment_slip_id, invoice_id, use_amount }).then(() => {
			this.queryData()
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '关联发票失败!')
		})
	}
	handleBack = () => {
		this.props.history.goBack()
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading, pullReady } = this.state;
		const { relatedInvoiceData: { associated_list = [], list = [], page, page_size = 20, total, statistic }, relatedInvoiceSearchItem } = this.props;
		const relatedInvoiceSearch = relatedInvoiceSearchFunc(relatedInvoiceSearchItem);
		const readyRelatedCols = readyRelatedFunc(this.handleCancel);
		const relatedInvoiceCols = relatedInvoiceFunc(this.handleSubmit);
		return <div className='relatedInvoice-container'>
			<legend className='container-title'><Icon type="left-circle" onClick={this.handleBack} /><span className='left-gap'>关联发票</span></legend>
			<Statistics title={'统计项'} render={Stat(total, statistic)} />
			<Table
				rowKey='invoice_number'
				loading={loading}
				columns={readyRelatedCols}
				dataSource={associated_list}
				bordered
				pagination={false}
			/>
			{/* <fieldset className='fieldset_css'>
				<legend>查询</legend>
				{pullReady && <SearForm data={relatedInvoiceSearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 12, md: 8, lg: 6, xxl: 6 }} />}
			</fieldset>
			<fieldset className='fieldset_css'>
				<legend>发票列表</legend>
				<Table
					rowKey='invoice_number'
					loading={loading}
					columns={relatedInvoiceCols}
					dataSource={list}
					bordered
					pagination={false}
				/>
			</fieldset> */}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		relatedInvoiceData: state.invoice.relatedInvoiceData,
		relatedInvoiceSearchItem: state.invoice.relatedInvoiceSearchItem,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...relatedInvoiceAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RelatedInvoice)

function Stat(total, statistic) {
	return <div style={{ padding: '0 10px' }}>
		<span>当前筛选条件下共<span className='red-font little-left-gap'>{total}</span>条</span>
		<span className='left-gap'>待打款金额：<span className='red-font little-left-gap'>{statistic && statistic.unpaid_amount_total}</span>元</span>
		<span className='left-gap'>已打款金额：<span className='red-font little-left-gap'>{statistic && statistic.paid_amount_total}</span>元</span>
		<span className='left-gap'>应回发票金额：<span className='red-font little-left-gap'>{statistic && statistic.return_invoice_amount_total}</span>元</span>
		<span className='left-gap'>发票盈余：<span className='red-font little-left-gap'>{statistic && statistic.invoice_surplus_total}</span>元</span>
	</div>
}

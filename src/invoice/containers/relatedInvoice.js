import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as relatedInvoiceAction from "../actions/relatedInvoice";
import getPagination from '../../components/pagination'
import Statistics from '../components/Statistics'
import { Table, message, Button, Icon } from 'antd'
import { relatedInvoiceFunc } from '../constants/relatedInvoice'
import './trinityInvoice.less'
import qs from 'qs'

class RelatedInvoice extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		const search = qs.parse(this.props.location.search.substring(1));
		this.setState({ loading: true });
		return this.props.actions.getRelatedInvoiceData({
			record_id: search.payment_slip_id,
			...obj
		}).then(() => {
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
	handleDel = (invoice_id) => {
		const search = qs.parse(this.props.location.search.substring(1));
		this.props.actions.postRelatedInvoiceRelate({
			operation_type: 2,
			payment_slip_id: search.payment_slip_id,
			invoice_id
		})
	}
	handleBack = () => {
		this.props.history.goBack()
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading } = this.state;
		const { relatedInvoiceData: { list = [], page, page_size = 20, total, statistic } } = this.props;
		const relatedInvoiceCols = relatedInvoiceFunc(this.handleDel);
		const paginationObj = getPagination(this, search, { total, page, page_size });
		return <div className='relatedInvoice-container'>
			<legend className='container-title'><Icon type="left-circle" onClick={this.handleBack} /><span className='left-gap'>关联发票</span></legend>
			<Statistics title={'统计项'} render={Stat(total, statistic)} />
			<div className='top-gap'>
				<Table
					rowKey='invoice_number'
					loading={loading}
					columns={relatedInvoiceCols}
					dataSource={list}
					bordered
					pagination={total > page_size ? paginationObj : false}
				/>
			</div>
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

function Stat(total, statistic) {
	return <div style={{ padding: '0 10px' }}>
		<span className='left-gap'>应回发票金额：<span className='red-font little-left-gap'>{statistic && statistic.return_invoice_amount}</span>元</span>
		<span className='left-gap'>已关联发票金额：<span className='red-font little-left-gap'>{statistic && statistic.relation_amount}</span>元</span>
		<span className='left-gap'>还需发票金额：<span className='red-font little-left-gap'>{statistic && statistic.invoice_surplus}</span>元</span>
		<Button className='left-gap' type='primary' href='/finance/invoice/relatedChooseInvoice'>选择发票</Button>
	</div>
}

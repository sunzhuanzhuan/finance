import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as relatedInvoiceAction from "../actions/relatedInvoice";
import getPagination from '../../components/pagination'
import SearForm from '../../components/SearchForm'
import { Table, Modal, message, Button } from 'antd'
import { relatedInvoiceSearchFunc } from '../constants/search'
import { availableInvoiceFunc } from '../constants/relatedInvoice'
import { WBYTableFooter } from 'wbyui'
import './trinityInvoice.less'
import qs from 'qs'
import numeral from 'numeral'


class RelatedChooseInvoice extends React.Component {
	constructor() {
		super();
		this.state = {
			isClick: false,
			pullReady: false,
			loading: false,
			selectedRowKeys: [],
			rowsMap: {}
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
		return this.props.actions.getAvailableInvoiceData({
			business_account_type: 3,
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
	handleSelected = (selectedRowKeys, selectedRows) => {
		let rowsMap = selectedRows.reduce((data, current) => {
			return { ...data, [current.invoice_number]: current }
		}, {});
		this.setState({ selectedRowKeys, rowsMap })
	}
	handleChange = (value, record) => {
		if (parseFloat(value) > parseFloat(record.rest_amount)) {
			document.getElementsByClassName(record.invoice_number)[0].style.display = 'block';
			console.log('%cdocument.getElementsByTagName(tr): ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', document.getElementsByTagName('tr')).get;
			// document.getElementsByTagName('tr').forEach(item => {

			// 	if (item.getAttribute('data-row-key') == record.invoice_number) {
			// 		console.log('%citem: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', item);
			// 	}
			// })
		} else {
			document.getElementsByClassName(record.invoice_number)[0].style.display = 'none';
		}
	}
	// onCheckAllChange = () => {
	// 	const { availableInvoiceData: { list = [] } } = this.props;
	// 	const { rowsMap } = this.state;
	// 	const newRowsMap = list.reduce((data, current) => {
	// 		current.price = document.getElementById(current.invoice_number.toString()).value
	// 		return { ...data, [current.invoice_number]: current }
	// 	}, rowsMap);

	// 	this.setState({
	// 		selectedRowKeys: Object.keys(newRowsMap),
	// 		rowsMap: newRowsMap
	// 	})
	// }
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { isClick, loading, pullReady, selectedRowKeys, rowsMap } = this.state;
		const { availableInvoiceData: { list = [], page, page_size = 20, total }, relatedInvoiceSearchItem } = this.props;
		const relatedInvoiceSearch = relatedInvoiceSearchFunc(relatedInvoiceSearchItem);
		const availableInvoiceCols = availableInvoiceFunc(selectedRowKeys, this.handleChange);
		const totalPrice = Object.values(rowsMap).reduce((data, current) => data + parseFloat(current.price), 0);

		const paginationObj = getPagination(this, search, { total, page, page_size });
		const rowSelectionObj = {
			selectedRowKeys: selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				const ary = selectedRows.map(item => ({
					...item,
					price: document.getElementById(item.invoice_number.toString()).value
				}));
				this.handleSelected(selectedRowKeys, ary);
			}
		}
		return <div className='relatedChoose-container'>
			<legend className='container-title'>选择发票</legend>
			{pullReady && <SearForm data={relatedInvoiceSearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 12, md: 8, lg: 6, xxl: 6 }} />}
			<div className='top-gap'>
				<Table
					rowKey='invoice_number'
					loading={loading}
					columns={availableInvoiceCols}
					dataSource={list}
					bordered
					pagination={total > page_size ? paginationObj : false}
					rowSelection={rowSelectionObj}
					footer={() => {
						return <span className='left-gap'>已选发票金额：<span className='red-font'>{numeral(totalPrice).format('0,0') || 0}</span></span>
						// return <WBYTableFooter
						// 	plainOptions={list}
						// 	selectedRowKeys={flag ? listKeys : []}
						// 	onChange={this.onCheckAllChange}
						// 	title={<span><span style={{ paddingRight: '10px' }}>全选</span>已选发票金额：<span className='red-font'>{totalPrice}</span></span>}
						// 	pagination={total > page_size ? paginationObj : false}
						// />
					}}
				/>
			</div>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		availableInvoiceData: state.invoice.availableInvoiceData,
		relatedInvoiceSearchItem: state.invoice.relatedInvoiceSearchItem,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...relatedInvoiceAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RelatedChooseInvoice)


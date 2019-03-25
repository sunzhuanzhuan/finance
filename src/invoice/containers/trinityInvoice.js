import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityInvoiceAction from "../actions/trinityInvoice";
import SearForm from '../../components/SearchForm'
import Statistics from '../components/Statistics'
import TrinityInvoiceModal from '../components/trinityInvoiceModal'
import { Table, message, Button } from 'antd'
import { trinityInvoiceSearchFunc } from '../constants/search'
import { trinityInvoiceFunc } from '../constants/trinityInvoice'
import './trinityInvoice.less'
import qs from 'qs'

class TrinityInvoice extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			pullReady: false,
			modalVisible: false,
			status: undefined
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.props.actions.getTrinityInvoiceSearchItem().then(() => {
			this.setState({ pullReady: true });
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '下拉项加载失败，请重试！');
		})
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getTrinityInvoiceData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleModal = (status, modalVisible) => {
		this.setState({ status, modalVisible })
	}
	handleDelete = id => {
		this.props.actions.postTrinityInvoiceDel({ id })
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading, pullReady, modalVisible, status } = this.state;
		const { trinityInvoiceData: { list = [], page, page_size = 20, total, statistic }, trinityInvoiceSearchItem } = this.props;
		const trinityInvoiceSearch = trinityInvoiceSearchFunc(trinityInvoiceSearchItem);
		const trinityInvoiceCols = trinityInvoiceFunc(this.handleModal, this.handleDelete);
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
		return <div className='trinityInvoice-container'>
			<Statistics title={'三方平台发票管理'} render={Stat(total, statistic)} />
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				{pullReady && <SearForm data={trinityInvoiceSearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }} beforeFooter={<Button type='primary' style={{ marginRight: 20 }} onClick={() => { this.handleModal('new', true) }}>新增发票</Button>} extraFooter={<Button type='primary' style={{ marginLeft: 20 }} onClick={this.handleExport}>导出</Button>} wrappedComponentRef={form => this.form = form} />}
			</fieldset>
			<div className='top-gap'>
				<Table
					rowKey='invoice_number'
					loading={loading}
					columns={trinityInvoiceCols}
					dataSource={list}
					bordered
					pagination={total > page_size ? paginationObj : false}
				/>
			</div>
			{modalVisible ? <TrinityInvoiceModal
				key={status}
				visible={modalVisible}
				page={page}
				status={status}
				queryAction={this.queryData}
				search={search}
				onCancel={() => {
					this.handleModal(undefined, false)
				}}
				SearchItem={trinityInvoiceSearchItem}
			/> : null}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		trinityInvoiceData: state.invoice.trinityInvoiceData,
		trinityInvoiceSearchItem: state.invoice.trinityInvoiceSearchItem,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityInvoiceAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(TrinityInvoice)

function Stat(total, statistic) {
	return <div style={{ padding: '0 10px' }}>
		<span>当前筛选条件下发票数：<span className='red-font little-left-gap'>{total}</span>条</span>
		<span className='left-gap'>发票总金额：<span className='red-font little-left-gap'>{statistic && statistic.invoice_amount_total}</span>元</span>
		<span className='left-gap'>发票金额：<span className='red-font little-left-gap'>{statistic && statistic.invoice_pure_amount_total}</span>元</span>
		<span className='left-gap'>发票税额：<span className='red-font little-left-gap'>{statistic && statistic.invoice_tax_amount_total}</span>元</span>
	</div>
}


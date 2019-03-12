import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import SearForm from '../../components/SearchForm'
import Statistics from '../components/Statistics'
import { Table, message, Button } from 'antd'
import { dealOrderSearchFunc } from '../constants/search'
import { dealOrderCols } from '../constants'
import './trinityPay.less'
import qs from 'qs'
class DealOrder extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			pullReady: false,
		}
	}
	componentDidMount() {
		const { payment_slip_id, keys } = qs.parse(this.props.location.search.substring(1));

		this.props.actions.getDealOrderSearchItem().then(() => {
			this.setState({ pullReady: true });
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '下拉项加载失败，请重试！');
		})
		this.queryData({ payment_slip_id, keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getDealOrderData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleExport = () => {
		const { payment_slip_id } = qs.parse(this.props.location.search.substring(1));
		const data = this.form.getFieldsValue();
		const obj = {};
		for (let [key, value] of Object.entries(data)) {
			if (typeof value === 'string') obj[key] = value.trim();
			if (typeof value === 'object') {
				if (value.key) obj[key] = value.key;
				else obj[key] = value.format('YYYY-MM-DD');
			}
		}
		this.props.actions.getDealOrderExport({ ...obj, payment_slip_id }).then(() => {
			message.success('导出成功！');
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '导出失败，请重试！');
		})
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading, pullReady } = this.state;
		const { dealOrderData: { list = [], page, page_size = 20, total, statistic }, dealOrderSearchItem } = this.props;
		const dealOrderSearch = dealOrderSearchFunc(dealOrderSearchItem);
		const paginationObj = {
			onChange: (current) => {
				this.queryData({ ...search.key, page: current, page_size });
			},
			onShowSizeChange: (current, size) => {
				this.queryData({ ...search.key, page: 1, page_size: size });
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return <div className='dealOrder-container'>
			<Statistics title={'三方平台交易明细'} render={Stat(total, statistic)} />
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				{pullReady && <SearForm data={dealOrderSearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }} extraFooter={<Button type='primary' style={{ marginLeft: 20 }} onClick={this.handleExport}>导出</Button>} wrappedComponentRef={form => this.form = form} />}
			</fieldset>
			<div className='top-gap'>
				<Table
					rowKey='id'
					loading={loading}
					columns={dealOrderCols}
					dataSource={list}
					bordered
					pagination={list.length ? paginationObj : false}
				/>
			</div>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		dealOrderData: state.trinityPay.dealOrderData,
		dealOrderSearchItem: state.trinityPay.dealOrderSearchItem,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DealOrder)
function Stat(total, statistic) {
	return <div style={{ padding: '0 10px' }}>
		<span>当前筛选条件下共<span className='red-font little-left-gap'>{total}</span>条</span>
		<span className='left-gap'>预计打款金额：<span className='red-font little-left-gap'>{statistic && statistic.payment_amount_total}</span>元</span>
		<span className='left-gap'>已打款金额：<span className='red-font little-left-gap'>{statistic && statistic.paid_amount_total}</span>元</span>
	</div>
}

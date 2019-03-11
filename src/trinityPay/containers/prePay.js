import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import SearForm from '../../components/SearchForm'
import Statistics from '../components/Statistics'
import PreModal from '../components/modal'
import { Table, message, Button } from 'antd'
import { prePaySearchFunc } from '../constants/search'
import { prePayFunc } from '../constants'
import './trinityPay.less'
import qs from 'qs'


class PrePay extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			pull: false,
			modalVisible: false,
			type: undefined
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.props.actions.getSearchItem().then(() => {
			this.setState({ pull: true });
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '下拉项加载失败，请重试！');
		})
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getPrePayData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleModal = (type, boolean) => {
		this.setState({ type, modalVisible: boolean });
	}
	handleExport = () => {
		const data = this.form.getFieldsValue();
		const obj = {};
		for (let [key, value] of Object.entries(data)) {
			if (typeof value === 'string') obj[key] = value.trim();
			if (typeof value === 'object') {
				if (value.key) obj[key] = value.key;
				else obj[key] = value.format('YYYY-MM-DD');
			}
		}
		this.props.actions.getPrePayExport({ ...obj }).then(() => {
			message.success('导出成功！');
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '导出失败，请重试！');
		})
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading, pull, modalVisible, type } = this.state;
		const { prePayData: { list = [], page, page_size = 20, total, statistic }, SearchItem } = this.props;
		const prePaySearch = prePaySearchFunc(SearchItem);
		const prePayCols = prePayFunc(this.handleModal);
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
		return <div className='prePay-container'>
			<Statistics title={'三方平台打款单'} render={Stat(total, statistic)} />
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				{pull && <SearForm data={prePaySearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }} extraFooter={<Button type='primary' style={{ marginLeft: 20 }} onClick={this.handleExport}>导出</Button>} wrappedComponentRef={form => this.form = form} />}
			</fieldset>
			<div className='top-gap'>
				<Table
					rowKey='payment_slip_id'
					loading={loading}
					columns={prePayCols}
					dataSource={list}
					bordered
					pagination={list.length ? paginationObj : false}
				/>
			</div>
			{modalVisible ? <PreModal
				key={type}
				visible={modalVisible}
				type={type}
				queryAction={this.queryData}
				onCancel={() => {
					this.handleModal(undefined, false)
				}}
			/> : null}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		prePayData: state.trinityPay.prePayData,
		SearchItem: state.trinityPay.SearchItem,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(PrePay)

function Stat(total, statistic) {
	return <div style={{ padding: '0 10px' }}>
		<span>当前筛选条件下共<span className='red-font little-left-gap'>{total}</span>条</span>
		<span className='left-gap'>待打款金额：<span className='red-font little-left-gap'>{statistic && statistic.unpaid_amount_total}</span>元</span>
		<span className='left-gap'>已打款金额：<span className='red-font little-left-gap'>{statistic && statistic.paid_amount_total}</span>元</span>
		<span className='left-gap'>应回发票金额：<span className='red-font little-left-gap'>{statistic && statistic.invoice_amount_total}</span>元</span>
		<span className='left-gap'>发票盈余：<span className='red-font little-left-gap'>{statistic && statistic.invoice_surplus_total}</span>元</span>
	</div>
}

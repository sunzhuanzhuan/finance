import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import SearForm from '../../components/SearchForm'
import Statistics from '../components/Statistics'
import DateModal from '../components/modal'
import { Table, message, Button } from 'antd'
import { datePaySearchFunc } from '../constants/search'
import { datePayFunc } from '../constants'
import './trinityPay.less'
import qs from 'qs'
class DatePay extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			pullReady: false,
			modalVisible: false,
			status: undefined,
			id: undefined
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.props.actions.getDatePaySearchItem().then(() => {
			this.setState({ pullReady: true });
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '下拉项加载失败，请重试！');
		})
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getDatePayData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleModal = (id, status, boolean) => {
		this.setState({ id, status, modalVisible: boolean });
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
		this.props.actions.getDatePayExport({ ...obj }).then(() => {
			message.success('导出成功！');
		}).catch(({ errorMsg }) => {
			message.error(errorMsg || '导出失败，请重试！');
		})
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading, pullReady, modalVisible, id, status } = this.state;
		const { datePayData: { list = [], page, page_size = 20, total, statistic }, datePaySearchItem } = this.props;
		const datePaySearch = datePaySearchFunc(datePaySearchItem);
		const datePayCols = datePayFunc(this.handleModal);
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
		return <div className='datePay-container'>
			<Statistics title={'三方平台打款单'} render={Stat(total, statistic)} />
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				{pullReady && <SearForm data={datePaySearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }} extraFooter={<Button type='primary' style={{ marginLeft: 20 }} onClick={this.handleExport}>导出</Button>} wrappedComponentRef={form => this.form = form} />}
			</fieldset>
			<div className='top-gap'>
				<Table
					rowKey='payment_slip_id'
					loading={loading}
					columns={datePayCols}
					dataSource={list}
					bordered
					pagination={total > page_size ? paginationObj : false}
				/>
			</div>
			{modalVisible ? <DateModal
				key={status}
				visible={modalVisible}
				id={id}
				page={page}
				status={status}
				type={'datePay'}
				queryAction={this.queryData}
				search={search}
				onCancel={() => {
					this.handleModal(undefined, false)
				}}
			/> : null}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		datePayData: state.trinityPay.datePayData,
		datePaySearchItem: state.trinityPay.datePaySearchItem,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DatePay)
function Stat(total, statistic) {
	return <div style={{ padding: '0 10px' }}>
		<span>当前筛选条件下共<span className='red-font little-left-gap'>{total}</span>条</span>
		<span className='left-gap'>待打款金额：<span className='red-font little-left-gap'>{statistic && statistic.unpaid_amount_total}</span>元</span>
		<span className='left-gap'>已打款金额：<span className='red-font little-left-gap'>{statistic && statistic.paid_amount_total}</span>元</span>
		<span className='left-gap'>应回发票金额：<span className='red-font little-left-gap'>{statistic && statistic.invoice_amount_total}</span>元</span>
		<span className='left-gap'>发票盈余：<span className='red-font little-left-gap'>{statistic && statistic.invoice_surplus_total}</span>元</span>
	</div>
}

import React, { Component } from 'react'
import { Tabs, Spin } from 'antd'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/usageQuery'
import * as trinityInvoiceAction from '../actions/trinityInvoice'


import * as commonAction from "@/actions";
import { TripartiteForm, AccountForm, ListTable } from '../components/usageQuery'
import { getTimeToObjByArr } from '../util'
const { TabPane } = Tabs;
const defaultSearch = { page: 1, page_size: 10 }
export class UsageQuery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			searchParams: defaultSearch,
			tabCheckedKey: 1,
		};
		this.resetSearchParams = this.resetSearchParams.bind(this)
	}
	componentDidMount = () => {
		this.changeTabs(this.state.tabCheckedKey)
		this.props.actions.getTrinityInvoiceSearchItem()
	}
	changeTabs = (key) => {
		this.setState({
			searchParams: defaultSearch,
			tabCheckedKey: key
		}, () => {
			if (key == 1) {
				this.getUserInvoiceSearchAsync()
			} else {
				this.getTrinityInvoiceSearchAsync()
			}
		})
	}
	resetSearchParams = () => {
		this.setState({
			searchParams: defaultSearch
		})
	}
	//查询主账号列表
	getUserInvoiceSearchAsync = async (params) => {
		this.setState({ isLoading: true })
		const paramsAll = { ...this.state.searchParams, ...params }
		await this.props.actions.getUserInvoiceSearch(this.timeFormat(paramsAll))
		this.setState({ isLoading: false, searchParams: paramsAll })
	}
	//查询三方列表
	getTrinityInvoiceSearchAsync = async (params) => {
		this.setState({ isLoading: true })
		const paramsAll = { ...this.state.searchParams, ...params }
		await this.props.actions.getTrinityInvoiceSearch(this.timeFormat(paramsAll))
		this.setState({ isLoading: false, searchParams: paramsAll })
	}
	//导出
	exportInvoiceFile = (source_type) => {
		this.props.actions.exportInvoice(this.timeFormat({ source_type: source_type, ...this.state.searchParams }))
	}
	//处理数据中的时间参数
	timeFormat = (params = {}) => {
		let paramsFormat = {
			...params,
			...getTimeToObjByArr(params.invoice_created_time, 'invoice_created_time_start', 'invoice_created_time_end'),//发票录入时间
			...getTimeToObjByArr(params.invoice_use_time, 'invoice_use_time_start', 'invoice_use_time_end'),//发票录入时间
			...getTimeToObjByArr(params.payment_time, 'payment_time_start', 'payment_time_end'),//发票录入时间
		}
		delete paramsFormat.invoice_created_time
		delete paramsFormat.invoice_use_time
		delete paramsFormat.payment_time
		if (paramsFormat.user) {
			paramsFormat.user_id = params.user.key
			delete paramsFormat.user
		}
		if (paramsFormat.owner_admin) {
			paramsFormat.owner_admin_id = params.owner_admin.key
			delete paramsFormat.owner_admin
		}
		if (paramsFormat.beneficiary_company) {
			paramsFormat.beneficiary_company = params.beneficiary_company.key
		}
		Object.keys(paramsFormat).forEach(item => {
			if (!paramsFormat[item] && paramsFormat[item] != 0) {
				delete paramsFormat[item]
			}
		})
		return paramsFormat
	}


	render() {
		const { actions, invoiceReducers = {} } = this.props
		const { isLoading, tabCheckedKey, } = this.state
		const { userInvoiceList, trinityInvoiceList, trinityInvoiceSearchItem } = invoiceReducers
		const commonSearchProps = {
			actions,
			resetSearchParams: this.resetSearchParams,
			trinityInvoiceSearchItem,
			exportInvoiceFile: this.exportInvoiceFile
		}
		const paymentTypeMapAccount = {
			1: '周打款',
			2: '快易提',
			3: '提前打款'
		}
		const paymentTypeMapTripartite = {
			1: '三方预付款',
			2: '三方周期付款',
		}
		return (
			<Spin spinning={isLoading}>
				<h2>发票使用明细查询</h2>
				<Tabs defaultActiveKey="1" onChange={this.changeTabs}>
					<TabPane tab="主账号" key="1">
						{tabCheckedKey == 1 ? <AccountForm  {...commonSearchProps} onSearchList={this.getUserInvoiceSearchAsync} /> : null}
						<ListTable isNoShowColumnsTitle={['三方代理商']}
							onSearchList={this.getUserInvoiceSearchAsync}
							list={userInvoiceList}
							paymentTypeMap={paymentTypeMapAccount}
						/>
					</TabPane>
					<TabPane tab="三方平台" key="2">
						{tabCheckedKey == 2 ? <TripartiteForm  {...commonSearchProps} onSearchList={this.getTrinityInvoiceSearchAsync} /> : null}
						<ListTable
							list={trinityInvoiceList}
							onSearchList={this.getTrinityInvoiceSearchAsync}
							isNoShowColumnsTitle={['订单信息', '媒介信息']}
							paymentTypeMap={paymentTypeMapTripartite}
						/>
					</TabPane>
				</Tabs>
			</Spin>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		invoiceReducers: state.invoice,
		authorizationsReducers: state.authorizationsReducers,
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...commonAction, ...action, ...trinityInvoiceAction }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UsageQuery)

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
			searchParams: defaultSearch
		};
		this.resetSearchParams = this.resetSearchParams.bind(this)
	}
	componentDidMount = () => {
		this.changeTabs(1)
		this.props.actions.getTrinityInvoiceSearchItem()
	}
	changeTabs = (key) => {
		if (key == 1) {
			this.getUserInvoiceSearchAsync()
		} else {
			this.getTrinityInvoiceSearchAsync()
		}
		this.resetSearchParams()
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
	//处理数据中的时间参数
	timeFormat = (params = {}) => {
		return {
			...params,
			...getTimeToObjByArr(params.invoice_created_time, 'invoice_created_time_start', 'invoice_created_time_end'),//发票录入时间
			...getTimeToObjByArr(params.invoice_use_time, 'invoice_use_time_start', 'invoice_use_time_end'),//发票录入时间
			...getTimeToObjByArr(params.payment_time, 'payment_time_start', 'payment_time_end'),//发票录入时间
		}
	}


	render() {
		const { actions, invoiceReducers = {} } = this.props
		const { isLoading } = this.state
		const { userInvoiceList, trinityInvoiceList, trinityInvoiceSearchItem } = invoiceReducers
		const commonSearchProps = {
			actions,
			resetSearchParams: this.resetSearchParams,
			trinityInvoiceSearchItem
		}
		return (
			<Spin spinning={isLoading}>
				<h2>发票使用明细查询</h2>
				<Tabs defaultActiveKey="1" onChange={this.changeTabs}>
					<TabPane tab="主账号" key="1">
						<AccountForm {...commonSearchProps} onSearchList={this.getUserInvoiceSearchAsync} />
						<ListTable isNoShowColumnsTitle={['三方代理商']} onSearchList={this.getUserInvoiceSearchAsync} list={userInvoiceList} />
					</TabPane>
					<TabPane tab="三方平台" key="2">
						<TripartiteForm {...commonSearchProps} onSearchList={this.getTrinityInvoiceSearchAsync} />
						<ListTable
							list={trinityInvoiceList}
							onSearchList={this.getTrinityInvoiceSearchAsync}
							scrollX={1000}
							isNoShowColumnsTitle={['订单ID', '主账号', '订单应约税率', '预付金额',
								'扣款金额', '媒介经理']}
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

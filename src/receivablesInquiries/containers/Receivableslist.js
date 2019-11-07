import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivable.less';
import { Table, Alert } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getQueryItems, getQueryKeys, getReceListQueryKey, receivableCol } from '../constants';
import * as receivableAction from "../actions/receivable";
import * as receivableOffAction from "@/receivablesOff/actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { Scolltable } from '@/components';
import { getTotalWidth, downloadByATag, events } from '@/util';
import qs from 'qs';
import numeral from 'numeral';
import moment from 'moment';
class Receivableslist extends React.Component {
	constructor() {
		super();
		this.state = {
			searchQuery: {
				time: moment().format('YYYY-MM-DD')
			},
			loading: false,
			leftWidth: 40
		};
		events.on('message', this.collapsedListener); 
	}
	collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
	}
	componentDidMount() {
		const { searchQuery } = this.state;
		this.props.getReceSaleList();
		this.props.getRegionTeamName();
		this.props.getReceMetaData();
		this.handleSearch(searchQuery);
		const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;
		this.setState({leftWidth});
	}

	handleSearch = searchQuery => {
		this.setState({searchQuery, loading: true});
		this.props.getReceivableList(searchQuery).then(() => {
			this.setState({loading: false});
		}).catch(() => {
			this.setState({ loading: false });
		})
	}

	handleExport = () => {
		const { searchQuery } = this.state;
		downloadByATag(`/api/finance/receivables/query/exportCompanyReceivables?${qs.stringify(searchQuery)}`);
	}

	handleJumpToDetail = (receivables_aging_range, company_id) => {
		const detailQuery = company_id ? { receivables_aging_range, company_id } : { receivables_aging_range }
		this.props.history.push({
			pathname: '/finance/receivable/detail',
			search: `?${qs.stringify(detailQuery)}`,
		});
	}

	render() {
		const { 
			receivableList: { total = {}, list = [], statistics = {}}, 
			getGoldenCompanyId,
			getReceSaleList,
			receMetaData = {}, receSalerList = [], regionList = [], userLoginInfo = {}
		} = this.props;
		const { user_group_id } = userLoginInfo;
		const { receivables_aging_range } = receMetaData;
		const { loading, leftWidth } = this.state;
		const totalRaw = Object.assign(total, {company_name: '总计', isTotalRow: true});
		const { company_num = 0, total_receivables_amount = 0, total_wait_allocation_amount = 0, } = statistics;
		const TotalMsg = (
			<div className='total-info-wrapper'>
				<>公司数量：<span className='total-color'>{company_num}</span></>
				<span className='total-margin'>总欠款：<span className='total-color'>{numeral(total_receivables_amount).format('0.00')}</span></span>
				<>回款待分配金额：<span className='total-color'>{numeral(total_wait_allocation_amount).format('0.00')}</span></>
			</div>
		);
		const dataSource = list && list.length ? [totalRaw, ...list] : [];
		const totalWidth = getTotalWidth(receivableCol(receivables_aging_range));
		return <div className='rece-wrapper'>
			<div className='rece-title'>应收账款查询</div>
			<ReceivableQuery 
				showExport
				className={'rece-wrapper'}
				isList
				queryItems={getQueryItems(getReceListQueryKey(user_group_id)) || []}
				queryOptions={Object.assign(receMetaData, {receSalerList, regionList})} 
				handleSearch={this.handleSearch}
				handleExport={this.handleExport}
				actionKeyMap={{
					company: getGoldenCompanyId,
					saler: getReceSaleList,
				}}
			/>
			<Alert className='list-total-info' message={TotalMsg} type="warning" showIcon />
			
			<Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth + leftWidth}>
				<Table 
					className='receivable-table rece-list-table'
					rowKey='company_name' 
					columns={receivableCol(receivables_aging_range, this.handleJumpToDetail)} 
					dataSource={dataSource} 
					bordered 
					pagination={false} 
					loading={loading}
					scroll={{ x: totalWidth }}
				/>
			</Scolltable>
		</div>
	}
}

const mapStateToProps = (state) => {
	const { receivableOff = {}, receivable = {}, loginReducer = {} } = state;
	const { userLoginInfo = {} } = loginReducer;
	const { user_info = {} } = userLoginInfo;
	const { receivableList = {}, receSalerList } = receivable;
	const { receMetaData, regionList } = receivableOff;

	return {
		receivableList,
		receMetaData,
		regionList,
		receSalerList,
		userLoginInfo: user_info,
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableAction, ...goldenActions, ...receivableOffAction}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Receivableslist)

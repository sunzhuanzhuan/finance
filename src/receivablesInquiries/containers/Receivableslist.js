import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivable.less';
import { message, Table, Button, Alert } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getQueryItems, getQueryKeys, receivableCol } from '../constants';
import * as receivableAction from "../actions/receivable";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { Scolltable } from '@/components';
import { getTotalWidth, downloadByATag } from '@/util';
import qs from 'qs';
import numeral from 'numeral';
class Receivableslist extends React.Component {
	constructor() {
		super();
		this.state = {
			searchQuery: {
				page: 1,
				page_size: 20
			},
			loading: false
		};
	}
	componentDidMount() {
		this.handleSearch({
			page: 1,
			page_size: 20
		});
		this.props.getReceSearchOptions();
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

		downloadByATag(`/api/receivables/query/exportCompanyList?${qs.stringify(searchQuery)}`);
	}

	handleJumpToDetail = receivables_aging_range => {
		this.props.history.push({
			pathname: '/finance/receivable/detail',
			search: `?${qs.stringify({receivables_aging_range})}`,
		});
	}

	render() {
		const { 
			receivableList: { total = {}, list = [], statistic = {}}, 
			getGoldenCompanyId, receSearchOptions = {} 
		} = this.props;
		const { loading } = this.state;
		const totalRaw = Object.assign(total, {company_name: '总计'});
		const { company_num = 0, total_receivables_amount = 0, total_wait_allocation_amount = 0, } = statistic;
		const TotalMsg = (
			<div className='total-info-wrapper'>
				<>公司数量：<span className='total-color'>{company_num}</span></>
				<span className='total-margin'>总欠款：<span className='total-color'>{numeral(total_receivables_amount).format('0.00')}</span></span>
				<>回款待分配金额：<span className='total-color'>{numeral(total_wait_allocation_amount).format('0.00')}</span></>
			</div>
		);
		const totalWidth = getTotalWidth(receivableCol());
		const pagination = {
			// onChange: current => {
			// 	Object.assign(searchQuery, {page: current});
			// 	this.setState({searchQuery});
			// 	this.handleSearch(searchQuery);
			// },
			// onShowSizeChange: (_, pageSize) => {
			// 	Object.assign(searchQuery, {page_size: pageSize});
			// 	this.setState({searchQuery});
			// 	this.handleSearch(searchQuery);
			// },
			// total: parseInt(total),
			// current: parseInt(page),
			// pageSize: parseInt(page_size),
			defaultPageSize: 20,
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return <div className='rece-wrapper'>
			<div className='rece-title'>应收账款查询</div>
			<ReceivableQuery 
				showExport
				isList
				queryItems={getQueryItems(getQueryKeys['receivableList'])}
				queryOptions={receSearchOptions}
				handleSearch={this.handleSearch}
				handleExport={this.handleExport}
				actionKeyMap={{
					company: getGoldenCompanyId
				}}
			/>
			<Alert className='list-total-info' message={TotalMsg} type="warning" showIcon />
			<Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth}>
				<Table 
					className='receivable-table'
					rowKey='company_name' 
					columns={receivableCol(this.handleJumpToDetail)} 
					dataSource={[totalRaw, ...list]} 
					bordered 
					pagination={pagination} 
					loading={loading}
					scroll={{ x: totalWidth }}
				/>
			</Scolltable>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		// receivableList: state.receivable.receivableList,
		receivableList: {
			"total": {
				"receivables_amount": 1,
				"wait_allocation_amount": 4,
				"M0": 600,
				"M1": 800,
				"M2": 800,
				"M3": 800,
				"M4": 800,
				"M5": 800,
				"M6": 800,
				"M7": 800,
				"M8": 800,
				"M9": 800,
				"M10-M12": 800,
				"-M12": 800,
				"M12-": 800,
				"M12-M24": 800,
				"M24-M36": 800,
				"M36-M48": 800,
				"M48-M60": 800,
				"M60-": 800,
				"modified_at": "2019-08-16 18:50:56"
			},
			"list": [
				{
					"company_name": "野韭菜",
					"salesman_region": "华北",
					"sale_name": "林明",                
					"sale_supervisor_name": "张吉",
					"sale_manager_name": "徐涛", 
					"receivables_amount": 1,
					"wait_allocation_amount": 4,
					"M0": 600,
					"M1": 800,
					"M2": 800,
					"M3": 800,
					"M4": 800,
					"M5": 800,
					"M6": 800,
					"M7": 800,
					"M8": 800,
					"M9": 800,
					"M10-M12": 800,
					"-M12": 800,
					"M12-": 800,
					"M12-M24": 800,
					"M24-M36": 800,
					"M36-M48": 800,
					"M48-M60": 800,
					"M60-": 800,
					"modified_at": "2019-08-16 18:50:56"
				},
				{
					"company_name": "野韭菜2",
					"salesman_region": "华北",
					"sale_name": "林明",                
					"sale_supervisor_name": "张吉",
					"sale_manager_name": "徐涛", 
					"receivables_amount": 1,
					"wait_allocation_amount": 4,
					"M0": 600,
					"M1": 800,
					"M2": 800,
					"M3": 800,
					"M4": 800,
					"M5": 800,
					"M6": 800,
					"M7": 800,
					"M8": 800,
					"M9": 800,
					"M10-M12": 800,
					"-M12": 800,
					"M12-": 800,
					"M12-M24": 800,
					"M24-M36": 800,
					"M36-M48": 800,
					"M48-M60": 800,
					"M60-": 800,
					"modified_at": "2019-08-16 18:50:56"
				}
			],
			"statistic": {
				"company_num": "4800.00",
				"total_arrears_amount": "3800.00",
				"total_wait_allocation_amount": "1000.00"
			}
		},
		receSearchOptions: state.receivable.receSearchOptions,
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableAction, ...goldenActions}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Receivableslist)

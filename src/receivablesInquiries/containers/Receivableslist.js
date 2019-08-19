import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivable.less';
import { message, Table, Button, Alert } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getQueryItems, receivableCol } from '../constants';
import * as receivableAction from "../actions/receivable";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { Scolltable } from '@/components';
import { getTotalWidth } from '@/util';

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
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}

	render() {
		const { 
			receivableList: { total = 0, page = 1, page_size = 20, list, statistic = {}}, 
			getGoldenCompanyId, receSearchOptions = {} 
		} = this.props;
		const { searchQuery, loading } = this.state;
		const { company_num = 0, total_receivables_amount = 0, total_wait_allocation_amount = 0, } = statistic;
		const TotalMsg = (
			<div className='total-info-wrapper'>
				<>公司数量：<span className='total-color'>{company_num}</span></>
				<span className='total-margin'>总欠款：<span className='total-color'>{total_receivables_amount}</span></span>
				<>回款待分配金额：<span className='total-color'>{total_wait_allocation_amount}</span></>
			</div>
		);
		const totalWidth = getTotalWidth(receivableCol);
		const pagination = {
			onChange: current => {
				Object.assign(searchQuery, {page: current});
				this.setState({searchQuery});
				this.handleSearch(searchQuery);
			},
			onShowSizeChange: (_, pageSize) => {
				Object.assign(searchQuery, {page_size: pageSize});
				this.setState({searchQuery});
				this.handleSearch(searchQuery);
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return <div className='rece-wrapper'>
			<div className='rece-title'>应收账款查询</div>
			<ReceivableQuery 
				queryItems={getQueryItems()}
				queryOptions={receSearchOptions}
				handleSearch={this.handleSearch}
				action={getGoldenCompanyId}
			/>
			<div className='export-btn-wrapper'>
				<Button type='primary'>导出</Button>
			</div>
			
			<Alert className='list-total-info' message={TotalMsg} type="warning" showIcon />
			<Scolltable isMoreThanOne scrollClassName='.ant-table-body' widthScroll={totalWidth}>
				<Table 
					className='receivable-tablef'
					rowKey='id' 
					columns={receivableCol} 
					dataSource={list} 
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
		receivableList: state.receivable.receivableList,
		receSearchOptions: state.receivable.receSearchOptions,
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableAction, ...goldenActions}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Receivableslist)

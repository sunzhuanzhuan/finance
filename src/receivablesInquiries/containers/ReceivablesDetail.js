import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { message, Table, Button, Alert, Tabs } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getTabOptions, getQueryItems, getQueryKeys, getReceivableDetailCol } from '../constants';
import * as receivableAction from "../actions/receivable";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth } from '@/util';
import { Scolltable } from '@/components';

const { TabPane } = Tabs;

class ReceivablesDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: 'reservationList',
		};
	}
	componentDidMount() {

	}

	handleSearch = (key, searchQuery) => {
		this.setState({[`searchQuery-${key}`]: searchQuery});
		Object.assign(searchQuery, {key});

	}

	handleExportList = () => {
		
	}

	getTabPaneComp = () => {
		const { receivable = {} } = this.props;
		const { receSearchOptions } = receivable;
		return getTabOptions.map(item => {
			const { tab, key } = item;
			const tabInfo = receivable[key] || {};
			const { list = [], page, total, page_size: tableSize } = tabInfo;
			const totalMsg = `应收款金额${0}`;
			const columns = getReceivableDetailCol();
			const totalWidth = getTotalWidth(columns);
			const pagination = {
				onChange: (current) => {
					Object.assign(this.state[`searchQuery-${key}`], {page: current});
					this.setState({[`searchQuery-${key}`]: this.state[`searchQuery-${key}`]});
					this.handleSearch(key, this.state[`searchQuery-${key}`]);
				},
				onShowSizeChange: (_, pageSize) => {
					Object.assign(this.state[`searchQuery-${key}`], {page_size: pageSize});
					this.setState({[`searchQuery-${key}`]: this.state[`searchQuery-${key}`]});
					this.handleSearch(key, this.state[`searchQuery-${key}`]);
				},
				total: parseInt(total),
				current: parseInt(page),
				pageSize: parseInt(tableSize),
				showQuickJumper: true,
				showSizeChanger: true,
				pageSizeOptions: ['20', '50', '100', '200']
			};
			const tabTitle = total != undefined ? <div>
				<span>{tab}</span>
				<span>{total}</span>
			</div> : <div>{tab}</div>;
			return (
				<TabPane tab={tabTitle} key={key}>
					<ReceivableQuery 
						showExport
						queryItems={getQueryItems(getQueryKeys[key])}
						queryOptions={receSearchOptions}
						handleSearch={searchQuery => {this.handleSearch(key, searchQuery)}} 
						handleExport={this.handleExportList}
					/>
					{ <Alert className='list-total-info' message={totalMsg} type="warning" showIcon /> }
					<Scolltable isMoreThanOne scrollClassName='.ant-table-body' widthScroll={totalWidth}>
						<Table 
							className='receivable-table'
							rowKey='id' 
							columns={columns} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
							scroll={{ x: totalWidth }}
						/>
					</Scolltable>
				</TabPane>
			)
		})
	}

	handleChangeTab = activeKey => {
		this.setState({activeKey});
	}

	render() {
		const { activeKey } = this.state;
		const comp = <div>
			<span>{`预约订单：${0}个|${0}元`}</span>
			<span className='total-margin'>{`派单活动：${0}个|${0}元`}</span>
			<span>{`公司拓展业务：${0}个|${0}元`}</span>
			<span className='total-margin'>{`当前已选可核销金额 ${0.00}元`}</span>
		</div>;

		return <div className='rece-wrapper rece-detail-wrapper'>
			<div className='rece-title'>应收款订单明细</div>
			{/* <Alert message={comp} type="warning" showIcon /> */}
			<Tabs className='rece_tabs' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp()
				}
			</Tabs>
		</div>
	}
}

const mapStateToProps = (state) => {
	const { receivable } = state;
	return {
		receivable
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableAction, ...goldenActions}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesDetail)

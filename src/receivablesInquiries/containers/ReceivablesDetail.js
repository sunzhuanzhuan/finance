import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { message, Table, Alert, Tabs } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getTabOptions, getQueryItems, getQueryKeys, getReceivableDetailCol, getColKeys } from '../constants';
import * as receivableAction from "../actions/receivable";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth, downloadByATag } from '@/util';
import { Scolltable } from '@/components';
import qs from 'qs';

const { TabPane } = Tabs;

class ReceivablesDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: 'reservationList',
			loading: false
		};
	}

	handleSearch = (key, searchQuery) => {
		this.setState({[`searchQuery-${key}`]: searchQuery, loading: true});
		if(typeof this.props[key] === 'function') {
			this.props[key](searchQuery).then(() => {
				this.setState({ loading: false })
			}).catch(({ errorMsg }) => {
				this.setState({ loading: false });
				message.error(errorMsg || '列表加载失败，请重试！');
			})
		}

	}

	handleExportList = key => {
		downloadByATag(`/api/receivables/query/exportCompanyList?${qs.stringify(this.state[`searchQuery-${key}`])}`);
	}

	getTabPaneComp = () => {
		const { receivable = {} } = this.props;
		const { loading } = this.state;
		const { receSearchOptions } = receivable;
		return getTabOptions.map(item => {
			const { tab, key } = item;
			const tabInfo = receivable[key] || {};
			const { list = [], page, total, page_size: tableSize } = tabInfo;
			const totalMsg = `应收款金额${0}`;
			const columns = getReceivableDetailCol(getColKeys[key]);
			const totalWidth = getTotalWidth(columns);
			const pagination = {
				// onChange: (current) => {
				// 	Object.assign(this.state[`searchQuery-${key}`], {page: current});
				// 	this.setState({[`searchQuery-${key}`]: this.state[`searchQuery-${key}`]});
				// 	this.handleSearch(key, this.state[`searchQuery-${key}`]);
				// },
				// onShowSizeChange: (_, pageSize) => {
				// 	Object.assign(this.state[`searchQuery-${key}`], {page_size: pageSize});
				// 	this.setState({[`searchQuery-${key}`]: this.state[`searchQuery-${key}`]});
				// 	this.handleSearch(key, this.state[`searchQuery-${key}`]);
				// },
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
			const wrapperClass = `moreThanOneTable${key}`;
			return (
				<TabPane tab={tabTitle} key={key} className={wrapperClass}>
					<ReceivableQuery 
						showExport
						queryItems={getQueryItems(getQueryKeys[key])}
						queryOptions={receSearchOptions}
						handleSearch={searchQuery => {this.handleSearch(key, searchQuery)}} 
						handleExport={() => {this.handleExportList(key)}}
					/>
					{ <Alert className='list-total-info' message={totalMsg} type="warning" showIcon /> }
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`}
						widthScroll={totalWidth}
					>
						<Table 
							loading={loading}
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

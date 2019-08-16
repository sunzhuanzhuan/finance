import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { message, Table, Button, Alert, Tabs } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getTabOptions, getOffDetailQueryKeys, getOffQueryItems, getOffDetailCloIndex, getReceOffCol } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth } from '@/util';
import { Scolltable } from '@/components';
import { getReceAddList } from '../actions/receivableAdd';

const { TabPane } = Tabs;

class ReceivablesOffDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: 'yuyueyuyue',
		};
	}
	componentDidMount() {

	}
	static getDerivedStateFromProps(nextProps, prevState) {
		const { progress, errorMsg } = nextProps;
		const { progress: stateProgress } = prevState;
		if(progress !== stateProgress) {
			if(progress === 3) {
				try {
					if (typeof message.destroy === 'function') {
						message.destroy();
					}
					message.error(errorMsg || '列表加载失败，请重试！');
				} catch (error) {
					console.log(error);
				}
			}
			return {
				progress,
			}
		}
		return null;
	}
	handleSearch = (key, searchQuery) => {
		this.setState({[`searchQuery-${key}`]: searchQuery});
		Object.assign(searchQuery, {key});
		this.props.getReceAddList(searchQuery);
	}

	handleExportList = () => {
		
	}

	getTabPaneComp = () => {
		const { receAddListInfo = {} } = this.props;
		const { progress } = receAddListInfo;

		return getTabOptions.map(item => {
			const { tab, key } = item;
			const tabInfo = receAddListInfo[`receAddInfo-${key}`] || {};
			const { list = [], page, total, page_size: tableSize } = tabInfo;
			const totalMsg = `查询结果共${0}个，${0}个符合核销要求，${1 - 0}不符合：预约订单/派单活动未结案、拓展业务活动未审核通过、应收款金额为0的订单不能进行核销。`;
			const columns = getReceOffCol(getOffDetailCloIndex[key]);
			console.log('sldfkjsdlkfjsldkfj', columns)
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
					<ReceivableOffQuery 
						showExport
						queryItems={getOffQueryItems(getOffDetailQueryKeys[key])}
						handleSearch={searchQuery => {this.handleSearch(key, searchQuery)}} 
						handleExport={this.handleExportList}
					/>
					{ <Alert className='add-list-total-info' message={totalMsg} type="warning" showIcon /> }
					<Scolltable isMoreThanOne scrollClassName='.ant-table-body' widthScroll={totalWidth}>
						<Table 
							className='receivable-table'
							rowKey='id' 
							columns={columns} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
							loading={progress === 1}
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
			<div className='rece-title'>核销订单明细</div>
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
	const { receivableOff: { receAddReducer: receAddListInfo }} = state;
	
	return {
		receAddListInfo,
		progress: receAddListInfo.progress,
		errorMsg: receAddListInfo.errorMsg
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions, getReceAddList}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesOffDetail)

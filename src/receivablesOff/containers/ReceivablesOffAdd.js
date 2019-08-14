import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { Modal, Form, message, Table, Button, Alert, Tabs } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getAddQueryItems, getReceOffAddCol } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { Scolltable } from '@/components';
import { getReceAddList } from '../actions/receivableAdd';

const { TabPane } = Tabs;

class ReceivablesOfflist extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: 'yuyueyuyue',
		};
		this.tabOptions = [
			{ tab: '预约', key: 'yuyueyuyue' },
			{ tab: '微闪投', key: 'weishantou' },
			{ tab: '拓展业务', key: 'tuozhanyewu' },
		];
		this.queryKeys = {
			yuyueyuyue: ['applyid', 'orderid', 'ordertime', 'brand', 'project', 'name', 'platform', 'account', 'operate'],
			weishantou: ['applyid', 'activeid', 'activetime', 'brand', 'project', 'platform', 'account', 'operate'],
			tuozhanyewu: ['applyid', 'activeid', 'offtime', 'brand', 'project', 'operate'],
		};
		this.colDataIndex = {
			yuyueyuyue: ['订单ID', '订单状态', '所属项目/品牌', '需求ID/需求名称', '账号信息', '发票申请单ID', '订单执行完成时间', '应收款金额', '本次可核销金额', '对外报价', '执行价', '质检返款', '现金结算', '赠送账户结算', '赔偿金额', '手工质检金额', '已核销金额', '已回款金额'],
			weishantou: ['活动ID', '订单状态', '所属项目/品牌', '账号信息', '发票申请单ID', '活动结算时间', '应收款金额', '本次可核销金额', '执行价', '质检返款', '现金结算', '赠送账户结算', '手工质检金额', '已核销金额', '已回款金额'],
			tuozhanyewu: ['活动ID', '活动名称/活动类型/活动状态', '所属项目/品牌', '发票申请单ID', '审核时间', '应收款金额', '本次可核销金额', '活动费用', '现金结算', '赠送账户结算', '已核销金额', '已回款金额'],
		}
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

	handleSelectRows = (key, selectedRowKeys, selectedRows) => {
		this.setState({
			[`selectedRowKeys-${key}`]: selectedRowKeys, 
			[`selectedRows-${key}`]: selectedRows, 
		});
	}

	handleClearSelect = () => {
		const { checkedKey } = this.state;
		this.setState({
			[`selectedRowKeys-${checkedKey}`]: [], 
			[`selectedRows-${checkedKey}`]: [], 
		})
	}

	getTotalWidth = (arr = []) => {
		return arr.reduce((accumulator, item) => accumulator + parseInt(item.width), 0);
	}

	getTabPaneComp = () => {
		const { receAddListInfo = {} } = this.props;
		const { progress } = receAddListInfo;

		return this.tabOptions.map(item => {
			const { tab, key } = item;
			const tabInfo = receAddListInfo[`receAddInfo-${key}`] || {};
			const { list = [], page, total, page_size: tableSize } = tabInfo;
			const totalMsg = `查询结果共${0}个，${0}个符合核销要求，${1 - 0}不符合：预约订单/派单活动未结案、拓展业务活动未审核通过、应收款金额为0的订单不能进行核销。`;
			const totalWidth = this.getTotalWidth(getReceOffAddCol(this.colDataIndex[key]));
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
			const rowSelection = {
				selectedRowKeys: this.state[`selectedRowKeys-${key}`],
				onChange: (selectedRowKeys, selectedRows) => {
					this.handleSelectRows(key, selectedRowKeys, selectedRows);
				},
				getCheckboxProps: record => ({
					disabled: !(record.status === "1")
				}),
			};
			const tabTitle = total != undefined ? <div>
				<span>{tab}</span>
				<span>{total}</span>
			</div> : <div>{tab}</div>;
			return (
				<TabPane tab={tabTitle} key={key}>
					<ReceivableOffQuery 
						showExport
						queryItems={getAddQueryItems(this.queryKeys[key])}
						handleSearch={searchQuery => {this.handleSearch(key, searchQuery)}} 
						handleExport={this.handleExportList}
					/>
					{ <Alert className='add-list-total-info' message={totalMsg} type="warning" showIcon /> }
					<div className='rece-add-seledcted'>
						已选订单:<span className='red-font' style={{ marginLeft: '10px' }}>{10}</span>个
						<Button className='left-gap' type='primary' onClick={() => {
							this.setState({ checkVisible: true, checkedKey: key });
						}}>查看已选</Button>
					</div>
					<Scolltable isMoreThanOne scrollClassName='.ant-table-body' widthScroll={totalWidth}>
						<Table 
							className='receivable-table'
							rowKey='id' 
							columns={getReceOffAddCol(this.colDataIndex[key])} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
							rowSelection={rowSelection}
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
		const { activeKey, checkVisible, checkedKey } = this.state;
		const totalWidth = checkVisible ? this.getTotalWidth(getReceOffAddCol(this.colDataIndex[checkedKey])) : 0;
		const title = <div>
			<span>{`新增核销-${'保洁'}`}</span>
			<span className='total-margin'>{`销售：${'懒猫'}`}</span>
			<span>{`区域：${'垃圾桶'}`}</span>
		</div>;
		const comp = <div>
			<span>{`预约订单：${0}个|${0}元`}</span>
			<span className='total-margin'>{`派单活动：${0}个|${0}元`}</span>
			<span>{`公司拓展业务：${0}个|${0}元`}</span>
			<span className='total-margin'>{`当前已选可核销金额 ${0.00}元`}</span>
		</div>;

		return <div className='rece-wrapper rece-add-wrapper'>
			<div className='rece-title'>{title}</div>
			{/* <Alert message={comp} type="warning" showIcon /> */}
			<Tabs className='rece_tabs' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp()
				}
			</Tabs>
			{
				checkVisible ? 
				<Modal
					visible={checkVisible}
					width={1000}
					title='查看已选'
					footer={null}
					destroyOnClose
					onCancel={() => {
						this.setState({
							checkVisible: false,
							checkedKey: undefined
						})
					}}
				>
					<Button
						type="primary"
						onClick={this.handleClearSelect}
					>
						清空已选
					</Button>
					<Table
						className='top-gap'
						rowKey='id'
						columns={getReceOffAddCol(this.colDataIndex[checkedKey])}
						dataSource={this.state[`selectedRows-${checkedKey}`]}
						size="small"
						pagination={false}
						scroll={{ y: 760, x: totalWidth }}
					>
					</Table>
				</Modal> : null
			}
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ReceivablesOfflist))

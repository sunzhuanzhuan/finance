import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { Table, Button, Alert, Tabs, message } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getTabOptions, getOffAddQueryKeys, getOffQueryItems, getReceAddColIndex, getReceOffCol, getTableId, getOffOptions } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth, downloadByATag } from '@/util';
import { Scolltable } from '@/components';
import { getReceAddList, clearReceList, addReceOffItem } from '../actions/receivableAdd';
import ReceOffModal from './ReceOffModal';
import qs from 'qs';

const { TabPane } = Tabs;

class ReceivablesOfflist extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: 'yuyueyuyue',
		};
	}

	componentDidMount() {
		this.props.getReceMetaData();
	}

	componentWillUnmount() {
		this.props.clearReceList();
	}

	handleSearch = (key, searchQuery) => {
		this.setState({[`searchQuery-${key}`]: searchQuery, loading: true});
		Object.assign(searchQuery, {key});

		this.props.getReceAddList(searchQuery).then(() => {
			this.setState({loading: false});
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		});
	}

	handleExportList = key => {
		downloadByATag(`/api/receivables/verification/exportVerificationOrder?${qs.stringify(this.state[`searchQuery-${key}`])}`);
	}

	handleSelectRows = (key, selectedRowKeys, selectedRows) => {
		this.setState({
			[`selectedRowKeys-${key}`]: selectedRowKeys, 
			[`selectedRows-${key}`]: selectedRows, 
		});
	}

	getTabPaneComp = () => {
		const { receAddListInfo = {} } = this.props;
		const { loading } = this.state;

		return getTabOptions.map(item => {
			const { tab, key } = item;
			const tabInfo = receAddListInfo[`receAddInfo-${key}`] || {};
			const { list = [], page = 1, total = 0, page_size: tableSize = 20 } = tabInfo;
			const totalMsg = `查询结果共${total}个，${total}个符合核销要求，${total - total}不符合：预约订单/派单活动未结案、拓展业务活动未审核通过、应收款金额为0的订单不能进行核销。`;
			const totalWidth = getTotalWidth(getReceOffCol(getReceAddColIndex[key]));
			const searchQuery = this.state[`searchQuery-${key}`] || { page: 1, page_size: 20 };
			const pagination = {
				onChange: (current) => {
					Object.assign(searchQuery, {page: current});
					this.setState({[`searchQuery-${key}`]: searchQuery});
					this.handleSearch(key, searchQuery);
				},
				onShowSizeChange: (_, pageSize) => {
					Object.assign(searchQuery, {page_size: pageSize});
					this.setState({[`searchQuery-${key}`]: searchQuery});
					this.handleSearch(key, searchQuery);
				},
				total: parseInt(total),
				current: parseInt(page),
				pageSize: parseInt(tableSize),
				showQuickJumper: true,
				showSizeChanger: true,
				pageSizeOptions: ['20', '50', '100', '200']
			};
			const selectedRowKeys = this.state[`selectedRowKeys-${key}`] || [];
			const disabled = !selectedRowKeys.length;
			const rowSelection = {
				selectedRowKeys,
				onChange: (selectedRowKeys, selectedRows) => {
					this.handleSelectRows(key, selectedRowKeys, selectedRows);
				},
				getCheckboxProps: record => ({
					disabled: record.status != 1
				}),
			};
			const tabTitle = total != undefined ? <div>
				<span>{tab}</span>
				<span>{total}</span>
			</div> : <div>{tab}</div>;
			const wrapperClass = `moreThanOneTable${key}`;
			return (
				<TabPane tab={tabTitle} key={key} className={wrapperClass}>
					<ReceivableOffQuery 
						showExport
						queryItems={getOffQueryItems(getOffAddQueryKeys[key])}
						handleSearch={searchQuery => {this.handleSearch(key, searchQuery)}} 
						handleExport={ () => {this.handleExportList(key)}}
						actionKeyMap={{
							company: this.props.getGoldenCompanyId
						}}
					/>
					{ <Alert className='add-list-total-info' message={totalMsg} type="warning" showIcon /> }
					<div className='rece-add-seledcted'>
						已选订单:<span className='red-font' style={{ marginLeft: '10px' }}>{selectedRowKeys.length}</span>个
						<Button 
							className='left-gap' type='primary' 
							disabled={disabled} 
							onClick={() => {
								this.setState({ checkVisible: true });
							}}
						>
							查看已选
						</Button>
					</div>
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`} 
						widthScroll={totalWidth}
					>
						<Table 
							className='receivable-table'
							rowKey={getTableId[key]} 
							columns={getReceOffCol(getReceAddColIndex[key])} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
							rowSelection={rowSelection}
							loading={loading}
							scroll={{ x: totalWidth }}
						/>
					</Scolltable>
					<div className='rece-footer'>
						<Button disabled={disabled} type='primary' onClick={() => {
							this.setState({ offVisible: true });
						}}>核销订单</Button>
					</div>
				</TabPane>
			)
		})
	}

	handleChangeTab = activeKey => {
		this.setState({activeKey});
	}

	handleModalCancel = () => {
		this.setState({
			checkVisible: false,
			offVisible: false,
		})
	}

	handleModalOk = (modalType, values) => {
		const { activeKey } = this.state;
		if(modalType === 'preview') {
			this.setState({
				[`selectedRowKeys-${activeKey}`]: [], 
				[`selectedRows-${activeKey}`]: [], 
			})
		}else if(modalType === 'offVisible') { 
			this.props.addReceOffItem(values).then(() => {
				const { history } = this.props;
				this.setState({offVisible: false});
				history.push('/finance/receivableoff/list');
			})
			.catch(({errorMsg}) => {
				message.error(errorMsg || '操作失败');
			});
		}
	}

	handleRemoveSelected = (id, itemKey) => {
		const { activeKey } = this.state;
		const rowKeys = this.state[`selectedRowKeys-${activeKey}`];
		const rows = this.state[`selectedRows-${activeKey}`];

		this.setState({
			[`selectedRowKeys-${activeKey}`]: rowKeys.filter(item => item !== id), 
			[`selectedRows-${activeKey}`]: rows.filter(item => item[itemKey] !== id),
		})
	}

	render() {
		const { receMetaData = {} } = this.props;
		const { activeKey, checkVisible, offVisible } = this.state;
		const tabColArr = getReceAddColIndex[activeKey] || [];
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
			<ReceOffModal 
				type='preview'
				visible={checkVisible}
				width={1000}
				title='查看已选'
				handleCancel={this.handleModalCancel} 
				handleOk={ () => {this.handleModalOk('preview')}}
				footer={null}
				columns={getReceOffCol([...tabColArr, 'previewOperate'], receMetaData, this.handleRemoveSelected, activeKey)}
				dataSource={this.state[`selectedRows-${activeKey}`]}
			/>
			<ReceOffModal 
				type='off'
				visible={offVisible}
				options={Object.assign(getOffOptions, receMetaData)}
				width={800}
				title='应收款核销'
				actionKeyMap={{
					company: this.props.getGoldenCompanyId,
					sale: this.props.getGoldenCompanyId
				}}
				handleCancel={this.handleModalCancel} 
				handleOk={this.handleModalOk}
			/>
		</div>
	}
}

const mapStateToProps = (state) => {
	const { receivableOff = {} } = state;
	const { receAddReducer: receAddListInfo, receMetaData } = receivableOff;

	return {
		receAddListInfo,
		receMetaData: {
			"prduct_line": [   // 订单类型
				{
					"id": 2,
					"display": "微闪投"
				},
				{
					"id": 3,
					"display": "预约订单"
				},
				{
					"id": 7,
					"display": "拓展业务"
				}
			],
			"verification_type": [   // 核销类型
				{
					"id": 1,
					"display": "客户整体折让"
				},
				{
					"id": 2,
					"display": "订单折让(赔偿)"
				},
				{
					"id": 3,
					"display": "坏账清理"
				},
				{
					"id": 4,
					"display": "其他"
				}
			]
		},
	}
}
const mapDispatchToProps = dispatch => (
		bindActionCreators({...receivableOffAction, ...goldenActions, getReceAddList, clearReceList, addReceOffItem}, dispatch)
	);
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesOfflist)

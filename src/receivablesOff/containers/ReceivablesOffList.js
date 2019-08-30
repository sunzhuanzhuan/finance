import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { Form, message, Table, Button } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getOffListQueryKeys, getOffQueryItems, getOffOptions, getOffListColIndex, getReceOffCol } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { addReceOffItem } from '../actions/receivableAdd';
import qs from 'qs';
import { getTotalWidth } from '@/util';
import { Scolltable } from '@/components';
import ReceOffModal from './ReceOffModal';

class ReceivablesOffList extends React.Component {
	constructor() {
		super();
		this.state = {
			searchQuery: {
				page: 1,
				page_size: 20
			},
			loading: false,
			addVisible: false
		};
	}
	componentDidMount() {
		this.props.getReceMetaData();
		this.handleSearch({
			page: 1,
			page_size: 20
		});
	}
	handleSearch = searchQuery => {
		this.setState({searchQuery, loading: true});
		this.props.getReceivableOffList(searchQuery).then(() => {
			this.setState({loading: false});
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}

	handleTableOperate = (operateType, recordInfo) => {
		switch(operateType) {
			case 'detail':
				const { history } = this.props;
				history.push({
					pathname: '/finance/receivableoff/detail',
					search: `?${qs.stringify({verification_id: recordInfo})}`,
				});
				return;
			case 'check':
				return this.setState({checkVisible: true, recordInfo});
			case 'edit':
				this.setState({offVisible: true, recordInfo})
				return;
			default:
				return;
		}
	}

	handleCloseModal = (modalType) => {
		this.setState({
			[modalType]: !this.state[modalType],
			recordInfo: undefined
		})
	}

	handleModalOk = (modalType, values) => {
		this.props.addReceOffItem(values).then(() => {});
		this.handleCloseModal(modalType);
	}

	render() {
		const { 
			receivableOffList: { total = 0, page = 1, page_size = 20, list = [], statistic = {} }, 
			receMetaData = {}, history 
		} = this.props;
		const { 
			verification_total = '-', order_amount = '-', verification_amount_total = '-', 
			debt_amount_total = '-', gift_amount_total = '-', warehouse_amount_total = '-' 
		} = statistic;
		const { searchQuery, loading, addVisible, offVisible, checkVisible, recordInfo } = this.state;
		const totalWidth = getTotalWidth(getReceOffCol(getOffListColIndex));
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
			<div className='rece-title'>应收账款核销</div>
			<ReceivableOffQuery
				queryOptions={Object.assign(getOffOptions, receMetaData)} 
				queryItems={getOffQueryItems(getOffListQueryKeys)}
				handleSearch={this.handleSearch}
			/>
			<div className='export-btn-wrapper'>
				<Button type='primary' icon='plus' onClick={() => {this.setState({addVisible: !addVisible})}}>新增核销</Button>
				<Button type='primary' icon='upload'>全部导出</Button>
			</div>
			<div className='total-info-wrapper'>
				<>核销次数：<span className='total-color'>{verification_total}</span>个</>
				<span className='total-margin'>订单数：<span className='total-color'>{order_amount}</span></span>
				<>总核销金额：<span className='total-color'>{verification_amount_total}</span></>
				<span className='total-margin'>赠点/返点账户抵扣：<span className='total-color'>{gift_amount_total}</span></span>
				<>小金库抵扣：<span className='total-color'>{warehouse_amount_total}</span></>
			</div>
			<Scolltable isMoreThanOne scrollClassName='.ant-table-body' widthScroll={totalWidth}>
				<Table 
					className='receivable-table'
					rowKey='verification_id' 
					columns={getReceOffCol(getOffListColIndex, receMetaData, this.handleTableOperate)} 
					dataSource={list} 
					bordered 
					pagination={pagination} 
					loading={loading}
					scroll={{ x: totalWidth }}
				/>
			</Scolltable>
			<ReceOffModal 
				type='add'
				visible={addVisible}
				history={history}
				width={440}
				title='选择公司'
				actionKeyMap={{
					company: this.props.getGoldenCompanyId
				}}
				handleCancel={() => {this.handleCloseModal('addVisible')}} 
			/>
			<ReceOffModal 
				type='off'
				isEdit
				visible={offVisible}
				options={getOffOptions}
				initialValue={recordInfo}
				width={800}
				title='应收款核销'
				actionKeyMap={{
					company: this.props.getGoldenCompanyId,
					sale: this.props.getGoldenCompanyId
				}}
				handleCancel={() => {this.handleCloseModal('offVisible')}}
				handleOk={this.handleModalOk}
			/>
			<ReceOffModal 
				type='check'
				visible={checkVisible} 
				options={getOffOptions}
				footer={
					[
						<Button key="back" onClick={() => {this.handleCloseModal('checkVisible')}}>
							返回
						</Button>
					]
				}
				initialValue={recordInfo}
				width={800}
				title='核销信息'
				handleCancel={() => {this.handleCloseModal('checkVisible')}} 
			/>
		</div>
	}
}

const mapStateToProps = (state) => {
	console.log('lsdkjflskdjflskdfj', state);
	return {
		// receivableOffList: state.receivableOff.receivableOffList,
		// receMetaData: state.receivableOff.receMetaData,
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
		receivableOffList: {
			"list": [
				{
					"verification_id": 78,
					"verification_code": "ZQ201907250001", // 核销编号
					"company_name": 2, // 厂商简称
					"sale_name": 10, // 所属销售
					"type": 1, // 核销类型(需要对照配置信息表)
					"total_verification_amount": 4, // 本次核销金额
					"debt_amount": 7, // 核销账户金额
					"gift_amount": 1, // 赠送/返点账户抵扣金额
					"warehouse_amount": "500.00", // 小金库抵扣金额
					"is_record_sale_income": 1, // 是否计提提成
					"is_decrease_company_gmv": 1, // 是否扣减公司GMV
					"is_decrease_sale_gmv": 1, // 是否扣减销售GMV
					"created_at": "2019-07-25 18:47:04", // 核销时间
					"operator_name": "校长" // 核销人员
				},
				{
					"verification_id": 79,
					"verification_code": "ZQ201907250001", // 核销编号
					"company_name": 2, // 厂商简称
					"sale_name": 10, // 所属销售
					"type": 1, // 核销类型(需要对照配置信息表)
					"total_verification_amount": 4, // 本次核销金额
					"debt_amount": 7, // 核销账户金额
					"gift_amount": 1, // 赠送/返点账户抵扣金额
					"warehouse_amount": "500.00", // 小金库抵扣金额
					"is_record_sale_income": 1, // 是否计提提成
					"is_decrease_company_gmv": 1, // 是否扣减公司GMV
					"is_decrease_sale_gmv": 1, // 是否扣减销售GMV
					"created_at": "2019-07-25 18:47:04", // 核销时间
					"operator_name": "校长" // 核销人员
				}
			],
			"statistic": {
				"verification_total": "4800.00", // 核销次数
				"order_amount": "3800.00", // 订单数
				"verification_amount_total": "1000.00", // 核销金额
				"debt_amount_total": "3300.00", // 核销账户金额
				"gift_amount_total": "-3300.00", // 赠送/返点账户抵扣
				"warehouse_amount_total": "-3300.00" // 小金库抵扣
			},
			"page": "1",
			"page_size": "20",
			"total": 14
		}

	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions, addReceOffItem}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ReceivablesOffList))

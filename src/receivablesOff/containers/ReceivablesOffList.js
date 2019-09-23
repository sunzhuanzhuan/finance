import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { Form, message, Table, Button } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getTotalWidth, downloadByATag } from '@/util';
import { getOffListQueryKeys, getOffQueryItems, getOffOptions, getReceOffCol, getOffListColIndex } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { editReceOffItem } from '../actions/receivableAdd';
import qs from 'qs';
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
		this.props.getSalerData();
		this.handleSearch({
			page: 1,
			page_size: 20
		});
	}
	dealSearchQuery = query => {
		Object.keys(query).forEach(item => {
			if(query[item] === '')
				delete query[item]
		})
	}
	handleSearch = searchQuery => {
		this.setState({searchQuery, loading: true});
		this.dealSearchQuery(searchQuery);
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
		// const submitObj = {
		// 	verification_id: '',
		// 	attach: '',
		// 	type: '',
		// 	remark: '',
		// 	is_record_sale_income: '',
		// 	is_decrease_company_gmv: '',
		// 	is_decrease_sale_gmv: '',
		// };

		this.props.editReceOffItem(values).then(() => {});
		this.handleCloseModal(modalType);
	}

	handleExportList = () => {
		const { searchQuery = {} } = this.state;

		downloadByATag(`/api/receivables/verification/exportVerification?${qs.stringify(searchQuery)}`);
	}

	getNumDisplay = data => {
		return data || data == 0 ? data : '-';
	}

	render() {
		const { 
			receivableOffList: { total = 0, page = 1, page_size = 20, list = [], statistic = {} }, 
			receMetaData = {}, salerData = [], history 
		} = this.props;
		const { 
			verification_ids_count = '-', order_ids_count = '-', verification_amount_total = '-', 
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
				queryOptions={Object.assign(getOffOptions, receMetaData, {salerData})} 
				queryItems={getOffQueryItems(getOffListQueryKeys)}
				handleSearch={this.handleSearch}
				actionKeyMap={{
					company: this.props.getGoldenCompanyId
				}}
			/>
			<div className='export-btn-wrapper'>
				<Button type='primary' icon='plus' onClick={() => {this.setState({addVisible: !addVisible})}}>新增核销</Button>
				<Button type='primary' icon='upload' onClick={this.handleExportList}>全部导出</Button>
			</div>
			<div className='total-info-wrapper'>
				<>核销次数：<span className='total-color'>{this.getNumDisplay(verification_ids_count)}</span>个</>
				<span className='total-margin'>订单数：<span className='total-color'>{this.getNumDisplay(order_ids_count)}</span></span>
				<>总核销金额：<span className='total-color'>{this.getNumDisplay(verification_amount_total)}</span></>
				<span className='total-margin'>赠点/返点账户抵扣：<span className='total-color'>{this.getNumDisplay(gift_amount_total)}</span></span>
				<>小金库抵扣：<span className='total-color'>{this.getNumDisplay(warehouse_amount_total)}</span></>
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
	const { receivableOff = {} } = state;
	const { receivableOffList = {}, receMetaData = {}, salerData = []} = receivableOff;

	return {
		receivableOffList,
		receMetaData,
		salerData
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions, editReceOffItem}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ReceivablesOffList))

import React from 'react';
import { Modal, Form, Table, Button } from 'antd';
import RateDetailCommon from './rateDetailCommon';
import { getRateDetailCol } from '../constants';
import apiDownload from '@/api/apiDownload';
import Interface from '../constants/Interface';

class rateDetailModal extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedVisible: false,
			selectedRows: undefined,
			loading: false
		}
	}

	getModalTitle = () => {
		const { profitStrategyId, profitStrategyName } = this.props;
		return (
			<div>
				<span>添加账号</span>
				<span className='modal-sub-title'>{`${profitStrategyId} ${profitStrategyName}`}</span>
			</div>
		)
	}

	handleSaveRateAccount = ()=> {
		const { selectedRows } = this.state;
		const { profitStrategyId, onCancel, refreshPage } = this.props;
		
		if(Array.isArray(selectedRows) && selectedRows.length) {
			const submitObj = {
				profitStrategyId,
				accountIds: selectedRows.map(item => item.accountId)
			}
			this.props.bindProfitStrategyAccount(submitObj).then(() => {
				this.setState({selectedRows: []});
				refreshPage()
				onCancel();
			})
		}
	}

	handleExportExcel = () => {
		const exportQuery = {...this.state.searchVal};
		delete exportQuery.pageNum;
		delete exportQuery.pageSize;
		apiDownload({
			url: Interface.exportBindedAccountList,
			method: 'POST',
			data: exportQuery,
		}, '账号详情信息.xlsx')
	}

	getAddWarnComp = () => {
		Modal.warning({
			className: 'add-warn-comp',
			title: <div>
				<span>当前查询的账号信息有已存在相关策略的账号，此列表不做此相关账号信息展示，查看详情请</span>
				<a onClick={this.handleExportExcel}>下载</a>
			</div>,
			okText: '确定'
		});
	}

	handleOperate = (type, value, isPageChange) => {
		switch(type) {
			case 'selectedChange':
				this.setState({selectedRows: value});
			return;
			case 'showSelected':
				this.setState({
					selectedVisible: true,
				});
				return;
			case 'search': 
				const { profitStrategyId } = this.props;
				const searchVal = {...value, profitStrategyId};
				this.setState({loading: true, searchVal});
				this.props.getAccountListToBind(searchVal).then((result = {}) => {
					const { data = {} } = result;
					const { isExist, isHavingBind } = data;
					if(isExist == 1 && isHavingBind == 1) {
						this.getAddWarnComp();
					}
					if(!isPageChange) {
						this.setState({ 
							selectedRows: [],
						});
					}
				}).finally(() => {
					this.setState({loading: false})
				});
				return;
			default:
				return;
		}
	}

	handleCloseSelectedModal = () => {
		this.setState({
			selectedVisible: false
		})
	}

	handleDeselected = (accountId) => {
		const { selectedRows } = this.state;
		const deselectedRows = selectedRows.filter(item => item.accountId !== accountId);
		this.setState({
			selectedRows: deselectedRows
		})
	}

	handleDeselectAll = () => {
		this.setState({
			selectedRows: []
		})
	}

	getSeledtedComp = () => {
		const { selectedRows } = this.state;
		return (
			<div>
				<Button className='clear-btn' type='primary' onClick={this.handleDeselectAll}>清空已选</Button>
				<Table 
					rowKey='accountId' 
					columns={getRateDetailCol('selectedPage', this.handleDeselected)} 
					dataSource={selectedRows} 
					bordered 
					pagination={false} 
				/>
			</div>
		)
	}

	render() {
		const { type, onCancel, visible } = this.props;
		const { loading, selectedVisible, selectedRows } = this.state;

		return [
			<Modal
				key='addModal'
				width={950}
				maskClosable={false}
				visible={visible}
				destroyOnClose={true}
				title={this.getModalTitle(type)}
				onCancel={onCancel}
				onOk={() => this.handleSaveRateAccount(type)}
				wrapClassName='rate-detail-modal'
			>
				<RateDetailCommon 
					{...this.props}
					loading={loading}
					type='addPage'
					selectedRows={selectedRows}
					handleOperate={this.handleOperate}
				/>
			</Modal>,
			<Modal
				key='selectedModal'
				width={950}
				maskClosable={false}
				visible={selectedVisible}
				destroyOnClose={true}
				title='查看已选'
				onCancel={this.handleCloseSelectedModal}
				wrapClassName='rate-selected-modal'
				footer={null}
			>
				{
					this.getSeledtedComp()
				}
			</Modal>
		]
	}
}

export default Form.create()(rateDetailModal)

import React from 'react';
import { Modal, Form, Table, Button } from 'antd';
import RateDetailCommon from './rateDetailCommon';
import { getRateDetailCol } from '../constants';

class rateDetailModal extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedVisible: false,
			selectedRows: undefined
		}
	}

	getModalTitle = () => {
		return (
			<div>
				<span>添加账号</span>
				<span className='modal-sub-title'>001策略a</span>
			</div>
		)
	}

	handleSaveRateAccount = ()=> {

	}

	handleOperate = (type, value) => {
		switch(type) {
			case 'showSelected':
				this.setState({
					selectedVisible: true,
					selectedRows: value
				});
				return;
			case 'search': 
				const { profitStrategyId } = this.props;
				const searchVal = {...value, profitStrategyId}
				this.props.getAccountListToBind(searchVal);
				return;
			case 'delAccount':
				return;
			default:
				return;
		}
	}

	handleCloseSelectedModal = () => {
		this.setState({
			selectedVisible: false,
			selectedRows: undefined
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
		const { selectedVisible, selectedRows } = this.state;

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

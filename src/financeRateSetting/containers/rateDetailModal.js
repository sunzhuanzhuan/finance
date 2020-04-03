import React from 'react';
import { Modal, Form, Table, Button } from 'antd';
import RateDetailCommon from './rateDetailCommon';
import { getRateDetailCol } from '../constants';

class rateDetailModal extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedVisible: false
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

	handleOperate = (type) => {
		switch(type) {
			case 'showSelected':
				this.setState({
					selectedVisible: true
				});
				return;
			case 'search': 
				return;
			case 'reset':
				return;
			case 'delAccount':
				return;
			case 'clearSelected':
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

	handleDelSelected = () => {

	}

	getSeledtedComp = () => {
		return (
			<div>
				<Button className='clear-btn' type='primary' onClick={this.handleClearSelected}>清空已选</Button>
				<Table 
					rowKey='zhnghaoid' 
					columns={getRateDetailCol()} 
					dataSource={[]} 
					bordered 
					pagination={false} 
				/>
			</div>
		)
	}

	render() {
		const { type, onCancel, visible } = this.props;
		const { selectedVisible } = this.state;

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
					handleOperate={this.handleOperate}
					type='addPage'
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

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Modal, Table, InputNumber, Icon, Spin, Empty, message, Statistic, Button } from 'antd'
import './financeRateSetting.less'
import { getRateSettingCol } from '../constants';
import RateModal from './rateModal';

class FinanceRateSetting extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			modalType: null
		}
	}

	handleOperate = (type) => {
		switch (type) {
			case 'add': 
			case 'edit': 
				this.setState({
					modalType: type,
				})
				return;
			case 'delete': 

				return;
			case 'detail': 

				return;
			case 'export': 

				return;
			case 'clear': 
				return;
			default: return;
		}
	}

	handleCloseModal = () => {
		this.setState({
			modalType: null
		})
	}

	handleSaveOperation = (type) => {
		if(type === 'add') {
			console.log(type)
		}else if(type === 'edit') {
			console.log(type)
		}
	}

	render() {
		const { loading, modalType } = this.state;
		const pagination = {
			total: parseInt(1),
			current: parseInt(1),
			pageSize: parseInt(10),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		const dataSource = [
			{
				celueid: '策略ID',
				celuename: '策略名称',
				zhanghaolirunlv: '[13500, 13500] 阴价利润率 30.33%，阳价利润率 30.33%',
				beizhu: '备注',
			}
		]
		return (
			<div className='finance-rate-wrapper'>
				<h2>账号特殊利润率设置</h2>
				<Button type='primary' className='rate-add-btn' onClick={() => this.handleOperate('add')}>新增策略</Button>
				<Table 
					rowKey='celueid' 
					columns={getRateSettingCol(this.handleOperate)} 
					dataSource={dataSource} 
					bordered 
					pagination={pagination} 
					loading={loading}
				/>
				<RateModal 
					type={modalType}
					onCancel={this.handleCloseModal}
					handleSaveOperation={this.handleSaveOperation}
				/>
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { financeParamsReducer } = state;
	const { financeParamsVal, financeParamHistory } = financeParamsReducer;
	return {
		financeParamsVal,
		financeParamHistory
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(FinanceRateSetting)

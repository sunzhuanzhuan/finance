import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import './financeRateSetting.less'
import RateDetailCommon from './rateDetailCommon';
import RateDetailModal from './rateDetailModal';

class financeRateDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false
		}
	}

	getTotalMsg = (accountNum, mainNum, isClear) => {
		return (
			<div>
				<span>{`账号数：${accountNum}个`}</span>
				<span className='total-info-text'>{`主账号数${mainNum}个`}</span>
				{
					isClear ? <a>清空</a> : null
				}
			</div>
		)
	}

	handleOperate = (type) => {
		switch (type) {
			case 'addAccount':
				this.setState({
					visible: true
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

	handleCancelModal = () => {
		this.setState({
			visible: false
		})
	}

	render() {
		const { visible } = this.state;

		return (
			<div>
				<RateDetailCommon 
					{...this.props}
					handleOperate={this.handleOperate} 
					type='detailPage'
				/>
				<RateDetailModal 
					visible={visible}
					onCancel={this.handleCancelModal}
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
export default connect(mapStateToProps, mapDispatchToProps)(financeRateDetail)

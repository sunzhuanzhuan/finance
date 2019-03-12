import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import { message, Button } from 'antd'
import { WBYDetailTable } from "wbyui"
import { prePayDetailColumns, datePayDetailColumns } from '../constants'
import './trinityPay.less'
import qs from 'qs'


class Detail extends React.Component {
	constructor() {
		super();
		this.state = {
			type: undefined
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.setState({ type: search.type });
		this.queryData({ payment_slip_id: search.payment_slip_id });
	}
	queryData = (obj, func) => {
		const { type } = qs.parse(this.props.location.search.substring(1));
		this.setState({ loading: true });
		const actionName = type == 'prePay' ? 'getPrePayDetail' : type == 'datePay' ? 'getDatePayDetail' : undefined;
		return this.props.actions[actionName]({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '详情加载失败，请重试！');
		})
	}
	render() {
		const { type } = this.state;
		const { prePayDetail, datePayDetail } = this.props;
		const detailColumns = type == 'prePay' ? prePayDetailColumns : type == 'datePay' ? datePayDetailColumns : [];
		const dataSource = type == 'prePay' ? prePayDetail : type == 'datePay' ? datePayDetail : {};
		return <div className='detail-container'>
			<fieldset className='fieldset_css'>
				<legend>打款单信息</legend>
				<WBYDetailTable className='vertical-table' columns={detailColumns} dataSource={dataSource} columnCount={4} />
				<div style={{ textAlign: 'center', paddingTop: '20px' }}>
					<Button type='primary' size='large' onClick={() => {
						this.props.history.goBack()
					}}>确定</Button>
				</div>
			</fieldset>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		prePayDetail: state.trinityPay.prePayDetail,
		datePayDetail: state.trinityPay.datePayDetail,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail)

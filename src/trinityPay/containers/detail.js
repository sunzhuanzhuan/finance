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
		this.queryData({ id: search.id });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getPrePayData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '详情失败，请重试！');
		})
	}
	render() {
		const { type } = this.state;
		const dataSoure = {
			"a": 1,
			"b": 2,
			"c": 1,
			"d": 2,
			"e": 1,
			"f": 2,
			"g": 1,
			"h": 2,
			"i": 1,
			"j": 2,
			"k": 1,
			"l": 2,
			"m": 1,
			"n": 2,
			"o": 1,
			"p": 2,
			"q": 1,
			"r": 2,
			"s": 1,
			"t": 2,
			"u": 1,
			"v": 2,
			"w": 1,
			"x": 2,
			"y": 1,
			"z": 2
		};
		const detailColumns = type == 'prePay' ? prePayDetailColumns : type == 'datePay' ? datePayDetailColumns : [];
		return <div className='detail-container'>
			<fieldset className='fieldset_css'>
				<legend>打款单信息</legend>
				<WBYDetailTable className='vertical-table' columns={detailColumns} dataSource={dataSoure} columnCount={4} />
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
		prePayData: state.trinityPay.prePayData,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail)

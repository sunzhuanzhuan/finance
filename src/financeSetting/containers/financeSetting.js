import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as settingAction from "../actions";
import { message, Button } from 'antd'
import Item from '../components/Item'
import './financeSetting.less'
import qs from 'qs'

class Setting extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.postTrinityProfitRateAll({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '平台配置获取失败，请重试！');
		})
	}
	render() {
		const { trinityProfitRateAll } = this.props;
		return <div className='setting-container'>
			<div>
				<Button type='primary'>新增平台</Button>
				<span className='left-gap' style={{ color: '#999999' }}>说明：此处设置的是微播易三方订单，当报价模式为利润率时，计算账号报价阳价时的利润率</span>
			</div>
			{trinityProfitRateAll.map(item => (<Item key={item.platformId} data={item} />))}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		trinityProfitRateAll: state.trinityProfitRate.trinityProfitRateAll,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...settingAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Setting)

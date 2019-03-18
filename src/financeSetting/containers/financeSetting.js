import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// import * as settingAction from "../actions";
// import SearForm from '../../components/SearchForm'
// import Statistics from '../components/Statistics'
// import DateModal from '../components/modal'
import { Table, message, Button } from 'antd'
import Item from '../components/Item'
// import { datePaySearchFunc } from '../constants/search'
// import { datePayFunc } from '../constants'
import './financeSetting.less'
import qs from 'qs'
const img = require('../components/weibo.png');
class Setting extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	componentDidMount() {
		// const search = qs.parse(this.props.location.search.substring(1));
		// this.props.actions.getDatePaySearchItem().then(() => {
		// 	this.setState({ pullReady: true });
		// }).catch(({ errorMsg }) => {
		// 	message.error(errorMsg || '下拉项加载失败，请重试！');
		// })
		// this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		// this.setState({ loading: true });
		// return this.props.actions.getDatePayData({ ...obj }).then(() => {
		// 	if (func && Object.prototype.toString.call(func) === '[object Function]') {
		// 		func();
		// 	}
		// 	this.setState({ loading: false })
		// }).catch(({ errorMsg }) => {
		// 	this.setState({ loading: false });
		// 	message.error(errorMsg || '列表加载失败，请重试！');
		// })
	}
	render() {
		const data = [{
			id: 1,
			icon: img,
			title: '新浪微博',
			data: [{
				min: 0,
				max: 100,
				tax: 20
			}, {
				min: 0,
				max: 100,
				tax: 20
			},]
		},
		{
			id: 2,
			icon: img,
			title: '新浪微博',
			data: [{
				min: 0,
				max: 100,
				tax: 20
			}, {
				min: 0,
				max: 100,
				tax: 20
			},]
		},
		{
			id: 3,
			icon: img,
			title: '新浪微博',
			data: [{
				min: 0,
				max: 100,
				tax: 20
			}, {
				min: 0,
				max: 100,
				tax: 20
			},]
		},
		];
		return <div className='setting-container'>
			<div>
				<Button type='primary'>新增平台</Button>
				<span className='left-gap' style={{ color: '#999999' }}>说明：此处设置的是微播易三方订单，当报价模式为利润率时，计算账号报价阳价时的利润率</span>
			</div>
			{data.map(item => (<Item key={item.id} data={item} />))}
		</div>
	}
}

export default Setting;
// const mapStateToProps = (state) => {
// 	return {
		// datePayData: state.trinityPay.datePayData,
// 	}
// }
// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators({ ...settingAction }, dispatch)
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Setting)

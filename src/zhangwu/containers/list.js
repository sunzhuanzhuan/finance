import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { Link, browserHistory } from 'react-router'
import { Link } from 'react-router-dom'
import qs from 'qs'
import PropTypes from 'prop-types'
import * as zhangActions from '../actions/index';
import Query from'../components/query'
import { zhangListFunc } from '../constants/column';
import { Table, Pagination } from "antd";
import './list.less'
import ZhangWuTable from '../components/table'


class List extends Component {
	constructor(props) {
		super(props)

	}
	handleNewModal=({id})=>{
		// console.log(record)
		this.props.history.push({
			pathname: '/finance/zhangwu/detail',
			search: `?${qs.stringify({ id: id})}`,
		});
	}
	render(){
		let paginationObj = {
			// onChange: (current) => {
			// 	queryAction({ page: current, ...search.keys });
			// },
			total: parseInt(4),
			current: parseInt(1),
			pageSize: parseInt(2),
			showQuickJumper: true,
		};
		const columns = zhangListFunc(this.handleNewModal);
		const dataTable = [{name:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈',id:2}]
		return<div>
		<fieldset className='fieldset_css'>
			<legend>订单账务详情</legend>
			<Query/>
			<div className='top-gap'>
				<ZhangWuTable
					columns={columns}
					dataTable={dataTable}
					pagination={paginationObj}
				></ZhangWuTable>
			</div>
		</fieldset>
		
	</div>
	}
}

const mapStateToProps = (state) => {
	return {
		studioMetadata: state.studioManage.studioMetadata,
		allocationData: state.studioManage.allocationData,
		studioNameCheck: state.studioManage.studioNameCheck,
		allocationStatData: state.studioManage.allocationStatData,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...zhangActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List)

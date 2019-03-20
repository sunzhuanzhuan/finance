import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

import * as zhangActions from '../actions/index';


import { Table } from "antd";
// import './list.less'

class List extends Component {
	constructor(props) {
		super(props)
		
	}
	state={
		page_size:20
	}
	handleNewModal=({id})=>{
		// console.log(record)
		this.props.history.push({
			pathname: '/finance/zhangwu/detail',
			search: `?${qs.stringify({ id: id})}`,
		});
	}
	render(){
		let {columns,loading}=this.props;
		const search = qs.parse(this.props.location.search.substring(1));
		const { accountList: { list = [], page, total,page_size },filterParams}=this.props;
		
		let paginationObj = {
			onChange: (current) => {
				// let obj = { ...search.key, page: current, page_size  ,...filterParams}
				this.props.queryData({ ...search.key, page: current, page_size, ...filterParams });
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			
		};
		return <div className='top-gap'>
				{list.length?<Table
					loading={loading}
					columns={columns}
					scroll={{ x: 1600 }}
					dataSource={list}
					rowKey={(record)=>record.account_id}
					total={50}
					current={1}
					pagination={list.length ? paginationObj : false}
				></Table>:null}
			</div>
	}
}

const mapStateToProps = () => {
	return {
		
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...zhangActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List))

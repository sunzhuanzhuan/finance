import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import Scolltable from '../../components/Scolltable'

import * as zhangActions from '../actions/index';

import { Table } from "antd";
import { getTotalWidth } from '@/util'
// import './list.less'

class List extends Component {
	constructor(props) {
		super(props)

	}
	state = {
		page_size: 20
	}
	handleNewModal = ({ id }) => {
		// console.log(record)
		this.props.history.push({
			pathname: '/finance/zhangwu/detail',
			search: `?${qs.stringify({ id: id })}`,
		});
	}
	render() {
		let { columns, loading, paginationObj, list } = this.props;
		const search = qs.parse(this.props.location.search.substring(1));
		const totalWidth = getTotalWidth(columns);
		return <div className='top-gap'>
			<Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth}>
				<Table
					className='zhangwu-table'
					loading={loading}
					columns={columns}
					scroll={{ x: totalWidth }}
					dataSource={list}
					rowKey={(record) => record.account_id}
					pagination={paginationObj}
				></Table>
			</Scolltable>
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

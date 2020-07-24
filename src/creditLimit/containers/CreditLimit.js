import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './creditLimit.less';
import { Table, Button, Alert, Tabs, message, Icon } from "antd";
import * as creditLimitActions from "../actions";
import { getTotalWidth, events } from '@/util';
import { Scolltable } from '@/components';
import { getCreditCol } from '../constants';

const { TabPane } = Tabs;

class CreditLimit extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: '3',
			leftWidth: 40, 
			searchQuery: {page: 1, page_size: 20}
		};
		events.on('message', this.collapsedListener); 
	}

	collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
	}

	componentDidMount() {
		const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;
		this.setState({leftWidth});
	}

	render() {
		const { creditLimitListInfo = {} } = this.props;
		const { total, page, page_size, list } = creditLimitListInfo;
		const { leftWidth, loading, searchQuery } = this.state;
		const totalWidth = getTotalWidth(getCreditCol());
		const showTotal = (total) => {
			return `共 ${total} 条数据`;
		};
		const paginationObj = {
			onChange: (page) => {
				Object.assign(searchQuery, {page});
				this.handleSearch(searchQuery);
			},
			onShowSizeChange: (_, page_size) => {
				Object.assign(searchQuery, {page_size, page: 1});
				this.handleSearch(searchQuery);
			},
			total: parseInt(total),
			showTotal,
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return (
			<div className='credit_limit_wrapper'>
				<Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth + leftWidth}>
					<Table
					className='credit_limit_table'
					rowKey='id'
					columns={[getCreditCol()]}
					dataSource={list}
					loading={loading}
					bordered
					pagination={paginationObj}
					scroll={{ x: totalWidth }}
				/>
				</Scolltable>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { creditLimitReducer = {} } = state;
	const { creditLimitListInfo = {} } = creditLimitReducer;
	return {
		creditLimitListInfo: {
			total: 100,
			page: 1,
			page_size: 20,
			list: [

			]
		}
	}
}
const mapDispatchToProps = dispatch => (
		bindActionCreators({...creditLimitActions}, dispatch)
	);
export default connect(mapStateToProps, mapDispatchToProps)(CreditLimit)

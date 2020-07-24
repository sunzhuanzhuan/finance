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
			leftWidth: 40
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
		const { leftWidth, loading } = this.state;
		const totalWidth = getTotalWidth(getCreditCol());
		return (
			<div className='credit_limit_wrapper'>
				<Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth + leftWidth}>
					<Table
					className='credit_limit_table'
					rowKey='id'
					columns={getCreditCol()}
					dataSource={[]}
					loading={loading}
					bordered
					pagination={null}
					scroll={{ x: totalWidth }}
				/>
				</Scolltable>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { a } = state;

	return {
		a: 2323
	}
}
const mapDispatchToProps = dispatch => (
		bindActionCreators({...creditLimitActions}, dispatch)
	);
export default connect(mapStateToProps, mapDispatchToProps)(CreditLimit)

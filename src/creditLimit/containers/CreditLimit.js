import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './creditLimit.less';
import { Table, Button, Alert, Tabs, message, Icon } from "antd";
import * as creditLimitActions from "../actions";
import { getTotalWidth, downloadByATag } from '@/util';
import { Scolltable } from '@/components';

const { TabPane } = Tabs;

class CreditLimit extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: '3',
		};
	}

	componentDidMount() {
		
	}

	render() {

		return (
			<div>sososo</div>
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

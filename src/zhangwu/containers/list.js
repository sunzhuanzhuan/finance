import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { Link, browserHistory } from 'react-router'
import { Link } from 'react-router-dom'
import qs from 'qs'
import PropTypes from 'prop-types'
import * as zhangActions from '../actions/index';
import Query from'../components/query'
import { zhangListFunc } from '../constants/column``'
import './list.less'

class List extends Component {
	constructor(props) {
		super(props)

	}
	render(){
		return<div>
		<fieldset className='fieldset_css'>
			<legend>订单账务详情</legend>
			<Query/>
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

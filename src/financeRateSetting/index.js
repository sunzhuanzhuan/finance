import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const Setting = lazyLoadComponent(() => import("./containers/financeRateSetting"))

class FinanceRateSetting extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/finance/financeRateSetting" component={Setting} />
			</div>
		);
	}
}

export default FinanceRateSetting;

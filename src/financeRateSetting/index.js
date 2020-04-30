import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const Setting = lazyLoadComponent(() => import("./containers/financeRateSetting"))
const Detail = lazyLoadComponent(() => import("./containers/financeRateDetail"))

class FinanceRateSetting extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/finance/financeRateSetting" component={Setting} />
				<Route exact path="/finance/financeRateSetting/detail" component={Detail} />
			</div>
		);
	}
}

export default FinanceRateSetting;

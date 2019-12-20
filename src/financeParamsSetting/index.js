import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const Setting = lazyLoadComponent(() => import("./containers/financeParamsSetting"))

class FinanceParamsSetting extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/finance/financeParamsSetting" component={Setting} />
			</div>
		);
	}
}

export default FinanceParamsSetting;

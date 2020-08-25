import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const CreditLimitComp = lazyLoadComponent(() => import("./containers/CreditLimit"))

class CreditLimit extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/finance/creditLimit" component={CreditLimitComp} />
			</div>
		);
	}
}

export default CreditLimit;

import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const List = lazyLoadComponent(() => import("./containers/ReceivablesOffList"))
const Add = lazyLoadComponent(() => import("./containers/ReceivablesOffAdd"))
const Detail = lazyLoadComponent(() => import("./containers/ReceivablesOffDetail"))

class ReceivableOff extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/finance/receivableoff/list" component={List} />
				<Route exact path="/finance/receivableoff/add" component={Add} />
				<Route exact path="/finance/receivableoff/detail" component={Detail} />
			</div>
		);
	}
}

export default ReceivableOff;

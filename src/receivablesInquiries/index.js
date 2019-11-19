import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const List = lazyLoadComponent(() => import("./containers/Receivableslist"))
const Detail = lazyLoadComponent(() => import("./containers/ReceivablesDetail"))

class Receivable extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/finance/receivable/list" component={List} />
				<Route exact path="/finance/receivable/detail" component={Detail} />
			</div>
		);
	}
}

export default Receivable;

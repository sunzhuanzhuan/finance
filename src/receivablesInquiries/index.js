import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const List = lazyLoadComponent(() => import("./containers/Receivableslist"))

class Receivable extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/finance/receivable/list" component={List} />
			</div>
		);
	}
}

export default Receivable;

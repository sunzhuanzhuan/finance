import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { Router, Route, IndexRedirect } from 'react-router';
import store, { history } from './store';
import "babel-polyfill";
//登录login
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './index.less'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';
import numeral from 'numeral';
import 'numeral/locales/chs';
//顶级根目录页面
import App from './containers/App'
import Detail from './companyDetail/index'
import Invoice from './invoice/index'
import ExtractCoin from './extractCoin/index'
import SaleIncomeRoute from './saleIncome/index'
import StudioManage from './studioManage'
//404错误页面
import ErrorIndex from './containers/error'
import Login from './login/container/Login'

numeral.locale('chs')
moment.locale('zh-cn');
render(
	<LocaleProvider locale={zhCN}>
		<Provider store={store}>
			<HashRouter>
				<Switch>
					<Route exact path='/' render={() => (<Redirect to="/loginSuccess" />)} />
					<Route path='/login' component={Login} />
					<Route path='/remitOrder/paymentOrder' component={ExtractCoin} />
					<App history={history}>
						<Switch>
							<Route path='/detail' component={Detail} />
							<Route path='/freeze' component={Detail} />
							<Route path='/golden' component={Detail} />
							<Route path='/invoice' component={Invoice} />
							<Route path='/contractManage' component={ExtractCoin} />
							<Route path='/extractManage' component={ExtractCoin} />
							<Route path='/remitOrder' component={ExtractCoin} />
							<Route path='/saleIncome' component={SaleIncomeRoute} />
							<Route path='/studioManage' component={StudioManage} />
							<Route path='/error' component={ErrorIndex} />
							<Redirect to={'/error'} />
						</Switch>
					</App>
				</Switch>
			</HashRouter>
		</Provider></LocaleProvider >,
	document.getElementById('root')
)

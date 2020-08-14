import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './creditLimit.less';
import { Table, Tabs, Alert, Modal, message } from "antd";
import qs from 'qs';
import moment from 'moment';
import * as creditLimitActions from "../actions";
import { getGoldenCompanyId } from '@/companyDetail/actions/goldenApply';
import { getProjectData, getBrandData, getRequirementWithoutId } from '@/receivablesOff/actions/receivableOff';
import { getCrediLimitListInfo, clearCreditLimitMessage } from '../actions/creditTabListAction';
import { getTotalWidth, events } from '@/util';
import { Scolltable } from '@/components';
import apiDownload from '@/api/apiDownload';
import { getTabOptions, getCreditQueryItems, getCreditCol } from '../constants';
import CreditLimitQuery from './CreditLimitQuery';

const { TabPane } = Tabs;

class CreditLimit extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: '3',
			leftWidth: 40, 
		};
		events.on('message', this.collapsedListener); 
	}

	collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
	}

	componentDidMount() {
		const { activeKey: productLine } = this.state;
		this.props.getCreditQuerySalerData();
		this.props.getCreditQueryRegionList();
		this.getCreditListData({page: 1, pageSize: 20, productLine, orderSettleTimeStart: '2020-08-24'});
		const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;
		this.setState({leftWidth});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {creditLimitListInfo = {}} = nextProps;
		const { errorMsg } = creditLimitListInfo;
		if(errorMsg !== prevState.errorMsg) {
			return {
				errorMsg
			}
		}else {
			return null;
		}	
	}

	componentDidUpdate(_, prevState) {
		const { errorMsg } = this.state;
		if(errorMsg && errorMsg !== prevState.errorMsg) {
			message.error(errorMsg)
		}
	}

	getCreditListData = (searchQuery) => {
		this.setState({ loading: true });
		this.props.getCrediLimitListInfo(searchQuery).finally(() => {
			this.setState({ loading: false});
		});
	}

	handleChangeTab = activeKey => {
		const { creditLimitListInfo = {} } = this.props;
		this.props.clearCreditLimitMessage();
		if(!creditLimitListInfo[`creditTab-${activeKey}`]) {
			this.getCreditListData({page: 1, pageSize: 20, productLine: activeKey, orderSettleTimeStart: '2020-08-24'});
		}
		this.setState({ activeKey });
	}

	handleSearch = (searchQuery) => {
		const { activeKey } = this.state;
		this.setState({ [`searchQuery-${activeKey}`]: searchQuery });
		this.getCreditListData({...searchQuery, productLine: activeKey});
	}

	handleInfo = title => {
		Modal.info({
			title: <div dangerouslySetInnerHTML={{ __html: title }}></div>,
		});
	}
	
	handleExport = (searchQuery) => {
		const { activeKey: productLine } = this.state;
		this.props.getCreditExportInfo({...searchQuery, checkExport: 1, productLine}).then(() => {
			const timeStamp = moment().format('YYYYMMDD');
			apiDownload({
				url: '/finance/creditapply/useDetailExport?' + qs.stringify({...searchQuery, productLine}),
				method: 'GET',
			}, `信用额度使用明细_${timeStamp}.csv`);
		}).catch(result => {
			if(result.code === 996) {
				this.handleInfo(result.errorMsg);
			}else {
				message.error(result.errorMsg)
			}
		})
	}

	getTabPaneContent = (key) => {
		const { creditLimitListInfo = {}, creditSalerData = [], creditRegionData = [] } = this.props;
		const { leftWidth, loading, activeKey } = this.state;
		const tabListInfo = creditLimitListInfo[`creditTab-${activeKey}`] || {};
		const { list = [], pagination = {}, statistics = {} } = tabListInfo;
		const { total, page, pageSize } = pagination;
		const { orderTotal = '-', creditAmountUsed = '-' } = statistics;
		const totalWidth = getTotalWidth(getCreditCol());
		const searchQuery = this.state[`searchQuery-${activeKey}`] || { page: 1, pageSize: 20 };
		const showTotal = (total) => {
			return `共 ${total} 条数据`;
		};
		const paginationObj = {
			onChange: (page) => {
				Object.assign(searchQuery, {page});
				this.handleSearch(searchQuery);
			},
			onShowSizeChange: (_, pageSize) => {
				Object.assign(searchQuery, {pageSize, page: 1});
				this.handleSearch(searchQuery);
			},
			total: parseInt(total),
			showTotal,
			current: parseInt(page),
			pageSize: parseInt(pageSize),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		const getTotalInfo = (
			<div>
				<span className='credit_info_item'>{`订单/活动：${orderTotal}`}</span>
				<span className='credit_info_item'>{`信用额度使用总计：${creditAmountUsed}`}</span>
			</div>
		);
		const wrapperClass = `moreThanOneTable${key}`;
		return <div className={wrapperClass}>
			<CreditLimitQuery
				key='search'
				showExport={true}
				className={'credit_limit_wrapper'}
				queryOptions={{
					salerData: creditSalerData, 
					regionList: creditRegionData,
				}}
				queryItems={getCreditQueryItems()}
				handleSearch={this.handleSearch}
				handleExport={this.handleExport}
				actionKeyMap={{
					sale: this.props.getCreditQuerySalerData,
					company: this.props.getGoldenCompanyId,
					companyFull: this.props.getCompanyFullNameSelectData,
					poList: this.props.getPoListSelectData,
					requirement: this.props.getRequirementWithoutId,
					project: this.props.getProjectData,
					brand: this.props.getBrandData
				}}
			/>
			<Alert key='total' className='credit_total_info' message={getTotalInfo} type="info" showIcon />
			<Scolltable 
				isMoreThanOne key='table' 
				wrapperClass={wrapperClass}
				scrollClassName={`.${wrapperClass} .ant-table-body`}
				widthScroll={totalWidth + leftWidth}
			>
				<Table
					className='credit_limit_table'
					rowKey='number'
					columns={getCreditCol(activeKey)}
					dataSource={list}
					loading={loading}
					bordered
					pagination={paginationObj}
					scroll={{ x: totalWidth }}
				/>
			</Scolltable>
		</div>
	}

	getTabPaneComp = () => {
		return getTabOptions.map(item => {
			const { tab, key } = item;
			return (
				<TabPane tab={tab} key={key}>
					{
						this.getTabPaneContent(key)
					}
				</TabPane>
			)
		})
	}

	render() {
		const { activeKey } = this.state;
		
		return (
			<Tabs className='credit_limit_wrapper' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp()
				}
			</Tabs>
		)
	}
}

const mapStateToProps = (state) => {
	const { creditLimitReducer = {} } = state;
	const { creditLimitListInfo = {}, creditSalerData = [], creditRegionData = [] } = creditLimitReducer;
	return {
		creditLimitListInfo,
		creditSalerData, 
		creditRegionData
	}
}
const mapDispatchToProps = dispatch => (
		bindActionCreators({
			...creditLimitActions, 
			getCrediLimitListInfo, 
			clearCreditLimitMessage,
			getGoldenCompanyId,
			getProjectData, getBrandData, getRequirementWithoutId
		}, dispatch)
	);
export default connect(mapStateToProps, mapDispatchToProps)(CreditLimit)

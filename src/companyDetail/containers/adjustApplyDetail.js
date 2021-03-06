import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as goldenActions from "../actions/goldenApply";
import { Button, Row, Modal, message, Input, Icon, Tabs } from "antd";
import ListQuery from '../components/addAdjustApply/listQuery';
import ApplyTable from '../components/addAdjustApply/applyTable';
import ApplyModal from '../components/addAdjustApply/applyModal';
import { adjustApplyDetailFunc } from "../constants";
import "./golden.less";
import { getApplyDetailList } from '../actions/getApplyList';
import qs from 'qs';
import difference from 'lodash/difference';
import { getTotalWidth } from '@/util';
const { TextArea } = Input;
const { TabPane } = Tabs;

class AdjustApplyDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			tipVisible: false,
			rejectVisible: false,
			loading: false,
			curSelectRowKeys: [],
			curSelectRows: [],
			rowsMap: {},
			activeKey: 'allOptions',
			applyId: ''
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { getGoldenMetadata, getPlatformIcon } = this.props.actions;
		getGoldenMetadata();
		getPlatformIcon();
		this.queryAllStatusData({ page: 1, ...search.keys });
		this.setState({applyId: search.readjust_application_id || ''})
	}
	queryAllStatusData = query => {
		const { actions: {getApplyDetailList} } = this.props;
		const { status = 'allOptions' } = query;
		this.setState({ loading: true, activeKey: status.toString() });

		return Promise.all([
			getApplyDetailList({...query, status: undefined}),
			getApplyDetailList({...query, status: '1'}),
			getApplyDetailList({...query, status: '2'}),
			getApplyDetailList({...query, status: '3'}),
		]).then(() => {
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getApplyDetailList({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleSelected = (selectedRowKeys, selectedRows) => {
		const { rowsMap } = this.state;
		let curKeys = [], rows = {};
		selectedRows.forEach(item => {
			curKeys.push(item.order_id);
			rows[item.order_id] = item;
		});

		let otherKeys = difference(selectedRowKeys, curKeys);
		otherKeys.forEach(item => rows[item] = rowsMap[item]);
		let rowsAry = Object.values(rows);
		this.setState({ curSelectRowKeys: selectedRowKeys, rowsMap: rows, curSelectRows: rowsAry });
	}
	handleClear = () => {
		this.setState({ curSelectRowKeys: [], curSelectRows: [], rowsMap: {} });
	}
	showReject = () => {
		this.setState({ rejectVisible: true });
	}
	handleReject = () => {
		const search = qs.parse(this.props.location.search.substring(1));
		const { authVisibleList = {} } = this.props; 
		const { postRejectByOrderIds } = this.props.actions;
		const { curSelectRowKeys } = this.state;
		const remark = document.querySelector('#reject-remark').value;
		const finance = authVisibleList['readjust.finance.audit'];
		const sale = authVisibleList['readjust.sale.audit'];
		const audit_type = finance ? 1 : sale ? 2 : undefined;
		const params = {
			order_ids: curSelectRowKeys.toString(),
			readjust_application_id: search.readjust_application_id,
			remark, audit_type
		};
		const hide = message.loading('操作中，请稍候...');
		postRejectByOrderIds({ ...params }).then(() => {
			this.queryData({ page: 1, ...search.keys }, () => {
				message.success('操作成功！');
				this.handleClear();
				hide();
				this.setState({ rejectVisible: false });
			})
		}).catch(({ errorMsg }) => {
			hide();
			message.error(errorMsg || '操作失败！');
		})
	}
	handleBack = () => {
		const { history } = this.props;
		history.go(-1);
	}
	handleChangeTab = activeKey => {
		this.setState({activeKey});
	}
	render() {
		const { goldenMetadata: { rel_order_status = [], quote_type = [], readjust_type = [] }, applyListReducer = {}, platformIconList = [], authVisibleList = {} } = this.props;
		const { loading, tipVisible, rejectVisible, curSelectRowKeys, curSelectRows, activeKey, applyId } = this.state;
		const flag = authVisibleList['readjust.finance.operation'];
		const costFlag = authVisibleList['readjust.finance.filter'];
		const allDetailList = applyListReducer[`applyDetailListStatusallOptions`] || {};
		const { total: allTotal } = allDetailList;
		const financeColArr = ['order_id', 'status', 'company_name', 'project_name', 'requirement_id_name', 'account_id_name', 'main_account_info', 'policy_id', 'quoted_price', 'discount_rate', 'published_price', 'order_bottom_price', 'commissioned_price', 'history_min_sell_price', 'history_rate', 'min_sell_price', 'quote_type', 'auditor_name', 'pass_time', 'remark'];
		const detailColArr = costFlag ? financeColArr : financeColArr.filter(item => item !== 'quoted_price' && item !== 'policy_id');
		const preFinanceArr = ['prev_id', 'statusPre', 'company_name', 'project_name', 'requirement_id_name', 'account_id_name', 'main_account_info', 'quoted_price', 'discount_rate', 'published_price', 'order_bottom_price', 'commissioned_price', 'pre_min_sell_price', 'preview_quote_type'];
		const dealPreArr = costFlag ? preFinanceArr : preFinanceArr.filter(item => item !== 'quoted_price');
		const adjustApplyDetail = flag ? 
			adjustApplyDetailFunc(rel_order_status, quote_type, readjust_type, platformIconList, flag)(detailColArr) 
			: adjustApplyDetailFunc(rel_order_status, quote_type, readjust_type, platformIconList, flag)(['order_id', 'status', 'company_name', 'project_name', 'requirement_id_name', 'account_id_name', 'commissioned_price_sale', 'history_min_sell_price', 'min_sell_price', 'auditor_name', 'pass_time', 'remark']);
		const adjustApplyPreview = adjustApplyDetailFunc(rel_order_status, quote_type, readjust_type, platformIconList, flag)(dealPreArr);
		const dealStatusArr = Array.isArray(rel_order_status) && rel_order_status.length  ? [{id: 'allOptions', display: '全部'}, ...rel_order_status] : [];
		const getTabPaneComp = () => {
			return dealStatusArr.map(item => {
				const { id, display } = item;
				const tabInfo = applyListReducer[`applyDetailListStatus${id}`] || {};
				const { list = [], page, total } = tabInfo;
				const tab = <div>
					<span key='name'>{display}</span>
					<span key='count'>{total}</span>
				</div>;
				const scrollWidth = getTotalWidth(adjustApplyDetail)
				return (
					<TabPane tab={tab} key={id}>
						<ApplyTable
							type={flag ? 'write_detail' : 'read_detail'}
							rowKey={'order_id'}
							columns={adjustApplyDetail}
							dataSource={list}
							loading={loading}
							queryAction={this.queryData}
							page={parseInt(page)}
							total={parseInt(total)}
							curSelectRowKeys={curSelectRowKeys}
							curSelectRows={curSelectRows}
							handleSelected={this.handleSelected}
							location={this.props.location}
							scroll={{ x: scrollWidth }}
						>
						</ApplyTable>
					</TabPane>
				)
			})
		};
		return <div className='add-adjust-apply'>
			<h2 className='add_adjust_header' onClick={this.handleBack}>
				<Icon type="arrow-left" />
				<span className='left-gap'>订单详情 - 申请编号{applyId}</span>
			</h2>
			<ListQuery
				type={'detail'}
				questAction={this.queryAllStatusData}
				location={this.props.location}
				history={this.props.history}
				rel_order_status={rel_order_status}
			></ListQuery>
			<Tabs className='adjust_tabs adjust_detail_tabs' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					getTabPaneComp()
				}
			</Tabs>
			{/* <div className='left-gap selected-refactor'>
				申请订单:<span className='red-font' style={{ marginLeft: '10px' }}>{total}</span>个
			</div> */}
			{flag ? <Row className='top-gap' style={{ textAlign: 'center' }}>
				<Button className='adjust-apply-btn' type='primary' onClick={() => {
					this.setState({ tipVisible: true });
				}} disabled={!curSelectRowKeys.length}>审核通过</Button>
				<Button className='adjust-apply-btn left-gap' type='primary' onClick={this.showReject} disabled={!curSelectRowKeys.length}>驳回</Button>
			</Row> : null}
			{tipVisible ? <ApplyModal
				type={'detail'}
				total={allTotal}
				visible={tipVisible}
				queryAction={this.queryData}
				curSelectRowKeys={curSelectRowKeys}
				curSelectRows={curSelectRows}
				handleClear={this.handleClear}
				onCancel={() => { this.setState({ tipVisible: false }) }}
				location={this.props.location}
				quoteType={curSelectRows.length > 0 ? curSelectRows[0].quote_type : null}
				flag={flag}
				columns={adjustApplyPreview}
			>
			</ApplyModal> : null}
			{rejectVisible ? <Modal title='订单调价处理' visible={rejectVisible}
				onOk={this.handleReject}
				onCancel={() => { this.setState({ rejectVisible: false }) }}
				maskClosable={false}
			>
				备注：<TextArea id='reject-remark' placeholder='非必输' style={{ width: 400, verticalAlign: 'top' }} autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
			</Modal> : null}
		</div>
	}
}

const mapStateToProps = (state) => {
	const { companyDetail = {}, authorizationsReducers = {} } = state;
	const { goldenMetadata, applyListReducer, platformIconList } = companyDetail;
	const { authVisibleList = {} } = authorizationsReducers;
	return {
		goldenMetadata,
		applyListReducer,
		platformIconList,
		authVisibleList
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions, getApplyDetailList }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AdjustApplyDetail);

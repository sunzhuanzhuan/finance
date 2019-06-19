import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as goldenActions from "../actions/goldenApply";
import { Modal, message, Table, Input } from "antd";
import AdjustQuery from '../components/adjustQuery';
import ApplyModal from '../components/addAdjustApply/applyModal'
import PrevModal from '../components/addAdjustApply/preModal'
import { adjustApplyFunc, adjustApplyListFunc, adjustApplyDetailFunc } from "../constants";
import "./golden.less";
import qs from 'qs';
const { TextArea } = Input;

class AdjustApply extends React.Component {
	constructor() {
		super();
		this.state = {
			page_size: 20,
			tipVisible: false,
			previewVisible: false,
			loading: false,
			flag: false,
			btnFlag: false,
			quoteType: '',
			readjust_application_id: ''
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { getCompanyDetailAuthorizations, getGoldenMetadata, getGoldenUserList } = this.props.actions;
		this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys });
		getCompanyDetailAuthorizations().then(() => {
			const { companyDetailAuthorizations } = this.props
			const flag = companyDetailAuthorizations[0].permissions['readjust.finance.operation'];
			const btnFlag = companyDetailAuthorizations[0].permissions['readjust.sale.operation'];
			this.setState({ flag, btnFlag });
		})
		getGoldenMetadata();
		getGoldenUserList();
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getApplicationList({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleJump = (id, company_id) => {
		this.props.history.push({
			pathname: '/finance/golden/adjustApplyDetail',
			search: `?${qs.stringify({ readjust_application_id: id, company_id, keys: { readjust_application_id: id, company_id, page_size: 50 } })}`,
		});
	}
	handleInput = () => {
		this.props.history.push('/finance/golden/adjustApplyInput')
	}
	handleExport = (readjust_application_id) => {
		this.props.actions.getExport({ readjust_application_id })
	}
	handleAction = (type, readjust_application_id, quote_type, company_id) => {
		if (type === 'pass') {
			this.setState({ tipVisible: true, quoteType: quote_type, readjust_application_id, company_id });
		} else if (type === 'reject') {
			this.showReject(readjust_application_id);
		}
	}
	showReject = (readjust_application_id) => {
		this.setState({ rejectVisible: true, readjust_application_id });
	}
	handleReject = (readjust_application_id) => {
		const search = qs.parse(this.props.location.search.substring(1));
		const { postRejectByReadjustId } = this.props.actions;
		const remark = document.querySelector('#reject-remark').value;
		const params = { readjust_application_id, remark };
		const hide = message.loading('操作中，请稍候...');
		postRejectByReadjustId({ ...params }).then(() => {
			this.queryData({ page: 1, page_size: this.state.page_size, ...search }, () => {
				message.success('操作成功！');
				hide();
				this.setState({ rejectVisible: false });
			})
		}).catch(({ errorMsg }) => {
			hide();
			message.error(errorMsg || '操作失败！');
		})
	}
	togglePreview = (boolean, func) => {
		this.setState({ previewVisible: boolean }, func);
	}
	render() {
		const { loading, tipVisible, previewVisible, page_size, flag, btnFlag, quoteType, readjust_application_id, rejectVisible, company_id } = this.state;
		const { applicationList: { list = [], page, total }, goldenMetadata, goldenMetadata: { application_status = [] }, goldenUserList, applicationDetail: { list: detailList = [] } } = this.props;
		const search = qs.parse(this.props.location.search.substring(1));
		const adjustApplyList = flag ? adjustApplyListFunc(application_status, this.handleJump, this.handleAction) : adjustApplyFunc(application_status, this.handleJump);
		let paginationObj = {
			onChange: (current) => {
				this.queryData({ ...search.keys, page: current, page_size });
				this.props.history.replace({
					pathname: this.props.location.pathname,
					search: `?${qs.stringify({ ...search, keys: { ...search.keys, page: current } })}`,
				});
			},
			onShowSizeChange: (current, pageSize) => {
				const curPage = Math.ceil(total / pageSize);
				this.setState({ page_size: pageSize });
				this.queryData({ ...search.keys, page: curPage, page_size: pageSize });
				this.props.history.replace({
					pathname: this.props.location.pathname,
					search: `?${qs.stringify({ ...search, keys: { ...search.keys, page: curPage, page_size: pageSize } })}`,
				});
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		const adjustApplyPreview = adjustApplyDetailFunc([])(['prev_id', 'company_name', 'project_name', 'requirement_id_name', 'platform_name', 'weibo_name', 'plan_manager_id', 'discount_rate', 'commissioned_price', 'quoted_price', 'pre_min_sell_price']);
		return <div className='adjust-apply'>
			<fieldset className='fieldset_css'>
				<legend>订单调价</legend>
				<AdjustQuery history={this.props.history}
					questAction={this.props.actions.getApplicationList}
					pageSize={page_size}
					location={this.props.location}
					flag={flag}
					btnFlag={btnFlag}
					userList={goldenUserList}
				>
					{goldenMetadata}
				</AdjustQuery>
				<Table className='top-gap'
					rowKey='id'
					columns={adjustApplyList}
					dataSource={list}
					loading={loading}
					bordered
					pagination={list.length ? paginationObj : false}
				></Table>
			</fieldset>
			{tipVisible ? <ApplyModal
				type={'pass'}
				flag={flag}
				isApplication={true}
				visible={tipVisible}
				queryAction={this.queryData}
				onCancel={() => { this.setState({ tipVisible: false }) }}
				location={this.props.location}
				page_size={page_size}
				quoteType={quoteType}
				readjustId={readjust_application_id}
				companyId={company_id}
				togglePreview={this.togglePreview}
			>
			</ApplyModal> : null}
			{previewVisible && <PrevModal visible={previewVisible}
				isApplication={true}
				readjustId={readjust_application_id}
				companyId={company_id}
				curSelectRows={detailList}
				onCancel={() => { this.setState({ previewVisible: false }) }}
				columns={adjustApplyPreview}
			/>}
			{rejectVisible ? <Modal title='订单调价处理' visible={rejectVisible}
				onOk={() => { this.handleReject(readjust_application_id) }}
				onCancel={() => { this.setState({ rejectVisible: false }) }}
				maskClosable={false}
			>
				备注：<TextArea id='reject-remark' placeholder='非必输' style={{ width: 400, verticalAlign: 'top' }} autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
			</Modal> : null}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		companyDetailAuthorizations: state.companyDetail.companyDetailAuthorizations,
		goldenMetadata: state.companyDetail.goldenMetadata,
		goldenUserList: state.companyDetail.goldenUserList,
		applicationList: state.companyDetail.applicationList,
		applicationDetail: state.companyDetail.applicationDetail,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AdjustApply)

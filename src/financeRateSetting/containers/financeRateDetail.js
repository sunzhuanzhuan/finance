import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import SearchSelect from '@/components/SearchSelect';
import { PageHeader, Alert, Input, Form, Modal, Table, InputNumber, Icon, Spin, Empty, message, Statistic, Button } from 'antd'
import './financeRateSetting.less'
import { getRateDetailCol } from '../constants';
const FormItem = Form.Item;

class financeRateDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false
		}
	}

	getTotalMsg = (accountNum, mainNum, isClear) => {
		return (
			<div>
				<span>{`账号数：${accountNum}个`}</span>
				<span className='total-info-text'>{`主账号数${mainNum}个`}</span>
				{
					isClear ? <a>清空</a> : null
				}
			</div>
		)
	}

	render() {
		const { form } = this.props;
		const { loading } = this.state;
		const { getFieldDecorator } = form;
		const accountNum = 10;
		const mainNum = 20;
		const pagination = {
			total: parseInt(1),
			current: parseInt(1),
			pageSize: parseInt(10),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};

		return (
			<div className='finance-rate-detail-wrapper'>
				<PageHeader
					className="site-page-header"
					onBack={() => this.props.history.goBack()}
					title="账号详情"
					subTitle="This is a subtitle"
				/>
				<Alert className='total-information' message={this.getTotalMsg(accountNum, mainNum)} type="info" showIcon />
				<Form className='detail-form'>
					<FormItem label='账号ID'>
						{getFieldDecorator('zhnghaoid')(
							<Input placeholder="请输入" />
						)}
					</FormItem>
					<FormItem label='账号名' >
						{getFieldDecorator('snsName', { initialValue: undefined })(
							<SearchSelect
								action={() => {}} 
								style={{ width: 200 }}
								placeholder='请选择'
								keyWord='snsName'
								dataToList={res => { return res.data }}
								item={['accountId', 'snsName']}
							/>
						)}
					</FormItem>
					<FormItem label='主账号' >
						{getFieldDecorator('identityName', { initialValue: undefined })(
							<SearchSelect
								action={() => {}} 
								style={{ width: 200 }}
								placeholder='请选择'
								keyWord='snsName'
								dataToList={res => { return res.data }}
								item={['accountId', 'snsName']}
							/>
						)}
					</FormItem>
					<FormItem>
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
					</FormItem>
				</Form>
				<div className='operate-box'>
					<Button type='primary'>添加账号</Button>
					<Button type='primary'>批量删除</Button>
				</div>
				<Alert className='select-total-info' message={this.getTotalMsg(accountNum, mainNum, true)} type="info" showIcon />
				<Table 
					rowKey='zhnghaoid' 
					columns={getRateDetailCol()} 
					dataSource={[]} 
					bordered 
					pagination={pagination} 
					loading={loading}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { financeParamsReducer } = state;
	const { financeParamsVal, financeParamHistory } = financeParamsReducer;
	return {
		financeParamsVal,
		financeParamHistory
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(financeRateDetail))

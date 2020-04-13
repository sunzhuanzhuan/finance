import React from 'react';
import SearchSelect from '@/components/SearchSelect';
import { PageHeader, Alert, Input, Form, Table, Button, message } from 'antd';
import './financeRateSetting.less';
import { connect } from 'react-redux';
import { getRateDetailCol } from '../constants';
import { shallowEqual } from '@/util';
const FormItem = Form.Item;

class rateDetailCommon extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			selectedRowKeys: [],
			selectedRows: [],
			pageInfo: {
				pageNum: 1,
				pageSize: 20
			}
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { selectedRows, loading } = nextProps;
		if(Array.isArray(selectedRows) && !shallowEqual(selectedRows, prevState.selectedRows)) {
			return {
				selectedRowKeys: selectedRows.map(item => item.accountId),
				selectedRows
			}
		}else if(!shallowEqual(loading, prevState.loading)) {
			return {
				loading
			}
		}else {
			return null
		}
	}

	getTotalMsg = (accountNum, mainNum, isClear) => {
		return (
			<div>
				<span>{`账号数：${accountNum}个`}</span>
				<span className='total-info-text'>{`主账号数${mainNum}个`}</span>
				{
					isClear ? <a onClick={() => this.onHandle('clearSelected')}>清空</a> : null
				}
			</div>
		)
	}

	getErrorTips = msg => {
		try {
			if (typeof message.destroy === 'function') {
				message.destroy();
			}
			message.error(msg || '操作失败！');
		}catch (error) {
			console.log(error);
		}
	};

	validateFieldsVal = (searchVal) => {
		const searchKeys = Object.keys(searchVal);
		let isOk = false;
		searchKeys.forEach(item => {
			if (Object.prototype.toString.call(searchVal[item]) === '[object Object]') {
				if (searchVal[item].label) {
					searchVal[item] = searchVal[item].key;
				}
			}
			if(searchVal[item])
				isOk = true;
		})
		return isOk;
	}

	handleSearch = (type, pageInfo) => {
		const { handleOperate, form } = this.props;
		const searchVal = form.getFieldsValue();
		const isValOk = this.validateFieldsVal(searchVal);
		if(isValOk) {
			this.setState({ 
				pageInfo, 
				selectedRowKeys: [],
				selectedRows: [],
			});
			handleOperate(type, {...searchVal, ...pageInfo});
		}else {
			this.getErrorTips('请输入搜索条件后查询')
		}
	}

	onHandle = (type, data) => {
		const { handleOperate, form } = this.props;
		switch (type) {
			case 'search':
				const pageInfo = {pageNum: 1,pageSize: 20};
				this.handleSearch(type, pageInfo);
				return;
			case 'reset':
				form.resetFields();
				return;
			case 'selectedChange':
				handleOperate(type, data);
				return;
			case 'clearSelected':
				this.setState({
					selectedRowKeys: [],
					selectedRows: []
				});
				handleOperate('selectedChange', []);
				return ;
			case 'showSelected':
				handleOperate(type);
				return;
			case 'delAccount': 
				handleOperate(type, data);
				return;
			case 'delMulAccount':
				handleOperate(type);
				return;
			case 'addAccount':
				handleOperate(type);
				return;

		}
	}

	getSelectedCount = () => {
		const { selectedRows } = this.state;
		if(!(Array.isArray(selectedRows) && selectedRows.length))
			return {
				accountCount: 0,
				mcnCount: 0
			}

		const mcnList = selectedRows.filter((current, index, arr) => {
				return arr.findIndex((item) => current.mcnId === item.mcnId) === index;
			});
		return {
			accountCount: selectedRows.length,
			mcnCount: mcnList.length
		}
	}

	render() {
		const { form, type, profitStrategyId, profitStrategyName, unBindAccountListInfo = {}, profitStrategyAccountInfo = {} } = this.props;
		const { selectedRowKeys, pageInfo } = this.state;
		const isDetail = type === 'detailPage';
		const rootData = isDetail ? profitStrategyAccountInfo : unBindAccountListInfo;
		const { page = {}, aggregation = {} } = rootData;
		const { pageNum = 1, pageSize = 20, total = 0, list = [] } = page;
		const { accountCount = 0, mcnCount = 0 } = aggregation;
		const selectedCount = this.getSelectedCount();
		const { accountCount:accountCountSelected, mcnCount: mcnCountSelected } = selectedCount;
		const { loading } = this.state;
		const { getFieldDecorator } = form;
		const pagination = {
			total: parseInt(total),
			current: parseInt(pageNum),
			pageSize: parseInt(pageSize),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200'],
			onChange: pageNum => {
				const curInfo = {...pageInfo, pageNum};
				this.handleSearch('search', curInfo);
				this.setState(curInfo);
			},
			onShowSizeChange: (_, pageSize) => {
				const curInfo = {pageNum: 1, pageSize};
				this.handleSearch('search', curInfo);
				this.setState(curInfo);
			},
		};
		const rowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys,
					selectedRows
				});
				this.onHandle('selectedChange', selectedRows)
			},
		};

		return (
			<div className='finance-rate-detail-wrapper'>
				{
					isDetail ? 
						<PageHeader
							className="site-page-header"
							onBack={() => this.props.history.goBack()}
							title="账号详情"
							subTitle={`${profitStrategyId} ${profitStrategyName}`}
						/> : null
				}
				<Alert className='total-information' message={this.getTotalMsg(accountCount, mcnCount)} type="info" showIcon />
				<Form className='detail-form clearfix'>
					<FormItem label='账号ID'>
						{getFieldDecorator('accountStr')(
							<Input style={{width: 200}} placeholder="请输入" />
						)}
					</FormItem>
					<FormItem label='账号名' className='common-label' >
						{getFieldDecorator('accountId', { initialValue: undefined })(
							<SearchSelect
								action={this.props.getAccountListInfo} 
								style={{ width: 200 }}
								placeholder='请选择'
								keyWord='snsName'
								dataToList={res => { return res.data }}
								item={['accountId', 'snsName']}
							/>
						)}
					</FormItem>
					<FormItem label='主账号' className='common-label' >
						{getFieldDecorator('mcnId', { initialValue: undefined })(
							<SearchSelect
								action={this.props.getMainAccountListInfo} 
								style={{ width: 200 }}
								placeholder='请选择'
								keyWord='identityName'
								dataToList={res => { return res.data }}
								item={['mcnId', 'identityName']}
							/>
						)}
					</FormItem>
					<FormItem className='operate-wrapper'>
						<Button type='primary' onClick={() => {this.onHandle('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.onHandle('reset')}}>重置</Button>
					</FormItem>
				</Form>
				<div className='operate-box'>
					{
						isDetail ? 
						[
							<Button key='addAccount' type='primary' onClick={() => this.onHandle('addAccount')}>添加账号</Button>,
							<Button key='delAccount' type='primary' onClick={() => this.onHandle('delMulAccount')}>批量删除</Button>
						] 
						:
						<Button type='primary' onClick={() => this.onHandle('showSelected')}>查看已选</Button>
					}
				</div> 
				
				<Alert className='select-total-info' message={this.getTotalMsg(accountCountSelected, mcnCountSelected, true)} type="info" showIcon />
				<Table 
					rowKey='accountId'
					rowSelection={rowSelection}
					columns={getRateDetailCol(type, this.onHandle, profitStrategyId, profitStrategyName)} 
					dataSource={list} 
					bordered 
					pagination={pagination} 
					loading={loading}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { financeRateReducer } = state;
	const { unBindAccountListInfo, profitStrategyAccountInfo } = financeRateReducer;
	return {
		unBindAccountListInfo,
		profitStrategyAccountInfo
	}
}

export default connect(mapStateToProps, null)(Form.create()(rateDetailCommon))

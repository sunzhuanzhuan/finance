import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { Table, Button, Modal, Form, Input } from 'antd';
import SearchSelect from '@/components/SearchSelect';
import './financeRateSetting.less';
import qs from "qs";
import { getRateSettingCol } from '../constants';
import RateModal from './rateModal';
import Interface from '../constants/Interface';
import apiDownload from '@/api/apiDownload';
const FormItem = Form.Item;
class FinanceRateSetting extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			modalType: null,
			pageInfo: {
				page: { currentPage: 1, pageSize: 20 }
			}
		}
	}

	componentDidMount() {
		this.handleJump(this.state.pageInfo);
	}

	handleDelInfo = (name, id, isDelete) => {
		if(!isDelete) {
			Modal.confirm({
				title: <div>确定删除<span className='color_highlight'>{name}</span>吗？</div>,
				okText: '确认',
				cancelText: '取消',
				onOk: () => {
					this.setState({loading: true});
					this.props.delProfitStrategy({strategyId: id}).then(() => {
						const { pageInfo } = this.state;
						this.handleJump(pageInfo);
					}).finally(() => {
						this.setState({loading: false});
					});
				}
			});
		}else {
			Modal.warning({
				title: <div>请先删除<span className='color_highlight'>{name}</span>下面添加的账号信息</div>,
				okText: '确定'
			});
		}
	}

	handleOperate = (type, item) => {
		const { id, name } = item;
		switch (type) {
			case 'add': 
			case 'edit': 
				this.setState({
					modalType: type,
					rateInitialVal: item
				})
				return;
			case 'delete': 
				this.props.isProfitStrategyHasAccounts({strategyId: id}).then(result => {
					this.handleDelInfo(name, id, result.data);
				})
				return;
			case 'detail': 
				this.props.history.push({
					pathname: '/finance/financeRateSetting/detail',
					search: '?' + qs.stringify({ id })
				});
				return;
			case 'export': 
				const exportQuery = {
					profitStrategyId: id,
					profitStrategyName: name
				};
				apiDownload({
					url: `${Interface.exportStrategyAccountList}?${qs.stringify(exportQuery)}`,
					method: 'GET',
				}, `${name}账号导出.xlsx`)
				return;
			case 'clear': 
				this.setState({loading: true});
				this.props.clearProfitStrategyAccount({profitStrategyId: id}).finally(() => {
					this.setState({loading: false});
				});
				return;
			default: return;
		}
	}

	handleCloseModal = () => {
		const { operateLoading } = this.state;
		if(!operateLoading) 
			this.setState({
				modalType: null
			})
	}

	handleSaveOperation = data => {
		const { saveFinanceRate } = this.props;
		const { pageInfo, rateInitialVal = {} } = this.state;
		const { id } = rateInitialVal;
		this.setState({operateLoading: true});
		saveFinanceRate({...data, id}).then(() => {
			this.handleJump(pageInfo);
			this.setState({operateLoading: false});
			this.handleCloseModal();
		}).catch(() => {
			this.setState({operateLoading: false});
		})
	}

	handleJump = (query = {page: { currentPage: 1, pageSize: 20 }}) => {
		const { getFinanceRateList, form } = this.props;
		const searchVal = this.dealSearchVal(form.getFieldsValue());
		this.setState({ loading: true });
		const queryObj = {
			...query,
			...searchVal
		}
		getFinanceRateList(queryObj).finally(() => {
			this.setState({loading: false});
		})
	}

	dealSearchVal = (searchVal) => {
		const searchKeys = Object.keys(searchVal);
		searchKeys.forEach(item => {
			if (Object.prototype.toString.call(searchVal[item]) === '[object Object]') {
				if (searchVal[item].label) {
					searchVal[item] = searchVal[item].key;
				}
			}
		})
		return {form: searchVal};
	}

	handleSearch = () => {
		const { form } = this.props;
		form.resetFields();
	}

	render() {
		const { rateListInfo: { total = 0, pageNum = 1, pageSize = 20, list = []}, form } = this.props;
		const { getFieldDecorator } = form;
		const { loading, operateLoading, modalType, rateInitialVal } = this.state;
		const pagination = {
			total: parseInt(total),
			current: parseInt(pageNum),
			pageSize: parseInt(pageSize),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200'],
			onChange: currentPage => {
				const current = {
					page: { currentPage, pageSize }
				}
				this.handleJump(current);
				this.setState({pageInfo: current});
			},
			onShowSizeChange: (_, pageSize) => {
				const current = {
					page: { currentPage: 1, pageSize }
				}
				this.handleJump(current);
				this.setState({pageInfo: current});
			},
		};

		return (
			<div className='finance-rate-wrapper'>
				<h3>账号特殊利润率设置</h3>
				<Form className='search-form clearfix'>
					<FormItem label='策略名称' >
						{getFieldDecorator('strategyIds')(
							<SearchSelect
								action={this.props.getStrategyNameList} 
								style={{ width: 220 }}
								placeholder='请选择'
								keyWord='strategyName'
								dataToList={res => { return res.data }}
								item={['id', 'name']}
							/>
						)}
					</FormItem>
					<FormItem label='accountID'>
						{getFieldDecorator('accountIds')(
							<Input style={{width: 220}} placeholder="请输入" />
						)}
					</FormItem>
					<FormItem label='账号名' >
						{getFieldDecorator('accountIdStr')(
							<SearchSelect
								action={this.props.getAccountListInfo} 
								style={{ width: 220 }}
								placeholder='请选择'
								keyWord='snsName'
								dataToList={res => { return res.data }}
								item={['accountId', 'snsName']}
							/>
						)}
					</FormItem>
					<FormItem>
						<Button type='primary' onClick={() => {this.handleJump()}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch()}}>重置</Button>
					</FormItem>
				</Form>
				<Button type='primary' className='rate-add-btn' onClick={() => this.handleOperate('add', {})}>新增策略</Button>
				<Table 
					rowKey='id' 
					columns={getRateSettingCol(this.handleOperate)} 
					dataSource={list} 
					bordered 
					pagination={pagination} 
					loading={loading}
				/>
				<RateModal 
					loading={operateLoading}
					type={modalType}
					initialVal={rateInitialVal}
					onCancel={this.handleCloseModal}
					handleSaveOperation={this.handleSaveOperation}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { financeRateReducer } = state;
	const { rateListInfo } = financeRateReducer;
	return {
		rateListInfo,
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({ ...actions }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FinanceRateSetting))

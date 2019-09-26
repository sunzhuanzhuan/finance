import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Table, Select, DatePicker, Button, Form, Icon, message } from 'antd';
import * as companyDetailAction from '../actions/companyDetail'
import { receivableFlowConfig } from '../constants'
import './golden.less'
import qs from 'qs';
import numeral from 'numeral';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

class ReceivableDetail extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			pageSize: 20
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		if(search) {
			this.setState({totalAmount: search.totalAmount});
			delete search.totalAmount;
		}
		const { getCompanyData, getCompanyMetadata, getReceivableOption } = this.props.actions;
		let obj = {};
		let keys = search.keys || {};
		let labels = search.labels ? Object.keys(search.labels) : [];
		labels.length > 0 ? labels.forEach(item => {
			obj[item] = { key: search.keys[item], label: search.labels[item] }
		}) : null;
		for (let key in keys) {
			if (key === 'created_at_start' || key === 'created_at_end') {
				obj[key] = moment(keys[key], dateFormat);
			}
		}
		getReceivableOption();
		getCompanyMetadata();
		getCompanyData({ company_id: search.company_id });
		this.queryData({ company_id: search.company_id, page: 1, page_size: 20, ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getCompanyReceivableList({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const search = qs.parse(this.props.location.search.substring(1));
				if(search)
					delete search.totalAmount;
				let keys = {}, labels = {};
				for (let key in values) {
					if (Object.prototype.toString.call(values[key]) === '[object Object]') {
						if (values[key].key) {
							keys[key] = values[key].key;
							labels[key] = values[key].label;
						}
					} else {
						keys[key] = values[key]
					}
				}
				values['created_at_start'] ? keys['created_at_start'] = values['created_at_start'].format(dateFormat) : null;
				values['created_at_end'] ? keys['created_at_end'] = values['created_at_end'].format(dateFormat) : null;
				let params = {
					company_id: search.company_id,
					keys: { ...keys },
					labels: { ...labels }
				};
				Object.keys(params['keys']).forEach(item => { !params['keys'][item] && params['keys'][item] !== 0 ? delete params['keys'][item] : null });
				const hide = message.loading('查询中，请稍候...');
				this.queryData({ company_id: search.company_id, ...params.keys, page: 1, page_size: this.state.pageSize }, () => {
					this.props.history.replace({
						pathname: '/finance/golden/receivableDetail',
						search: `?${qs.stringify({...params, totalAmount: this.state.totalAmount})}`,
					});
				}).then(() => {
					hide();
				}).catch(({ errorMsg }) => {
					message.error(errorMsg || '查询失败');
					hide();
				});
			}
		});
	}
	handleClear = () => {
		this.props.form.resetFields();
	}
	getReceivableOptions = list => {
		if(Array.isArray(list) && list.length) {
			const options = list.map(item => (<Option key={item.id} value={item.id}>{item.display}</Option>))
			return [
				<Option key='allOption' value={''}>全部</Option>,
				options
			]
		}
		return null;
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		if(search)
			delete search.totalAmount;
		const { getFieldDecorator } = this.props.form;
		const { loading, pageSize, totalAmount } = this.state;
		const { companyData, receivableList: { page, page_size, total, list = [], total_amount, revoke_amount }, companyMetadata: { is_revoke = [], readjust_account_bill_type = [] }, receivableOption = {} } = this.props;
		const paginationObj = {
			onChange: (current) => {
				const obj = { company_id: search.company_id, ...search.keys, page: current, page_size: pageSize };
				this.queryData(obj, () => {
					this.props.history.replace({
						pathname: '/finance/golden/receivableDetail',
						search: `?${qs.stringify({...obj, totalAmount})}`,
					});
				});
			},
			onShowSizeChange: (current, pageSize) => {
				const obj = { company_id: search.company_id, ...search.keys, page: current, page_size: pageSize }
				this.setState({ pageSize })
				this.queryData(obj, () => {
					this.props.history.replace({
						pathname: '/finance/golden/receivableDetail',
						search: `?${qs.stringify({...obj, totalAmount})}`,
					});
				});
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return (
			<div>
				<Row type="flex" justify="start" gutter={16} >
					<Col><h4>公司简称：{companyData.name}</h4></Col>
					<Col><h4>销售：{companyData.owner_admin_real_name}</h4></Col>
				</Row>
				<fieldset className='fieldset_css'>
					<legend>核销账户流水</legend>
					<Row type="flex" justify="start" gutter={16} className='account-detail' style={{ marginBottom: '10px' }}>
						<Col>总计： {totalAmount || '0.00'}元</Col>
					</Row>
					<Form className='adjust-stat'>
						<FormItem label='类型'>
							{getFieldDecorator('type', { initialValue: { key: '', label: '全部' } })(
								<Select
									labelInValue
									style={{ width: 150 }}
									placeholder='全部'
									showSearch
									allowClear
									filterOption={(input, option) => option.props.children.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0}
								>
									{
										this.getReceivableOptions(receivableOption.debt_bill_type)
									}
								</Select>
							)}
						</FormItem>
						<FormItem label="选择时间" className='left-gap'>
							{getFieldDecorator('created_at_start')(
								<DatePicker format={dateFormat} placeholder='开始日期' />
							)}
							~
								{getFieldDecorator('created_at_end')(
							<DatePicker format={dateFormat} placeholder='结束日期' />
							)}
						</FormItem>
						<Button type="primary" className='left-gap' onClick={this.handleSearch}>查询</Button>
						<a className="left-gap" onClick={this.handleClear}><Icon type="retweet" />重置搜索框</a>
					</Form >
					<Table
						columns={receivableFlowConfig}
						dataSource={list}
						rowKey='bill_id'
						loading={loading}
						pagination={list.length > 0 ? paginationObj : false}
						bordered
					/>
				</fieldset>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	companyData: state.companyDetail.companyData,
	receivableList: state.companyDetail.receivableList,
	companyMetadata: state.companyDetail.companyMetadata,
	receivableOption: state.companyDetail.receivableOption
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...companyDetailAction }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ReceivableDetail));

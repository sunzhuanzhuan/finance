import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { Table, Button, Alert, Tabs, message } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getTabOptions, getOffAddQueryKeys, getOffQueryItems, getReceAddColIndex, getReceOffCol, getOffOptions } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth, downloadByATag } from '@/util';
import { Scolltable } from '@/components';
import { getReceAddList, clearReceList, addReceOffItem } from '../actions/receivableAdd';
import ReceOffModal from './ReceOffModal';
import qs from 'qs';
import numeral from 'numeral';

const { TabPane } = Tabs;

class ReceivablesOfflist extends React.Component {
	constructor() {
		super();
		this.state = {
			addVisible: false,
			activeKey: '3',
		};
	}

	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { company_id } = search;

		this.props.getReceMetaData();
		this.props.getProject({ company_id });
		this.props.getCompanyInfo({ company_id })
		this.props.getPlatform();
		this.props.getGoldenToken();
		this.props.getGiftAmount({ company_id });
		this.props.getWarehouseAmount({ company_id });
		this.queryAllTabsData(Object.assign(search, { page: 1, page_size: 20}));
		this.setState({ company_id });
	}
	queryAllTabsData = queryObj => {
		this.setState({ loading: true });
		Promise.all(this.getAllTabsActions(queryObj)).then(() => {
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	getAllTabsActions = queryObj => {
		return getTabOptions.map(item => {
			const { value } = item;
			return this.props.getReceAddList(Object.assign(queryObj, {product_line: value}));
		})
	}

	componentWillUnmount() {
		this.props.clearReceList();
	}

	dealSearchQuery = (query, staticObj) => {
		Object.assign(query, staticObj);
		Object.keys(query).forEach(item => {
			if(query[item] === '' || query[item] == undefined)
				delete query[item]
		})
	}

	handleSearch = (product_line, searchQuery) => {
		const { company_id } = this.state;

		this.dealSearchQuery(searchQuery, {company_id, product_line})
		this.setState({[`searchQuery-${product_line}`]: searchQuery, loading: true});

		this.props.getReceAddList({...searchQuery}).then(() => {
			this.setState({loading: false});
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		});
	}

	handleExportList = key => {
		const searchQuery = this.state[`searchQuery-${key}`] || { page: 1, page_size: 20 };
		downloadByATag(`/api/finance/receivables/order/export?${qs.stringify(searchQuery)}`);
	}

	handleSelectRows = (key, selectedRowKeys, selectedRows) => {
		this.setState({
			[`selectedRowKeys-${key}`]: selectedRowKeys, 
			[`selectedRows-${key}`]: selectedRows, 
		});
	}

	getRequirementData = obj => {
		const { company_id } = this.state;
		return this.props.getRequirement({ ...obj, company_id });
	}

	getTabPaneComp = (productLine) => {
		const { receAddListInfo = {}, platformList, projectList } = this.props;
		const { loading } = this.state;

		if (!Array.isArray(productLine)) return null;

		return productLine.map(item => {
			const { display, id } = item;
			const tabInfo = receAddListInfo[`receAddInfo-${id}`] || {};
			const { list = [], page = 1, total = 0, page_size: tableSize = 20 } = tabInfo;
			const totalMsg = `查询结果共${total}个，${total}个符合核销要求，${total - total}不符合：预约订单/派单活动未结案、拓展业务活动未审核通过、应收款金额为0的订单不能进行核销。`;
			const totalWidth = getTotalWidth(getReceOffCol(getReceAddColIndex[id]));
			const searchQuery = this.state[`searchQuery-${id}`] || { page: 1, page_size: 20 };
			const pagination = {
				onChange: (current) => {
					Object.assign(searchQuery, {page: current});
					this.setState({[`searchQuery-${id}`]: searchQuery});
					this.handleSearch(id, searchQuery);
				},
				onShowSizeChange: (_, pageSize) => {
					Object.assign(searchQuery, {page_size: pageSize});
					this.setState({[`searchQuery-${id}`]: searchQuery});
					this.handleSearch(id, searchQuery);
				},
				total: parseInt(total),
				current: parseInt(page),
				pageSize: parseInt(tableSize),
				showQuickJumper: true,
				showSizeChanger: true,
				pageSizeOptions: ['20', '50', '100', '200']
			};
			const selectedRowKeys = this.state[`selectedRowKeys-${id}`] || [];
			const rowSelection = {
				selectedRowKeys,
				onChange: (selectedRowKeys, selectedRows) => {
					this.handleSelectRows(id, selectedRowKeys, selectedRows);
				},
				getCheckboxProps: record => ({
					// disabled: record.status != 1
				}),
			};
			const tabTitle = total != undefined ? <div>
				<span>{display}</span>
				<span>{total}</span>
			</div> : <div>{display}</div>;
			const wrapperClass = `moreThanOneTable${id}`;
			const allItemsInfo = this.getSelectedRowInfo(7, true);
			return (
				<TabPane tab={tabTitle} key={id} className={wrapperClass}>
					<ReceivableOffQuery 
						showExport
						className={wrapperClass}
						queryOptions={{platformList, projectList}}
						queryItems={getOffQueryItems(getOffAddQueryKeys[id])}
						handleSearch={searchQuery => {this.handleSearch(id, searchQuery)}} 
						handleExport={ () => {this.handleExportList(id)}}
						actionKeyMap={{
							company: this.props.getGoldenCompanyId,
							brand: this.props.getBrandData,
							requirement: this.getRequirementData
						}}
					/>
					<Alert className='add-list-total-info' message={totalMsg} type="warning" showIcon />
					<Scolltable 
						isMoreThanOne 
						wrapperClass={wrapperClass}
						scrollClassName={`.${wrapperClass} .ant-table-body`} 
						widthScroll={totalWidth}
					>
						<Table 
							className='receivable-table'
							rowKey={'order_id'} 
							columns={getReceOffCol(getReceAddColIndex[id])} 
							dataSource={list} 
							bordered 
							pagination={pagination} 
							rowSelection={rowSelection}
							loading={loading}
							scroll={{ x: totalWidth }}
						/>
					</Scolltable>
					<div className='rece-footer'>
						<Button
							disabled={!(allItemsInfo['total'])} 
							type='primary' onClick={this.handleOffItems}>核销订单</Button>
					</div>
				</TabPane>
			)
		})
	}

	handleChangeTab = activeKey => {
		this.setState({activeKey});
	}

	handleModalCancel = () => {
		this.setState({
			checkVisible: false,
			offVisible: false,
		})
	}

	getOrderInfo = isClear => {
		const { receMetaData = {} } = this.props;
		const { product_line } = receMetaData;
		if (!Array.isArray(product_line)) return {};
		if(isClear) {
			const allObj = {};

			product_line.forEach(item => {
				const { id } = item;
				Object.assign(allObj, {[`selectedRowKeys-${id}`]: [], [`selectedRows-${id}`]: []})
			})
			return allObj;
		}

		return product_line.map(item => {
			const { id } = item;
			const order_ids = this.state[`selectedRowKeys-${id}`];
			if( Array.isArray(order_ids) && order_ids.length )
				return {
					product_line: id,
					order_ids: order_ids.join(',')
				}
		}).filter(item => item);
	}

	handleModalOk = (modalType, values, callback) => {
		const { company_id } = this.state;
		if(modalType === 'preview') {
			this.setState(this.getOrderInfo(true));
		}else if(modalType === 'offVisible') { 
			const submitObj = {...values};

			Object.assign(submitObj, {company_id, order_info: this.getOrderInfo()});
			delete submitObj.can_verification_amount;
			delete submitObj.company_name;
			delete submitObj.sale_name;
			this.props.addReceOffItem(submitObj).then(() => {
				const { history } = this.props;
				this.setState({offVisible: false});
				if(typeof callback === 'function')
					callback()
				history.push('/finance/receivableoff/list');
			})
			.catch(({errorMsg}) => {
				if(typeof callback === 'function')
					callback()
				message.error(errorMsg || '操作失败');
			});
		}
	}

	handleRemoveSelected = (id, itemKey) => {
		const { activeKey } = this.state;
		const rowKeys = this.state[`selectedRowKeys-${activeKey}`];
		const rows = this.state[`selectedRows-${activeKey}`];

		this.setState({
			[`selectedRowKeys-${activeKey}`]: rowKeys.filter(item => item !== id), 
			[`selectedRows-${activeKey}`]: rows.filter(item => item[itemKey] !== id),
		})
	}

	getTotalMoney = (arr = []) => {
		return arr.reduce((accumulator, item) => accumulator + Number(item.receivables_amount), 0);
	}

	getAllSelectedItems = () => {
		const { receMetaData = {} } = this.props;
		const { product_line } = receMetaData;
		let allArr = [];
		if (!Array.isArray(product_line)) return [];
		product_line.forEach(item => {
			const { id } = item;
			const lineItems = this.state[`selectedRows-${id}`] || [];
			allArr = [...allArr, ...lineItems]
		})
		return allArr;
	}

	getNumberal = data => {
		return numeral(data).format('0.00');
	}

	getSelectedRowInfo = (key, isAll) => {
		let allItems = this.state[`selectedRows-${key}`] || [];
		if(isAll) 
			allItems = this.getAllSelectedItems();

		if(allItems.length)
			return {
				total: allItems.length,
				amount: this.getNumberal(this.getTotalMoney(allItems)),
				allItems
			}

		return { total: 0, amount: '0.00', allItems: [] };
	}

	getSelectedInfoComp = productLine => {
		if (!Array.isArray(productLine)) return null;

		return productLine.map(item => {
			const { display, id } = item;
			return (
				<span key={id} style={{marginRight: 20}}>
					<span>{`${display}：${this.getSelectedRowInfo(id)['total']}个`}</span>
					<span className='selected-sign'>|</span>
					<span>{`${this.getSelectedRowInfo(id)['amount']}元`}</span>
				</span>
			)
		})
	}

	handleOffItems = () => {
		this.setState({ offVisible: true });
	}

	getDiscountAmount = (giftAmount = {}, warehouseAmount = []) => {
		const { gift = {} } = giftAmount;
		const { gift_amount } = gift;

		let whAmount = 0;
		if(Array.isArray(warehouseAmount) && warehouseAmount.length) {
			whAmount = warehouseAmount[0]['balance'];
		}
		return {
			total_gift_amount: this.getNumberal(gift_amount) || 0.00,
			total_warehouse_amount: this.getNumberal(whAmount) || 0.00
		}
	}

	render() {
		const { receMetaData = {}, companyInfo = {}, goldenToken = {}, giftAmount = {}, warehouseAmount = [] } = this.props;
		const { product_line } = receMetaData;
		const { name = '-', owner_admin_real_name = '-', region_team_name = '-' } = companyInfo;
		const { activeKey, checkVisible, offVisible } = this.state;
		const tabColArr = getReceAddColIndex['preview'] || [];
		const allItemsInfo = this.getSelectedRowInfo(7, true);
		const discountInfo = this.getDiscountAmount(giftAmount, warehouseAmount);

		const initialValue = {
			can_verification_amount: allItemsInfo['amount'],
			company_name: name,
			sale_name: owner_admin_real_name,
		};

		const title = <div>
			<span>{`新增核销-${name}`}</span>
			<span className='total-margin'>{`销售：${owner_admin_real_name}`}</span>
			<span>{`区域：${region_team_name}`}</span>
		</div>;

		return <div className='rece-wrapper rece-add-wrapper'>
			<div className='rece-title'>{title}</div>
			<div className='rece-add-seledcted'>
				<span className='right-margin'>已选</span>
				{this.getSelectedInfoComp(product_line)}
				<span style={{marginRight: 20}}>{`当前已选应收款金额：${allItemsInfo['amount']}元`}</span>
				<Button 
					type='primary' 
					disabled={!(allItemsInfo['total'])} 
					onClick={() => {
						this.setState({ checkVisible: true });
					}}
				>
					{`已选订单：${allItemsInfo['total']}个`}
				</Button>
			</div>
			<Tabs className='rece_tabs' activeKey={activeKey} onChange={this.handleChangeTab}>
				{
					this.getTabPaneComp(product_line)
				}
			</Tabs>
			<ReceOffModal 
				type='preview'
				visible={checkVisible}
				width={1000}
				title='查看已选'
				handleCancel={this.handleModalCancel} 
				handleOk={ () => {this.handleModalOk('preview')}}
				footer={null}
				columns={getReceOffCol([...tabColArr, 'previewOperate'], receMetaData, this.handleRemoveSelected, activeKey)}
				dataSource={allItemsInfo['allItems']}
			/>
			<ReceOffModal 
				type='off'
				initialValue={initialValue}
				visible={offVisible}
				options={Object.assign(getOffOptions, receMetaData)}
				width={800}
				title='应收款核销' 
				goldenToken={goldenToken}
				discountInfo={discountInfo}
				actionKeyMap={{
					company: this.props.getGoldenCompanyId,
					sale: this.props.getGoldenCompanyId,
					account: this.props.getAccountInfo
				}}
				handleCancel={this.handleModalCancel} 
				handleOk={this.handleModalOk}
			/>
		</div>
	}
}

const mapStateToProps = (state) => {
	const { receivableOff = {}, companyDetail = {} } = state;
	const { receAddReducer: receAddListInfo, receMetaData, companyInfo, giftAmount, warehouseAmount } = receivableOff;
	const { platformList = [], projectList = [], goldenToken } = companyDetail;
	return {
		receAddListInfo,
		receMetaData, 
		platformList,
		projectList,
		companyInfo,
		goldenToken,
		giftAmount, 
		warehouseAmount
	}
}
const mapDispatchToProps = dispatch => (
		bindActionCreators({...receivableOffAction, ...goldenActions, getReceAddList, clearReceList, addReceOffItem}, dispatch)
	);
export default connect(mapStateToProps, mapDispatchToProps)(ReceivablesOfflist)

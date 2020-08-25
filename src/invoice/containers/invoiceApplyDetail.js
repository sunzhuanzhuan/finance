import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions/applyDetail";
import { getInvoiceQueryOperate } from '../actions/invoiceQuery';
//antd
import { Table, Tabs, Modal, Form, Input, Select, DatePicker, Popover, Spin, Tooltip } from "antd";//Button
//less
import './invoiceApplyDetail.less';
//数据配置
import { handleCompany, handleKeyColumns, typeMap, handleTypeMap } from '../constants/invoiceListConfig';
//verticalTable
import { WBYDetailTable } from "wbyui";
import qs from "qs";
import { calcSum } from "../../util";
import '../components/VerticalTable.less';
import { payback_status_map, invoice_type, invoice_content_type, beneficiary_company, status_display_map } from '../constants';
import InvoiceRelateModal from './InvoiceRelateModal';
import { getInvoicePopContent } from '../constants/invoiceQuery';
import { getAvailableInvoiceList } from '../actions';
import debounce from 'lodash/debounce';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const { confirm } = Modal;
const dataFormat = 'YYYY-MM-DD';

class InvoiceApplyDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			previewVisible: false,
			tipVisible: false,
			imgSrc: '',
			tableLoading: true,
			loading: false,
			confirmLoading: false,
			detailLoading: false,
			newRandomKey: '',
			pageSize: 50,
			key: 'reservation',
			relateModalVisible: false,
		}
		this.addMore = debounce(this.handleJudge, 1000);
	}
	async componentWillMount() {
		//let queryObj = this.props.location.query;
		//修改了获取值的方式
		this.loadData();
	}
	handleScroll = (e) => {
		const node = e.target;
		const top = node.scrollTop;
		if (top && (top > node.scrollHeight - node.clientHeight - 5)) {
			this.addMore(() => {
				this.setState({ loading: false });
				node.scrollTop = top;
			})
		}
	}
	handleJudge = (fn) => {
		this.setState({ loading: true });
		const { page, pageSize, invoiceId } = this.state;
		const queryObj = qs.parse(this.props.location.search.substring(1))
		const applyId = queryObj.id;
		const id = invoiceId ? invoiceId : [];
		this.props.getAvailableInvoiceList(applyId, id, page, pageSize + 50).then(() => {
			this.setState({ pageSize: pageSize + 50 }, () => {
				setTimeout(fn, 0);
			});
		})
	}

	loadData = () => {
		let queryObj = qs.parse(this.props.location.search.substring(1))
		let id = queryObj.id;
		let { getApplyDetail, getAssociatedOrders, getiInvoiceRelation, getAvailableInvoiceList } = this.props;
		let { pageSize } = this.state;
		getiInvoiceRelation(id);
		getAvailableInvoiceList(id);
		this.setState({ detailLoading: true })
		getApplyDetail(id).then(() => {
			this.setState({ detailLoading: false })
		}).finally(() => {
			this.setState({ detailLoading: false })
		});
		let { detailInfo: { type } } = this.props;
		if (type && type === 2) {
			getAssociatedOrders(id, '1', 1, pageSize).then(() => {
				this.setState({
					tableLoading: false
				});
			});
		} else {
			getAssociatedOrders(id, '3', 1, pageSize).then(() => {
				this.setState({
					tableLoading: false
				});
			});
		}
	}

	handleCancel = () => {
		let newKey = this.handleRandomKey();
		this.setState({
			previewVisible: false,
			newRandomKey: newKey
		})
	}
	handleTipCancel = () => {
		this.setState({
			tipVisible: false
		})
	}
	handleRandomKey = () => {
		return Math.random() * 100 + 1000;
	}
	handleTabsChange = async (key) => {
		//let queryObj = this.props.location.query;
		//修改了获取值的方式
		let queryObj = qs.parse(this.props.location.search.substring(1))
		let id = queryObj.id;
		let { getAssociatedOrders, orderInfo } = this.props;
		let { pageSize } = this.state;
		this.setState({ key });
		if (!orderInfo[key]) {
			this.setState({
				tableLoading: true,
			});
			getAssociatedOrders(id, typeMap[key], 1, pageSize).then(() => {
				this.setState({
					tableLoading: false,
				});
			});
		}
	}
	handleInvoiceOperate = (opt_type, invoiceBaseInfo) => {
		if(invoiceBaseInfo) {
			Object.assign(invoiceBaseInfo, {opt_type})
		}
		this.setState({ invoiceModalType: opt_type, invoiceBaseInfo });
	}
	handleOk = () => {
		const { form } = this.props;
		const { validateFields } = form;
		validateFields((err, values) => {
			if(!err) {
				const { invoiceBaseInfo = {} } = this.state;
				const { opt_type } = invoiceBaseInfo;
				let query = {};
				if(opt_type === 'void') {
					query = { ...invoiceBaseInfo, ...values };
				}else if(opt_type === 'red') {
					values.invoice_time = moment(values.invoice_time).format('YYYY-MM-DD');
					query = {
						...invoiceBaseInfo,
						invoice_relation_id: invoiceBaseInfo.invoice_id,
						...values,
					}
				}
				delete query.invoice_amount;
				this.setState({confirmLoading: true});
				this.props.getInvoiceQueryOperate(query).then(() => {
					this.handleInvoiceOperate();
					this.loadData();
				}).finally(() => {
					this.setState({confirmLoading: false});
				})
			}
		})
	}
	showConfirm = (type, invoiceBaseInfo, otherApplicationId) => {
		const idContent = () => {
			return otherApplicationId.map(item => [
				<a className='color_red' key={item} href={`/finance/invoice/applyDetail?id=${item}`} target='_blank'>{item}</a>,
				<span key={`${item}_sign`}>，</span>
			])
		};
		const textOption = {
			'void': '作废',
			'red': '红冲'
		};
		const textContent = (<span>{`你还要继续${textOption[type]}吗？`}</span>);
		confirm({
			title: '此发票号同时关联其他的发票申请单',
			content: [idContent(), textContent],
			okText: '继续',
			onOk: () => {
				this.handleInvoiceOperate(type, invoiceBaseInfo)
			},
		});
	}
	getInvoiceOperateComp = (record = {}, status, role) => {
		if(status === '2' && role === 'cashier'){
			const { invoice_id, invoice_application_id, invoice_amount, other_application_id = [] } = record;
			const invoiceBaseInfo = {
				invoice_id,
				invoice_application_id,
				invoice_amount
			};
			const getOperateBtn = () => {
				const invoiceOperateArr = [
					{ key: 'void', title: '当月作废' },
					{ key: 'red', title: '红字发票' },
				];
				const otherBinding = Array.isArray(other_application_id) && other_application_id.length;
				const operateFunc = otherBinding ? this.showConfirm : this.handleInvoiceOperate;
				return invoiceOperateArr.map(item => {
					const { key, title } = item;
					return (
						<a key={key} className='left-gap-10' onClick={() => operateFunc(key, invoiceBaseInfo, other_application_id)}>{title}</a>
					)
				})
			}
			return <div className='invoice_item'>
				{
					getOperateBtn()
				}
			</div>
		}else if(status === '4' || status === '5') {
			const timeKey = {
				'4': 'void_time',
				'5': 'redmark_time'
			}
			
			const getInfoText = () => {
				const contentArr = [
					{ key: timeKey[status], className: 'left-gap-10 inline_block_item' },
					{ key: 'invalid_reason', className: 'left-gap-10 inline_block_item invalic_reason_wrapper' },
				];
				return contentArr.map(item => {
					const { key, className } = item;
					const itemVal = record[key];
					const isShowTooltips = key === 'invalid_reason' && itemVal.length > 10;
					return (
						isShowTooltips ? <Tooltip placement="top" title={itemVal}>
							<div key={key} className={className}>
								{`${itemVal.substring(0, 10)}...`}
							</div>
						</Tooltip> :
						<div key={key} className={className}>
							{itemVal}
						</div>
					)
				})
			}
			return <div className='invoice_item'>
				<div className='invoice_detail_status left-gap-10 inline_block_item'>{record.status_name}</div>
				{
					getInfoText()
				}
			</div>
		}else {
			return null
		}
	}
	getInvoiceModalContent = (type) => {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		if( type === 'void' ) {
			return (
				<FormItem>
					{getFieldDecorator('invalid_reason', {
						rules: [
							{ 
								required: true, 
								max: 100,
								whitespace: true,
								message: '请输入作废原因，最多不超过100个字符' 
							}
						]
					})(
						<TextArea placeholder='请填写当月作废的原因，必填' autosize={{ minRows: 4, maxRows: 6 }} />
					)}
				</FormItem>
			)
		}else if( type === 'red' ) {
			const { availableInvoiceList = [] } = this.props;
			const { invoiceBaseInfo = {} } = this.state;
			const renderItems = availableInvoiceList ? availableInvoiceList.map((item, index) => {
				return <Option key={index} value={item.invoice_id}>{item.invoice_number}</Option>
			}) : [];
			const getInvoiceCount = () => {
				const { invoice_amount } = invoiceBaseInfo;
				return Number(invoice_amount) > 0 ? `-${invoice_amount}` : invoice_amount;
			}
			return [
				<FormItem label='发票号' key='invoice_id'>
					{getFieldDecorator('invoice_id', {
						rules: [
							{ required: true, message: '请选择发票号' }
						]
					})(
						<Select
							style={{ width: 135 }}
							placeholder="请选择"
							showSearch
							onPopupScroll={this.handleScroll}
							dropdownRender={menu => (
								<div>
									<Spin tip='加载更多，请稍候...' spinning={this.state.loading}>
										<div style={this.state.loading ? { visibility: 'hidden' } : {}}>
											{menu}
										</div>
									</Spin>
								</div>
							)}
						>
							{renderItems}
						</Select>
					)}
				</FormItem>,
				<FormItem label='金额' key='invoiceCount' className='invoice_count_item'>
					<div className='color_red'>{getInvoiceCount()}</div>
				</FormItem>,
				<FormItem label='开票日期' key='invoice_time'>
					{getFieldDecorator('invoice_time', {
						rules: [
							{ required: true, message: '请选择开票日期' }
						]
					})(
						<DatePicker className='select_commont_width' format={dataFormat} />
					)}
				</FormItem>,
				<FormItem label='红冲原因' key='invalid_reason'>
					{getFieldDecorator('invalid_reason', {
						rules: [
							{ 
								required: true, 
								whitespace: true,
								max: 100,
								message: '请输入发票红冲原因，最多不超过100个字符' 
							}
						]
					})(
						<TextArea placeholder='请填写发票红冲的原因，必填' autosize={{ minRows: 3, maxRows: 6 }} />
					)}
				</FormItem>
			]
		}
	}
	isShowRelateModal = (type_display, id, company_id, amount, can_invoice, type, receivableCount, real_amount) => {
		const relateBaseInfo = {
			type_display, id, company_id, amount, can_invoice, type, receivableCount, real_amount
		}
		this.setState({ 
			relateModalVisible: !this.state.relateModalVisible,
			relateBaseInfo
		});
	}
	render() {
		let { previewVisible, imgSrc, tableLoading, pageSize, key, invoiceModalType, confirmLoading } = this.state;//tipVisible
		let { detailInfo, detailInfo: { type, payback_status, role }, invoiceRelation, orderInfo, getAssociatedOrders } = this.props;
		//修改了获取值的方式
		let { id } = qs.parse(this.props.location.search.substring(1));
		let companyData = handleCompany(detailInfo);
		let orderInfoList = orderInfo ? handleKeyColumns(orderInfo) : {};
		let typeTable = type ? type === 2 ? handleTypeMap('2') : handleTypeMap('1') : [];
		const modalCls = invoiceModalType === 'red' ? 'invoice_operate_form clear-fix' : '';
		const titleOption = {
			'void': '发票当月作废',
			'red': '发票红冲',
			'detail': '操作详情'
		}
		const companyColumns = [
			{
				title: '公司ID',
				dataIndex: 'company_id',
				key: 'company_id',
				align: 'center'
			}, {
				title: '公司简称',
				dataIndex: 'company_name',
				key: 'company_name',
				align: 'center'
			}, {
				title: '开票金额（元）',
				dataIndex: 'amount',
				key: 'amount',
				align: 'center'
			}, {
				title: '开票依据',
				dataIndex: 'type_display',
				key: 'type_display',
				align: 'center'
			},
			{
				title: '开票维度',
				dataIndex: 'order_associate_type_display',
				key: 'order_associate_type_display',
				align: 'center'
			},
			{
				title: '合同编号',
				dataIndex: 'contract_num',
				key: 'contract_num',
				align: 'center',
				render: (_, { contract_num }) => {
					return contract_num ? contract_num : "";
				}
			},
			{
				title: '合同扫描件',
				dataIndex: 'contract_scanning_copy',
				key: 'contract_scanning_copy',
				align: 'center',
				render: (_, { contract_scanning_copy }) => {
					return <div>
						{contract_scanning_copy ? contract_scanning_copy.map((item, index) => {
							return <span className='file-link' key={index} onClick={() => {
								window.open(item.url)
							}}>
								{item.name}
							</span>
						}) : null}
					</div >
				}
			},
			{
				title: '邮件审批截图',
				dataIndex: 'email_approval_screenshots',
				key: 'email_approval_screenshots',
				align: 'center',
				render: (_, { email_approval_screenshots }) => {
					return <div>
						{email_approval_screenshots ? email_approval_screenshots.map((item, index) => {
							return <div className='thum-img-box' onClick={() => {
								this.setState({
									previewVisible: true,
									imgSrc: item.url
								})
							}} key={index}>
								<img src={item.url} />
							</div>
						}) : null}
					</div >
				}
			}, {
				title: '销售经理',
				dataIndex: 'company_owner_admin_name',
				key: 'company_owner_admin_name',
				align: 'center'
			}
		];
		const columns = [
			{
				title: '发票申请单ID：',
				dataIndex: 'id',
				key: 'id',
				align: 'center',
				render: (_, { id, status_display }) => {
					if(status_display === status_display_map['YIZUOFEI']) {
						return <div>{id}</div>
					}
					let paybackText = '';
					switch(payback_status) {
						case payback_status_map['WAIT_FOR_PAY']: 
							paybackText = '待回款';
							break;
						case payback_status_map['ALREADY_FOR_PAY']: 
							paybackText = '已回款';
							break;
						case payback_status_map['ALREADY_PART_PAY']: 
							paybackText = '部分回款';
							break;
						default:
							paybackText = '';
							break;
					}
					return paybackText ?
						<div>{id}<b className="highLight" >{paybackText}</b></div> :
						<div>{id}</div>
				}
			}, {
				title: '创建时间/创建人：',
				dataIndex: 'created_at',
				key: 'created_at',
				align: 'center',
				render: (_, { created_at, creator_name }) => {
					return created_at + ' ' + creator_name
				}
			}, {
				title: '发票抬头：',
				dataIndex: 'invoice_title',
				key: 'invoice_title',
				align: 'center'
			}, {
				title: '发票类型：',
				dataIndex: 'invoice_type',
				key: 'invoice_type',
				align: 'center',
				render: text => {
					return text === invoice_type['NORMAL_INVOICE'] ? '普票' :
						text === invoice_type['SPECAIAL_INVOICE'] ? '专票' : ''
				}
			},
			{
				title: '发票内容：',
				dataIndex: 'invoice_content_type',
				key: 'invoice_content_type',
				align: 'center',
				render: text => {
					return text === invoice_content_type['TECHNICAL_SERVICE'] ? '技术服务费' :
						text === invoice_content_type['INFORMATION_SERVICE'] ? '信息服务费' :
							text === invoice_content_type['ADVERTISING_SERVICE'] ? '广告服务费' :
								text === invoice_content_type['ADVERTISING_EXPENSE'] ? '广告费' : ''
				}
			},
			{
				title: '金额(元)：',
				dataIndex: 'amount',
				key: 'amount',
				align: 'center',
				render: (_, { amount, real_amount, payback_amount, receivables_payback_amount, invoice_void_amount }) => {
					return <ul>
						<li>已开票金额:{real_amount}</li>
						<li>申请单金额:{amount}</li>
						<li>已回款金额:{payback_amount}</li>
						<li>待回款金额:{calcSum([receivables_payback_amount, -payback_amount]).toFixed(2)}</li>
						<li>总作废金额:{invoice_void_amount}</li>
					</ul>
				}
			},
			{
				title: '开票公司：',
				dataIndex: 'beneficiary_company',
				key: 'beneficiary_company',
				align: 'center',
				render: text => {
					return text === beneficiary_company['WEIYIHUIHUANG'] ? '微易辉煌' : text === beneficiary_company['XUNDAWANGMAI'] ? '讯达网脉' : text === beneficiary_company['WEIBOYI'] ? '微播易' : text === beneficiary_company['BUGUNIAO'] ? '布谷鸟' : ''
				}
			},
			{
				title: '资质证明：',
				dataIndex: 'special_invoice_proof',
				key: 'special_invoice_proof',
				align: 'center',
				render: (text) => {
					return <div>
						{text ? text.map((it, i) => {
							return it.name.indexOf('.pdf') < 0 ? <div className='thum-img-box' key={i} onClick={() => {
								this.setState({
									previewVisible: true,
									imgSrc: it.url
								})
							}}>
								<img src={it.url} />
							</div> : <div className='thum-img-box' key={i} style={{ textAlign: 'center' }} >
									<a target='_blank' href={it.url} >PDF</a>
								</div>

						}) : null}
					</div>
				}
			},
			{
				title: '开票信息：',
				dataIndex: 'tax_num',
				key: 'tax_num',
				align: 'center',
				render: (_, { tax_num, invoice_title_address, bank_agency, bank_account_number, phone, invoice_comment }) => {
					return <ul>
						<li><span className='invoice-message'>纳税人识别号：</span>{tax_num}</li>
						<li><span className='invoice-message'>开票地址:</span>{invoice_title_address}</li>
						<li><span className='invoice-message'>开户银行：</span>{bank_agency}</li>
						<li><span className='invoice-message'>银行账号：</span>{bank_account_number}</li>
						<li><span className='invoice-message'>座机：</span>{phone}</li>
						<li><span className='invoice-message'>发票备注：</span>{invoice_comment}</li>
					</ul>
				}
			},
			{
				title: '收件人信息：',
				dataIndex: 'company_owner_admin_name',
				key: 'company_owner_admin_name',
				align: 'center',
				render: (_, { addressee, addressee_address, addressee_phone, postcode }) => {
					return <ul>
						<li><span className='invoice-message'>收件人姓名：</span>{addressee}</li>
						<li><span className='invoice-message'>收件人地址：</span>{addressee_address}</li>
						<li><span className='invoice-message'>收件人电话：</span>{addressee_phone}</li>
						<li><span className='invoice-message'>邮编：</span>{postcode}</li>
					</ul>
				}
			},
			{
				title: '申请单状态：',
				dataIndex: 'status_display',
				key: 'status_display',
				align: 'center',
				render: (_, record) => {
					const getRelateBtn = () => {
						const { type_display, id, company_id, amount, real_amount, can_invoice, type, receivables_payback_amount, status_display } = detailInfo;
						return (
							role === 'cashier' && can_invoice > 0 && status_display !== status_display_map['YIZUOFEI'] ? <a key='relateInvoice' onClick={() => {this.isShowRelateModal(type_display, id, company_id, amount, can_invoice, type, receivables_payback_amount, real_amount)}}>重新关联发票</a> : null
						)
					}
					const getInvoiceNumItems = () => {
						const { status_display, express_company_display, waybill_number } = record;
						if(status_display === status_display_map['YIKAI'] || status_display === status_display_map['YIJI'] || status_display === status_display_map['YIZUOFEI']) {
							return (
								<div className='status-display'>
									<p>
										{status_display}
										{
											status_display === status_display_map['YIJI'] ? 
											[
												<span className='color_red' key='express_company_display'>（快递公司：{express_company_display}</span>,
												<span key='waybill_number' className='left-gap-10 color_red'>快递编号：{waybill_number}）</span>
											] : null
										}
									</p>
									<p> 发票号及对应金额：</p>
									{invoiceRelation ? invoiceRelation.map((item, index) => {
										const { invoice_number, invoice_amount, status, red_invoice_info } = item;
										const redInvoiceArr = [
											{ label: '发票号：', key: 'invoice_number' },
											{ label: '金额：', key: 'amount' },
											{ label: '操作人：', key: 'operation_user' },
											{ label: '操作时间：', key: 'operation_time' },
										]
										return <div key={index} className='invoice_operate_wrapper'>
											<div className='invoice_item'>
												{
													status === '5' ? 
													<Popover 
														overlayClassName='invoice_popover_wrapper'
														placement="top" title='红字发票' 
														content={getInvoicePopContent(redInvoiceArr, red_invoice_info)} trigger="click"
													>
														<span className='invoice_num_cls left-gap-10 default_color'>{invoice_number}</span>
													</Popover> :
													<span className='left-gap-10'>{invoice_number}</span>
												}
												<span className='left-gap-10'>{invoice_amount}</span>
											</div>
											{
												this.getInvoiceOperateComp(item, status, role)
											}
										</div>
									}) : null}
									{
										getRelateBtn()
									}
								</div>
							)
						}else {
							return status_display;
						}
					}
					
					return getInvoiceNumItems()
				}
			},
			{
				title: '关系证明：',
				dataIndex: 'invoice_company_relation_proof',
				key: 'invoice_company_relation_proof',
				align: 'center',
				render: (text) => {
					return <div>
						{text ? text.map((it, i) => {
							return it.name.indexOf('.pdf') < 0 ? <div className='thum-img-box' key={i} onClick={() => {
								this.setState({
									previewVisible: true,
									imgSrc: it.url
								})
							}}>
								<img src={it.url} />
							</div> : <div className='thum-img-box' key={i} style={{ textAlign: 'center' }} >
									<a target='_blank' href={it.url} >PDF</a>
								</div>

						}) : null}
					</div>
				}
			},
			{
				title: '客户编码信息修改证明：',
				dataIndex: 'invoice_title_code_proof',
				key: 'invoice_title_code_proof',
				align: 'center',
				render: (text) => {
					return <div>
						{text ? text.map((it, i) => {
							return it.name.indexOf('.pdf') < 0 ? <div className='thum-img-box' key={i} onClick={() => {
								this.setState({
									previewVisible: true,
									imgSrc: it.url
								})
							}}>
								<img src={it.url} />
							</div> : <div className='thum-img-box' key={i} style={{ textAlign: 'center' }} >
									<a target='_blank' href={it.url} >PDF</a>
								</div>

						}) : null}
					</div>
				}
			},
			{
				title: '备注：',
				dataIndex: 'comment',
				key: 'comment',
				align: 'center'
			},
			{
				title: '运营驳回原因：',
				dataIndex: '1',
				key: '1',
				align: 'center'
			},
			{
				title: '财务拒开原因：',
				dataIndex: 'reject_by_accountant_reason',
				key: 'reject_by_accountant_reason',
				align: 'center'
			},
		] || [];
		let paginationObj = orderInfo[key] ? {
			onChange: (current) => {
				this.setState({
					tableLoading: true
				});
				getAssociatedOrders(id, typeMap[key], current, pageSize).then(() => {
					this.setState({
						tableLoading: false
					});
				}).catch(() => {
					this.setState({
						tableLoading: false
					});
				})
			},
			total: orderInfo[key].total,
			pageSize: orderInfo[key].page_size || pageSize,
			current: orderInfo[key].page || 1
		} : {}
		return <div className='invoice-apply-detail clearfix'>
			<fieldset>
				<legend>发票申请单详情</legend>
				<div className='detail-content'>
					<Spin spinning={this.state.detailLoading}>
						<div className='detail-list clearfix'>
							<WBYDetailTable className='vertical-table' columns={columns} dataSource={detailInfo} columnCount={4}></WBYDetailTable>
						</div>
					</Spin>
					
					<div className='detail-company clearfix'>
						<h4>该申请单中包含如下公司简称：</h4>
						<Table columns={companyColumns} dataSource={companyData} pagination={false} />
					</div>
					{detailInfo.type == 1 || detailInfo.type == 5 ? < div className='detail-order clearfix'>
						<h4>本申请单包含的订单/活动如下：</h4>
						<Tabs defaultActiveKey="reservation" type='card' onChange={this.handleTabsChange}>
							{typeTable.map((item) => {
								return <TabPane tab={item.title} key={item.key}>
									<Table columns={item.columns} dataSource={orderInfoList[item.key]} loading={tableLoading} pagination={paginationObj} />
								</TabPane>
							})
							}
						</Tabs>
					</div> : null}
					<Modal key={this.state.newRandomKey} visible={previewVisible} footer={null} onCancel={this.handleCancel} width={800} wrapClassName='pic-modal'>
						<img src={imgSrc} className='invoice-modal-pic' />
					</Modal>
					{/* <Modal title='提示' visible={tipVisible} footer={[
							<Button key="submit" type="primary" onClick={this.handleCancel}>确定</Button>,
							<Button key="back" onClick={this.handleOk}>
								取消
							</Button>,
						]} onCancel={this.handleTipCancel}>
					</Modal> */}
					
					<Modal 
						width={640}
						title={titleOption[invoiceModalType]}
						visible={Boolean(invoiceModalType)} 
						maskClosable={false}
						confirmLoading={confirmLoading}
						onCancel={() => this.handleInvoiceOperate()}
						onOk={this.handleOk}
					>
						<Form className={modalCls}>
							{ this.getInvoiceModalContent(invoiceModalType) }
						</Form>
					</Modal>
					<InvoiceRelateModal
						role={role}
						relateModalVisible={this.state.relateModalVisible}
						relateBaseInfo={this.state.relateBaseInfo}
						isShowRelateModal={this.isShowRelateModal}
						refreshData={this.loadData}
					/>
				</div>
			</fieldset>
		</div >
	}
}


export default connect(
	state => ({
		detailInfo: state.invoice.getApplyDetail.detailInfo,
		orderInfo: state.invoice.getApplyDetail.orderInfo,
		availableInvoiceList: state.invoice.availableInvoiceList,
		invoiceRelation: state.invoice.getApplyDetail.invoiceRelation
	}),
	{...actions, getAvailableInvoiceList, getInvoiceQueryOperate}
)(Form.create()(InvoiceApplyDetail))

import React from "react";
import { Popover, Icon, Tooltip, Table } from 'antd';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';
import { accMul } from "@/util";

const getPriceContent = (item = {}) => {
	const {
		isShowDetail,
		isShowRate,
		rateTitle,
		baseRate,
		titleLable,
		titlePrice,
		bloggerPrice,
		bloggerRate,
		trilateralPrice,
		trilateralRate,
		equities
	} = item;
	const isServiceRate = rateTitle == '服务费率';
	const dealTitlePrice = titlePrice || titlePrice == 0 ? numeral(titlePrice).format('0.00') : '-';
	const dealBloggerPrice = bloggerPrice || bloggerPrice == 0 ? numeral(bloggerPrice).format('0.00') : '-';
	const dealTrilPrice = trilateralPrice || trilateralPrice == 0 ? numeral(trilateralPrice).format('0.00') : '-';

	const dealBaseRate = baseRate || baseRate == 0 ? `${accMul(baseRate, 100)}%` : '-';
	const dealBlogRate = bloggerRate || bloggerRate == 0 ? `${accMul(bloggerRate, 100)}%` : '-';
	const dealTrilgRate = trilateralRate || trilateralRate == 0 ? `${accMul(trilateralRate, 100)}%` : '-';

	const equitiesStr = getEquities(equities);
	return (
		<div className='price_comp' key={+new Date() + Math.random()}>
			<div className='price_title'>
				<span style={{ marginRight: 20 }}>{titleLable}{equitiesStr}<span className='nowrap-span'>：{dealTitlePrice}</span></span>
				{(isShowRate && !isShowDetail) || (isShowRate && isServiceRate) ? <span className='nowrap-span'>{rateTitle}：{dealBaseRate}</span> : null}
			</div>
			{
				isShowDetail ? [
					<div key='blogger' className='price_detail'>
						<span className='price_dote blogger'></span>
						<span className='price_content'>博主：{dealBloggerPrice}</span>
						{isShowRate && !isServiceRate ? <span>{rateTitle}：{dealBlogRate}</span> : null}
					</div>,
					<div key='trinity' className='price_detail'>
						<span className='price_dote trilatreal'></span>
						<span className='price_content'>三方：{dealTrilPrice}</span>
						{isShowRate && !isServiceRate ? <span>{rateTitle}：{dealTrilgRate}</span> : null}
					</div>
				] : null
			}
		</div>
	)
}

const getEquities = (equities) => {
	if(Array.isArray(equities) && equities.length) {
		const equitiesStr = equities.map(item => item.equitiesName).join('+');
		return `【${equitiesStr}】`;
	}
		return ''
}

const getPriceItemWithEquities = (item) => {
	const {price_label, quoted_price, equities} = item;
	const equitiesStr = getEquities(equities);
	return (
		<div key={price_label}>{`${price_label}${equitiesStr}:${quoted_price}`}</div>
	)
}

export const creditTitle = [
	{
		title: '额度（元）',
		dataIndex: 'credit_line',
		key: 'credit_line',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: '余额（元）',
		dataIndex: 'credit_amount',
		key: 'credit_amount',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: '可用余额（元）',
		dataIndex: 'credit_amount_available',
		key: 'credit_amount_available',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
]

export const cashTitle = [
	{
		title: '余额（元）',
		dataIndex: 'cash_amount',
		key: 'cash_amount',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
]

export const giftTitle = [
	{
		title: <div>余额（元）<Popover content={'余额=（总赠送金额-已使用金额）之差的绝对值'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'balance',
		key: 'balance',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>已使用金额（元）<Popover content={'统计所有使用了赠送账户金额的总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'spend_amount',
		key: 'spend_amount',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>总赠送金额（元）<Popover content={'统计赠送给该客户的金额总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'total_amount',
		key: 'total_amount',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
]

export const compensationTitle = [
	{
		title: <div>余额（元）<Popover content={'余额=（总赔偿金额-已使用金额）之差的绝对值'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'balance',
		key: 'balance',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>已使用金额（元）<Popover content={'统计所有使用了赔偿账户金额的总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'spend_amount',
		key: 'spend_amount',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>总赔偿金额（元）<Popover content={'统计赔偿给该客户的金额总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'total_amount',
		key: 'total_amount',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
];

export const coffersListFunc = (id) => {
	return [
		{
			title: <div>余额（元）<Popover content={'余额=总金额-已使用金额'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'balance',
			key: 'balance',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: <div>已使用金额（元）<Popover content={'统计使用小金库的金额总和'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'spend_amount',
			key: 'spend_amount',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: <div>总金额（元）<Popover content={'统计在该客户订单/拓展业务上加价金额的总和'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'total_amount',
			key: 'total_amount',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: '小金库明细',
			dataIndex: 'action',
			key: 'action',
			align: 'left',
			render: () => <Link to={`/finance/golden/detail?company_id=${id}`}>查看详情</Link>
		}
	]
}

export const companyAdjustFunc = (id) => {
	return [
		{
			title: <div>总金额（元）<Popover content={'统计财务审批调价订单的已使用的调价金额总和'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'total_amount',
			key: 'total_amount',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: '调价明细',
			dataIndex: 'action',
			key: 'action',
			render: () => <Link to={`/finance/golden/adjustDetail?company_id=${id}`}>查看详情</Link>
		}
	]
}

export const companyReceivableFunc = (id) => {
	return [
		{
			title: <div>总金额（元）<Popover content={'订单进行应收款核销时使用核销账户的总和'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'total_amount',
			key: 'total_amount',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: '核销明细',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => {
				const { total_amount } = record;
				const totalAmount = total_amount ? numeral(total_amount).format('0.00') : '0.00';
				return <Link to={`/finance/golden/receivableDetail?company_id=${id}&totalAmount=${totalAmount}`}>查看详情</Link>
			}
		}
	]
}

export const accountFlowFunc = (handleDetail, content, account_type) => {
	return [
		{
			title: '流水号',
			dataIndex: 'billing_id',
			key: 'billing_id',
		}, {
			title: '时间',
			dataIndex: 'created_at',
			key: 'created_at',
			aligin: 'center',
			width: 200,
		}, {
			title: '账户',
			dataIndex: 'account_type',
			key: 'account_type',
			aligin: 'center',
			render: text => {
				const value = account_type.find(item => item.id == text);
				return value ? value.display : '-'
			}
		}, {
			title: '流水明细',
			dataIndex: 'change_amount',
			key: 'change_amount',
			aligin: 'center',
		}, {
			title: '流水类型',
			dataIndex: 'billing_type_display',
			key: 'billing_type_display',
			aligin: 'center',
		}, {
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			aligin: 'center',
			render: (text, record) => {
				if ((record.is_show_detail == 2)) {
					return <span>-</span>
				} else {
					const node = content ? <div>{content.key}：<a target='_blank' href={content.link}>{content.value}</a></div> : '';
					return <Popover content={node}
						trigger="click">
						<a onClick={() => { handleDetail(record) }}>查看详情</a>
					</Popover >
				}
			},
		}
	]
}

export const freezeDetailFunc = (productLine) => {
	return [
		{
			title: '时间',
			dataIndex: 'created_at',
			key: 'created_at',
		}, {
			title: '冻结金额（元）',
			dataIndex: 'freeze_amount',
			key: 'freeze_amount',
		}, {
			title: '业务类型',
			dataIndex: 'product_line_display',
			key: 'product_line_display',
			render: (text, record) => {
				let productLineId = record.product_line
				let productLineDisplay = productLine.map(function (item) {
					if (item.id == productLineId) {
						return <span>{item.display}</span>
					}
				})
				return productLineDisplay
			},

		}, {
			title: '业务名称',
			key: 'biz_name',
			dataIndex: 'biz_name',
			render: text => {
				return text ? text : '-'
			}
		}, {
			title: '业务ID',
			dataIndex: 'order_id',
			key: 'order_id',
			render: (text, record) => {
				return text ? <a target='_blank' href={record.order_link}>{text}</a> : '-'
			}
		}
	]
}

export const goldenFlowConfig = [
	{
		title: '流水号',
		dataIndex: 'bill_id',
		key: 'bill_id',
		align: 'center',
		width: 200,
	}, {
		title: '时间',
		dataIndex: 'created_at',
		key: 'created_at',
		align: 'center',
		width: 200,
	}, {
		title: '流水明细（元）',
		dataIndex: 'change_amount',
		key: 'change_amount',
		align: 'center',
		width: 200,
	}, {
		title: '类型',
		dataIndex: 'display',
		key: 'display',
		align: 'center',
		width: 200,
	}, {
		title: '余额',
		dataIndex: 'after_amount',
		key: 'after_amount',
		align: 'center',
		width: 200,
	}, {
		title: '操作人',
		dataIndex: 'real_name',
		key: 'real_name',
		align: 'center',
		width: 200,
		render: text => {
			return text ? text : '-'
		}
	}, {
		title: '详情',
		align: 'center',
		width: 300,
		render: (text, record) => {
			if (record.product_line && (record.product_line === '3' || record.product_line === '7' || record.product_line === '2')) {
				const str = record.product_line === '3' ? '订单ID' : record.product_line === '7' ? '拓展业务ID' : record.product_line === '2' ? '微闪投ID' : null;
				return <div>{str}：<a target='_blank' href={record.link}>{record.order_id}</a></div>
			} else {
				return record.remark
			}
		},
	}
]

export const receivableFlowConfig = [
	{
		title: '流水号',
		dataIndex: 'id',
		key: 'id',
		align: 'center',
		width: 200,
	}, {
		title: '时间',
		dataIndex: 'created_at',
		key: 'created_at',
		align: 'center',
		width: 200,
	}, {
		title: '金额',
		dataIndex: 'change_amount',
		key: 'change_amount',
		align: 'center',
		width: 200,
	}, {
		title: '类型',
		dataIndex: 'display',
		key: 'display',
		align: 'center',
		width: 200,
	}, {
		title: '余额',
		dataIndex: 'after_amount',
		key: 'after_amount',
		align: 'center',
		width: 200,
	}, {
		title: '操作人',
		dataIndex: 'real_name',
		key: 'real_name',
		align: 'center',
		width: 200,
		render: text => {
			return text ? text : '-'
		}
	}, {
		title: '详情',
		align: 'center',
		width: 300,
		render: (text, record) => {
			if (record.product_line && (record.product_line === '3' || record.product_line === '7' || record.product_line === '2')) {
				const str = record.product_line === '3' ? '订单ID' : record.product_line === '7' ? '拓展业务ID' : record.product_line === '2' ? '微闪投ID' : null;
				return <div>{str}：<a target='_blank' href={record.link}>{record.order_id}</a></div>
			} else {
				return record.remark
			}
		},
	}
]

export const adjustApplyFunc = (audit_type, application_status, quote_type, saleExport, handleJump, handleAction) => {
	return [
		{
			title: '申请编号',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 100,
		},
		{
			title: '申请状态',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 120,
			render: (text) => {
				const value = application_status.find(item => item.id == text);
				return value ? value.display : null
			}
		},
		{
			title: '申请人',
			dataIndex: 'real_name',
			key: 'real_name',
			align: 'center',
			width: 120,
		},
		{
			title: '公司简称',
			dataIndex: 'company_name',
			key: 'company_name',
			align: 'center',
			width: 120,
		},
		{
			title: '报价类型',
			dataIndex: 'quote_type',
			key: 'quote_type',
			align: 'center',
			width: 120,
			render: text => {
				const value = quote_type.find(item => item.id == text) || {};
				return <div>{value.display || '-'}</div>
			}
		},
		{
			title: '申请时间',
			dataIndex: 'created_at',
			key: 'created_at',
			align: 'center',
			width: 100
		},
		{
			title: '调价原因',
			dataIndex: 'reason',
			key: 'reason',
			align: 'center',
			width: 100,
			render: (text) => {
				return <Popover content={text} trigger="click">
					<a href='javascript:;'>查看</a>
				</Popover>
			}
		},
		{
			title: '邮件审批证明',
			dataIndex: 'attachment',
			key: 'attachment',
			align: 'center',
			width: 120,
			render: (text) => {
				const ary = text.split(',');
				const list = ary.map((item, index) => (<div className='thum-img-box' key={index}>
					<a href={item} target='_blank'><img src={item} /></a>
				</div>
				));
				const width = ary.length * 70;
				return text ? <Popover content={<div style={{ width: `${width}px`, height: '70px' }}>{list}</div>} trigger="click">
					<a href='javascript:;'>查看</a>
				</Popover> : '-'
			}
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			width: 140,
			render: (text, record) => {
				return [
					<a key='detail' type='primary' onClick={() => {
						handleJump(record.id, record.company_id);
					}}>订单详情</a>,
					saleExport ? <a key='export' style={{ marginLeft: 10 }} onClick={() => { handleAction('export', {readjust_application_id: record.id, audit_type}); }}>导出</a> : null
				]
			}
		}
	]
}

export const adjustApplyListFunc = (audit_type, application_status, quote_type, handleJump, handleAction) => {
	return [
		{
			title: '申请编号',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 100,
		},
		{
			title: '申请状态',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 120,
			render: (text) => {
				const value = application_status.find(item => item.id == text);
				const className = text == 3 ? 'dealed' : 'undealed';
				return value ? <div className={className}>
					<span></span>
					<div>{value.display}</div>
				</div> : null
			}
		},
		{
			title: '申请人',
			dataIndex: 'real_name',
			key: 'real_name',
			align: 'center',
			width: 120,
		},
		{
			title: '公司简称',
			dataIndex: 'company_name',
			key: 'company_name',
			align: 'center',
			width: 120,
		},
		{
			title: '报价类型',
			dataIndex: 'quote_type',
			key: 'quote_type',
			align: 'center',
			width: 120,
			render: text => {
				const value = quote_type.find(item => item.id == text) || {};
				return <div>{value.display || '-'}</div>
			}
		},
		{
			title: '申请时间',
			dataIndex: 'created_at',
			key: 'created_at',
			align: 'center',
			width: 100
		},
		{
			title: '调价原因',
			dataIndex: 'reason',
			key: 'reason',
			align: 'center',
			width: 100
		},
		{
			title: '邮件审批证明',
			dataIndex: 'attachment',
			key: 'attachment',
			align: 'center',
			width: 120,
			render: (text) => {
				const ary = text.split(',');
				const list = ary.map((item, index) => (<div className='thum-img-box' key={index}>
					<a href={item} target='_blank'><img src={item} /></a>
				</div>
				));
				const width = ary.length * 70;
				return text ? <Popover content={<div style={{ width: `${width}px`, height: '70px' }}>{list}</div>} trigger="click">
					<a href='javascript:;'>查看</a>
				</Popover> : '-'
			}
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			width: 190,
			render: (text, record) => {
				return <div className='adjust_list_operate_wrapper'>
					<a onClick={() => { handleJump(record.id, record.company_id); }}>订单详情</a>
					{record.status != '3' ?
						<a style={{ marginLeft: 10 }} onClick={() => { handleAction('pass', record.id, record.quote_type, record.company_id); }}>
							审核通过
						</a>
						: null}
					{record.status != '3' ?
						<a style={{ marginLeft: 10 }} onClick={() => { handleAction('reject', record.id); }}>
							驳回
						</a>
						: null}
					<a style={{ marginLeft: 10 }} onClick={() => { handleAction('export', {readjust_application_id: record.id, audit_type}); }}>导出</a>
				</div >
			}
		}
	]
}

export const addAdjustApplyConfig = (quote_type = [], platformIcon = []) => [
	{
		title: '订单ID',
		dataIndex: 'order_id',
		key: 'order_id',
		align: 'center',
		width: 180,
		fixed: 'left',
		render: (data, record) => {
			const { quote_type: quoteVal } = record;
			const value = quote_type.find(item => item.id == quoteVal) || {};
			return (
				<div>
					<div>{data}</div>
					<div>报价类型：{value.display || '-'}</div>
				</div>
			)
		}
	},
	{
		title: '公司简称',
		dataIndex: 'company_name',
		key: 'company_name',
		align: 'center',
		width: 230,
	},
	{
		title: '所属项目/品牌',
		dataIndex: 'project_name',
		key: 'project_name',
		width: 230,
		render: (text, record) => {
			const { brand_name } = record;
			return <div className={`left_content_td ${record.warningClass}`}>
				<div>所属项目：{text || '-'}</div>
				<div>所属品牌：{brand_name || '-'}</div>
			</div>
		}
	},
	{
		title: '需求ID/需求名称',
		dataIndex: 'requirement_id_name',
		key: 'requirement_id_name',
		width: 230,
		render: (text, { requirement_id = '-', requirement_name = '-', warningClass }) => {
			return <div className={`left_content_td ${warningClass}`}>
				<div>需求ID：{requirement_id}</div>
				<div>需求名称：{requirement_name}</div>
			</div>
		}
	},
	{
		title: '账号信息',
		dataIndex: 'account_id',
		key: 'account_id',
		width: 230,
		render: (data = '-', { weibo_name = '-', platform_id, warningClass }) => {
			const platformInfo = platformIcon.find(item => item.id == platform_id) || {};
			return <div className={`left_content_td platform_wrapper ${warningClass}`}>
				{platformInfo.platformIcon ? <img className='platform-icon-img' src={platformInfo.platformIcon} /> : null}
				<div>账号名称：{weibo_name}</div>
				<div>ID：{data}</div>
			</div>
		}
	},
	{
		title: '应约价',
		dataIndex: 'price',
		key: 'price',
		align: 'center',
		width: 320,
		render: (_, { price }) => {
			if(Array.isArray(price) && price.length)
				return <div>
					{price.map((item) => {
						return getPriceItemWithEquities(item);
					})}
				</div>
			return '-';
		}
	},
	{
		title: '最低售卖价',
		dataIndex: 'last_min_sell_price',
		key: 'last_min_sell_price',
		align: 'center',
		width: 320,
		render: (text) => {
			const node = text ? <div>
				{text.map((item, index) => {
					return <div key={index}>{`${item.price_label}:${item.min_sell_price}`}</div>
				})}
			</div> : '-';
			return node;
		}
	},
]

export const readyCheckFunc = (handleDelete) => {
	return [
		{
			title: '订单ID',
			dataIndex: 'order_id',
			key: 'order_id',
			align: 'center',
			width: 80
		},
		{
			title: '公司简称',
			dataIndex: 'company_name',
			key: 'company_name',
			align: 'center',
			width: 120
		},
		{
			title: '所属项目',
			dataIndex: 'project_name',
			key: 'project_name',
			align: 'center',
			width: 80,
			render: (text) => {
				return text ? text : '-'
			}
		},
		{
			title: '需求名称',
			dataIndex: 'requirement_name',
			key: 'requirement_name',
			align: 'center',
			width: 260
		},
		{
			title: '应约价',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
			render: (_, { price }) => {
				if(!(Array.isArray(price) && price.length))
					return '-';
				return <div>
					{price.map((item) => {
						return getPriceItemWithEquities(item);
					})}
				</div>
			}
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'left',
			width: 60,
			render: (_, record) => {
				return <a href='javascript:;' onClick={() => { handleDelete(record.order_id) }}>删除</a>
			}
		}
	]
}
const orderTagStyle = { display: 'inline-block', fontSize: '10px', width: 'fit-content', backgroundColor: 'red', color: '#fff', padding: '0 2px', marginRight: '2px' };
export const adjustApplyDetailFunc = (rel_order_status = [], quote_type = [], readjust_type = [], platformIcon = [], isFinance) => {
	return ary => {
		const configMap = {
			'prev_id': {
				title: '订单ID',
				dataIndex: 'order_id',
				key: 'order_id',
				width: 160,
				render: (text, record) => {
					const { quote_type: quoteVal, formula_version, trinity_type_name } = record;
					const value = quote_type.find(item => item.id == quoteVal) || {};

					return <div className={record.warningClass}>
						<div>{text}</div>
						<div>报价类型：{value.display || '-'}</div>
						<div style={{marginTop: '5px'}}>
							{
								record.plan_manager_id && record.plan_manager_id != '0' && 
								<div style={orderTagStyle}>含策划</div>
							}
							{
								isFinance && formula_version && 
								<div style={orderTagStyle}>{formula_version == 2 ? '已价税分离' : '未价税分离' }</div>
							}
							<div style={orderTagStyle}>{trinity_type_name}</div>
						</div>
					</div>
				}
			},
			'order_id': {
				title: '订单ID',
				dataIndex: 'order_id',
				key: 'order_id',
				width: 160,
				fixed: 'left',
				render: (text, record) => {
					const { quote_type: quoteVal, formula_version, trinity_type_name } = record;
					const value = quote_type.find(item => item.id == quoteVal) || {};

					return <div className={record.warningClass}>
						<div>{text}</div>
						<div>报价类型：{value.display || '-'}</div>
						<div style={{marginTop: '5px'}}>
							{
								record.plan_manager_id && record.plan_manager_id != '0' && 
								<div style={orderTagStyle}>含策划</div>
							}
							{
								isFinance && formula_version && 
								<div style={orderTagStyle}>{formula_version == 2 ? '已价税分离' : '未价税分离' }</div>
							}
							<div style={orderTagStyle}>{trinity_type_name}</div>
						</div>
					</div>
				}
			},
			'policy_id': {
				title: '政策',
				dataIndex: 'policy_id',
				key: 'policy_id',
				align: 'center',
				width: 60,
				render: (text) => {
					return text > 0 ? <a target="_blank" href={`/account/policy?id=${text}`}>查看</a> : '-'
				}
			},
			'status': {
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				width: 130,
				fixed: 'left',
				render: (text, record) => {
					const value = rel_order_status.find(item => item.id == text);
					let className = '';
					switch (text) {
						case 1:
							className = 'normal';
							break;
						case 2:
							className = 'resolve';
							break;
						case 3:
							className = 'reject';
							break;
						default:
							className = 'normal';
							break;
					}
					return value ? <div className={`${className} ${record.warningClass}`}>
						<span></span>
						<div>{value.display}</div>
					</div> : null
				}
			},
			'statusPre': {
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				width: 130,
				render: (text, record) => {
					const value = rel_order_status.find(item => item.id == text);
					let className = '';
					switch (text) {
						case 1:
							className = 'normal';
							break;
						case 2:
							className = 'resolve';
							break;
						case 3:
							className = 'reject';
							break;
						default:
							className = 'normal';
							break;
					}
					return value ? <div className={`${className} ${record.warningClass}`}>
						<span></span>
						<div>{value.display}</div>
					</div> : null
				}
			},
			'company_name': {
				title: '公司简称',
				dataIndex: 'company_name',
				key: 'company_name',
				width: 120,
				render: (text, record) => {
					return <div className={`${record.warningClass}`}>
						<div>{text || '-'}</div>
					</div>
				}
			},
			'project_name': {
				title: '所属项目/品牌',
				dataIndex: 'project_name',
				key: 'project_name',
				width: 160,
				render: (text, record) => {
					const { brand_name } = record;
					return <div className={`left_content_td ${record.warningClass}`}>
						<div>所属项目：{text || '-'}</div>
						<div>所属品牌：{brand_name || '-'}</div>
					</div>
				}
			},
			'requirement_id': {
				title: '需求ID',
				dataIndex: 'requirement_id',
				key: 'requirement_id',
				width: 80,
			},
			'requirement_name': {
				title: '需求名称',
				dataIndex: 'requirement_name',
				key: 'requirement_name',
				width: 160,
			},
			'requirement_id_name': {
				title: '需求ID/需求名称',
				dataIndex: 'requirement_id_name',
				key: 'requirement_id_name',
				width: 180,
				render: (text, { requirement_id = '-', requirement_name = '-', warningClass }) => {
					return <div className={`left_content_td ${warningClass}`}>
						<div>需求ID：{requirement_id}</div>
						<div>需求名称：{requirement_name}</div>
					</div>
				}
			},
			'account_id_name': {
				title: '账号信息/运营标签',
				dataIndex: 'account_id',
				key: 'account_id',
				width: 180,
				render: (data = '-', { weibo_name = '-', platform_id, warningClass, account_snapshot_tag_name = '' }) => {
					const platformInfo = platformIcon.find(item => item.id == platform_id) || {};
					const getTagComp = tags => {
						if(tags.length > 5) {
							return (
								<Tooltip placement='top' title={tags}>
									<div className='account_tag_comp'>{`${tags.substr(0, 5)}...`}</div>
								</Tooltip>
							)
						}else {
							return <div>{tags}</div>
						}
					}
					return <div className={`left_content_td platform_wrapper ${warningClass}`}>
						{platformInfo.platformIcon ? <img className='platform-icon-img' src={platformInfo.platformIcon} /> : null}
						<div>账号名称：{weibo_name}</div>
						<div style={{marginBottom: 0}}>ID：{data}</div>
						{
							account_snapshot_tag_name && account_snapshot_tag_name.length ? getTagComp(account_snapshot_tag_name) : null
						}
					</div>
				}
			},
			'account_id': {
				title: 'account id',
				dataIndex: 'account_id',
				key: 'account_id',
				width: 100,
			},
			'weibo_name': {
				title: '账号名称',
				dataIndex: 'weibo_name',
				key: 'weibo_name',
				width: 120,
				render: (data, record) => {
					return <div className={record.warningClass}>{data}</div>
				}
			},
			'platform_name': {
				title: '平台',
				dataIndex: 'platform_name',
				key: 'platform_name',
				align: 'center',
				width: 100,
				render: (data, record) => {
					return <div className={record.warningClass}>{data}</div>
				}
			},
			'main_account_info': {
				title: <Tooltip title={<div>
					<div>固定账期:发起订单调价申请时刻的账期</div>
					<div>实时账期:当前时刻的账期</div>
				</div>}>
					主账号信息<Icon style={{ marginLeft: 5 }} type="question-circle" />
				</Tooltip>,
				dataIndex: 'identity_name',
				key: 'identity_name',
				width: 180,
				render: (data, { order_default_cycle, default_cycle, partner_type_name, warningClass }) => {
					const defaultCycle = default_cycle ? `${default_cycle}天` : '-';
					const orderCycle = order_default_cycle ? `${order_default_cycle}天` : '-'
					return <div className={warningClass}>
						<div>主账号：{data}</div>
						<div>实时账期：{defaultCycle}</div>
						<div>固定账期：{orderCycle}</div>
						<div>合作方式：{partner_type_name}</div>
					</div>
				}
			},
			'main_account_info_sale': {
				title: '主账号信息',
				dataIndex: 'identity_name',
				key: 'identity_name',
				width: 180,
				render: (data, { partner_type_name, warningClass }) => {
					return <div className={warningClass}>
						<div style={{ marginBottom: 10 }}>主账号：{data}</div>
						<div>合作方式：{partner_type_name}</div>
					</div>
				}
			},
			'main_account_name': {
				title: '主账号名称',
				dataIndex: 'main_account_name',
				key: 'main_account_name',
				width: 120,
			},
			'plan_manager_id': {
				title: '是否含策划',
				dataIndex: 'plan_manager_id',
				key: 'plan_manager_id',
				width: 120,
				render: (_, record) => {
					return (
						<div className={record.warningClass}>
							{record.plan_manager_id == 0 ? '否' : '是'}
						</div>
					)
				}
			},
			'discount_rate': {
				title: '折扣比例',
				dataIndex: 'discount_rate',
				key: 'discount_rate',
				width: 80,
				render: (_, record) => {
					// const discount = record.price && record.price[0] ? record.price[0].discount_rate : 0;
					// return record.quote_type != '2' ? numeral(discount).format('0.00%') : '-'
					return (
						<div className={record.warningClass}>
							{record.quote_type != '2' ? record.price && record.price[0] ? numeral(record.price[0].discount_rate).format('0.00%') : 0 : '-'}
						</div>
					)
				}
			},
			'quoted_price': {
				title: '对外成本价',
				dataIndex: 'quoted_price',
				key: 'quoted_price',
				width: 320,
				render: (_, { price = [], warningClass }) => {
					// const flag = price && price[0] ? price[0].trinity_type == 2 : false;
					if(!(Array.isArray(price) && price.length))
						return '-';
					return <div className={warningClass}>
						{price.map(item => {
							const showObj = {
								isShowDetail: item.trinity_type == 2,
								isShowRate: false,
								titleLable: item.price_label,
								titlePrice: item.open_cost_price,
								bloggerPrice: item.private_open_cost_price,
								trilateralPrice: item.public_open_cost_price,
								equities: item.equities
							}
							return getPriceContent(showObj)
						})}
					</div>
				}
			},
			'discount_per': {
				title: '折扣比例',
				dataIndex: 'discount_per',
				key: 'discount_per',
				width: 70,
			},
			'published_price': {
				title: '刊例价/渠道价',
				dataIndex: 'published_price',
				key: 'published_price',
				width: 690,
				render: (_, record) => {
					const { platform_id, reference_price_doc, warningClass } = record;
					return [
						<div
							key='price_info'
							className={`${warningClass} price_info`}
							style={{ width: '100%', textAlign: 'center', border: '1px solid #e8e8e8', borderBottom: 0, padding: '6px 4px', fontWeight: 500, color: warningClass ? '' : 'rgba(0, 0, 0, 0.85)', background: '#fafafa' }}>
							各价格均为订单创建时刻的价格
						</div>,
						<Table
							rowKey='priceName'
							key='price_table'
							className={`pre_published_price_${warningClass}`}
							columns={getPublishedCol(platform_id == '9')}
							dataSource={reference_price_doc}
							bordered
							size="middle"
							pagination={false}
						/>
					]
				}
			},
			'order_bottom_price': {
				title: '订单底价',
				dataIndex: 'order_bottom_price',
				key: 'order_bottom_price',
				width: 320,
				render: (_, { price, warningClass }) => {
					// quote_type 判断展示利用率或服务费率
					// public_base_price 阳价 三方 public_base_profit_rate 利用率
					// private_base_price 阴价 博主 private_base_profit_rate 利用率
					// trinity_type === 2 显示阴阳价 判断是否展示
					if(!(Array.isArray(price) && price.length))
						return '-';
					return <div className={warningClass}>
						{price.map(item => {
							const { created_time } = item;
							const createTime = moment(created_time * 1000).format('YYYY-MM-DD HH:mm:ss');
							const isBefore = moment(createTime).isBefore('2019-08-01 22:00:00');
							const showObj = {
								isShowDetail: item.trinity_type == 2,
								isShowRate: !isBefore,
								rateTitle: item.quote_type == 2 ? '服务费率' : '利润率',
								titleLable: item.price_label,
								titlePrice: item.base_price,
								baseRate: item.quote_type == 2 ? item.service_fees_rate : item.private_base_profit_rate,
								bloggerPrice: item.private_base_price,
								bloggerRate: item.quote_type == 1 ? item.private_base_profit_rate : item.service_fees_rate,
								trilateralPrice: item.public_base_price,
								trilateralRate: item.quote_type == 1 ? item.public_base_profit_rate : item.service_fees_rate,
								equities: item.equities
							}
							return getPriceContent(showObj)
						})}
					</div>
				}
			},
			'commissioned_price': {
				title: '应约价',
				dataIndex: 'price',
				key: 'price',
				width: 320,
				render: (_, { price = [], warningClass }) => {
					// const flag = price && price[0] ? price[0].trinity_type == 2 : false;
					// private_quote_price 阴价 利用率  private_profit_rate
					// public_quote_price 阳价 利用率  public_profit_rate
					if(!(Array.isArray(price) && price.length))
						return '-';
					return <div className={warningClass}>
						{price.map(item => {
							const { created_time } = item;
							const createTime = moment(created_time * 1000).format('YYYY-MM-DD HH:mm:ss');
							const isBefore = moment(createTime).isBefore('2019-08-01 22:00:00');
							const showObj = {
								isShowDetail: item.trinity_type == 2,
								isShowRate: !isBefore,
								rateTitle: item.quote_type == 2 ? '服务费率' : '利润率',
								titleLable: item.price_label,
								titlePrice: item.quoted_price,
								baseRate: item.quote_type == 2 ? item.service_fees_rate : item.private_profit_rate,
								bloggerPrice: item.private_quote_price,
								bloggerRate: item.quote_type == 1 ? item.private_profit_rate : item.service_fees_rate,
								trilateralPrice: item.public_quote_price,
								trilateralRate: item.quote_type == 1 ? item.public_profit_rate : item.service_fees_rate,
								equities: item.equities
							}
							return getPriceContent(showObj);
						})}
					</div>
				}
			},
			'commissioned_price_sale': {
				title: '应约价',
				dataIndex: 'price',
				key: 'price',
				width: 320,
				render: (_, { price = [], warningClass }) => {
					// const flag = price && price[0] ? price[0].trinity_type == 2 : false;
					// private_quote_price 阴价 利用率  private_profit_rate
					// public_quote_price 阳价 利用率  public_profit_rate
					if(!(Array.isArray(price) && price.length))
						return '-';
					return <div className={warningClass}>
						{price.map(item => {
							const showObj = {
								isShowDetail: item.trinity_type == 2,
								isShowRate: false,
								titleLable: item.price_label,
								titlePrice: item.quoted_price,
								bloggerPrice: item.private_quote_price,
								trilateralPrice: item.public_quote_price,
								equities: item.equities,
							}
							return getPriceContent(showObj);
						})}
					</div>
				}
			},
			'price': {
				title: '应约价',
				dataIndex: 'price',
				key: 'price',
				width: 260,
				render: (_, { price = [] }) => {
					if(!(Array.isArray(price) && price.length))
						return '-';
					return <div>
						{price.map(item => {
							return getPriceItemWithEquities(item)
						})}
					</div>
				}
			},
			'history_min_sell_price': {
				title: '历史审核最低售卖价',
				dataIndex: 'history_min_sell_price',
				key: 'history_min_sell_price',
				width: 320,
				className: 'relative_td',
				render: (text, { history_min_sell_price: { readjust_type: readJustType } }) => {
					const item = text ? text.min_sell_price : [];
					const value = readjust_type.find(item => item.id == readJustType) || {};
					const node = Array.isArray(item) && item.length ? <div key='priceInfo'>
						{item.map(item => {
							const showObj = {
								isShowDetail: item.trinity_type == 2,
								isShowRate: false,
								titleLable: item.price_label,
								titlePrice: item.min_sell_price,
								bloggerPrice: item.private_min_sell_price,
								trilateralPrice: item.public_min_sell_price,
								equities: item.equities,
							}
							return getPriceContent(showObj);
						})}
					</div> : '-';
					//readjust_type
					// const pro = readjust_type == 2 ? <div key='tips' className='detail_price_info'>导入Excel方式调整</div> : null;
					const pro = value.display ? <div key='tips' className='detail_price_info'>{value.display}</div> : null;

					return [node, pro];
				}
			},
			'history_rate': {
				title: '历史审核利润率/服务费率',
				dataIndex: 'history_rate',
				key: 'history_rate',
				width: 120,
				render: (_, { history_min_sell_price = {}, quote_type, }) => {
					const item = history_min_sell_price ? history_min_sell_price.min_sell_price : [];
					const profitRate = history_min_sell_price.profit_rate || history_min_sell_price.profit_rate == 0 ? `${accMul(history_min_sell_price.profit_rate, 100)}%` : '-';
					const serviceRate = history_min_sell_price.service_rate || history_min_sell_price.service_rate == 0 ? `${accMul(history_min_sell_price.service_rate, 100)}%` : '-';
					const value = quote_type === '1' ? profitRate : quote_type === '2' ? serviceRate : '-';
					return item.length > 0 && history_min_sell_price.readjust_type == '1' ? value : '-';
				}
			},
			'min_sell_price': {
				title: '本次审核最低售卖价',
				dataIndex: 'min_sell_price',
				key: 'min_sell_price',
				width: 320,
				className: 'relative_td',
				render: (text, { readjust_type: readJustType }) => {
					const value = readjust_type.find(item => item.id == readJustType) || {};
					const node = Array.isArray(text) && text.length ? text.map(item => {
						const showObj = {
							isShowDetail: item.trinity_type == 2,
							isShowRate: false,
							titleLable: item.price_label,
							titlePrice: item.min_sell_price,
							bloggerPrice: item.private_min_sell_price,
							trilateralPrice: item.public_min_sell_price,
							equities: item.equities,
						}
						return getPriceContent(showObj);
					}) : '-';
					// const pro = readjust_type == 2 ? <div key='tips' className='detail_price_info'>导入Excel方式调整</div> : null;
					const pro = value.display ? <div key='tips' className='detail_price_info'>{value.display}</div> : null;

					return [node, pro];
				}
			},
			'pre_min_sell_price': {
				title: '本次审核最低售卖价',
				dataIndex: 'pre_min_sell_price',
				key: 'pre_min_sell_price',
				width: 320,
				render: (_, { pre_min_sell_price = [], warningClass }) => {
					// const flag = price && price[0] ? price[0].trinity_type == 2 : false;
					if(!(Array.isArray(pre_min_sell_price) && pre_min_sell_price.length))
						return '-';
					return <div className={warningClass}>
						{pre_min_sell_price.map(item => {
							const showObj = {
								isShowDetail: item.trinity_type == 2,
								isShowRate: false,
								titleLable: item.price_label,
								titlePrice: item.min_sell_price,
								bloggerPrice: item.private_min_sell_price,
								trilateralPrice: item.public_min_sell_price,
								equities: item.equities,
							}
							return getPriceContent(showObj);
						})}
					</div>
				}
			},
			'quote_type': {
				title: '本次利润率/服务费率',
				dataIndex: 'quote_type',
				key: 'quote_type',
				width: 90,
				render: (text, { profit_rate, service_rate, min_sell_price, readjust_type }) => {
					const profitRate = profit_rate || profit_rate == 0 ? `${accMul(profit_rate, 100)}%` : '-';
					const serviceRate = service_rate || service_rate == 0 ? `${accMul(service_rate, 100)}%` : '-';
					const value = text == '1' ? profitRate : text == '2' ? serviceRate : '-';
					return min_sell_price && readjust_type == '1' ? value : '-';
				}
			},
			'preview_quote_type': {
				title: '本次利润率/服务费率',
				dataIndex: 'quote_type',
				key: 'quote_type',
				width: 90,
				render: (_, { previewReadjustType, previewRateVal, warningClass }) => {
					const rateVal = previewRateVal || previewRateVal == 0 ? `${accMul(previewRateVal, 100)}%` : '-'
					return (
						<div className={warningClass}>
							{previewReadjustType == '1' ? rateVal : '-'}
						</div>
					);
				}
			},
			'pass_time': {
				title: '审核时间',
				dataIndex: 'pass_time',
				key: 'pass_time',
				width: 100,
				render: (text) => {
					const flag = text === '0000-00-00 00:00:00';
					return !flag ? text : '-';
				}
			},
			'auditor_name': {
				title: '审核人',
				dataIndex: 'auditor_name',
				key: 'auditor_name',
				width: 100,
				render: text => {
					return text || '-';
				}
			},
			'remark': {
				title: '备注',
				dataIndex: 'remark',
				key: 'remark',
				width: 140,
				render: (_, { remark }) => {
					if (remark && remark.length > 30) {
						return <div title={remark}>
							{remark.slice(0, 29) + '...'}
						</div>
					} else {
						return remark || '-'
					}
				}
			}
		}
		const array = ary.map(item => configMap[item]);
		return array;
	}
}

const render = data => {
	return data || data == 0 ? data : '-';
}

const publishRender = (data, record) => {
	const { createdTime } = record;
	const isOld = moment(createdTime).isAfter('2019-09-19 20:00:00');
	return isOld && (data || data == 0) ? data : '-';
}

const originalRender = (data, record) => {
	const { createdTimeOriginal } = record;
	const isOld = moment(createdTimeOriginal).isAfter('2019-09-19 20:00:00');
	return isOld && (data || data == 0) ? data : '-';
}

const priceNameRender = (data, record) => {
	if(!(data || data == 0))
		return '-';
	const equitiesStr = getEquities(record.equities);
	return data + equitiesStr;
}

const getPublishedCol = isWechat => {
	const wxCol = [
		{
			title: '',
			key: 'empty',
			children: [
				{
					title: '',
					dataIndex: 'priceName',
					width: 100,
					key: 'empty_child',
					render: priceNameRender
				}
			]
		},
		{
			title: '发布',
			key: 'publish',
			children: [
				{
					title: '刊例价',
					dataIndex: 'publicationPrice',
					key: 'publicationPrice',
					width: 50,
					align: 'center',
					render: publishRender
				},
				{
					title: '渠道价',
					dataIndex: 'channelPrice',
					key: 'channelPrice',
					width: 50,
					align: 'center',
					render: publishRender
				},
				{
					title: '微播易对外报价',
					dataIndex: 'quotePrice',
					key: 'quotePrice',
					width: 100,
					align: 'center',
					render
				},
			]
		},
		{
			title: '原创',
			key: 'original',
			children: [
				{
					title: '刊例价',
					dataIndex: 'publicationPriceOriginal',
					key: 'publicationPriceOriginal',
					width: 50,
					align: 'center',
					render: originalRender
				},
				{
					title: '渠道价',
					dataIndex: 'channelPriceOriginal',
					key: 'channelPriceOriginal',
					width: 50,
					align: 'center',
					render: originalRender
				},
				{
					title: '微播易对外报价',
					dataIndex: 'quotePriceOriginal',
					key: 'quotePriceOriginal',
					width: 100,
					align: 'center',
					render
				},
			]
		}
	];
	const otherCol = [
		{
			title: '',
			dataIndex: 'priceName',
			width: 100,
			key: 'empty_child',
			render: priceNameRender
		},
		{
			title: '刊例价',
			dataIndex: 'publicationPrice',
			key: 'publicationPrice',
			width: 50,
			align: 'center',
			render: publishRender
		},
		{
			title: '渠道价',
			dataIndex: 'channelPrice',
			key: 'channelPrice',
			width: 50,
			align: 'center',
			render: publishRender
		},
		{
			title: '微播易对外报价',
			dataIndex: 'quotePrice',
			key: 'quotePrice',
			width: 100,
			align: 'center',
			render
		},
	]

	return isWechat ? wxCol : otherCol;
}

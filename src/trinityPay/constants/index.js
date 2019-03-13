import React from 'react'
import { Button } from 'antd';
const SUCCEED = 'succeed';
const DEFEATED = 'defeated';
const REVOCATION = 'revocation';
export const prePayFunc = (handleModal) => [
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 200,
		render: (text, record) => {
			return <div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(record.payment_slip_id, SUCCEED, true);
					}}>打款成功</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(record.payment_slip_id, DEFEATED, true);
					}}>打款失败</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/invoice/relatedInvoice?payment_slip_id=${record.payment_slip_id}`}>发票关联</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(record.payment_slip_id, REVOCATION, true);
					}}>打款撤销</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/modification?type=prePay&payment_slip_id=${record.payment_slip_id}`}>编辑</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/detail?type=prePay&payment_slip_id=${record.payment_slip_id}`}>查看</Button>
				</div>
			</div>
		}
	},
	{
		title: '打款单ID',
		dataIndex: 'payment_slip_id',
		key: 'payment_slip_id',
		align: 'center',
		width: 100
	},
	{
		title: '平台',
		dataIndex: 'platform_name',
		key: 'platform_name',
		align: 'center',
		width: 100
	},
	{
		title: '三方代理商',
		dataIndex: 'agent_name',
		key: 'agent_name',
		align: 'center',
		width: 100

	},
	{
		title: '订单ID',
		dataIndex: 'public_order_id',
		key: 'public_order_id',
		align: 'center',
		width: 100

	},
	{
		title: '打款金额',
		dataIndex: 'payment_amount',
		key: 'payment_amount',
		align: 'center',
		width: 100
	},
	{
		title: '打款状态',
		dataIndex: 'payment_status',
		key: 'payment_status',
		align: 'center',
		width: 100
	},
	{
		title: '付款公司',
		dataIndex: 'payment_company',
		key: 'payment_company',
		align: 'center',
		width: 100
	},
	{
		title: '打款单生成日期',
		dataIndex: 'application_time',
		key: 'application_time',
		align: 'center',
		width: 100
	},
	{
		title: '主账号',
		dataIndex: 'user_name',
		key: 'user_name',
		align: 'center',
		width: 100
	},
	{
		title: '媒介经理',
		dataIndex: 'media_manager',
		key: 'media_manager',
		align: 'center',
		width: 100
	}
];
export const datePayFunc = (handleModal) => [
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 200,
		render: (text, record) => {
			return <div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(record.payment_slip_id, SUCCEED, true);
					}}>打款成功</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(record.payment_slip_id, DEFEATED, true);
					}}>打款失败</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/invoice/relatedInvoice?payment_slip_id=${record.payment_slip_id}`}>发票关联</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(record.payment_slip_id, REVOCATION, true);
					}}>打款撤销</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/modification?type=datePay&payment_slip_id=${record.payment_slip_id}`}>编辑</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/detail?type=datePay&payment_slip_id=${record.payment_slip_id}`}>查看</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/dealOrder?payment_slip_id=${record.payment_slip_id}`}>订单详情</Button>
				</div>
			</div>
		}
	},
	{
		title: '打款单ID',
		dataIndex: 'payment_slip_id',
		key: 'payment_slip_id',
		align: 'center',
		width: 100
	},
	{
		title: '结算单ID',
		dataIndex: 'summary_sheet_id',
		key: 'summary_sheet_id',
		align: 'center',
		width: 100
	},
	{
		title: '平台',
		dataIndex: 'platform_name',
		key: 'platform_name',
		align: 'center',
		width: 100
	},
	{
		title: '三方代理商',
		dataIndex: 'agent_name',
		key: 'agent_name',
		align: 'center',
		width: 100

	},
	{
		title: '打款金额',
		dataIndex: 'payment_amount',
		key: 'payment_amount',
		align: 'center',
		width: 100

	},
	{
		title: '打款状态',
		dataIndex: 'payment_status_desc',
		key: 'payment_status_desc',
		align: 'center',
		width: 100
	},
	{
		title: '付款公司',
		dataIndex: 'payment_company',
		key: 'payment_company',
		align: 'center',
		width: 100
	},
	{
		title: '申请日期',
		dataIndex: 'application_time',
		key: 'application_time',
		align: 'center',
		width: 100
	}
];
export const dealOrderCols = [
	{
		title: '订单ID',
		dataIndex: 'order_id',
		key: 'order_id',
		align: 'center',
		width: 100
	},
	{
		title: '订单类型',
		dataIndex: 'product_line_desc',
		key: 'product_line_desc',
		align: 'center',
		width: 100
	},
	{
		title: '平台',
		dataIndex: 'platform_name',
		key: 'platform_name',
		align: 'center',
		width: 100

	},
	{
		title: '三方平台订单ID',
		dataIndex: 'ttp_order_no',
		key: 'ttp_order_no',
		align: 'center',
		width: 100

	},
	{
		title: '三方代理商',
		dataIndex: 'agent_name',
		key: 'agent_name',
		align: 'center',
		width: 100
	},
	{
		title: '三方平台下单时间',
		dataIndex: 'ttp_place_order_at',
		key: 'ttp_place_order_at',
		align: 'center',
		width: 100
	},
	{
		title: '三方原始成本价',
		dataIndex: 'public_cost_price',
		key: 'public_cost_price',
		align: 'center',
		width: 100
	},
	{
		title: '成本调整',
		dataIndex: 'public_cost_price_adjustment',
		key: 'public_cost_price_adjustment',
		align: 'center',
		width: 100
	},
	{
		title: '剩余成本价',
		dataIndex: 'public_cost_price_residual',
		key: 'public_cost_price_residual',
		align: 'center',
		width: 100
	},
	{
		title: '打款金额',
		dataIndex: 'payment_amount',
		key: 'payment_amount',
		align: 'center',
		width: 100
	},
	{
		title: '打款单ID',
		dataIndex: 'payment_slip_id',
		key: 'payment_slip_id',
		align: 'center',
		width: 100
	},
	{
		title: '打款状态',
		dataIndex: 'payment_status_desc',
		key: 'payment_status_desc',
		align: 'center',
		width: 100
	},
	{
		title: '付款公司',
		dataIndex: 'payment_company',
		key: 'payment_company',
		align: 'center',
		width: 100
	},
];

export const prePayDetailColumns = [
	{
		title: '打款单ID：',
		dataIndex: 'payment_slip_id',
		key: 'payment_slip_id',
		align: 'center'
	}, {
		title: '订单ID：',
		dataIndex: 'order_id',
		key: 'order_id',
		align: 'center',

	}, {
		title: '三方平台订单ID：',
		dataIndex: 'ttp_order_no',
		key: 'ttp_order_no',
		align: 'center'
	}, {
		title: '订单类型：',
		dataIndex: 'product_line_desc',
		key: 'product_line_desc ',
		align: 'center',

	},
	{
		title: '平台：',
		dataIndex: 'platform_name',
		key: 'platform_name',
		align: 'center',
	},
	{
		title: '需求ID：',
		dataIndex: 'reservation_requirement_id',
		key: 'reservation_requirement_id',
		align: 'center',
	},
	{
		title: '三方代理商：',
		dataIndex: 'agent_name',
		key: 'agent_name',
		align: 'center',
	},
	{
		title: '需求名称：',
		dataIndex: 'reservation_requirement_name',
		key: 'reservation_requirement_name',
		align: 'center',
	},
	{
		title: '打款金额：',
		dataIndex: 'payment_amount',
		key: 'payment_amount',
		align: 'center',
	},
	{
		title: '公司简称：',
		dataIndex: 'company_name',
		key: 'company_name',
		align: 'center',
	},
	{
		title: '收款方式：',
		dataIndex: 'receipt_way',
		key: 'receipt_way',
		align: 'center',
	},
	{
		title: '所属销售：',
		dataIndex: 'salesperson_name',
		key: 'salesperson_name',
		align: 'center',
	},
	{
		title: '收款户名：',
		dataIndex: 'receipt_account_name',
		key: 'receipt_account_name',
		align: 'center',
	},
	{
		title: '付款公司：',
		dataIndex: 'payment_company',
		key: 'payment_company',
		align: 'center'
	},
	{
		title: '收款账号：',
		dataIndex: 'receipt_account',
		key: 'receipt_account',
		align: 'center'
	},
	{
		title: '回票方式：',
		dataIndex: 'invoice_way_desc',
		key: 'invoice_way_desc',
		align: 'center'
	},
	{
		title: '开户行：',
		dataIndex: 'opening_bank',
		key: 'opening_bank',
		align: 'center'
	},
	{
		title: '应回发票：',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
		align: 'center'
	},
	{
		title: '开户支行：',
		dataIndex: 'opening_bank_branch	',
		key: 'opening_bank_branch	',
		align: 'center'
	},
	{
		title: '发票盈余：',
		dataIndex: 'invoice_surplus',
		key: 'invoice_surplus',
		align: 'center'
	},
	{
		title: '申请时间：',
		dataIndex: 'application_time',
		key: 'application_time',
		align: 'center'
	},
	{
		title: '发票开具方：',
		dataIndex: 'beneficiary_company',
		key: 'beneficiary_company',
		align: 'center'
	},
	{
		title: '打款状态：',
		dataIndex: 'payment_status_desc',
		key: 'payment_status_desc',
		align: 'center'
	},
	{
		title: '主账号：',
		dataIndex: 'user_name',
		key: 'user_name',
		align: 'center'
	},
	{
		title: '打款成功/失败时间：',
		dataIndex: 'payment_time',
		key: 'payment_time',
		align: 'center'
	},
	{
		title: '媒介经理：',
		dataIndex: 'media_manager_name',
		key: 'media_manager_name',
		align: 'center'
	},
	{
		title: '打款截图：',
		dataIndex: 'payment_screenshot',
		key: 'payment_screenshot',
		align: 'center',
		render: (text) => {
			return <div>
				{text ? text.map((item, index) => {
					return <div className='thum-img-box' key={index}>
						<a href={item} target='_blank'><img src={item} /></a>
					</div>
				}) : null}
			</div>
		}
	}, {
		title: '打款备注：',
		dataIndex: 'payment_remark',
		key: 'payment_remark',
		align: 'center'
	},
	{
		title: '打款撤销备注：',
		dataIndex: 'payment_backout_reason',
		key: 'payment_backout_reason',
		align: 'center'
	}
];
export const datePayDetailColumns = [
	{
		title: '打款单ID：',
		dataIndex: 'payment_slip_id',
		key: 'payment_slip_id',
		align: 'center'
	}, {
		title: '申请时间',
		dataIndex: 'application_time',
		key: 'application_time',
		align: 'center',

	},
	{
		title: '平台：',
		dataIndex: 'platform_name',
		key: 'platform_name',
		align: 'center',
	},
	{
		title: '三方代理商：',
		dataIndex: 'agent_name',
		key: 'agent_name',
		align: 'center',
	},
	{
		title: '打款金额：',
		dataIndex: 'payment_amount',
		key: 'payment_amount',
		align: 'center',
	},
	{
		title: '收款方式：',
		dataIndex: 'receipt_way',
		key: 'receipt_way',
		align: 'center',
	},
	{
		title: '收款户名：',
		dataIndex: 'receipt_account_name',
		key: 'receipt_account_name',
		align: 'center',
	},
	{
		title: '开户行：',
		dataIndex: 'opening_bank',
		key: 'opening_bank',
		align: 'center'
	},
	{
		title: '收款账号：',
		dataIndex: 'receipt_account',
		key: 'receipt_account',
		align: 'center'
	},
	{
		title: '开户支行：',
		dataIndex: 'opening_bank_branch',
		key: 'opening_bank_branch',
		align: 'center'
	},
	{
		title: '打款状态：',
		dataIndex: 'payment_status_desc',
		key: 'payment_status_desc',
		align: 'center'
	},
	{
		title: '付款公司：',
		dataIndex: 'payment_company',
		key: 'payment_company',
		align: 'center'
	},
	{
		title: '打款成功/失败时间：',
		dataIndex: 'payment_time',
		key: 'payment_time',
		align: 'center'
	},
	{
		title: '回票方式：',
		dataIndex: 'invoice_way',
		key: 'invoice_way',
		align: 'center'
	},
	{
		title: '打款成功截图：',
		dataIndex: 'payment_screenshot',
		key: 'payment_screenshot',
		align: 'center',
		render: (text) => {
			return <div>
				{text ? text.map((item, index) => {
					return <div className='thum-img-box' key={index}>
						<a href={item} target='_blank'><img src={item} /></a>
					</div>
				}) : null}
			</div>
		}
	},
	{
		title: '应回发票：',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
		align: 'center'
	},
	{
		title: '打款备注：',
		dataIndex: 'payment_remark',
		key: 'payment_remark',
		align: 'center'
	},
	{
		title: '发票盈余：',
		dataIndex: 'invoice_surplus',
		key: 'invoice_surplus',
		align: 'center'
	}, {
		title: '打款撤销备注：',
		dataIndex: 'payment_backout_reason',
		key: 'payment_backout_reason',
		align: 'center'
	},
	{
		title: '发票开具方：',
		dataIndex: 'beneficiary_company',
		key: 'beneficiary_company',
		align: 'center'
	}
];
export const modificationColumns = type => {
	switch (type) {
		case 'prePay':
			return ['payment_slip_id', 'receipt_way', 'order_id', 'product_line_desc', 'sanfang', 'platform_name', 'agent_name', 'reservation_requirement_id', 'reservation_requirement_name', 'company_name', 'salesperson_name', 'payment_amount', 'receipt_way', 'receipt_account_name', 'receipt_account', 'opening_bank', 'opening_bank_branch', 'application_time', 'payment_status_desc', 'payment_time', 'payment_screenshot', 'payment_remark', 'payment_company', 'invoice_way_desc', 'invoice_amount', 'invoice_surplus', 'beneficiary_company', 'user_name', 'media_manager_name', 'payment_backout_reason']
		case 'datePay':
			return ['payment_slip_id', 'receipt_way', 'item_id', 'platform_name', 'agent_name', 'payment_amount', 'receipt_way', 'receipt_account_name', 'receipt_account', 'opening_bank', 'opening_bank_branch', 'application_time', 'payment_status_desc', 'payment_time', 'payment_screenshot', 'payment_remark', 'payment_company', 'invoice_way_desc', 'invoice_amount', 'invoice_surplus', 'beneficiary_company', 'payment_backout_reason']
		default:
			return [];
	}
}

import React from 'react'
import { InputNumber, Button } from 'antd'
export const relatedInvoiceFunc = (handleDel) => [
	{
		title: '发票号',
		dataIndex: 'invoice_number',
		key: 'invoice_number',
		align: 'center',
		width: 100
	},
	{
		title: '发票开具方',
		dataIndex: 'beneficiary_company',
		key: 'beneficiary_company',
		align: 'center',
		width: 100
	},
	{
		title: '三方代理商',
		dataIndex: 'business_account_name',
		key: 'business_account_name',
		align: 'center',
		width: 100

	},
	{
		title: '发票金额',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
		align: 'center',
		width: 100

	},
	{
		title: '本次使用金额',
		dataIndex: 'use_amount',
		key: 'use_amount',
		align: 'center',
		width: 100
	},
	{
		title: '发票余额',
		dataIndex: 'rest_amount',
		key: 'rest_amount',
		align: 'center',
		width: 100
	},
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 100,
		render: (text, record) => {
			return <Button type='primary' onClick={() => {
				handleDel(record.invoice_number)
			}}>删除</Button>
		}
	}
];
export const availableInvoiceFunc = (selectedRowKeys, handleChange) => [
	{
		title: '发票号',
		dataIndex: 'invoice_number',
		key: 'invoice_number',
		align: 'center',
		width: 100
	},
	{
		title: '发票开具方',
		dataIndex: 'beneficiary_company',
		key: 'beneficiary_company',
		align: 'center',
		width: 100
	},
	{
		title: '三方代理商',
		dataIndex: 'business_account_name',
		key: 'business_account_name',
		align: 'center',
		width: 100
	},
	{
		title: '发票抬头',
		dataIndex: 'invoice_title',
		key: 'invoice_title',
		align: 'center',
		width: 100
	},
	{
		title: '发票金额',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
		align: 'center',
		width: 100
	},
	{
		title: '发票余额',
		dataIndex: 'rest_amount',
		key: 'rest_amount',
		align: 'center',
		width: 100
	},
	{
		title: '使用金额',
		dataIndex: 'price',
		key: 'price',
		align: 'center',
		width: 100,
		render: (text, record) => {
			return <div>
				<InputNumber id={`${record.invoice_number}`} formatter={value => `${value}`.replace(/[^\d||.]/g, '')} disabled={selectedRowKeys.includes(record.invoice_number)} onChange={(value) => {
					handleChange(value, record);
				}} />
				<p className={`red-font ${record.invoice_number}`} style={{ display: 'none', margin: 0 }}>使用金额应小于发票余额!</p>
			</div>
		}
	}
];

import React from 'react'
import { Input, Button } from 'antd'
export const readyRelatedFunc = (handleCancel) => [
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
		title: '发票余额',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
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
		title: '代理商',
		dataIndex: 'agent_name',
		key: 'agent_name',
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
		dataIndex: 'use_amount',
		key: 'use_amount',
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
				handleCancel(record.invoice_number)
			}}>删除</Button>
		}
	}
];
export const relatedInvoiceFunc = (handleSubmit) => [
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
		title: '发票余额',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
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
		title: '发票抬头',
		dataIndex: 'invoice_title',
		key: 'invoice_title',
		align: 'center',
		width: 100

	},
	{
		title: '代理商',
		dataIndex: 'agent_name',
		key: 'agent_name',
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
				<Input id={`${record.invoice_number}`} />
				{/* <p className={`red-font ${record.invoice_number}`} style={{ display: 'none', margin: 0 }}>请输入正确的金额!</p> */}
			</div>
		}
	},
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 100,
		render: (text, record) => {
			return <Button type='primary' onClick={() => {
				handleSubmit(record.invoice_number)
			}}>使用</Button>
		}
	}
];

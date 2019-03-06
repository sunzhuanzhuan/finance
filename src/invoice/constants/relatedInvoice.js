import React from 'react'
import { Input } from 'antd'
export const readyRelatedFunc = (handleModal) => [
	{
		title: '发票号',
		dataIndex: 'a',
		key: 'a',
		align: 'center',
		width: 100
	},
	{
		title: '发票开具方',
		dataIndex: 'b',
		key: 'b',
		align: 'center',
		width: 100
	},
	{
		title: '发票余额',
		dataIndex: 'c',
		key: 'c',
		align: 'center',
		width: 100

	},
	{
		title: '平台',
		dataIndex: 'd',
		key: 'd',
		align: 'center',
		width: 100

	},
	{
		title: '代理商',
		dataIndex: 'h',
		key: 'h',
		align: 'center',
		width: 100
	},
	{
		title: '发票余额',
		dataIndex: 'o',
		key: 'o',
		align: 'center',
		width: 100
	},
	{
		title: '使用金额',
		dataIndex: 'p',
		key: 'p',
		align: 'center',
		width: 100
	},
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 100
	}
];
export const relatedInvoiceFunc = (handleModal) => [
	{
		title: '发票号',
		dataIndex: 'a',
		key: 'a',
		align: 'center',
		width: 100
	},
	{
		title: '发票开具方',
		dataIndex: 'b',
		key: 'b',
		align: 'center',
		width: 100
	},
	{
		title: '发票余额',
		dataIndex: 'c',
		key: 'c',
		align: 'center',
		width: 100

	},
	{
		title: '平台',
		dataIndex: 'd',
		key: 'd',
		align: 'center',
		width: 100

	},
	{
		title: '发票抬头',
		dataIndex: 'z',
		key: 'z',
		align: 'center',
		width: 100

	},
	{
		title: '代理商',
		dataIndex: 'h',
		key: 'h',
		align: 'center',
		width: 100
	},
	{
		title: '发票余额',
		dataIndex: 'o',
		key: 'o',
		align: 'center',
		width: 100
	},
	{
		title: '使用金额',
		dataIndex: 'p',
		key: 'p',
		align: 'center',
		width: 100,
		render: (text, record) => {
			return <Input />
		}
	},
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 100
	}
];

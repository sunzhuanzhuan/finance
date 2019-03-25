import React from 'react'
import { Input, Button } from 'antd'
export const trinityInvoiceFunc = (handleModal, handleDelete) => [
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 100,
		render: (text, record) => {
			return <div>
				<div>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal('modification', true)
					}}>编辑</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal('check', true)
					}}>查看</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleDelete(record.invoice_number)
					}}>删除</Button>
				</div>
			</div>
		}
	},
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
		dataIndex: 'agent_name',
		key: 'agent_name',
		align: 'center',
		width: 100
	},
	{
		title: '发票总金额',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
		align: 'center',
		width: 100
	},
	{
		title: '发票内容',
		dataIndex: 'invoice_content',
		key: 'invoice_content',
		align: 'center',
		width: 100

	},
	{
		title: '发票类型',
		dataIndex: 'invoice_type',
		key: 'invoice_type',
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
		title: '发票状态',
		dataIndex: 'invoice_status',
		key: 'invoice_status',
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
		title: '开票日期',
		dataIndex: 'invoice_make_out_time',
		key: 'invoice_make_out_time',
		align: 'center',
		width: 100
	}
];

export const modalMapping = {
	'1': 'new',
	'2': 'modification',
	'3': 'check'
}

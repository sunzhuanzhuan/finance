import React from 'react'
import { Button } from 'antd'
export const trinityInvoiceFunc = (handleModal, handleCheckModal, handleDelete) => [
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
		dataIndex: 'invoice_type_desc',
		key: 'invoice_type_desc',
		align: 'center',
		width: 100
	},
	{
		title: '发票抬头',
		dataIndex: 'invoice_title_desc',
		key: 'invoice_title_desc',
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
	},
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
						handleModal('modification', true, record)
					}}>编辑</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleCheckModal(true, record)
					}}>查看</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleDelete(record.invoice_number)
					}}>删除</Button>
				</div>
			</div>
		}
	}
];

export const checkModalCols = [
	{
		title: '发票来源',
		dataIndex: 'invoice_source',
		key: 'invoice_source',
		align: 'center',
	},
	{
		title: '发票号',
		dataIndex: 'invoice_number',
		key: 'invoice_number',
		align: 'center',
	},
	{
		title: '三方代理商',
		dataIndex: 'business_account_name',
		key: 'business_account_name',
		align: 'center',
	},
	{
		title: '发票抬头',
		dataIndex: 'invoice_title_desc',
		key: 'invoice_title_desc',
		align: 'center',
	},
	{
		title: '发票开具方',
		dataIndex: 'beneficiary_company',
		key: 'beneficiary_company',
		align: 'center',
	},
	{
		title: '发票内容',
		dataIndex: 'invoice_content',
		key: 'invoice_content',
		align: 'center',
	},
	{
		title: '发票类型',
		dataIndex: 'invoice_type_desc',
		key: 'invoice_type_desc',
		align: 'center',
	},
	{
		title: '发票税率',
		dataIndex: 'invoice_tax_rate',
		key: 'invoice_tax_rate',
		align: 'center',
	},
	{
		title: '发票总金额',
		dataIndex: 'invoice_amount',
		key: 'invoice_amount',
		align: 'center',
	},
	{
		title: '发票金额',
		dataIndex: 'invoice_pure_amount',
		key: 'invoice_pure_amount',
		align: 'center',
	},
	{
		title: '发票税额',
		dataIndex: 'invoice_tax_amount',
		key: 'invoice_tax_amount',
		align: 'center',
	},
	{
		title: '发票状态',
		dataIndex: 'invoice_status',
		key: 'invoice_status',
		align: 'center',
	},
	{
		title: '发票余额',
		dataIndex: 'rest_amount',
		key: 'rest_amount',
		align: 'center',
	},
	{
		title: '开票日期',
		dataIndex: 'invoice_make_out_time',
		key: 'invoice_make_out_time',
		align: 'center',
	},
	{
		title: '录入日期',
		dataIndex: 'invoice_created_time',
		key: 'invoice_created_time',
		align: 'center',
	},
	{
		title: '备注',
		dataIndex: 'remark',
		key: 'remark',
		align: 'center',
	},
]

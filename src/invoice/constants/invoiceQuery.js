import React from 'react';
import { Popconfirm, Popover } from 'antd';
export const getInvoiceQueryOptions = () => {
	return [
        {label: '开票日期', key: 'time', compType: 'date', submitKey:['invoice_time_start', 'invoice_time_end']},
        {label: '发票号', key: 'invoice_number', compType: 'input', placeholder: '支持多个输入，以逗号隔开'},
        {label: '发票类型', key: 'invoice_type', compType: 'select', optionKey: 'invoice_type', idKey: 'id', labelKey: 'display', showSearch: true},
		{label: '发票内容', key: 'invoice_content', compType: 'select', optionKey: 'invoice_content', idKey: 'display', labelKey: 'display', showSearch: true},
		{label: '发票抬头', key: 'invoice_title', compType: 'searchSelect', actionKey: 'invoiceTitle', dataIndex: ['invoice_title', 'invoice_title'], keyWord: 'invoice_title'},
        {label: '公司简称', key: 'company_id', compType: 'searchSelect', placeholder: '支持多个选择', mode: 'multiple', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '开票公司', key: 'beneficiary_company', compType: 'select', optionKey: 'beneficiary_company', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '发票状态', key: 'status', compType: 'select', optionKey: 'status', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '申请单ID', key: 'invoice_application_id', compType: 'input', placeholder: '支持多个输入，以逗号隔开'},
		{label: '线上/线下发票', key: 'is_offline', compType: 'select', optionKey: 'is_offline', idKey: 'id', labelKey: 'display', showSearch: true},
        {compType: 'operate', key: 'operate'}
    ]
}

export const getInvoiceQueryStatisticsOptions = () => {
	return [
		{ title: '总记个数', key: 'invoice_count', tips: '' },
		{ title: '总计金额', key: 'invoice_amount', tips: '' },
		{ title: '线上已开个数', key: 'invoice_used_count', tips: '' },
		{ title: '线上已开票金额', key: 'invoice_used_amount', tips: '' },
		{ title: '作废个数', key: 'invoice_voided_count', tips: '' },
		{ title: '作废金额', key: 'invoice_voided_amount', tips: '' },
		{ title: '红字个数', key: 'invoice_red_count', tips: '' },
		{ title: '红字金额', key: 'invoice_red_amount', tips: '' },
	]
}

export const getInvoicePopContent = (option, values = {}) => {
	return (
		<div className='invoice_popover_content'>
			{
				option.map(item => {
					const { label, key } = item;
					return (
						<div key={key}>
							<span className='popover_title'>{label}</span>
							<span>{values[key]}</span>
						</div>
					)
				})
			}
		</div>
	)
}

export const getInvoiceQueryCol = (handleAction) => {
	return [
		{ 
			title: '发票号',
			dataIndex: 'invoice_number',
			key: 'invoice_number',
			align: 'center',
			width: 100,
			render: (data, record) => {
				const { status, is_offline_name, red_invoice_info = {} } = record;
				const contentArr = [
					{ label: '发票号：', key: 'invoice_number' },
					{ label: '金额：', key: 'amount' },
					{ label: '操作人：', key: 'operation_user' },
					{ label: '操作时间：', key: 'operation_time' },
				];
				return (
					<div>
						{
							status === '5' ?
							<Popover 
								overlayClassName='invoice_popover_wrapper'
								placement="top" title='红字发票' 
								content={getInvoicePopContent(contentArr, red_invoice_info)} trigger="click"
							>
								<a>{data}</a>
							</Popover> :
							<div>{data}</div>
						}
						{ record.is_offline_name && <span className='invoice_is_offline_text'>{is_offline_name}</span> }
					</div>
				)
			}
		},
		{ 
			title: '发票状态',
			dataIndex: 'status_name',
			key: 'status_name',
			align: 'center',
			width: 80,
		},
		{ 
			title: '发票类型',
			dataIndex: 'invoice_type_name',
			key: 'invoice_type_name',
			align: 'center',
			width: 80,
		},
		{ 
			title: '开票公司',
			dataIndex: 'beneficiary_company_name',
			key: 'beneficiary_company_name',
			align: 'center',
			width: 110,
		},
		{ 
			title: '公司简称',
			dataIndex: 'company_name',
			key: 'company_name',
			align: 'center',
			width: 110,
		},
		{ 
			title: '发票抬头',
			dataIndex: 'invoice_title',
			key: 'invoice_title',
			align: 'center',
			width: 110,
		},
		{ 
			title: '发票金额（元）',
			dataIndex: 'amount',
			key: 'amount',
			align: 'center',
			width: 120,
		},
		{ 
			title: '发票内容',
			dataIndex: 'invoice_content',
			key: 'invoice_content',
			align: 'center',
			width: 110,
		},
		{ 
			title: '操作时间',
			dataIndex: 'invoice_time',
			key: 'invoice_time',
			align: 'center',
			width: 170,
			render: (_, record) => {
				const timeOption = [
					{ title: '开票时间：', key: 'invoice_time' },
					{ title: '作废时间：', key: 'void_time' },
					{ title: '红字时间：', key: 'redmark_time' },
				]
				return timeOption.map(item => {
					const { key, title } = item;
					if(record[key]) {
						return <div key={title}>{title}{record[key]}</div>
					}
				})
			}
		},
		{ 
			title: '申请单ID',
			dataIndex: 'invoice_application_id',
			key: 'invoice_application_id',
			align: 'center',
			width: 100,
			render: (data) => {
				if(Array.isArray(data) && data.length) {
					return data.map((item, index) => {
						const sign = index < data.length - 1;
						return [
							<a style={{display: 'inline-block'}} target='_blank' key={item} href={`/finance/invoice/applyDetail?id=${item}`}>{item}</a>,
							sign ? <span key={`${item}_sign`}>,</span> : null
						]
					})
				}
				return null
			}
		},
		{
			title: '操作',
			key: 'operate',
			align: 'center',
			width: 90,
			render: (_, record) => {
				const { status, invoice_number, is_offline } = record;
				return status === '1' && is_offline !== '1' ? 
					<Popconfirm
						placement="topRight"
						title={`确定要对${invoice_number}发票进行线下处理操作吗？`}
						onConfirm={() => {handleAction(record.id)}}
						okText="确定"
						cancelText="取消"
					>
						<a>线下使用</a>
					</Popconfirm> : null;
			}
		}
	]
}

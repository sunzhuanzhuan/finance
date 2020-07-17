import React from 'react';
import { Popconfirm } from 'antd';
export const getInvoiceQueryOptions = () => {
	return [
        {label: '开票日期', key: 'time', compType: 'date', submitKey:['invoice_time_start', 'invoice_time_end']},
        {label: '发票号', key: 'invoice_number', compType: 'input'},
        {label: '发票类型', key: 'invoice_type', compType: 'select', optionKey: 'invoice_type', idKey: 'id', labelKey: 'display', showSearch: true},
		{label: '发票内容', key: 'invoice_content', compType: 'select', optionKey: 'invoice_content', idKey: 'id', labelKey: 'display', showSearch: true},
		{label: '发票抬头', key: 'invoice_title', compType: 'searchSelect', actionKey: 'invoiceTitle', dataIndex: ['id', 'invoice_title'], keyWord: 'invoice_title'},
        {label: '公司简称', key: 'company_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '开票公司', key: 'beneficiary_company', compType: 'select', optionKey: 'beneficiary_company', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '发票状态', key: 'status', compType: 'select', optionKey: 'status', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '申请单ID', key: 'invoice_application_id', compType: 'input'},
		{label: '线上/线下发票', key: 'is_offline', compType: 'select', optionKey: 'is_offline', idKey: 'id', labelKey: 'display', showSearch: true},
        {compType: 'operate', key: 'operate'}
    ]
}

export const getInvoiceQueryStatisticsOptions = () => {
	return [
		{ title: '发票总数', key: 'invoice_total_count' },
		{ title: '总记个数', key: 'invoice_count' },
		{ title: '总计金额', key: 'invoice_amount' },
		{ title: '已开个数', key: 'invoice_used_count' },
		{ title: '线上已开票金额', key: 'invoice_used_amount' },
		{ title: '作废个数', key: 'invoice_voided_count' },
		{ title: '作废金额', key: 'invoice_voided_amount' },
		{ title: '红字个数', key: 'invoice_red_count' },
		{ title: '红字金额', key: 'invoice_red_amount' },
	]
}

export const getInvoiceQueryCol = (handleAction) => {
	return [
		{ 
			title: '发票号',
			dataIndex: 'invoice_number',
			key: 'invoice_number',
			align: 'center',
			width: 100,
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
			title: '发票抬头',
			dataIndex: 'invoice_title',
			key: 'invoice_title',
			align: 'center',
			width: 120,
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
			width: 120,
		},
		{ 
			title: '操作时间',
			dataIndex: 'invoice_time',
			key: 'invoice_time',
			align: 'center',
			width: 120,
			render: data => {
				const getDataArr = dataSource => {
					if(data) {
						const dataArr = dataSource.split(' ');
						if(Array.isArray(dataArr) && dataArr.length) {
							return dataArr.map((item, index) => <div key={item + index}>{item}</div>)
						}else {
							return null
						}
					}
				} 
				return getDataArr(data)
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
					return data.map(item => <a style={{display: 'inline-block'}} key={item} href={`/finance/invoice/applyDetail?id=${item}`}>{item}</a>)
				}
				return null
			}
		},
		{
			title: '操作',
			key: 'operate',
			align: 'center',
			width: 100,
			render: (_, record) => {
				const { status, invoice_number } = record;
				return status === '1' ? 
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

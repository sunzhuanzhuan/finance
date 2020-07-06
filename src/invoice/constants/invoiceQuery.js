import React from 'react'

export const getInvoiceQueryOptions = () => {
	return [
        {label: '开票日期', key: 'time', compType: 'date', submitKey:['created_at_start', 'created_at_end']},
        {label: '发票号', key: 'invoicenum', compType: 'input'},
        {label: '发票类型', key: 'sale_id', compType: 'select', optionKey: 'salerData', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '发票内容', key: 'verification_code', compType: 'select', optionKey: 'salerData', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '发票抬头', key: 'campaign_name', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '公司简称', key: 'company_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '开票公司', key: 'order_ids', compType: 'select', optionKey: 'salerData', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '发票状态', key: 'state', compType: 'select', optionKey: 'salerData', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '申请单ID', key: 'id', compType: 'input'},
		{label: '线上/线下发票', key: 'business_name', compType: 'select', optionKey: 'salerData', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {compType: 'operate', key: 'operate'}
    ]
}

export const getInvoiceQueryStatisticsOptions = () => {
	return [
		{ title: '发票总数', key: 'sdfwe' },
		{ title: '总记个数', key: 'twr' },
		{ title: '总计金额', key: 'asdf' },
		{ title: '已开个数', key: 'sdwe' },
		{ title: '线上已开票金额', key: 'awersd' },
		{ title: '作废个数', key: 'sdgdsf' },
		{ title: '作废金额', key: 'hfd' },
		{ title: '红字个数', key: 'cgdr' },
		{ title: '红字金额', key: 'yerf' },
	]
}

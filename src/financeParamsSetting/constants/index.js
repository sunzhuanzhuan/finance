import React from 'react'
import { Statistic } from 'antd'
import { accMul } from '@/util'
export const financeParams = [
	{ label: '工作室服务费率', key: 'work_room_service_rate', isPercent: true },
	{ label: '工作室平均回票税率', key: 'work_room_average_return_rate', isPercent: true },
	{ label: '微播易销项税税率', key: 'wby_output_tax_rate', isPercent: true },
	{ label: '布谷鸟销项税税率', key: 'bgn_output_tax_rate', isPercent: true },
	// { label: '周打款限额', key: 'week_pay_ceiling' },
	{ label: '专票6%->专票3% 扣款比例', key: 'vat_special_invoice_6_to_3', isPercent: true },
	{ label: '专票6%->专票1% 扣款比例', key: 'vat_special_invoice_6_to_1', isPercent: true },
	{ label: '专票6%->普票0% 扣款比例', key: 'vat_special_invoice_6_to_0', isPercent: true },
	{ label: '专票6%->不回票 扣款比例', key: 'vat_special_invoice_6_to_no_return', isPercent: true },
	{ label: '专票3%->专票1% 扣款比例', key: 'vat_special_invoice_3_to_1', isPercent: true },
	{ label: '专票3%->普票0% 扣款比例', key: 'vat_special_invoice_3_to_0', isPercent: true },
	{ label: '专票3%->不回票 扣款比例', key: 'vat_special_invoice_3_to_no_return', isPercent: true },
	{ label: '专票1%->普票0% 扣款比例', key: 'vat_special_invoice_1_to_0', isPercent: true },
	{ label: '专票1%->不回票 扣款比例', key: 'vat_special_invoice_1_to_no_return', isPercent: true },
	{ label: '普票0% ->不回票 扣款比例', key: 'vat_common_invoices_0_to_no_return', isPercent: true },

];

export const historyCol = (title, isPercent) => {

	return [
		{
			title: '修改时间',
			dataIndex: 'modifiedAt',
			key: 'modifiedAt',
			align: 'center'
		},
		{
			title: '操作人',
			dataIndex: 'realName',
			key: 'realName',
			align: 'center'
		},
		{
			title,
			dataIndex: 'itemValue',
			key: 'itemValue',
			align: 'center',
			render: data => {
				return isPercent ? `${accMul(data, 100)}%` : <Statistic className='numberStastic' value={data}/>;
			}
		}
	]
}

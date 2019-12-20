import React from 'react'
import { Statistic } from 'antd'
export const financeParams = [
	{ label: '工作室服务费率', key: 'work_room_service_rate', isPercent: true },
	{ label: '工作室平均回票税率', key: 'work_room_average_return_rate', isPercent: true },
	{ label: '微播易销项税税率', key: 'wby_output_tax_rate', isPercent: true },
	{ label: '布谷鸟销项税税率', key: 'bgn_output_tax_rate', isPercent: true },
	{ label: '周打款限额', key: 'week_pay_ceiling' },
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
				return isPercent ? `${multipliedByHundred(data)}%` : <Statistic className='numberStastic' value={data}/>;
			}
		}
	]
}

export const multipliedByHundred = (str) => {
	let floatVal = parseFloat(str);
	if (isNaN(floatVal)) {
		return 0;
	}
	floatVal = Math.round(str * 10000) / 100;
	return floatVal;
}
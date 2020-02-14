import React from 'react'
import { Statistic } from 'antd'
export const financeParams = [
	{ label: '工作室服务费率', key: 'work_room_service_rate', isPercent: true },
	{ label: '工作室平均回票税率', key: 'work_room_average_return_rate', isPercent: true },
	{ label: '微播易销项税税率', key: 'wby_output_tax_rate', isPercent: true },
	{ label: '布谷鸟销项税税率', key: 'bgn_output_tax_rate', isPercent: true },
	// { label: '周打款限额', key: 'week_pay_ceiling' },
	{ label: '专票6%->专票3% 扣款税率', key: 'vat_special_invoice_6_to_3', isPercent: true },
	{ label: '专票6%->普票0% 扣款税率', key: 'vat_special_invoice_6_to_0', isPercent: true },
	{ label: '专票6%->不回票 扣款税率', key: 'vat_special_invoice_6_to_no_return', isPercent: true },
	{ label: '专票3%->普票0% 扣款税率', key: 'vat_special_invoice_3_to_0', isPercent: true },
	{ label: '专票3%->不回票 扣款税率', key: 'vat_special_invoice_3_to_no_return', isPercent: true },
	{ label: '普票0% ->不回票 扣款税率', key: 'vat_common_invoices_0_to_no_return', isPercent: true },

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

export const accDiv = (arg1,arg2) => { 
	let t1=0;
	let t2=0;
	let r1;
	let r2; 
	if(!arg1)
		return 0;
    try{t1=arg1.toString().split(".")[1].length}catch(e){t1}
    try{t2=arg2.toString().split(".")[1].length}catch(e){t2}
	r1=Number(arg1.toString().replace(".",""))
	r2=Number(arg2.toString().replace(".",""))
	return (r1/r2)*Math.pow(10,t2-t1);
}

export const accMul = (arg1,arg2) => { 
	if(!arg1)
		return 0;
	let m=0;
	let s1=arg1.toString();
	let s2=arg2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){m} 
    try{m+=s2.split(".")[1].length}catch(e){m} 
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
} 
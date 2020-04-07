import React from 'react';
import { Popconfirm, Modal } from 'antd';

function handleDelInfo(name) {
	Modal.warning({
		title: `请先删除${name}下面添加的账号信息`,
		okText: '确定'
	});
}
export const getDealRateData = (data, type) => {
	let floatVal = parseFloat(data);
	if (isNaN(floatVal))
		return undefined;
	if(type === 'mul') {
		return accMulRate(data, 100);
	}else if(type === 'div') {
		return percentToValueRate(data)
	}else if(type === 'number') {
		return floatVal;
	}
}
const getRateRangeComp = (rateArr) => {
	if(Array.isArray(rateArr) && rateArr.length) 
		return rateArr.map((item, index) => {
			const { minInclude, min, maxInclude, max, privateProfit, publicProfit } = item;
			const leftItem = isIncludeArr.find(item => item.value == minInclude) || {};
			const rightItem = isIncludeArr.find(item => item.value == maxInclude) || {};
			const yinVal = getDealRateData(privateProfit, 'mul');
			const yangVal = getDealRateData(publicProfit, 'mul');
			return (
				<div className='rate-range-text' key={index}>
					<span className='range-val'>{`${leftItem.leftSign}${Number(min)}，${Number(max)}${rightItem.rightSign}`}</span>
					{yinVal !== undefined ? <span>{`阴价利润率 ${yinVal}%`}</span> : null}
					{yinVal !== undefined && yangVal !== undefined ? <span>，</span> : null}
					{yangVal !== undefined ? <span>{`阳价利润率 ${yangVal}%`}</span> : null}
				</div>
			)
		})
}
export const getRateSettingCol = (handleOperate) => {
	return [
		{
			title: '策略ID',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: '10%',
		},
		{
			title: '策略名称',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			width: '13%',
		},
		{
			title: '账号利润率',
			dataIndex: 'detailVOList',
			key: 'detailVOList',
			align: 'center',
			width: '37%',
			render: (data) => {
				return getRateRangeComp(data)
			}
		},
		{
			title: '备注',
			dataIndex: 'celuebeizhu',
			key: 'celuebeizhu',
			align: 'center',
			width: '13%',
		},
		{
			title: '操作',
			dataIndex: 'caozuo',
			key: 'caozuo',
			align: 'center',
			className: 'operate-col',
			width: '27%',
			render: (_, record) => {
				const { name } = record;
				const isDelete = record.name;
				return [
					<a key='edit' onClick={() => handleOperate('edit', record)}>修改</a>,
					isDelete ? 
						<Popconfirm
							key='delete'
							title={`该${name}下没有添加相关账号信息 ,确定删除${name}吗？`}
							onConfirm={() => handleOperate('delete')}
							okText="确定"
							cancelText="取消"
						>
							<a key='delete'>删除</a>
						</Popconfirm>
						: 
						<a key='delete' onClick={() => handleDelInfo(name)}>删除</a>,
					<a key='detail' onClick={() => handleOperate('detail')}>查看账号</a>,
					<a key='export' onClick={() => handleOperate('export')}>导出账号</a>,
					<Popconfirm
						key='clear'
						title="清空当前策略下的全部账号信息？"
						onConfirm={() => handleOperate('clear')}
						okText="确定"
						cancelText="取消"
					>
						<a>清空账号</a>
					</Popconfirm>
				]
			}
		}
	]
}

export const isIncludeArr = [
	{ value: 0, leftSign: '(', rightSign: ')' },
	{ value: 1, leftSign: '[', rightSign: ']' },
];

export const getRateDetailCol = (type, handleOperate, profitStrategyId, profitStrategyName) => {
	const allCol = [
		{
			title: '账号ID',
			dataIndex: 'accountId',
			key: 'accountId',
			align: 'center',
			width: '10%',
		},
		{
			title: '账号名',
			dataIndex: 'snsName',
			key: 'snsName',
			align: 'center',
			width: '20%',
		},
		{
			title: '平台',
			dataIndex: 'platformName',
			key: 'platformName',
			align: 'center',
			width: '20%',
		},
		{
			title: '主账号',
			dataIndex: 'identityName',
			key: 'identityName',
			align: 'center',
			width: '20%',
		},
		{
			title: '资源媒介',
			dataIndex: 'ownerAdminName',
			key: 'ownerAdminName',
			align: 'center',
			width: '20%',
		},
		{
			title: '操作',
			dataIndex: 'operate',
			key: 'operate',
			align: 'center',
			width: '10%',
			render: (_, record) => {
				const { accountId, snsName } = record;
				profitStrategyId, profitStrategyName
				return type === 'detailPage' ? 
					<Popconfirm
						placement="topRight"
						title={`确定要删除${profitStrategyId} ${profitStrategyName}下的${accountId} ${snsName}？`}
						onConfirm={() => handleOperate('delAccount', record.accountId)}
						okText="确定"
						cancelText="取消"
					>
						<a>删除</a>
					</Popconfirm>
					:
					<a onClick={() => handleOperate(record.accountId)}>删除</a>
			}
		}
	];
	return type !== 'addPage' ? allCol : allCol.filter(item => item.key !== 'operate');
}

/**
 * 乘法运算
 * @param {Number} arg1
 * @param {Number} arg2
 */
export const accMulRate = (arg1,arg2) => { 
	if(!arg1)
		return 0;
	let m=0;
	let s1=arg1.toString();
	let s2=arg2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){m} 
    try{m+=s2.split(".")[1].length}catch(e){m} 
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
} 
/**
 * 百分比转换为小数
 * @param {Number} value
 */
export const percentToValueRate = (value) => {
    value = value + '';
    const pointIndex = value.indexOf('.');
    if (pointIndex === -1) return (value - 0) / 100;
    const powIndex = value.length - pointIndex - 1;
    return (value.replace('.', '') - 0) / Math.pow(10, powIndex + 2);
}

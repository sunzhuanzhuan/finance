import React from 'react';
import { Popconfirm } from 'antd';
import { percentToValue, accMul } from '@/util';

export const getDealRateData = (data, type) => {
	let floatVal = parseFloat(data);
	const sign = data < 0;
	if (isNaN(floatVal))
		return undefined;
	if(type === 'mul') {
		return sign ? '-' + accMul(Math.abs(data), 100) : accMul(data, 100);
	}else if(type === 'div') {
		return sign ? '-' + percentToValue(Math.abs(data)) : percentToValue(data);
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
					<div className='range-val'>{`${leftItem.leftSign}${Number(min)}，${Number(max)}${rightItem.rightSign}`}</div>
					<div className='range-rate-val'>
						{yinVal !== undefined ? <span>{`利润率 ${yinVal}%`}</span> : null}
						{yinVal !== undefined && yangVal !== undefined ? <span>，</span> : null}
						{yangVal !== undefined ? <span>{`三方平台利润率 ${yangVal}%`}</span> : null}
					</div>
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
			render: data => {
				return <div style={{wordBreak: 'break-all'}}>{data}</div>
			}
		},
		{
			title: '账号利润率',
			dataIndex: 'detailVOList',
			key: 'detailVOList',
			align: 'center',
			width: '38%',
			render: (data) => {
				return getRateRangeComp(data)
			}
		},
		{
			title: '备注',
			dataIndex: 'remark',
			key: 'remark',
			align: 'center',
			width: '14%',
			render: data => {
				return <div style={{wordBreak: 'break-all'}}>{data}</div>
			}
		},
		{
			title: '操作',
			dataIndex: 'operate',
			key: 'operate',
			align: 'center',
			className: 'operate-col',
			width: '25%',
			render: (_, record) => {
				const { name } = record;
				const style={display: 'inline-block'};
				return [
					<a style={style} key='edit' onClick={() => handleOperate('edit', record)}>修改</a>,
					<a style={style} key='delete' onClick={() => handleOperate('delete', record)}>删除</a>,
					<a style={style} key='detail' onClick={() => handleOperate('detail', record)}>查看账号</a>,
					<a style={style} key='export' onClick={() => handleOperate('export', record)}>导出账号</a>,
					<Popconfirm
						key='clear'
						title="清空当前策略下的全部账号信息？"
						onConfirm={() => handleOperate('clear', record)}
						okText="确定"
						cancelText="取消"
					>
						<a style={style}>清空账号</a>
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
			title: 'accountID',
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
			render: (data, record) => {
				const { url, platformId, accountId } = record;
				return [
					<a key='snsName' href={`/account/manage/update/${platformId}?account_id=${accountId}`} target='_blank'>{data}</a>,
					<a key='url' href={url} target='_blank' style={{marginLeft: '10px'}}>url</a>
				]
			}
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
				const profitInfo = profitStrategyId && profitStrategyName ? `${profitStrategyId} ${profitStrategyName}` : '该策略';
				return type === 'detailPage' ? 
					<Popconfirm
						placement="topRight"
						title={<div>确定要删除<span className='color_highlight'>{profitInfo}</span>下的{accountId} {snsName || ''}？</div>}
						onConfirm={() => handleOperate('delAccount', accountId)}
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

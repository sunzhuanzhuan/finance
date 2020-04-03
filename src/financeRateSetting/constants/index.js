import React from 'react';
import { Popconfirm, Modal } from 'antd';

function handleDelInfo(name) {
	Modal.warning({
		title: `请先删除${name}下面添加的账号信息`,
		okText: '确定'
	});
}
export const getRateSettingCol = (handleOperate) => {
	return [
		{
			title: '策略ID',
			dataIndex: 'celueid',
			key: 'celueid',
			align: 'center',
			width: '10%',
		},
		{
			title: '策略名称',
			dataIndex: 'celuename',
			key: 'celuename',
			align: 'center',
			width: '13%',
		},
		{
			title: '账号利润率',
			dataIndex: 'zhanghaolirunlv',
			key: 'zhanghaolirunlv',
			align: 'center',
			width: '37%',
		},
		{
			title: '备注',
			dataIndex: 'beizhu',
			key: 'beizhu',
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
				const { celuename } = record;
				const isDelete = record.celuename;
				return [
					<a key='edit' onClick={() => handleOperate('edit')}>修改</a>,
					isDelete ? 
						<Popconfirm
							key='delete'
							title="是否删除该策略？"
							onConfirm={() => handleOperate('delete')}
							okText="确定"
							cancelText="取消"
						>
							<a key='delete'>删除</a>
						</Popconfirm>
						: 
						<a key='delete' onClick={() => handleDelInfo(celuename)}>删除</a>,
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

export const getRateDetailCol = () => {
	return [
		{
			title: '账号ID',
			dataIndex: 'zhnghaoid',
			key: 'zhnghaoid',
			align: 'center',
			width: '10%',
		},
		{
			title: '账号名',
			dataIndex: 'zhanghaoming',
			key: 'zhanghaoming',
			align: 'center',
			width: '20%',
		},
		{
			title: '平台',
			dataIndex: 'pingtai',
			key: 'pingtai',
			align: 'center',
			width: '20%',
		},
		{
			title: '主账号',
			dataIndex: 'zhuzhanghao',
			key: 'zhuzhanghao',
			align: 'center',
			width: '20%',
		},
		{
			title: '资源媒介',
			dataIndex: 'ziyuanmeijie',
			key: 'ziyuanmeijie',
			align: 'center',
			width: '20%',
		},
		{
			title: '操作',
			dataIndex: 'operate',
			key: 'operate',
			align: 'center',
			width: '10%',
		}
	]
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

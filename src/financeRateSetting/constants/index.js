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
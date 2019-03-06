import React from "react";
import qs from 'qs';
export const zhangListFunc = (handleNewModal) => {
	return [
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			fixed: 'left',
			width: 100,
			render: (text, record) => {
				return <span>
					<a href='javascript:;' onClick={() => {
						handleNewModal(record)
					}}>详情</a>
				</span>
			}
		},
		{
			title: '订单类型',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			width: 100,
		},
		{
			title: '公司简称',
			dataIndex: 'sale_id',
			key: 'sale_id',
			align: 'center',
			width: 100,
		},
		{
			title: '需求ID',
			dataIndex: 'month',
			key: 'month',
			align: 'center',
			width: 100,
		},
		{
			title: '需求名称',
			dataIndex: 'original_target',
			key: 'original_target',
			align: 'center',
			width: 100,
		},
		{
			title: '所属销售',
			dataIndex: 'distribute_target',
			key: 'distribute_target',
			align: 'center',
			width: 100,
		},
		{
			title: '主账号',
			dataIndex: 'video_target',
			key: 'video_target',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '账号名称',
			dataIndex: 'not_video_target',
			key: 'not_video_target',
			align: 'center',
			width: 100,
		},
		{
			title: '合作方类型',
			dataIndex: 'all_target',
			key: 'all_target',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '媒介经理',
			dataIndex: 'all_target1',
			key: 'all_target1',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '平台',
			dataIndex: 'all_target2',
			key: 'all_target2',
			width: 100,
			align: 'center',
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '三方代理商',
			dataIndex: 'all_target3',
			key: 'all_target3',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '订单执行状态',
			dataIndex: 'all_target4',
			key: 'all_target4',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '三方标识',
			dataIndex: 'all_target5',
			key: 'all_target5',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '账号报价',
			dataIndex: 'all_target6',
			key: 'all_target6',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '三方平台下单价',
			dataIndex: 'all_target7',
			key: 'all_target7',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '订单成本价',
			dataIndex: 'all_target8',
			key: 'all_target8',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '应约价（厂商）',
			dataIndex: 'all_target9',
			key: 'all_target9',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '执行价',
			dataIndex: 'all_target12',
			key: 'all_target12',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		}
		

	];
}

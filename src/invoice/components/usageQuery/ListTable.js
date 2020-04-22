import React, { Component } from 'react'
import { Table, Alert, Icon } from 'antd'

export default class ListTable extends Component {
	render() {
		const { isNoShowColumnsTitle } = this.props
		const dataSource = [
			{
				key: '1',
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
			},
			{
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
			},
		];

		const columns = [
			{
				title: '发票号',
				dataIndex: 'invoice_number',
				key: 'invoice_number',
			},
			{
				title: '发票开具方',
				dataIndex: 'beneficiary_company',
				key: 'beneficiary_company',
			},
			{
				title: '主账号',
				dataIndex: 'user_id',
				key: 'user_id',
			},
			{
				title: '三方代理商',
				dataIndex: 'business_account_id',
				key: 'business_account_id',
			},
			{
				title: '发票总金额',
				dataIndex: 'name1',
				key: 'name1',
			},
			{
				title: '发票税率',
				dataIndex: 'name2',
				key: 'name2',
			},
			{
				title: '发票类型',
				dataIndex: 'namedd',
				key: 'namedd',
			},
			{
				title: '发票状态',
				dataIndex: 'name3',
				key: 'name3',
			},
			{
				title: '发票录入时间',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '订单ID',
				dataIndex: 'order_id',
				key: 'order_id',
			},
			{
				title: '订单应约税率',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '预付金额',
				dataIndex: 'names12',
				key: 'name12',
			},
			{
				title: '扣款金额',
				dataIndex: 'name13',
				key: 'name13',
			},
			{
				title: '打款金额',
				dataIndex: 'name23',
				key: 'name23',
			},
			{
				title: '本次使用金额',
				dataIndex: 'name33',
				key: 'name33',
			},
			{
				title: '使用时间',
				dataIndex: 'invoice_use_time',
				key: 'invoice_use_time',
			},

			{
				title: '打款类型',
				dataIndex: 'namec',
				key: 'namec',
			},
			{
				title: '打款单ID',
				dataIndex: 'namea',
				key: 'namea',
			}, {
				title: '打款时间',
				dataIndex: 'names',
				key: 'names',
			}, {
				title: '媒介经理',
				dataIndex: 'named',
				key: 'named',
			},
		].filter(one => !isNoShowColumnsTitle.includes(one.title));
		return (
			<div style={{ paddingTop: 20 }}>
				<Alert style={{ marginBottom: 20 }} message={<div><Icon className='theme-font-color' theme="filled" type="info-circle" />   当前筛选条件下共 <span className='theme-font-color'>x</span> 条
		发票总金额 <span className='theme-font-color'>xxx</span> 元
		打款金额 <span className='theme-font-color'>xxx</span> 元
		扣款金额 <span className='theme-font-color'>xxx</span> 元
		使用金额 <span className='theme-font-color'>xxx</span> 元
			</div>} type="info" />
				<Table
					dataSource={dataSource}
					columns={columns}
					pagination={{
						total: 100,
						//pageSize,
						//current: pageNum,
						showSizeChanger: true,
						showQuickJumper: true,
						onChange: (currentPage, pageSize) => {
						},
						onShowSizeChange: (current, size) => {
						}
					}}
				/>
			</div>
		)
	}
}





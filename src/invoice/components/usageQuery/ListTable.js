import React, { Component } from 'react'
import { Table, Alert, Icon } from 'antd'

export default class ListTable extends Component {
	render() {
		const { isNoShowColumnsTitle, list = {}, scrollX } = this.props
		const { rows = [], aggregation = {}, pagination = {} } = list

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
				dataIndex: 'identity_name',
				key: 'identity_name',
			},
			{
				title: '三方代理商',
				dataIndex: 'business_account_id',
				key: 'business_account_id',
			},
			{
				title: '发票信息',
				dataIndex: 'name1',
				key: 'name1',
				width: '200px',
				render: (text, record) => {
					return <div>
						<div>发票类型：{record.invoice_type}</div>
						<div>发票税率：{record.invoice_tax_rate}</div>
						<div>发票总金额：{record.invoice_amount}元</div>
					</div>
				}
			},
			{
				title: '发票状态',
				dataIndex: 'invoice_status',
				key: 'invoice_status',
			},
			{
				title: '发票录入时间',
				dataIndex: 'invoice_created_time',
				key: 'invoice_created_time',
			},
			{
				title: '订单ID',
				dataIndex: 'order_id',
				key: 'order_id',
			},
			{
				title: '订单应约税率',
				dataIndex: 'accept_reservation_tax_rate',
				key: 'accept_reservation_tax_rate',
			},
			{
				title: '预付金额',
				dataIndex: 'prepayment_amount',
				key: 'prepayment_amount',
			},
			{
				title: '扣款金额',
				dataIndex: 'invoice_deduction_amount',
				key: 'invoice_deduction_amount',
			},
			{
				title: '打款金额',
				dataIndex: 'payment_amount',
				key: 'payment_amount',
			},
			{
				title: '本次使用金额',
				dataIndex: 'invoice_use_amount',
				key: 'invoice_use_amount',
			},
			{
				title: '使用时间',
				dataIndex: 'invoice_use_time',
				key: 'invoice_use_time',
			},

			{
				title: '打款信息',
				dataIndex: 'namec',
				key: 'namec',
				width: '180px',
				render: (text, record) => {
					return <div>
						<div>打款单ID：{record.payment_id}</div>
						<div>打款类型：{record.payment_type}</div>
						<div>打款时间：{record.payment_time}</div>
					</div>
				}
			},
			{
				title: '媒介经理',
				dataIndex: 'owner_admin_name',
				key: 'owner_admin_name',
			},
		].filter(one => !isNoShowColumnsTitle.includes(one.title));
		return (
			<div style={{ paddingTop: 20 }}>
				<Alert style={{ marginBottom: 20 }} message={<div><Icon className='theme-font-color' theme="filled" type="info-circle" />   当前筛选条件下共 <span className='theme-font-color'>{pagination.total}</span> 条
		发票总金额 <span className='theme-font-color'>{aggregation.total_invoice_amount}</span> 元
		打款金额 <span className='theme-font-color'>{aggregation.total_payment_amount}</span> 元
		扣款金额 <span className='theme-font-color'>{aggregation.total_deduction_amount}</span> 元
		使用金额 <span className='theme-font-color'>{aggregation.total_invoice_use_amount}</span> 元
			</div>} type="info" />
				<Table
					dataSource={rows}
					columns={columns}
					scroll={{ x: scrollX || 1600 }}
					pagination={{
						total: pagination.total,
						pageSize: pagination.page_size || 10,
						current: pagination.page || 1,
						showSizeChanger: true,
						showQuickJumper: true,
						onChange: (currentPage, pageSize) => {
							this.props.onSearchList({ page: currentPage, page_size: pageSize })
						},
						onShowSizeChange: (current, size) => {
							this.props.onSearchList({ page: 1, page_size: size })
						}
					}}
				/>
			</div>
		)
	}
}





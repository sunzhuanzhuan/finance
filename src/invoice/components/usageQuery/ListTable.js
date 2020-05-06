import React, { Component } from 'react'
import { Table, Alert, Icon, Badge, Popover } from 'antd'
import moment from 'moment'
const invoiceStatusMap = {
	1: '已关联',
	0: '未关联'
}
const invoiceTypeMap = {
	1: '专票',
	2: '普票'
}
const getDate = (date) => {
	return moment(date * 1000).format('YYYY-MM-DD HH:ss:mm')
}
export default class ListTable extends Component {
	render() {
		const { isNoShowColumnsTitle, list = {}, paymentTypeMap = {} } = this.props
		const { rows = [], aggregation = {}, pagination = {} } = list

		const columns = [
			{
				title: '发票号/开具方',
				dataIndex: 'invoice_number',
				key: 'invoice_number',
				width: 140,
				render: (text, record) => {
					return <div>
						<div>{record.invoice_number}</div>
						<div >{record.beneficiary_company}</div>
						<div>
							{record.invoice_status == 0 && <Badge status="default" />}
							{record.invoice_status == '已使用' && <Badge status="processing" />}
							{record.invoice_status}
						</div>
					</div>
				}
			},
			{
				title: '三方代理商',
				dataIndex: 'business_account_name',
				key: 'business_account_name',
			},
			{
				title: '发票信息',
				dataIndex: 'name1',
				key: 'name1',
				width: '180px',
				render: (text, record) => {
					return <div>
						<div>类型：{invoiceTypeMap[record.invoice_type]}</div>
						<div>税率：{record.invoice_tax_rate}</div>
						<div>总金额：{record.invoice_amount}</div>
					</div>
				}
			},
			{
				title: '发票录入/关联时间',
				dataIndex: 'invoice_created_time',
				key: 'invoice_created_time',
				width: '200px',
				align: 'center',
				render: (text, record) => {
					return <div>
						<div>录入：{text}</div>
						{record.invoice_status == 1 && <div>关联：{record.invoice_use_time}</div>}
					</div>
				}
			},
			{
				title: '关联金额',
				dataIndex: 'invoice_use_amount',
				key: 'invoice_use_amount',
				render: (text, record) => record.invoice_status == 1 ? text : null
			},
			{
				title: '订单信息',
				dataIndex: 'order_id',
				key: 'order_id',
				width: 150,
				render: (text, record) => {
					return <div>
						<div>ID：{text}</div>
						<div>应约税率：{record.accept_reservation_tax_rate}</div>
						<div>打款金额：{record.payment_amount}</div>
					</div>
				}
			},
			{
				title: '扣款金额',
				dataIndex: 'invoice_deduction_amount',
				key: 'invoice_deduction_amount',
			},
			{
				title: '打款信息',
				dataIndex: 'namec',
				key: 'namec',
				width: '200px',
				render: (text, record) => {
					return <div>
						<div>ID：{record.payment_id}</div>
						<div>类型：{paymentTypeMap[record.payment_type]}</div>
						<div>时间：{record.payment_time}</div>
					</div>
				}
			},
			{
				title: '媒介信息',
				dataIndex: 'owner_admin_name',
				key: 'owner_admin_name',
				width: '150px',
				render: (text, record) => {
					return <div>
						<div>媒介经理：{record.owner_admin_name}</div>
						<div>主账号：{record.identity_name}</div>
					</div>
				}
			},
		].filter(one => !isNoShowColumnsTitle.includes(one.title));
		const alertInfoList = [
			{ name: '当前筛选条件下共', number: pagination.total, unit: '条' },
			{ name: '发票总金额 ', number: aggregation.total_invoice_amount },
			{ name: '打款金额 ', number: aggregation.total_payment_amount },
			{ name: '扣款金额 ', number: aggregation.total_deduction_amount },
			{ name: '关联金额 ', number: aggregation.total_invoice_use_amount },

		]
		return (
			<div style={{ paddingTop: 20 }}>
				<Alert style={{ marginBottom: 20 }} message={<div><Icon className='theme-font-color' theme="filled" type="info-circle" />
					<InfoList list={alertInfoList} />
				</div>} type="info" />
				<Table
					dataSource={rows}
					columns={columns}
					scroll={{ y: 400 }}
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



const InfoList = ({ list = [] }) => {
	return list.map(one => <span key={one.name} style={{ marginLeft: 6 }}>
		{one.name}
		<span className='theme-font-color' style={{ margin: '0px 2px' }}>{one.number}</span>
		{one.unit}
	</span>)
}

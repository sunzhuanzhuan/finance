import React, { Component } from 'react'
import { Table, Alert, Icon, Badge, Popover, Skeleton } from 'antd'
import moment from 'moment'
import './ListTable.less'
import MultiClamp from 'react-multi-clamp';
import Scolltable from "../../../components/Scolltable";
const invoiceStatusMap = {
	1: '已使用',
	0: '未使用'
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
		const { isNoShowColumnsTitle, list = {}, noDeduction, sumLoading, paymentTypeMap = {}, aggregation = {}, searchParams } = this.props
		const { rows = [], pagination = {} } = list

		const columns = [
			{
				title: '发票号/开具方',
				dataIndex: 'invoice_number',
				key: 'invoice_number',
				width: 140,
				render: (text, record) => {
					return <div>
						<Popover
							title='发票号'
							content={<div style={{ wordBreak: 'break-all' }}>{record.invoice_number}</div>}
							overlayStyle={{ width: 200 }}
						>
							<div className='ellipsis-nowrap'>{record.invoice_number}</div>
						</Popover>
						<Popover
							title='发票开具方'
							content={<div style={{ wordBreak: 'break-all' }}>{record.beneficiary_company}</div>}
							overlayStyle={{ width: 200 }}
						>
							{/* <div className='ellipsis-nowrap'>{record.beneficiary_company}</div> */}
							<MultiClamp ellipsis="..." clamp={2}>{record.beneficiary_company}</MultiClamp>

						</Popover>
						{/* <div>
							{record.invoice_status == 0 && <Badge status="default" />}
							{record.invoice_status == 1||record.invoice_status==2 && <Badge status="processing" />}
							{invoiceStatusMap[record.invoice_status]}
						</div> */}
					</div>
				}
			},
			{
				title: '主账号',
				dataIndex: 'identity_name',
				key: 'identity_name',
				align: 'center',
				width: 100,
			},
			{
				title: '三方代理商',
				dataIndex: 'business_account_name',
				key: 'business_account_name',
				align: 'center',
				width: 140,
			},
			{
				title: '发票信息',
				dataIndex: 'name1',
				key: 'name1',
				width: 180,
				render: (text, record) => {
					return <div>
						<div>类型：{invoiceTypeMap[record.invoice_type]}</div>
						<div>税率：{record.invoice_tax_rate}</div>
						<div>总金额：{record.invoice_amount}</div>
					</div>
				}
			},
			{
				title: '发票录入/使用时间',
				dataIndex: 'invoice_created_time',
				key: 'invoice_created_time',
				width: 200,
				align: 'center',
				render: (text, record) => {
					return <div>
						<div>录入：{text}</div>
						{(record.invoice_status == 1 || record.invoice_status == 2) ? <div>使用：{record.invoice_use_time}</div> : null}
					</div>
				}
			},
			{
				title: '发票使用金额',
				dataIndex: 'invoice_use_amount',
				key: 'invoice_use_amount',
				align: 'center',
				render: (text, record) => (record.invoice_status == 1 || record.invoice_status == 2) ? text : null
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
						<div>媒介经理：{record.owner_admin_name}</div>
					</div>
				}
			},
			{
				title: '打款信息',
				dataIndex: 'namec',
				key: 'namec',
				width: 200,
				render: (text, record) => {
					return <div >
						<div>ID：{record.payment_id}</div>
						<div>类型：{paymentTypeMap[record.payment_type]}</div>
						<div>时间：{record.payment_time}</div>
					</div>
				}
			},
			{
				title: '扣款/打款金额',
				dataIndex: 'invoice_deduction_amount',
				key: 'invoice_deduction_amount',
				width: 100,
				render: (text, record) => {
					return <div style={{ minWidth: 100 }}>
						<div>扣款：{text}</div>
						<div>打款：{record.payment_amount}</div>
					</div>
				}
			},
			{
				title: '打款金额',
				dataIndex: 'payment_amount',
				key: 'payment_amount',
				align: 'center',
				width: 100,
			},
		].filter(one => !isNoShowColumnsTitle.includes(one.title));
		const alertInfoList = [
			{ name: '当前筛选条件下共', number: pagination.total, unit: '条' },
			{ name: '发票总金额 ', number: aggregation.total_invoice_amount },
			{ name: '打款金额 ', number: aggregation.total_payment_amount },
			{ name: '扣款金额 ', number: aggregation.total_deduction_amount, noShow: noDeduction },
			{ name: '发票使用金额', number: aggregation.total_invoice_use_amount },

		]
		const scrollParams = rows.length > 0 ? { scroll: { y: 500 } } : {}
		return (
			<div style={{ paddingTop: 20 }} className='list-table-usage-box'>
				<Skeleton loading={sumLoading} active paragraph={false} rows={1} >
					<Alert style={{ marginBottom: 20 }}
						message={<div>
							<Icon className='theme-font-color' theme="filled" type="info-circle" />
							<InfoList list={alertInfoList} />
						</div>} type="info" />
				</Skeleton>
				<Table
					dataSource={rows}
					columns={columns}
					{...scrollParams}
					rowKey={(record, index) => record.invoice_number + index}
					pagination={{
						total: pagination.total,
						pageSize: Number(pagination.page_size || 10),
						current: Number(pagination.page || 1),
						showSizeChanger: true,
						showQuickJumper: true,
						onChange: (currentPage, pageSize) => {
							this.props.onSearchList({ ...searchParams, page: currentPage, page_size: pageSize })
						},
						onShowSizeChange: (current, size) => {
							this.props.onSearchList({ ...searchParams, page: 1, page_size: size })
						}
					}}
				/>
			</div>
		)
	}
}



const InfoList = ({ list = [] }) => {
	return list.map(one => one.noShow ? null : <span key={one.name} style={{ marginLeft: 6 }}>
		{one.name}
		<span className='theme-font-color' style={{ margin: '0px 2px' }}>{one.number}</span>
		{one.unit}
	</span>)
}

import React from 'react'
import { Button } from 'antd';
const SUCCEED = 'succeed';
const DEFEATED = 'defeated';
const REVOCATION = 'revocation';
export const prePayFunc = (handleModal) => [
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 200,
		render: (text, record) => {
			return <div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(SUCCEED, true);
					}}>打款成功</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(DEFEATED, true);
					}}>打款失败</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }}>发票关联</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(REVOCATION, true);
					}}>打款撤销</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/modification?type=prePay&id=${record.a}`}>编辑</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/detail?type=prePay&id=${record.a}`}>查看</Button>
				</div>
			</div>
		}
	},
	{
		title: '打款单ID',
		dataIndex: 'a',
		key: 'a',
		align: 'center',
		width: 100
	},
	{
		title: '平台',
		dataIndex: 'b',
		key: 'b',
		align: 'center',
		width: 100
	},
	{
		title: '三方代理商',
		dataIndex: 'c',
		key: 'c',
		align: 'center',
		width: 100

	},
	{
		title: '订单ID',
		dataIndex: 'd',
		key: 'd',
		align: 'center',
		width: 100

	},
	{
		title: '打款金额',
		dataIndex: 'h',
		key: 'h',
		align: 'center',
		width: 100
	},
	{
		title: '打款状态',
		dataIndex: 'o',
		key: 'o',
		align: 'center',
		width: 100
	},
	{
		title: '付款公司',
		dataIndex: 'p',
		key: 'p',
		align: 'center',
		width: 100
	},
	{
		title: '打款单生成日期',
		dataIndex: 'r',
		key: 'r',
		align: 'center',
		width: 100
	},
	{
		title: '主账号',
		dataIndex: 'w',
		key: 'w',
		align: 'center',
		width: 100
	},
	{
		title: '媒介经理',
		dataIndex: 'x',
		key: 'x',
		align: 'center',
		width: 100
	}
];
export const datePayFunc = (handleModal) => [
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		align: 'center',
		width: 200,
		render: (text, record) => {
			return <div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(SUCCEED, true);
					}}>打款成功</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(DEFEATED, true);
					}}>打款失败</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }}>发票关联</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} onClick={() => {
						handleModal(REVOCATION, true);
					}}>打款撤销</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/modification?type=datePay&id=${record.a}`}>编辑</Button>
					<Button className='little-left-gap' type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/detail?type=datePay&id=${record.a}`}>查看</Button>
				</div>
				<div className='little-top-gap'>
					<Button type='primary' size='small' style={{ width: 80 }} href={`/finance/trinityPay/modification?id=${record.a}`}>订单详情</Button>
				</div>
			</div >
		}
	},
	{
		title: '打款单ID',
		dataIndex: 'a',
		key: 'a',
		align: 'center',
		width: 100
	},
	{
		title: '结算单ID',
		dataIndex: 'z',
		key: 'z',
		align: 'center',
		width: 100
	},
	{
		title: '平台',
		dataIndex: 'b',
		key: 'b',
		align: 'center',
		width: 100
	},
	{
		title: '三方代理商',
		dataIndex: 'c',
		key: 'c',
		align: 'center',
		width: 100

	},
	{
		title: '打款金额',
		dataIndex: 'd',
		key: 'd',
		align: 'center',
		width: 100

	},
	{
		title: '打款状态',
		dataIndex: 'e',
		key: 'e',
		align: 'center',
		width: 100
	},
	{
		title: '付款公司',
		dataIndex: 'h',
		key: 'h',
		align: 'center',
		width: 100
	},
	{
		title: '申请日期',
		dataIndex: 'o',
		key: 'o',
		align: 'center',
		width: 100
	}
];
export const dealOrderFunc = (handleModal) => [
	{
		title: '订单ID',
		dataIndex: 'a',
		key: 'a',
		align: 'center',
		width: 100
	},
	{
		title: '订单类型',
		dataIndex: 'b',
		key: 'b',
		align: 'center',
		width: 100
	},
	{
		title: '平台',
		dataIndex: 'c',
		key: 'c',
		align: 'center',
		width: 100

	},
	{
		title: '三方平台订单ID',
		dataIndex: 'd',
		key: 'd',
		align: 'center',
		width: 100

	},
	{
		title: '三方代理商',
		dataIndex: 'e',
		key: 'e',
		align: 'center',
		width: 100
	},
	{
		title: '三方平台下单时间',
		dataIndex: 'h',
		key: 'h',
		align: 'center',
		width: 100
	},
	{
		title: '三方原始成本价',
		dataIndex: 't',
		key: 't',
		align: 'center',
		width: 100
	},
	{
		title: '成本调整',
		dataIndex: 'u',
		key: 'u',
		align: 'center',
		width: 100
	},
	{
		title: '剩余成本价',
		dataIndex: 'v',
		key: 'v',
		align: 'center',
		width: 100
	},
	{
		title: '打款金额',
		dataIndex: 'w',
		key: 'w',
		align: 'center',
		width: 100
	},
	{
		title: '打款单ID',
		dataIndex: 'x',
		key: 'x',
		align: 'center',
		width: 100
	},
	{
		title: '打款状态',
		dataIndex: 'y',
		key: 'y',
		align: 'center',
		width: 100
	},
	{
		title: '付款公司',
		dataIndex: 'z',
		key: 'z',
		align: 'center',
		width: 100
	},
];

export const prePayDetailColumns = [
	{
		title: '打款单ID：',
		dataIndex: 'a',
		key: 'a',
		align: 'center'
	}, {
		title: '订单ID：',
		dataIndex: 'b',
		key: 'b',
		align: 'center',

	}, {
		title: '三方平台订单ID：',
		dataIndex: 'c',
		key: 'c',
		align: 'center'
	}, {
		title: '订单类型：',
		dataIndex: 'd',
		key: 'd',
		align: 'center',

	},
	{
		title: '平台：',
		dataIndex: 'e',
		key: 'e',
		align: 'center',
	},
	{
		title: '需求ID：',
		dataIndex: 'f',
		key: 'f',
		align: 'center',
	},
	{
		title: '三方代理商：',
		dataIndex: 'g',
		key: 'g',
		align: 'center',
	},
	{
		title: '需求名称：',
		dataIndex: 'h',
		key: 'h',
		align: 'center',
		// render: (text) => {
		// 	return <div>
		// 		{text ? text.map((it, i) => {
		// 			return <div className='thum-img-box' key={i} onClick={() => {
		// 				this.setState({
		// 					previewVisible: true,
		// 					imgSrc: it.url
		// 				})
		// 			}}>
		// 				<img src={it.url} />
		// 			</div>
		// 		}) : null}
		// 	</div>
		// }
	},
	{
		title: '打款金额：',
		dataIndex: 'i',
		key: 'i',
		align: 'center',
	},
	{
		title: '公司简称：',
		dataIndex: 'j',
		key: 'j',
		align: 'center',
	},
	{
		title: '收款方式：',
		dataIndex: 'k',
		key: 'k',
		align: 'center',
	},
	{
		title: '所属销售：',
		dataIndex: 'l',
		key: 'l',
		align: 'center',
	},
	{
		title: '收款户名：',
		dataIndex: 'm',
		key: 'm',
		align: 'center',
	},
	{
		title: '付款公司：',
		dataIndex: 'n',
		key: 'n',
		align: 'center'
	},
	{
		title: '收款账号：',
		dataIndex: 'o',
		key: 'o',
		align: 'center'
	},
	{
		title: '回票方式：',
		dataIndex: 'p',
		key: 'p',
		align: 'center'
	},
	{
		title: '开户行：',
		dataIndex: 'q',
		key: 'q',
		align: 'center'
	},
	{
		title: '应回发票：',
		dataIndex: 'r',
		key: 'r',
		align: 'center'
	},
	{
		title: '开户支行：',
		dataIndex: 's',
		key: 's',
		align: 'center'
	},
	{
		title: '发票盈余：',
		dataIndex: 't',
		key: 't',
		align: 'center'
	},
	{
		title: '申请时间：',
		dataIndex: 'u',
		key: 'u',
		align: 'center'
	},
	{
		title: '发票开具方：',
		dataIndex: 'v',
		key: 'v',
		align: 'center'
	},
	{
		title: '打款状态：',
		dataIndex: 'w',
		key: 'w',
		align: 'center'
	},
	{
		title: '主账号：',
		dataIndex: 'x',
		key: 'x',
		align: 'center'
	},
	{
		title: '打款成功/失败时间：',
		dataIndex: 'y',
		key: 'y',
		align: 'center'
	},
	{
		title: '媒介经理：',
		dataIndex: 'z',
		key: 'z',
		align: 'center'
	},
	{
		title: '打款截图：',
		dataIndex: 'a',
		key: 'a',
		align: 'center'
	}, {
		title: '打款备注：',
		dataIndex: 'b',
		key: 'b',
		align: 'center'
	},
	{
		title: '打款撤销备注：',
		dataIndex: 'c',
		key: 'c',
		align: 'center'
	}
];
export const datePayDetailColumns = [
	{
		title: '打款单ID：',
		dataIndex: 'a',
		key: 'a',
		align: 'center'
	}, {
		title: '申请时间',
		dataIndex: 'b',
		key: 'b',
		align: 'center',

	},
	{
		title: '平台：',
		dataIndex: 'e',
		key: 'e',
		align: 'center',
	},
	{
		title: '三方代理商：',
		dataIndex: 'g',
		key: 'g',
		align: 'center',
	},
	{
		title: '打款金额：',
		dataIndex: 'i',
		key: 'i',
		align: 'center',
	},
	{
		title: '收款方式：',
		dataIndex: 'k',
		key: 'k',
		align: 'center',
	},
	{
		title: '收款户名：',
		dataIndex: 'm',
		key: 'm',
		align: 'center',
	},
	{
		title: '开户行：',
		dataIndex: 'q',
		key: 'q',
		align: 'center'
	},
	{
		title: '收款账号：',
		dataIndex: 'r',
		key: 'r',
		align: 'center'
	},
	{
		title: '开户支行：',
		dataIndex: 's',
		key: 's',
		align: 'center'
	},
	{
		title: '打款状态：',
		dataIndex: 't',
		key: 't',
		align: 'center'
	},
	{
		title: '付款公司：',
		dataIndex: 'u',
		key: 'u',
		align: 'center'
	},
	{
		title: '打款成功/失败时间：',
		dataIndex: 'v',
		key: 'v',
		align: 'center'
	},
	{
		title: '回票方式：',
		dataIndex: 'w',
		key: 'w',
		align: 'center'
	},
	{
		title: '打款成功截图：',
		dataIndex: 'x',
		key: 'x',
		align: 'center'
	},
	{
		title: '应回发票：',
		dataIndex: 'y',
		key: 'y',
		align: 'center'
	},
	{
		title: '打款备注：',
		dataIndex: 'z',
		key: 'z',
		align: 'center'
	},
	{
		title: '发票盈余：',
		dataIndex: 'a',
		key: 'a',
		align: 'center'
	}, {
		title: '打款撤销备注：',
		dataIndex: 'b',
		key: 'b',
		align: 'center'
	},
	{
		title: '发票开具方：',
		dataIndex: 'c',
		key: 'c',
		align: 'center'
	}
];

export const prePaySearch = [
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '平台',
			value: 'pingtai',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '三方代理商',
			value: 'sanfang',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '打款状态',
			value: 'status',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '付款公司',
			value: 'company',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '订单ID',
			value: 'id',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			style: { width: 110 }
		},
		field: {
			label: '申请日期',
			value: ['Dstart', 'Dend'],
		}
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			style: { width: 110 }
		},
		field: {
			label: '打款日期',
			value: ['Dstart', 'Dend'],
		}
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			style: { width: 110 }
		},
		field: {
			label: '打款撤销日期',
			value: ['Dstart', 'Dend'],
		}
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '收款方式',
			value: 'jingli',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 }
		},
		field: {
			label: '主账号',
			value: 'id',
		}
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '媒介经理',
			value: 'jingli',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	}
];
export const datePaySearch = [
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '平台',
			value: 'pingtai',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '三方代理商',
			value: 'sanfang',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '打款状态',
			value: 'status',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '付款公司',
			value: 'company',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			style: { width: 110 }
		},
		field: {
			label: '申请日期',
			value: ['Sstart', 'Send'],
		}
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			style: { width: 110 }
		},
		field: {
			label: '打款日期',
			value: ['Dstart', 'Dend'],
		}
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			style: { width: 110 }
		},
		field: {
			label: '打款撤销日期',
			value: ['Dstart', 'Dend'],
		}
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '收款方式',
			value: 'jingli',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	}
];
export const dealOrderSearch = [
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '平台',
			value: 'pingtai',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '三方代理商',
			value: 'sanfang',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '订单ID',
			value: 'order_id',
		},
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '打款单ID',
			value: 'order_id',
		},
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '三方平台订单ID',
			value: 'order_id',
		},
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '打款状态',
			value: 'status',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			style: { width: 110 }
		},
		field: {
			label: '三方平台下单时间',
			value: ['Sstart', 'Send'],
		}
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 160 }
		},
		field: {
			label: '付款公司',
			value: 'jingli',
		},
		selectOptionsChildren: [
			{
				label: '全部',
				value: ''
			},
			{
				label: '是',
				value: '1'
			},
			{
				label: '否',
				value: '2'
			},
		]
	}
];

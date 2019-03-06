export const relatedInvoiceSearch = [
	{
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 120 }
		},
		field: {
			label: '平台',
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
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 120 }
		},
		field: {
			label: '代理商',
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
		ctype: 'select',
		attr: {
			placeholder: '请选择',
			style: { width: 120 }
		},
		field: {
			label: '发票开具方',
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
			style: { width: 120 }
		},
		field: {
			label: '发票号',
			value: 'id',
		}
	}
];

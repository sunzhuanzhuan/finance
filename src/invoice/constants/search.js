export const relatedInvoiceSearchFunc = ({ platform, agent }) => [
	{
		ctype: 'select',
		attr: {
			placeholder: '不限',
			style: { width: 160 },
			labelInValue: true,
			allowClear: true
		},
		field: {
			label: '平台',
			value: 'platform_id',
		},
		selectOptionsChildren: platform
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '不限',
			style: { width: 160 },
			labelInValue: true,
			allowClear: true
		},
		field: {
			label: '代理商',
			value: 'agent_id',
		},
		selectOptionsChildren: agent
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 }
		},
		field: {
			label: '发票开具方',
			value: 'beneficiary_company',
		}
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 }
		},
		field: {
			label: '发票号',
			value: 'id',
		}
	}
];
export const trinityInvoiceSearchFunc = ({ invoice_title, invoice_type, is_reset, agent }) => [
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 }
		},
		field: {
			label: '发票号',
			value: 'invoice_number',
		}
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '不限',
			style: { width: 160 },
			labelInValue: true,
			allowClear: true
		},
		field: {
			label: '发票抬头',
			value: 'invoice_title',
		},
		selectOptionsChildren: invoice_title
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '不限',
			style: { width: 160 },
			labelInValue: true,
			allowClear: true
		},
		field: {
			label: '发票类型',
			value: 'invoice_type',
		},
		selectOptionsChildren: invoice_type
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 }
		},
		field: {
			label: '发票内容',
			value: 'invoice_content',
		}
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 }
		},
		field: {
			label: '发票开具方',
			value: 'beneficiary_company',
		}
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			format: 'YYYY-MM-DD',
			style: { width: 104 }
		},
		field: {
			label: '开票日期',
			value: ['invoice_make_out_time_start', 'invoice_make_out_time_end'],
		}
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			format: 'YYYY-MM-DD',
			style: { width: 104 }
		},
		field: {
			label: '发票录入日期',
			value: ['invoice_created_time_start', 'invoice_created_time_end'],
		}
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '不限',
			style: { width: 160 },
			labelInValue: true,
			allowClear: true
		},
		field: {
			label: '发票来源',
			value: 'agent_id',
		},
		selectOptionsChildren: is_reset
	},
	{
		ctype: 'select',
		attr: {
			placeholder: '不限',
			style: { width: 160 },
			labelInValue: true,
			allowClear: true
		},
		field: {
			label: '三方代理商',
			value: 'agent_id',
		},
		selectOptionsChildren: agent
	},
];

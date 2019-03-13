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

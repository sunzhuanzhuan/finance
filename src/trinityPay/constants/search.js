export const prePaySearchFunc = ({ agent = [], media_manager = [], payment_company = [], payment_status = [], platform = [], receipt_way = [] }, handleFetch) => [
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
			label: '三方代理商',
			value: 'agent_id',
		},
		selectOptionsChildren: agent
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
			label: '打款状态',
			value: 'payment_status',
		},
		selectOptionsChildren: payment_status
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
			label: '付款公司',
			value: 'payment_company_id',
		},
		selectOptionsChildren: payment_company
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 },
			allowClear: true
		},
		field: {
			label: '订单ID',
			value: 'order_id',
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
			label: '打款单生成日期',
			value: ['application_time_start', 'application_time_end'],
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
			label: '打款日期',
			value: ['payment_time_start', 'payment_time_end'],
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
			label: '打款撤销日期',
			value: ['payment_backout_time_start', 'payment_backout_time_end'],
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
			label: '收款方式',
			value: 'receipt_way',
		},
		selectOptionsChildren: receipt_way
	},
	{
		ctype: 'searchSelect',
		attr: {
			getPopupContainer: () => document.querySelector('.ant-advanced-search-form'),
			action: handleFetch,
			keyWord: 'account_name',
			dataToList: res => { return res.data },
			item: ['value', 'name'],
			style: { width: 160 }
		},
		field: {
			label: '主账号',
			value: 'user_name',
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
			label: '媒介经理',
			value: 'media_manager_id',
		},
		selectOptionsChildren: media_manager
	}
];
export const datePaySearchFunc = ({ platform = [], agent = [], payment_status = [], payment_company = [], receipt_way = [] }) => [
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
			label: '三方代理商',
			value: 'agent_id',
		},
		selectOptionsChildren: agent
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
			label: '打款状态',
			value: 'payment_status',
		},
		selectOptionsChildren: payment_status
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
			label: '付款公司',
			value: 'payment_company_id',
		},
		selectOptionsChildren: payment_company
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			format: 'YYYY-MM-DD',
			style: { width: 104 }
		},
		field: {
			label: '申请日期',
			value: ['application_time_start', 'application_time_end'],
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
			label: '打款日期',
			value: ['payment_time_start', 'payment_time_end'],
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
			label: '打款撤销日期',
			value: ['payment_backout_time_start', 'payment_backout_time_end'],
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
			label: '收款方式',
			value: 'receipt_way',
		},
		selectOptionsChildren: receipt_way
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 },
			allowClear: true
		},
		field: {
			label: '结算单编号',
			value: 'summary_sheet_id',
		},
	}
];
export const dealOrderSearchFunc = ({ platform = [], agent = [], payment_status = [], payment_company = [] }) => [
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
			label: '三方代理商',
			value: 'agent_id',
		},
		selectOptionsChildren: agent
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 },
			allowClear: true
		},
		field: {
			label: '订单ID',
			value: 'order_id',
		},
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 },
			allowClear: true
		},
		field: {
			label: '打款单ID',
			value: 'payment_slip_id',
		},
	},
	{
		ctype: 'input',
		attr: {
			placeholder: '请输入',
			style: { width: 160 },
			allowClear: true
		},
		field: {
			label: '三方平台订单ID',
			value: 'order_id',
		},
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
			label: '打款状态',
			value: 'payment_status',
		},
		selectOptionsChildren: payment_status
	},
	{
		ctype: 'rangePicker',
		attr: {
			placeholder: ['开始时间', '结束时间'],
			format: 'YYYY-MM-DD',
			style: { width: 104 }
		},
		field: {
			label: '三方平台下单时间',
			value: ['public_order_time_start', 'public_order_time_end'],
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
			label: '付款公司',
			value: 'payment_company_id',
		},
		selectOptionsChildren: payment_company
	}
];

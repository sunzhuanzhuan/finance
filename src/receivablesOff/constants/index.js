import React from "react";
import { Input } from 'antd';

export const getTabOptions = [
    { tab: '预约', key: 'yuyueyuyue' },
    { tab: '微闪投', key: 'weishantou' },
    { tab: '拓展业务', key: 'tuozhanyewu' },
]

export const getOffListQueryKeys = [
    'verification_code', 'type', 'company_id', 'sale_id', 'time', 'is_record_sale_income', 'is_decrease_company_gmv', 'is_decrease_sale_gmv', 'gift_amount_range', 'warehouse_amount_range', 'invoice_application_id', 'order_id_type', 'operate'
];

export const getOffDetailQueryKeys = {
    yuyueyuyue: [
        'verification_code', 'company_id', 'sale_id', 'order_id', 'time', 'region', 'project_id', 
        'requirement_id', 'pid', 'type', 'order_complete_time', 'is_decrease_sale_gmv', 
        'is_decrease_company_gmv', 'is_record_sale_income', 'gift_amount_range', 
        'warehouse_amount_range', 'invoice_application_id', 'brand_id', 'operate'
    ],
    weishantou: [
        'verification_code', 'company_id', 'sale_id', 'date2', 'time', 'region', 'project_id', 
        'pid', 'type', 'is_decrease_sale_gmv', 'is_decrease_company_gmv', 
        'is_record_sale_income', 'active_time', 'gift_amount_range', 'warehouse_amount_range', 'invoice_application_id', 
        'brand_id', 'operate'
    ],
    tuozhanyewu: [
        'verification_code', 'company_id', 'sale_id', 'date2', 'time', 'region', 'project_id', 'type', 
        'is_decrease_sale_gmv', 'is_decrease_company_gmv', 'is_record_sale_income', 'offtime', 
        'gift_amount_range', 'warehouse_amount_range', 'invoice_application_id', 'brand_id', 'operate' 
    ],
};

export const getOffAddQueryKeys = {
    yuyueyuyue: ['order_id', 'invoice_application_id', 'order_complete_time', 'project_id', 'brand_id', 'pid', 'account_id', 'operate'],
    weishantou: ['order_id', 'active_time', 'brand_id', 'invoice_application_id', 'project_id', 'pid', 'account_id', 'operate'],
    tuozhanyewu: ['order_id', 'invoice_application_id', 'offtime', 'brand_id', 'project_id', 'operate'],
};

export const getOffQueryItems = queryArr => {
    const allQuery =  [
        {label: '公司简称', key: 'company_id', compType: 'searchSelect'},
        {label: '销售', key: 'sale_id', compType: 'searchSelect'},
        {label: '核销编号', key: 'verification_code', compType: 'input'},
        {label: '核销类型', key: 'type', compType: 'select', optionKey: 'type'},
        {label: '发票申请单ID', key: 'invoice_application_id', compType: 'input'},
        {label: '订单ID', key: 'order_id', compType: 'input'},
        {label: '活动ID', key: 'date2', compType: 'input'},
        {label: '核销时间', key: 'time', compType: 'date'},
        {label: '是否计提提成', key: 'is_record_sale_income', compType: 'input'},
        {label: '是否扣减公司GMV', key: 'is_decrease_company_gmv', compType: 'input'},
        {label: '是否扣减销售GMV', key: 'is_decrease_sale_gmv', compType: 'input'},
        {label: '赠送/返点账户抵扣金额', key: 'gift_amount_range', compType: 'input'},
        {label: '小金库抵扣金额', key: 'warehouse_amount_range', compType: 'input'},
        {label: '区域', key: 'region', compType: 'select'},
        {label: '所属项目', key: 'project_id', compType: 'input'},
        {label: '品牌', key: 'brand_id', compType: 'input'},
        {label: '需求名称', key: 'requirement_id', compType: 'input'},
        {label: '平台', key: 'pid', compType: 'select'},
        {label: '订单执行完成时间', key: 'order_complete_time', compType: 'date'},
        {label: '活动结算时间', key: 'active_time', compType: 'date'},
        {label: '审核时间', key: 'offtime', compType: 'date'},
        {label: '账号名称', key: 'account_id', compType: 'input'},
        {compType: 'order_id_type', key: 'order_id_type'},
        {compType: 'operate', key: 'operate'}
    ];
    return queryArr.map(item => allQuery.find(queryItem => queryItem.key === item));
}

export const getOffAddFormItems = () => {
    return [
        {label: '公司简称', key: 'company', compType: 'searchSelect'},
        {label: '所属销售', key: 'debt', compType: 'searchSelect'},
        {label: '本次可核销金额', key: 'salePerson', compType: 'input'},
        {label: '本次核销金额', key: 'saleManage', compType: 'input', required: true},
        {label: '核销类型', key: 'saler', compType: 'select', required: true},
        {label: '抵扣账户/金额', key: 'area', compType: 'checkbox', optionKey: 'discount', required: true},
        {label: '核销账户', key: 'time', compType: 'input'},
        {label: '是否扣减公司GMV', key: 'compGMV', compType: 'radio', optionKey: 'GMV', required: true},
        {label: '是否扣减销售GMV', key: 'saleGMV', compType: 'radio', optionKey: 'GMV', required: true},
        {label: '核销订单是否计提提成', key: 'percentage', compType: 'radio', optionKey: 'payment', required: true},
        {label: '核销说明', key: 'count', compType: 'upload'},
        {label: '备注', key: 'goldCount', compType: 'textarea'},
    ]
}

export const getOffOptions = () => {
    return {
        GMV: [
            { label: '请选择' },
            { label: '扣减', value: 1 },
            { label: '不扣减', value: 0 }
        ],
        payment: [
            { label: '请选择' },
            { label: '计提', value: 1 },
            { label: '不计提', value: 0 }
        ],
        type: [
            { label: '请选择' },
            { label: '客户整体折让', value: 1 }, 
            { label: '订单折让（赔偿）', value: 2 }, 
            { label: '坏账清理', value: 3 }, 
            { label: '其他', value: 4 }, 
        ],
        discount: [
            { label: <span>赠送/返点<Input style={{width: 70, margin: '3px 10px 0'}} /><span>赠送/返点余额500.00，最多可抵扣500.00</span></span>, value: 1 }, 
            { label: <span>小金库<Input style={{width: 70, margin: '10px 10px 0'}} /><span>小金库余额500.00，最多可抵扣500.00</span></span>, value: 2 }, 
            { label: <span style={{marginTop: 14, display: 'inline-block'}}>无抵扣</span>, value: 3 }, 
        ]
    }
}

export const getOffListColIndex = [
    'verification_code', 'company_name', 'sale_name', 'type', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_decrease_sale_gmv', 'is_record_sale_income', 'created_at', 'operator_name', 'operate',
];

export const getOffDetailCloIndex = {
    yuyueyuyue: ['verification_code', 'type', 'order_id_no_fIxed', 'company_name', 'saler_region', 'project_brand', 'require_id_name', 'account_info', 'invoice_application_id', 'execution_completed_time', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_record_sale_income', 'is_decrease_sale_gmv', 'operator_name', 'created_at'],
    weishantou: ['verification_code', 'type', 'campaign_id_no_fIxed', '活动名称', 'company_name', 'saler_region', 'project_brand', 'account_info', 'invoice_application_id', 'settlement_time', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_record_sale_income', 'is_decrease_sale_gmv', 'operator_name', 'created_at'],
    tuozhanyewu: ['verification_code', 'type', 'id', 'business_name', 'company_name', 'saler_region', 'project_brand', 'invoice_application_id', 'pass_time', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_record_sale_income', 'is_decrease_sale_gmv', 'operator_name', 'created_at'],
}

export const getReceAddColIndex = {
    yuyueyuyue: ['order_id', 'project_brand', 'require_id_name', 'account_info', 'invoice_application_id', 'execution_completed_time', 'verification_amount', 'total_verification_amount', 'quoted_price', 'deal_price', 'inspection_deducted_amount', 'cash', 'gift', 'reparation_amount', 'manual_qc_amount', 'has_verification_amount', 'has_payback_amount'],
    weishantou: ['campaign_id', 'project_brand', 'account_info', 'invoice_application_id', 'settlement_time', 'verification_amount', 'total_verification_amount', 'deal_price', 'inspection_deducted_amount', 'cash', 'gift', 'manual_qc_amount', 'has_verification_amount', 'has_payback_amount'],
    tuozhanyewu: ['id', 'active_name_type', 'project_brand', 'invoice_application_id', 'pass_time', 'verification_amount', 'total_verification_amount', 'cost', 'cash', 'gift', 'has_verification_amount', 'has_payback_amount'],
}

const render = (data = '-') => {
    return (
        <div>{data}</div>
    )
}

export const getReceOffCol = ( col, action ) => {
    const allCol =  [
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 100,
            fixed: 'left',
            render
        },
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'order_id_no_fIxed',
            width: 100,
            render
        },
        {
            title: '活动ID',
            dataIndex: 'campaign_id',
            key: 'campaign_id',
            width: 100,
            fixed: 'left',
            render
        },
        {
            title: '活动ID',
            dataIndex: 'campaign_id',
            key: 'campaign_id_no_fIxed',
            width: 100,
            fixed: 'left',
            render
        },
        {
            title: '活动名称',
            dataIndex: '活动名称',
            key: '活动名称',
            width: 100,
            render
        },
        {
            title: '活动名称',
            dataIndex: 'business_name',
            key: 'business_name',
            width: 100,
            render
        },
        {
            title: '活动ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render
        },
        {
            title: '发票申请单ID',
            dataIndex: 'invoice_application_id',
            key: 'invoice_application_id',
            width: 100,
            render
        },
        {
            title: '活动名称/活动类型',
            dataIndex: 'active_name_type',
            key: 'active_name_type',
            width: 100,
            render: (_, record) => {
                const {type = '-', status = '-', business_name = '-'} = record;
                return (
                    <div>
                        <div>活动名称：{business_name}</div>
                        <div>活动类型：{type}</div>
                        {/* <div>活动状态：{status}</div> */}
                    </div>
                ) 
            }
        },
        {
            title: '活动结算时间',
            dataIndex: 'settlement_time',
            key: 'settlement_time',
            width: 100,
            render
        },
        {
            title: '活动费用',
            dataIndex: 'cost',
            key: 'cost',
            width: 100,
            render
        },
        {
            title: '订单状态',
            dataIndex: '订单状态',
            key: '订单状态',
            width: 100,
            render
        },
        {
            title: '所属项目/品牌',
            dataIndex: 'project_brand',
            key: 'project_brand',
            width: 100,
            render: (_, record) => {
                const {project_name = '-', brand_name = '-'} = record;
                return (
                    <>
                        <div>项目：{project_name}</div>
                        <div>品牌：{brand_name}</div>
                    </>
                )
            }
        },
        {
            title: '需求ID/需求名称',
            dataIndex: 'require_id_name',
            key: 'require_id_name',
            width: 100,
            render: (_, record) => {
                const {requirement_name = '-', requirement_id = '-'} = record;
                return (
                    <div>
                        <div>需求ID：{requirement_id}</div>
                        <div>需求名称：{requirement_name}</div>
                    </div>
                )
            }
        },
        {
            title: '账号信息',
            dataIndex: 'account_info',
            key: 'account_info',
            width: 100,
            render: (_, record) => {
                const {weibo_name = '-', account_id = '-', platform_name = '-'} = record;
                return (
                    <div>
                        <div>平台：{platform_name}</div>
                        <div>账号名称：{weibo_name}</div>
                        <div>ID：{account_id}</div>
                    </div>
                )
            }
        },
        {
            title: '订单执行完成时间',
            dataIndex: 'execution_completed_time',
            key: 'execution_completed_time',
            width: 100,
            render
        },
        {
            title: '对外报价',
            dataIndex: 'quoted_price',
            key: 'quoted_price',
            width: 100,
            render
        },
        {
            title: '执行价',
            dataIndex: 'deal_price',
            key: 'deal_price',
            width: 100,
            render
        },
        {
            title: '质检返款',
            dataIndex: 'inspection_deducted_amount',
            key: 'inspection_deducted_amount',
            width: 100,
            render
        },
        {
            title: '赠送账户结算',
            dataIndex: 'gift',
            key: 'gift',
            width: 100,
            render
        },
        {
            title: '赔偿',
            dataIndex: 'reparation_amount',
            key: 'reparation_amount',
            width: 100,
            render
        },
        {
            title: '手工质检',
            dataIndex: 'manual_qc_amount',
            key: 'manual_qc_amount',
            width: 100,
            render
        },
        {
            title: '已核销金额',
            dataIndex: 'has_verification_amount',
            key: 'has_verification_amount',
            width: 100,
            render
        },
        {
            title: '已回款金额',
            dataIndex: 'has_payback_amount',
            key: 'has_payback_amount',
            width: 100,
            render
        },
        {
            title: '应收款金额',
            dataIndex: 'verification_amount',
            key: 'verification_amount',
            width: 100,
            render
        },
        {
            title: '现金结算',
            dataIndex: 'cash',
            key: 'cash',
            width: 100,
            render
        },
        {
            title: '审核时间',
            dataIndex: 'pass_time',
            key: 'pass_time',
            width: 100,
            render
        },
        {
            title: '核销编号',
            dataIndex: 'verification_code',
            key: 'verification_code',
            width: 100,
            render
        },
        {
            title: '公司简称',
            dataIndex: 'company_name',
            key: 'company_name',
            width: 100,
            render
        },
        {
            title: '所属销售/区域',
            dataIndex: 'saler_region',
            key: 'saler_region',
            width: 100,
            render: (_, record) => {
                const {sale_name = '-', region = '-'} = record;
                return (
                    <>
                        <div>销售：{sale_name}</div>
                        <div>区域：{region}</div>
                    </>
                )
            }
        },
        {
            title: '所属销售',
            dataIndex: 'sale_name',
            key: 'sale_name',
            width: 100,
            render
        },
        {
            title: '核销类型',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            render
        },
        {
            title: '本次核销金额',
            dataIndex: 'total_verification_amount',
            key: 'total_verification_amount',
            width: 100,
            render
        },
        {
            title: '核销账户金额',
            dataIndex: 'debt_amount',
            key: 'debt_amount',
            width: 100,
            render
        },
        {
            title: '赠送/返点账户抵扣金额',
            dataIndex: 'gift_amount',
            key: 'gift_amount',
            width: 100,
            render
        },
        {
            title: '小金库抵扣金额',
            dataIndex: 'warehouse_amount',
            key: 'warehouse_amount',
            width: 100,
            render
        },
        {
            title: '是否计提提成',
            dataIndex: 'is_record_sale_income',
            key: 'is_record_sale_income',
            width: 100,
            render
        },
        {
            title: '是否扣减公司GMV',
            dataIndex: 'is_decrease_company_gmv',
            key: 'is_decrease_company_gmv',
            width: 100,
            render
        },
        {
            title: '是否扣减销售GMV',
            dataIndex: 'is_decrease_sale_gmv',
            key: 'is_decrease_sale_gmv',
            width: 100,
            render
        },
        {
            title: '核销时间',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 100,
            render
        },
        {
            title: '核销人员',
            dataIndex: 'operator_name',
            key: 'operator_name',
            width: 100,
            render
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: 145,
            fixed: 'right',
            render:(_, record) => {
                return <>
                    <a onClick={ () => { action('detail', record)}}>订单详情</a>
                    <a onClick={ () => { action('preview', record)}}>查看</a>
                    <a onClick={ () => { action('edit', record)}}>编辑</a>
                </>
            }
        },
    ];

    return col.map(item => allCol.find(colItem => colItem.key === item));
}

import React from "react";
import { Popconfirm } from 'antd';
import numeral from 'numeral';

export const getTabOptions = [
    { tab: '预约', key: 'yuyueyuyue' },
    { tab: '微闪投', key: 'weishantou' },
    { tab: '拓展业务', key: 'tuozhanyewu' },
];

export const getTableId = {
    yuyueyuyue: 'order_id',
    weishantou: 'campaign_id',
    tuozhanyewu: 'id',
}

export const getOffListQueryKeys = [
    'verification_code', 'type', 'company_id', 'sale_id', 'time', 'is_record_sale_income', 'is_decrease_company_gmv', 'is_decrease_sale_gmv', 'gift_amount', 'warehouse_amount', 'invoice_application_id', 'order_id_type', 'operate'
];

export const getOffDetailQueryKeys = {
    yuyueyuyue: [
        'verification_code', 'company_id', 'sale_id', 'order_id', 'time', 'region', 'project_id', 
        'requirement_id', 'pid', 'type', 'order_complete_time', 'is_decrease_sale_gmv', 
        'is_decrease_company_gmv', 'is_record_sale_income', 'gift_amount', 
        'warehouse_amount', 'invoice_application_id', 'brand_id', 'operate'
    ],
    weishantou: [
        'verification_code', 'company_id', 'sale_id', 'campaign_id', 'time', 'region', 'project_id', 
        'pid', 'type', 'is_decrease_sale_gmv', 'is_decrease_company_gmv', 
        'is_record_sale_income', 'active_time', 'gift_amount', 'warehouse_amount', 'invoice_application_id', 
        'brand_id', 'operate'
    ],
    tuozhanyewu: [
        'verification_code', 'company_id', 'sale_id', 'id', 'time', 'region', 'project_id', 'type', 
        'is_decrease_sale_gmv', 'is_decrease_company_gmv', 'is_record_sale_income', 'offtime', 
        'gift_amount', 'warehouse_amount', 'invoice_application_id', 'brand_id', 'operate' 
    ],
};

export const getOffAddQueryKeys = {
    yuyueyuyue: ['order_id', 'invoice_application_id', 'order_complete_time', 'brand_id', 'project_id', 'requirement_id', 'pid', 'account_id', 'operate'],
    weishantou: ['campaign_id', 'active_time', 'brand_id', 'invoice_application_id', 'project_id', 'pid', 'account_id', 'operate'],
    tuozhanyewu: ['id', 'invoice_application_id', 'offtime', 'brand_id', 'project_id', 'operate'],
};

export const getOffQueryItems = queryArr => {
    const allQuery =  [
        {label: '公司简称', key: 'company_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '销售', key: 'sale_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '核销编号', key: 'verification_code', compType: 'input'},
        {label: '核销类型', key: 'type', compType: 'select', optionKey: 'verification_type'},
        {label: '发票申请单ID', key: 'invoice_application_id', compType: 'input'},
        {label: '订单ID', key: 'order_id', compType: 'input'},
        {label: '活动ID', key: 'campaign_id', compType: 'input'},
        {label: '活动ID', key: 'id', compType: 'input'},
        {label: '核销时间', key: 'time', compType: 'date', submitKey:['created_at_start', 'created_at_end']},
        {label: '是否计提提成', key: 'is_record_sale_income', compType: 'select', optionKey: 'payment'},
        {label: '是否扣减公司GMV', key: 'is_decrease_company_gmv', compType: 'select', optionKey: 'GMV'},
        {label: '是否扣减销售GMV', key: 'is_decrease_sale_gmv', compType: 'select', optionKey: 'GMV'},
        {label: '赠送/返点账户抵扣金额', key: 'gift_amount', compType: 'number_range', rangeKey: ['total_gift_amount_min', 'total_gift_amount_max']},
        {label: '小金库抵扣金额', key: 'warehouse_amount', compType: 'number_range', rangeKey: ['total_warehouse_amount_min', 'total_warehouse_amount_max']},
        {label: '区域', key: 'region', compType: 'select'},
        {label: '所属项目', key: 'project_id', compType: 'input'},
        {label: '品牌', key: 'brand_id', compType: 'input'},
        {label: '需求名称', key: 'requirement_id', compType: 'input'},
        {label: '平台', key: 'pid', compType: 'select'},
        {label: '订单执行完成时间', key: 'order_complete_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '活动结算时间', key: 'active_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '审核时间', key: 'offtime', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '账号名称', key: 'account_id', compType: 'input'},
        {compType: 'order_id_type', key: 'order_id_type', optionKey: 'prduct_line'},
        {compType: 'operate', key: 'operate'}
    ];
    return queryArr.map(item => allQuery.find(queryItem => queryItem.key === item));
}

const validateRemarkText = (_, value, callback) => {
    if(value && value.trim().length > 50) {
        callback('最多输入50个汉字');
    }
    callback();
};
const verificationMount = (_, value, callback, totalVal, errorMsg, moreThanZero) => {
    const [firstMsg, secondMsg] = errorMsg;
    const emptyCondition = moreThanZero ? !(value > 0) : !(value || value >= 0)
    if(emptyCondition) {
        callback(firstMsg);
    }else if (value - totalVal > 0) {
        callback(secondMsg || firstMsg)
    }
    callback()
}
export const getOffAddFormItems = (arrKey) => {
    const itemsArr = [
        {label: '公司简称', key: 'company_name', compType: 'unalterable'},
        {label: '所属销售', key: 'sale_name', compType: 'unalterable'},
        {label: '本次可核销金额', key: 'can_verification_amount', compType: 'unalterable', isNumber: true},
        {label: '本次核销金额', key: 'verification_amount', compType: 'inputNumber', isNumber: true, required: true, disabled: true, validator: verificationMount},
        {label: '核销类型', key: 'type', compType: 'select', optionKey: 'verification_type', required: true},
        {label: '抵扣账户/金额', key: 'check_box_item', compType: 'check_box_item', required: true, disabled: true, validator: verificationMount},
        {label: '核销账户金额', key: 'debt_amount', compType: 'unalterable', isNumber: true},
        {label: '是否扣减公司GMV', key: 'is_decrease_company_gmv', compType: 'radio', optionKey: 'GMV', required: true},
        {label: '是否扣减销售GMV', key: 'is_decrease_sale_gmv', compType: 'radio', optionKey: 'GMV', required: true},
        {label: '是否计提提成', key: 'is_record_sale_income', compType: 'radio', optionKey: 'payment', required: true},
        {label: '核销说明', key: 'attach', compType: 'upload'},
        {label: '备注', key: 'remark', compType: 'textarea', validator: validateRemarkText},
    ];
    return arrKey ? arrKey.map(item => itemsArr.find(itemKey => itemKey.key === item)) : itemsArr;
}

export const getOffOptions = {
        GMV: [
            { display: '扣减', id: 1 },
            { display: '不扣减', id: 0 }
        ],
        payment: [
            { display: '计提', id: 1 },
            { display: '不计提', id: 0 }
        ],
        offCheckOption: [
            {display: '赠送/返点', id: 'gift_amount'}, 
            {display: '小金库', id: 'warehouse_amount'}, 
            {display: '无抵扣', id: 'no'}, 
        ]
    };

export const getOffListColIndex = [
    'verification_code', 'company_name', 'sale_name', 'type', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_decrease_sale_gmv', 'is_record_sale_income', 'created_at', 'operator_name', 'operate',
];

export const getOffDetailCloIndex = {
    yuyueyuyue: ['verification_code', 'type', 'order_id_no_fIxed', 'company_name', 'saler_region', 'project_brand', 'require_id_name', 'account_info', 'invoice_application_id', 'execution_completed_time', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_record_sale_income', 'is_decrease_sale_gmv', 'operator_name', 'created_at'],
    weishantou: ['verification_code', 'type', 'campaign_id_no_fIxed', '活动名称', 'company_name', 'saler_region', 'project_brand', 'account_info', 'invoice_application_id', 'settlement_time', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_record_sale_income', 'is_decrease_sale_gmv', 'operator_name', 'created_at'],
    tuozhanyewu: ['verification_code', 'type', 'id', 'business_name', 'company_name', 'saler_region', 'project_brand', 'invoice_application_id', 'pass_time', 'total_verification_amount', 'debt_amount', 'gift_amount', 'warehouse_amount', 'is_decrease_company_gmv', 'is_record_sale_income', 'is_decrease_sale_gmv', 'operator_name', 'created_at'],
}

// export const getReceAddColIndex = {
//     yuyueyuyue: ['order_id', 'project_brand', 'require_id_name', 'account_info', 'invoice_application_id', 'execution_completed_time', 'verification_amount', 'total_verification_amount', 'quoted_price', 'deal_price', 'inspection_deducted_amount', 'cash', 'gift', 'reparation_amount', 'manual_qc_amount', 'has_verification_amount', 'has_payback_amount'],
//     weishantou: ['campaign_id', 'project_brand', 'account_info', 'invoice_application_id', 'settlement_time', 'verification_amount', 'total_verification_amount', 'deal_price', 'inspection_deducted_amount', 'cash', 'gift', 'manual_qc_amount', 'has_verification_amount', 'has_payback_amount'],
//     tuozhanyewu: ['id', 'active_name_type', 'project_brand', 'invoice_application_id', 'pass_time', 'verification_amount', 'total_verification_amount', 'cost', 'cash', 'gift', 'has_verification_amount', 'has_payback_amount'],
// }

export const getReceAddColIndex = {
    yuyueyuyue: ['order_id_no_fIxed', 'project_brand', 'require_id_name', 'account_info', 'invoice_application_id', 'execution_completed_time', 'verification_amount', 'total_verification_amount'],
    weishantou: ['campaign_id_no_fIxed', 'project_brand', 'account_info', 'invoice_application_id', 'settlement_time', 'verification_amount', 'total_verification_amount'],
    tuozhanyewu: ['id', 'active_name_type', 'project_brand', 'invoice_application_id', 'pass_time', 'verification_amount', 'total_verification_amount'],
}

const render = (data = '-') => {
    return (
        <div>{data}</div>
    )
}

const isRender = data => {
    return (
        data !== undefined ? data == 1 ? '是' : '否' : '-'
    )
}

const renderNum = data => {
    return data !== undefined ? numeral(data).format('0.00') : '-'
}

export const getReceOffCol = ( col, receMetaData = {}, action, activeKey ) => {
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
            width: 180,
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
            render: renderNum
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
            width: 180,
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
            width: 180,
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
            width: 180,
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
            width: 180,
            render
        },
        {
            title: '对外报价',
            dataIndex: 'quoted_price',
            key: 'quoted_price',
            width: 110,
            render: renderNum
        },
        {
            title: '执行价',
            dataIndex: 'deal_price',
            key: 'deal_price',
            width: 110,
            render: renderNum
        },
        {
            title: '质检返款',
            dataIndex: 'inspection_deducted_amount',
            key: 'inspection_deducted_amount',
            width: 110,
            render: renderNum
        },
        {
            title: '赠送账户结算',
            dataIndex: 'gift',
            key: 'gift',
            width: 110,
            render: renderNum
        },
        {
            title: '赔偿',
            dataIndex: 'reparation_amount',
            key: 'reparation_amount',
            width: 110,
            render: renderNum
        },
        {
            title: '手工质检',
            dataIndex: 'manual_qc_amount',
            key: 'manual_qc_amount',
            width: 110,
            render: renderNum
        },
        {
            title: '已核销金额',
            dataIndex: 'has_verification_amount',
            key: 'has_verification_amount',
            width: 110,
            render: renderNum
        },
        {
            title: '已回款金额',
            dataIndex: 'has_payback_amount',
            key: 'has_payback_amount',
            width: 110,
            render: renderNum
        },
        {
            title: '应收款金额',
            dataIndex: 'verification_amount',
            key: 'verification_amount',
            width: 110,
            render: renderNum
        },
        {
            title: '现金结算',
            dataIndex: 'cash',
            key: 'cash',
            width: 110,
            render: renderNum
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
            render: data => {
                const { verification_type = [] } = receMetaData;
                const typeItem = verification_type.find(item => item.id == data);
                return typeItem ? typeItem.display : '-'
            }
        },
        {
            title: '本次核销金额',
            dataIndex: 'total_verification_amount',
            key: 'total_verification_amount',
            width: 110,
            render: renderNum
        },
        {
            title: '核销账户金额',
            dataIndex: 'debt_amount',
            key: 'debt_amount',
            width: 100,
            render: renderNum
        },
        {
            title: '赠送/返点账户抵扣金额',
            dataIndex: 'gift_amount',
            key: 'gift_amount',
            width: 100,
            render: renderNum
        },
        {
            title: '小金库抵扣金额',
            dataIndex: 'warehouse_amount',
            key: 'warehouse_amount',
            width: 100,
            render: renderNum
        },
        {
            title: '是否计提提成',
            dataIndex: 'is_record_sale_income',
            key: 'is_record_sale_income',
            width: 100,
            render: isRender
        },
        {
            title: '是否扣减公司GMV',
            dataIndex: 'is_decrease_company_gmv',
            key: 'is_decrease_company_gmv',
            width: 100,
            render: isRender
        },
        {
            title: '是否扣减销售GMV',
            dataIndex: 'is_decrease_sale_gmv',
            key: 'is_decrease_sale_gmv',
            width: 100,
            render: isRender
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
                const { verification_id } = record;
                return <>
                    <a onClick={ () => { action('detail', verification_id)}}>订单详情</a>
                    <a onClick={ () => { action('check', record)}}>查看</a>
                    <a onClick={ () => { action('edit', record)}}>编辑</a>
                </>
            }
        },
        {
            title: '操作',
            dataIndex: 'previewOperate',
            key: 'previewOperate',
            width: 100,
            fixed: 'right',
            render:(_, record) => {
                const dataKey = getTableId[activeKey];

                return <>
                    <Popconfirm 
                        title="是否确定删除？" 
                        okText="确定" 
                        cancelText="取消"
                        onConfirm={() => {action(record[dataKey], dataKey)}}
                    >
                        <a>删除</a>
                    </Popconfirm>
                </>
            }
        },
    ];

    return col.map(item => allCol.find(colItem => colItem.key === item));
}

import React from "react";
import { Input } from 'antd';

export const getTabOptions = [
    { tab: '预约', key: 'yuyueyuyue' },
    { tab: '微闪投', key: 'weishantou' },
    { tab: '拓展业务', key: 'tuozhanyewu' },
]

export const getOffListQueryKeys = [
    'company', 'debt', 'salePerson', 'saler', 'area', 'date', 'time', 'percentage', 'compGMV', 'saleGMV', 'count', 'goldCount', 'operate'
];

export const getOffDetailQueryKeys = {
    yuyueyuyue: ['salePerson', 'company', 'debt', 'area', 'date', 'time', 'where', 'project', 'demandname', 'platform', 'saleManage', 
    'ordertime', 'saleGMV', 'compGMV', 'percentage', 'count', 'goldCount', 'saler', 'brand', 'operate'
],
    weishantou: ['salePerson', 'company', 'debt', 'date2', 'time', 'where', 'project', 'platform', 'saleManage', 
    'activetime', 'saleGMV', 'compGMV', 'percentage', 'count', 'goldCount', 'saler', 'brand', 'operate'
],
    tuozhanyewu: ['salePerson', 'company', 'debt', 'date2', 'time', 'where', 'project', 'saleManage', 
    'offtime', 'saleGMV', 'compGMV', 'percentage', 'count', 'goldCount', 'saler', 'brand', 'operate' ],
};

export const getOffAddQueryKeys = {
    yuyueyuyue: ['saler', 'date', 'ordertime', 'brand', 'project', 'demandname', 'platform', 'account', 'operate'],
    weishantou: ['saler', 'date2', 'activetime', 'brand', 'project', 'platform', 'account', 'operate'],
    tuozhanyewu: ['saler', 'date2', 'offtime', 'brand', 'project', 'operate'],
};

export const getOffQueryItems = queryArr => {
    const allQuery =  [
        {label: '公司简称', key: 'company', compType: 'searchSelect'},
        {label: '销售', key: 'debt', compType: 'select'},
        {label: '核销编号', key: 'salePerson', compType: 'input'},
        {label: '核销类型', key: 'saleManage', compType: 'input'},
        {label: '发票申请单ID', key: 'saler', compType: 'input'},
        {label: '订单类型', key: 'area', compType: 'searchSelect'},
        {label: '订单ID', key: 'date', compType: 'input'},
        {label: '活动ID', key: 'date2', compType: 'input'},
        {label: '核销时间', key: 'time', compType: 'input'},
        {label: '是否计提提成', key: 'percentage', compType: 'input'},
        {label: '是否扣减公司GMV', key: 'compGMV', compType: 'input'},
        {label: '是否扣减销售GMV', key: 'saleGMV', compType: 'input'},
        {label: '赠送/返点账户抵扣金额', key: 'count', compType: 'input'},
        {label: '小金库抵扣金额', key: 'goldCount', compType: 'input'},
        {label: '区域', key: 'where', compType: 'select'},
        {label: '所属项目', key: 'project', compType: 'input'},
        {label: '品牌', key: 'brand', compType: 'input'},
        {label: '需求名称', key: 'demandname', compType: 'input'},
        {label: '平台', key: 'platform', compType: 'select'},
        {label: '订单执行完成时间', key: 'ordertime', compType: 'date'},
        {label: '活动结算时间', key: 'activetime', compType: 'date'},
        {label: '审核时间', key: 'offtime', compType: 'date'},
        {label: '账号名称', key: 'account', compType: 'input'},
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
            { label: '扣减', value: 1 },
            { label: '不扣减', value: 0 }
        ],
        payment: [
            { label: '计提', value: 1 },
            { label: '不计提', value: 0 }
        ],
        discount: [
            { label: <span>赠送/返点<Input style={{width: 70, margin: '3px 10px 0'}} /><span>赠送/返点余额500.00，最多可抵扣500.00</span></span>, value: 1 }, 
            { label: <span>小金库<Input style={{width: 70, margin: '10px 10px 0'}} /><span>小金库余额500.00，最多可抵扣500.00</span></span>, value: 2 }, 
            { label: <span style={{marginTop: 14, display: 'inline-block'}}>无抵扣</span>, value: 3 }, 
        ]
    }
}

export const getOffListColIndex = [
    'id', 'company', 'saler', 'offtype', 'offcount', 'offaccount', 'count', 'discountcount', 'ispercent', 'iscompany', 'issaler', 'offtime', 'offperson', 'operate',
];

export const getOffDetailCloIndex = {
    yuyueyuyue: ['id', 'offtype', '订单IDnoFIxed', 'company', 'saler', '所属项目/品牌', '需求ID/需求名称', '账号信息', '发票申请单ID', '订单执行完成时间', 'offcount', 'offaccount', 'count', 'discountcount', 'iscompany', 'ispercent', 'issaler', 'offperson', 'offtime'],
    weishantou: ['id', 'offtype', '活动名称/活动类型/活动状态', 'company', 'saler', '所属项目/品牌', '账号信息', '发票申请单ID', '活动结算时间', 'offcount', 'offaccount', 'count', 'discountcount', 'iscompany', 'ispercent', 'issaler', 'offperson', 'offtime'],
    tuozhanyewu: ['id', 'offtype', '活动ID', '活动名称/活动类型/活动状态', 'company', 'saler', '所属项目/品牌', '发票申请单ID', '审核时间', 'offcount', 'offaccount', 'count', 'discountcount', 'iscompany', 'ispercent', 'issaler', 'offperson', 'offtime'],
}

export const getReceAddColIndex = {
    yuyueyuyue: ['订单ID', '订单状态', '所属项目/品牌', '需求ID/需求名称', '账号信息', '发票申请单ID', '订单执行完成时间', '应收款金额', 'offcount', '对外报价', '执行价', '质检返款', '现金结算', '赠送账户结算', '赔偿金额', '手工质检金额', '已核销金额', '已回款金额'],
    weishantou: ['活动ID', '订单状态', '所属项目/品牌', '账号信息', '发票申请单ID', '活动结算时间', '应收款金额', 'offcount', '执行价', '质检返款', '现金结算', '赠送账户结算', '手工质检金额', '已核销金额', '已回款金额'],
    tuozhanyewu: ['活动ID', '活动名称/活动类型/活动状态', '所属项目/品牌', '发票申请单ID', '审核时间', '应收款金额', 'offcount', '活动费用', '现金结算', '赠送账户结算', '已核销金额', '已回款金额'],
}

export const getReceOffCol = ( col, action ) => {
    const allCol =  [
        {
            title: '订单ID',
            dataIndex: '订单ID',
            key: '订单ID',
            width: 100,
            fixed: 'left',
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '订单ID',
            dataIndex: '订单ID',
            key: '订单IDnoFIxed',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '活动ID',
            dataIndex: '活动ID',
            key: '活动ID',
            width: 100,
            fixed: 'left',
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '发票申请单ID',
            dataIndex: '发票申请单ID',
            key: '发票申请单ID',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '活动名称/活动类型/活动状态',
            dataIndex: '活动名称/活动类型/活动状态',
            key: '活动名称/活动类型/活动状态',
            width: 100,
            align: 'center',
            render: () => {
                return (
                    <div>
                        <div>活动名称：</div>
                        <div>活动类型：</div>
                        <div>活动状态：</div>
                    </div>
                ) 
            }
        },
        {
            title: '活动结算时间',
            dataIndex: '活动结算时间',
            key: '活动结算时间',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '活动费用',
            dataIndex: '活动费用',
            key: '活动费用',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '订单状态',
            dataIndex: '订单状态',
            key: '订单状态',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '所属项目/品牌',
            dataIndex: '所属项目/品牌',
            key: '所属项目/品牌',
            width: 100,
            align: 'center',
            render: () => {
                return (
                    <div>
                        <div>项目：</div>
                        <div>品牌：</div>
                    </div>
                )
            }
        },
        {
            title: '需求ID/需求名称',
            dataIndex: '需求ID/需求名称',
            key: '需求ID/需求名称',
            width: 100,
            align: 'center',
            render: () => {
                return (
                    <div>
                        <div>需求ID：</div>
                        <div>需求名称：</div>
                    </div>
                )
            }
        },
        {
            title: '账号信息',
            dataIndex: '账号信息',
            key: '账号信息',
            width: 100,
            align: 'center',
            render: () => {
                return (
                    <div>
                        <div>平台：</div>
                        <div>账号名称：</div>
                        <div>ID：</div>
                    </div>
                )
            }
        },
        {
            title: '订单执行完成时间',
            dataIndex: '订单执行完成时间',
            key: '订单执行完成时间',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '对外报价',
            dataIndex: '对外报价',
            key: '对外报价',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '执行价',
            dataIndex: '执行价',
            key: '执行价',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '质检返款',
            dataIndex: '质检返款',
            key: '质检返款',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '赠送账户结算',
            dataIndex: '赠送账户结算',
            key: '赠送账户结算',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '赔偿金额',
            dataIndex: '赔偿金额',
            key: '赔偿金额',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '手工质检金额',
            dataIndex: '手工质检金额',
            key: '手工质检金额',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '已核销金额',
            dataIndex: '已核销金额',
            key: '已核销金额',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '已回款金额',
            dataIndex: '已回款金额',
            key: '已回款金额',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '应收款金额',
            dataIndex: '应收款金额',
            key: '应收款金额',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '现金结算',
            dataIndex: '现金结算',
            key: '现金结算',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '审核时间',
            dataIndex: '审核时间',
            key: '审核时间',
            width: 100,
            align: 'center',
            render: () => {
                return '-'
            }
        },
        {
            title: '核销编号',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            align: 'center',
        },
        {
            title: '公司简称',
            dataIndex: 'company',
            key: 'company',
            width: 100,
            align: 'center',
        },
        {
            title: '所属销售/区域',
            dataIndex: 'saler',
            key: 'saler',
            width: 100,
            align: 'center',
        },
        
        {
            title: '核销类型',
            dataIndex: 'offtype',
            key: 'offtype',
            width: 100,
            align: 'center',
        },
        {
            title: '本次核销金额',
            dataIndex: 'offcount',
            key: 'offcount',
            width: 100,
            align: 'center',
        },
        {
            title: '核销账户金额',
            dataIndex: 'offaccount',
            key: 'offaccount',
            width: 100,
            align: 'center',
        },
        {
            title: '赠送/返点账户抵扣金额',
            dataIndex: 'count',
            key: 'count',
            width: 100,
            align: 'center',
        },
        {
            title: '小金库抵扣金额',
            dataIndex: 'discountcount',
            key: 'discountcount',
            width: 100,
            align: 'center',
        },
        {
            title: '是否计提提成',
            dataIndex: 'ispercent',
            key: 'ispercent',
            width: 100,
            align: 'center',
        },
        {
            title: '是否扣减公司GMV',
            dataIndex: 'iscompany',
            key: 'iscompany',
            width: 100,
            align: 'center',
        },
        {
            title: '是否扣减销售GMV',
            dataIndex: 'issaler',
            key: 'issaler',
            width: 100,
            align: 'center',
        },
        {
            title: '核销时间',
            dataIndex: 'offtime',
            key: 'offtime',
            width: 100,
            align: 'center',
        },
        {
            title: '核销人员',
            dataIndex: 'offperson',
            key: 'offperson',
            width: 100,
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: 145,
            fixed: 'right',
            align: 'center',
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

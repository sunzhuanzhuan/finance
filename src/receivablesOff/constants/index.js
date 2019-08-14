import React from "react";

export const getQueryItems = () => {
    return [
        {label: '公司简称', key: 'company', compType: 'searchSelect'},
        {label: '销售', key: 'debt', compType: 'select'},
        {label: '核销编号', key: 'salePerson', compType: 'searchSelect'},
        {label: '核销类型', key: 'saleManage', compType: 'searchSelect'},
        {label: '发票申请单ID', key: 'saler', compType: 'searchSelect'},
        {label: '订单类型', key: 'area', compType: 'searchSelect'},
        {label: '订单/活动ID', key: 'date', compType: 'date'},
        {label: '核销时间', key: 'time', compType: 'input'},
        {label: '是否计提提成', key: 'percentage', compType: 'input'},
        {label: '是否扣减公司GMV', key: 'compGMV', compType: 'input'},
        {label: '是否扣减销售GMV', key: 'saleGMV', compType: 'input'},
        {label: '赠送/返点账户抵扣金额', key: 'count', compType: 'input'},
        {label: '小金库抵扣金额', key: 'goldCount', compType: 'input'},
        {compType: 'operate', key: 'operate'}
    ]
}

export const getAddQueryItems = queryArr => {
    const allAddQuery = [
        {label: '发票申请单ID', key: 'applyid', compType: 'input'},
        {label: '订单ID', key: 'orderid', compType: 'input'},
        {label: '订单执行完成时间', key: 'ordertime', compType: 'date'},
        {label: '品牌', key: 'brand', compType: 'input'},
        {label: '所属项目', key: 'project', compType: 'input'},
        {label: '需求名称', key: 'name', compType: 'input'},
        {label: '平台', key: 'platform', compType: 'input'},
        {label: '账号名称', key: 'account', compType: 'input'},
        {label: '活动ID', key: 'activeid', compType: 'input'},
        {label: '活动结算时间', key: 'activetime', compType: 'date'},
        {label: '审核时间', key: 'offtime', compType: 'input'},
        {compType: 'operate', key: 'operate'}
    ];
    return queryArr.map(item => allAddQuery.find(query => query.key === item));
}

export const receivableCol = [
    {
        title: '公司数量',
        dataIndex: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: '总欠款',
        dataIndex: 'sale',
        key: 'sale',
        width: 100,
    },
    {
        title: '回款待分配总金额',
        dataIndex: 'ower',
        key: 'ower',
        width: 100,
    },
    {
        title: '公司简称',
        dataIndex: 'distribute',
        key: 'distribute',
        width: 100,
    },
    {
        title: 'A端用户名',
        dataIndex: 'A端用户名',
        key: 'A端用户名',
        width: 100,
    },
    {
        title: '所属销售',
        dataIndex: '所属销售',
        key: '所属销售',
        width: 100,
    },
    {
        title: '销售主管',
        dataIndex: '销售主管',
        key: '销售主管',
        width: 100,
    },
    {
        title: '销售经理',
        dataIndex: '销售经理',
        key: 'M销售经理0',
        width: 100,
    },
    {
        title: '所属区域',
        dataIndex: '所属区域',
        key: '所属区域',
        width: 100,
    },
    {
        title: '总欠款',
        dataIndex: '总欠款',
        key: '总欠款',
        width: 100,
    },

    {
        title: 'M0',
        dataIndex: 'M0',
        key: 'M0',
        width: 100,
    },
    {
        title: 'M1',
        dataIndex: 'M1',
        key: 'M1',
        width: 100,
    },
    {
        title: 'M2',
        dataIndex: 'M2',
        key: 'M2',
        width: 100,
    },
    {
        title: 'M3',
        dataIndex: 'M3',
        key: 'M3',
        width: 100,
    },
    {
        title: 'M4',
        dataIndex: 'M4',
        key: 'M4',
        width: 100,
    },
    {
        title: 'M5',
        dataIndex: 'M5',
        key: 'M5',
        width: 100,
    },
    {
        title: 'M6',
        dataIndex: 'M6',
        key: 'M6',
        width: 100,
    },
    {
        title: 'M7',
        dataIndex: 'M7',
        key: 'M7',
        width: 100,
    },
    {
        title: 'M8',
        dataIndex: 'M8',
        key: 'M8',
        width: 100,
    },
    {
        title: 'M9',
        dataIndex: 'M9',
        key: 'M9',
        width: 100,
    },
    {
        title: 'M10-M12',
        dataIndex: 'M10',
        key: 'M10',
        width: 100,
    },
    {
        title: 'M12以内',
        dataIndex: 'M12',
        key: 'M12',
        width: 100,
    },
    {
        title: 'M12以上',
        dataIndex: 'M12a',
        key: 'M12a',
        width: 100,
    },

    {
        title: '1-2年',
        dataIndex: 'first',
        key: 'first',
        width: 100,
    },
    {
        title: '2-3年',
        dataIndex: 'second',
        key: 'second',
        width: 100,
    },
    {
        title: '3-4年',
        dataIndex: 'third',
        key: 'third',
        width: 100,
    },
    {
        title: '4-5年',
        dataIndex: 'fourth',
        key: 'fourth',
        width: 100,
    },
    {
        title: '5年以上',
        dataIndex: 'fifth',
        key: 'fifth',
        width: 100,
    },

    {
        title: '更新时间',
        dataIndex: 'update',
        key: 'update',
        width: 100,
    },
]

export const getReceOffAddCol = colArr => {
    const allCol = [
        {
            title: '订单ID',
            dataIndex: '订单ID',
            key: '订单ID',
            width: 100,
            fixed: 'left',
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
            render: () => {
                return '-'
            }
        },
        {
            title: '发票申请单ID',
            dataIndex: '发票申请单ID',
            key: '发票申请单ID',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '活动名称/活动类型/活动状态',
            dataIndex: '活动名称/活动类型/活动状态',
            key: '活动名称/活动类型/活动状态',
            width: 100,
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
            render: () => {
                return '-'
            }
        },
        {
            title: '活动费用',
            dataIndex: '活动费用',
            key: '活动费用',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '订单状态',
            dataIndex: '订单状态',
            key: '订单状态',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '所属项目/品牌',
            dataIndex: '所属项目/品牌',
            key: '所属项目/品牌',
            width: 100,
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
            render: () => {
                return '-'
            }
        },
        {
            title: '对外报价',
            dataIndex: '对外报价',
            key: '对外报价',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '执行价',
            dataIndex: '执行价',
            key: '执行价',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '质检返款',
            dataIndex: '质检返款',
            key: '质检返款',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '赠送账户结算',
            dataIndex: '赠送账户结算',
            key: '赠送账户结算',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '赔偿金额',
            dataIndex: '赔偿金额',
            key: '赔偿金额',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '手工质检金额',
            dataIndex: '手工质检金额',
            key: '手工质检金额',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '已核销金额',
            dataIndex: '已核销金额',
            key: '已核销金额',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '已回款金额',
            dataIndex: '已回款金额',
            key: '已回款金额',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '应收款金额',
            dataIndex: '应收款金额',
            key: '应收款金额',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '本次可核销金额',
            dataIndex: '本次可核销金额',
            key: '本次可核销金额',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '现金结算',
            dataIndex: '现金结算',
            key: '现金结算',
            width: 100,
            render: () => {
                return '-'
            }
        },
        {
            title: '审核时间',
            dataIndex: '审核时间',
            key: '审核时间',
            width: 100,
            render: () => {
                return '-'
            }
        }
    ]
    return colArr.map(item => allCol.find(colItem => colItem.dataIndex === item));
}
import React from "react";
export const getTabOptions = [
    { tab: '预约', key: 'reservationList' },
    { tab: '微闪投', key: 'campaignList' },
    { tab: '拓展业务', key: 'extendBusinessList' },
];

export const getQueryItems = keys => {
    const allOpts = [
        {label: '公司简称', compType: 'searchSelect', key: 'company_id', dataIndex: ['company_id', 'name']},
        {label: '欠款', compType: 'inputNumber', key: 'receivables_amount', optionKey: 'receivables_aging_range'},
        {label: '销售', compType: 'searchSelect', key: 'sale_name', dataIndex: ['saleid', 'salename']},
        {label: '销售主管', compType: 'searchSelect', key: 'sale_supervisor_name', dataIndex: ['salemanageid', 'salemanagename']},
        {label: '销售经理', compType: 'searchSelect', key: 'sale_manager_name', dataIndex: ['salerid', 'salername']},
        {label: '区域', compType: 'searchSelect', key: 'salesman_region', dataIndex: ['areaid', 'areaname']},
        {label: '截止日期', compType: 'date', key: 'time'},
        {label: '回款待分配', compType: 'inputNumber', key: 'wait_allocation_amount'},
        {label: '账龄', compType: 'searchSelect', key: 'receivables_aging_range', dataIndex: ['salemanageid', 'salemanagename']},
        {label: '执行人', compType: 'searchSelect', key: 'executor_admin_user', dataIndex: ['areaid', 'areaname']},
        {label: '发票申请单ID', compType: 'input', key: 'applyid'},
        {label: '订单ID', compType: 'input', key: 'order_id'},
        {label: '活动ID', compType: 'input', key: 'campaign_id'},
        {label: '品牌', compType: 'input', key: 'brand_name'},
        {label: '所属项目', compType: 'input', key: 'project_name'},
        {label: '需求名称', compType: 'input', key: 'requirement_name'},
        {label: '平台', compType: 'select', key: 'platform_id', optionKey: 'platform'},
        {label: '账号名称', compType: 'input', key: 'weibo_name'},
        {label: '订单执行完成时间', compType: 'date', key: 'execution_completed_time'},
        {label: '活动结算时间', compType: 'date', key: 'campaign_settlement_time'},
        {compType: 'operate', key: 'operate'}
    ];
    return keys.map(item => allOpts.find(queryItem => queryItem.key === item));
};

export const getQueryKeys = {
    receivableList: ['company_id', 'salesman_region', 'sale_name', 'sale_supervisor_name', 'sale_manager_name', 'receivables_amount', 'wait_allocation_amount', 'time', 'operate'],
    reservationList: ['company_id', 'salesman_region', 'sale_name', 'execution_completed_time', 'receivables_aging_range', 'receivables_amount', 'project_name', 'requirement_name', 'platform_id', 'weibo_name', 'order_id', 'brand_name', 'executor_admin_user', 'operate'], 
    campaignList: ['company_id', 'salesman_region', 'sale_name', 'campaign_settlement_time', 'receivables_aging_range', 'receivables_amount', 'project_name', 'platform_id', 'weibo_name', 'campaign_id', 'brand_name', 'operate'], 
    extendBusinessList: ['company_id', 'salesman_region', 'sale_name', 'campaign_settlement_time', 'receivables_aging_range', 'receivables_amount', 'project_name', 'campaign_id', 'brand_name', 'operate'], 
}

export const getReceivableDetailCol = () => {
    return [
        {
            title: '订单ID',
            dataIndex: 'orderid',
            key: 'orderid',
            width: 100,
        },
        {
            title: '活动ID',
            dataIndex: 'activeid',
            key: 'activeid',
            width: 100,
        },
        {
            title: '活动名称',
            dataIndex: 'activename',
            key: 'activename',
            width: 100,
        },
        {
            title: '订单类型',
            dataIndex: 'ordertype',
            key: 'ordertype',
            width: 100,
        },
        {
            title: '公司简称',
            dataIndex: 'companyname',
            key: 'companyname',
            width: 100,
        },
        {
            title: '所属销售',
            dataIndex: 'saler',
            key: 'saler',
            width: 100,
        },
        {
            title: '执行人',
            dataIndex: 'excuter',
            key: 'excuter',
            width: 100,
        },
        {
            title: '区域',
            dataIndex: 'area',
            key: 'area',
            width: 100,
        },
        {
            title: '所属项目',
            dataIndex: 'project',
            key: 'project',
            width: 100,
        },
        {
            title: '品牌',
            dataIndex: 'brand',
            key: 'brand',
            width: 100,
        },
        {
            title: '需求ID',
            dataIndex: 'requiredid',
            key: 'requiredid',
            width: 100,
        },
        {
            title: '需求名称',
            dataIndex: 'requiredname',
            key: 'requiredname',
            width: 100,
        },
        {
            title: '账号ID',
            dataIndex: 'accountid',
            key: 'accountid',
            width: 100,
        },
        {
            title: '账户名称',
            dataIndex: 'accountname',
            key: 'accountname',
            width: 100,
        },
        {
            title: '平台',
            dataIndex: 'platform',
            key: 'platform',
            width: 100,
        },
        {
            title: '发票申请单ID',
            dataIndex: 'applyid',
            key: 'applyid',
            width: 100,
        },
        {
            title: '订单执行完成时间',
            dataIndex: 'excutetime',
            key: 'excutetime',
            width: 100,
        },
        {
            title: '账龄',
            dataIndex: 'accounttime',
            key: 'accounttime',
            width: 100,
        },
        {
            title: '应收款金额',
            dataIndex: 'money',
            key: 'money',
            width: 100,
        }
    ]
}

export const receivableCol = [
    {
        title: '公司简称',
        dataIndex: 'company_name',
        key: 'company_name',
        width: 100,
    },
    {
        title: '销售/区域',
        dataIndex: 'sale_and_region',
        key: 'sale_and_region',
        width: 100,
    },
    {
        title: '总欠款',
        dataIndex: 'receivables_amount',
        key: 'receivables_amount',
        width: 100,
    },
    {
        title: '回款待分配',
        dataIndex: 'wait_allocation_amount',
        key: 'wait_allocation_amount',
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
        dataIndex: 'M10-M12',
        key: 'M10-M12',
        width: 100,
    },
    {
        title: 'M12以内',
        dataIndex: '-M12',
        key: '-M12',
        width: 100,
    },
    {
        title: 'M12以上',
        dataIndex: 'M12+',
        key: 'M12+',
        width: 100,
    },

    {
        title: '1-2年',
        dataIndex: 'M12-M24',
        key: 'M12-M24',
        width: 100,
    },
    {
        title: '2-3年',
        dataIndex: 'M24-M36',
        key: 'M24-M36',
        width: 100,
    },
    {
        title: '3-4年',
        dataIndex: 'M36-M48',
        key: 'M36-M48',
        width: 100,
    },
    {
        title: '4-5年',
        dataIndex: 'M48-M60',
        key: 'M48-M60',
        width: 100,
    },
    {
        title: '5年以上',
        dataIndex: 'M60+',
        key: 'M60+',
        width: 100,
    },

    {
        title: '更新时间',
        dataIndex: 'modified_at',
        key: 'modified_at',
        width: 100,
    },
]
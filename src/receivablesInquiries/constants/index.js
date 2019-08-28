import React from "react";
export const getTabOptions = [
    { tab: '预约', key: 'reservationList' },
    { tab: '微闪投', key: 'campaignList' },
    { tab: '拓展业务', key: 'extendBusinessList' },
];

export const getTableId = {
    reservationList: 'order_id',
    campaignList: 'campaign_id',
    extendBusinessList: 'business_id',
}

export const getQueryItems = keys => {
    const allOpts = [
        {label: '公司简称', compType: 'searchSelect', key: 'company_id', dataIndex: ['company_id', 'name']},
        {label: '销售', compType: 'searchSelect', key: 'sale_name', dataIndex: ['saleid', 'salename']},
        {label: '销售主管', compType: 'searchSelect', key: 'sale_supervisor_name', dataIndex: ['salemanageid', 'salemanagename']},
        {label: '销售经理', compType: 'searchSelect', key: 'sale_manager_name', dataIndex: ['salerid', 'salername']},
        {label: '区域', compType: 'select', key: 'salesman_region'},
        {label: '截止日期', compType: 'date', key: 'time'},
        {label: '回款待分配', compType: 'inputNumber', key: 'wait_allocation_amount'},
        {label: '欠款', compType: 'select', key: 'receivables_aging_range', optionKey: 'receivables_aging_range'},
        {label: '执行人', compType: 'searchSelect', key: 'executor_admin_user', dataIndex: ['areaid', 'areaname']},
        {label: '发票申请单ID', compType: 'input', key: 'invoice_application_id'},
        {label: '订单ID', compType: 'input', key: 'order_id'},
        {label: '活动ID', compType: 'input', key: 'campaign_id'},
        {label: '品牌', compType: 'input', key: 'brand_name'},
        {label: '所属项目', compType: 'input', key: 'project_name'},
        {label: '需求名称', compType: 'input', key: 'requirement_name'},
        {label: '平台', compType: 'select', key: 'platform_id', optionKey: 'platform'},
        {label: '账号名称', compType: 'input', key: 'weibo_name'},
        {label: '订单执行完成时间', compType: 'date', key: 'execution_completed_time'},
        {label: '活动结算时间', compType: 'date', key: 'campaign_settlement_time'},
        {label: '审核时间', compType: 'date', key: 'pass_time'},
        {compType: 'rangeAndValue', key: 'range-value', optionKey: 'receivables_aging_range'},
        {compType: 'operate', key: 'operate'}
    ];
    return keys.map(item => allOpts.find(queryItem => queryItem.key === item));
};

export const getQueryKeys = {
    receivableList: ['company_id', 'receivables_aging_range', 'salesman_region', 'time', 'sale_manager_name', 'sale_supervisor_name', 'sale_name', 'wait_allocation_amount', 'operate'],
    reservationList: ['company_id', 'salesman_region', 'sale_name', 'execution_completed_time', 'range-value', 'project_name', 'requirement_name', 'platform_id', 'weibo_name', 'order_id', 'brand_name', 'executor_admin_user', 'operate'], 
    campaignList: ['company_id', 'salesman_region', 'sale_name', 'campaign_settlement_time', 'range-value', 'project_name', 'platform_id', 'campaign_id', 'brand_name', 'operate'], 
    extendBusinessList: ['company_id', 'salesman_region', 'sale_name', 'pass_time', 'range-value', 'project_name', 'campaign_id', 'brand_name', 'operate'], 
}

export const getColKeys = {
    reservationList: ['order_id', 'company_name', 'sale_name_excutor_area', 'project_name_brand', 'requirement_id_name', 'account_id_platform_name', 'invoice_application_id', 'execution_completed_time', 'aging', 'receivables_amount'], 
    campaignList: ['campaign_id', 'campaign_name', 'company_name', 'sale_name_area', 'project_name_brand', 'platform_name', 'invoice_application_id', 'campaign_settlement_time', 'aging', 'receivables_amount'], 
    extendBusinessList: ['business_id', 'business_type_name', 'company_name', 'sale_name_area', 'project_name_brand', 'invoice_application_id', 'pass_time', 'aging', 'receivables_amount'], 
}

const render = (data = '-') => {
    return (
        <div>{data}</div>
    )
}

export const getReceivableDetailCol = keys => {
    const allCols = [
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 100,
            render
        },
        {
            title: '活动ID',
            dataIndex: 'campaign_id',
            key: 'campaign_id',
            width: 100,
            render
        },
        {
            title: '活动名称',
            dataIndex: 'campaign_name',
            key: 'campaign_name',
            width: 100,
            render
        },
        {
            title: '活动ID',
            dataIndex: 'business_id',
            key: 'business_id',
            width: 100,
            render
        },
        {
            title: '活动名称/活动类型',
            dataIndex: 'business_type_name',
            key: 'business_type_name',
            width: 100,
            render: (_, record) => {
                const {business_name = '-', business_type = '-'} = record;
                return (
                    <>
                        <div>活动名称：{business_name}</div>
                        <div>活动类型：{business_type}</div>
                    </>
                )
            }
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
            dataIndex: 'sale_name_area',
            key: 'sale_name_area',
            width: 100,
            render: (_, record) => {
                const {sale_name = '-', salesman_region = '-'} = record;
                return (
                    <>
                        <div>销售：{sale_name}</div>
                        <div>区域：{salesman_region}</div>
                    </>
                )
            }
        },
        {
            title: '所属销售/执行人/区域',
            dataIndex: 'sale_name_excutor_area',
            key: 'sale_name_excutor_area',
            width: 100,
            render: (_, record) => {
                const {sale_name = '-', executor_admin_user = '-', salesman_region = '-'} = record;
                return (
                    <>
                        <div>销售：{sale_name}</div>
                        <div>执行人：{executor_admin_user}</div>
                        <div>区域：{salesman_region}</div>
                    </>
                )
            }
        },
        {
            title: '所属项目/品牌',
            dataIndex: 'project_name_brand',
            key: 'project_name_brand',
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
            dataIndex: 'requirement_id_name',
            key: 'requirement_id_name',
            width: 100,
            render: (_, record) => {
                const {requirement_id = '-', requirement_name = '-'} = record;
                return (
                    <>
                        <div>需求ID：{requirement_id}</div>
                        <div>需求名称：{requirement_name}</div>
                    </>
                )
            }
        },
        {
            title: '账号信息',
            dataIndex: 'account_id_platform_name',
            key: 'account_id_platform_name',
            width: 100,
            render: (_, record) => {
                const {account_id = '-', weibo_name = '-', platform_name = '-'} = record;
                return (
                    <>
                        <div>平台：{platform_name}</div>
                        <div>账号ID：{account_id}</div>
                        <div>账号名称：{weibo_name}</div>
                    </>
                )
            }
        },
        {
            title: '平台',
            dataIndex: 'platform_name',
            key: 'platform_name',
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
            title: '订单执行完成时间',
            dataIndex: 'execution_completed_time',
            key: 'execution_completed_time',
            width: 100,
            render
        },
        {
            title: '活动结算时间',
            dataIndex: 'campaign_settlement_time',
            key: 'campaign_settlement_time',
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
            title: '账龄',
            dataIndex: 'aging',
            key: 'aging',
            width: 100,
            render
        },
        {
            title: '应收款金额',
            dataIndex: 'receivables_amount',
            key: 'receivables_amount',
            width: 100,
            render
        }
    ];
    return keys.map(item => allCols.find(queryItem => queryItem.key === item));
}

export const receivableCol = [
    {
        title: '公司简称',
        dataIndex: 'company_name',
        key: 'company_name',
        width: 100,
        render
    },
    {
        title: '销售/区域',
        dataIndex: 'sale_and_region',
        key: 'sale_and_region',
        width: 100,
        render
    },
    {
        title: '总欠款',
        dataIndex: 'receivables_amount',
        key: 'receivables_amount',
        width: 100,
        render
    },
    {
        title: '回款待分配',
        dataIndex: 'wait_allocation_amount',
        key: 'wait_allocation_amount',
        width: 100,
        render
    },
    {
        title: 'M0',
        dataIndex: 'M0',
        key: 'M0',
        width: 100,
        render
    },
    {
        title: 'M1',
        dataIndex: 'M1',
        key: 'M1',
        width: 100,
        render
    },
    {
        title: 'M2',
        dataIndex: 'M2',
        key: 'M2',
        width: 100,
        render
    },
    {
        title: 'M3',
        dataIndex: 'M3',
        key: 'M3',
        width: 100,
        render
    },
    {
        title: 'M4',
        dataIndex: 'M4',
        key: 'M4',
        width: 100,
        render
    },
    {
        title: 'M5',
        dataIndex: 'M5',
        key: 'M5',
        width: 100,
        render
    },
    {
        title: 'M6',
        dataIndex: 'M6',
        key: 'M6',
        width: 100,
        render
    },
    {
        title: 'M7',
        dataIndex: 'M7',
        key: 'M7',
        width: 100,
        render
    },
    {
        title: 'M8',
        dataIndex: 'M8',
        key: 'M8',
        width: 100,
        render
    },
    {
        title: 'M9',
        dataIndex: 'M9',
        key: 'M9',
        width: 100,
        render
    },
    {
        title: 'M10-M12',
        dataIndex: 'M10-M12',
        key: 'M10-M12',
        width: 100,
        render
    },
    {
        title: 'M12以内',
        dataIndex: '-M12',
        key: '-M12',
        width: 100,
        render
    },
    {
        title: 'M12以上',
        dataIndex: 'M12+',
        key: 'M12+',
        width: 100,
        render
    },

    {
        title: '1-2年',
        dataIndex: 'M12-M24',
        key: 'M12-M24',
        width: 100,
        render
    },
    {
        title: '2-3年',
        dataIndex: 'M24-M36',
        key: 'M24-M36',
        width: 100,
        render
    },
    {
        title: '3-4年',
        dataIndex: 'M36-M48',
        key: 'M36-M48',
        width: 100,
        render
    },
    {
        title: '4-5年',
        dataIndex: 'M48-M60',
        key: 'M48-M60',
        width: 100,
        render
    },
    {
        title: '5年以上',
        dataIndex: 'M60+',
        key: 'M60+',
        width: 100,
        render
    },

    {
        title: '更新时间',
        dataIndex: 'modified_at',
        key: 'modified_at',
        width: 100,
        render
    },
]
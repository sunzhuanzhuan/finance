import React from "react";
import numeral from 'numeral';

export const getTabOptions = [
    { tab: '预约', key: 'reservationList', value: 3 },
    { tab: '微闪投', key: 'campaignList', value: 2 },
    { tab: '拓展业务', key: 'extendBusinessList', value: 7 },
];

export const getTableId = {
    reservationList: 'order_id',
    campaignList: 'campaign_id',
    extendBusinessList: 'business_id',
}

export const getQueryItems = keys => {
    const allOpts = [
        {label: '公司简称', compType: 'searchSelect', key: 'company_id', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '销售', compType: 'searchSelect', key: 'sale_id', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '销售主管', compType: 'searchSelect', key: 'sale_supervisor_name', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '销售经理', compType: 'searchSelect', key: 'sale_manager_name', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '区域', compType: 'select', key: 'region_team_id', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '截止日期', compType: 'date', key: 'time'},
        {label: '回款待分配', compType: 'inputNumber', key: 'wait_allocation_amount'},
        {label: '欠款', compType: 'select', key: 'receivables_aging_range', optionKey: 'receivables_aging_range', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '执行人', compType: 'searchSelect', key: 'executor_admin_id', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '发票申请单ID', compType: 'input', key: 'invoice_application_id'},
        {label: '订单ID', compType: 'input', key: 'order_ids'},
        {label: '活动ID', compType: 'input', key: 'campaign_id'},
        {label: '品牌', compType: 'input', key: 'brand_id'},
        {label: '所属项目', compType: 'input', key: 'project_id'},
        {label: '需求名称', compType: 'input', key: 'requirement_id'},
        {label: '平台', compType: 'select', key: 'weibo_type', optionKey: 'platform', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '账号名称', compType: 'input', key: 'account_id'},
        {label: '订单执行完成时间', key: 'execution_completed_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '活动结算时间', key: 'campaign_settlement_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '审核时间', compType: 'date', key: 'pass_time'},
        {compType: 'rangeAndValue', key: 'range-value', optionKey: 'receivables_aging_range'},
        {compType: 'operate', key: 'operate'}
    ];
    return keys.map(item => allOpts.find(queryItem => queryItem.key === item));
};

export const getQueryKeys = {
    receivableList: ['company_id', 'receivables_aging_range', 'region_team_id', 'time', 'sale_manager_name', 'sale_supervisor_name', 'sale_name', 'wait_allocation_amount', 'operate'],
    reservationList: ['company_id', 'region_team_id', 'sale_id', 'execution_completed_time', 'range-value', 'project_id', 'requirement_id', 'weibo_type', 'account_id', 'order_ids', 'brand_id', 'executor_admin_id', 'operate'], 
    campaignList: ['company_id', 'region_team_id', 'sale_id', 'campaign_settlement_time', 'range-value', 'project_id', 'weibo_type', 'campaign_id', 'brand_id', 'operate'], 
    extendBusinessList: ['company_id', 'region_team_id', 'sale_id', 'pass_time', 'range-value', 'project_id', 'campaign_id', 'brand_id', 'operate'], 
}

export const getColKeys = {
    reservationList: ['order_id', 'company_name', 'sale_name_excutor_area', 'project_name_brand', 'requirement_id_name', 'account_id_platform_name', 'orders_relation_invoice', 'execution_completed_time', 'aging', 'receivables_amount'], 
    campaignList: ['campaign_id', 'campaign_name', 'company_name', 'sale_name_area', 'project_name_brand', 'platform_name', 'orders_relation_invoice', 'campaign_settlement_time', 'aging', 'receivables_amount'], 
    extendBusinessList: ['business_id', 'business_type_name', 'company_name', 'sale_name_area', 'project_name_brand', 'orders_relation_invoice', 'pass_time', 'aging', 'receivables_amount'], 
}

const render = (data = '-') => {
    return (
        <div>{data}</div>
    )
}

const renderNum = data => {
    return data !== undefined ? numeral(data).format('0.00') : '-'
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
                const {sale_name = '-', executor_admin_user = '-', region = '-'} = record;
                return (
                    <>
                        <div>销售：{sale_name}</div>
                        <div>执行人：{executor_admin_user}</div>
                        <div>区域：{region}</div>
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
            dataIndex: 'orders_relation_invoice',
            key: 'orders_relation_invoice',
            width: 100,
            render
        },
        {
            title: '订单执行完成时间',
            dataIndex: 'execution_completed_time',
            key: 'execution_completed_time',
            width: 110,
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
            render: renderNum
        }
    ];
    return keys.map(item => allCols.find(queryItem => queryItem.key === item));
}

const mRender = (data, mKey, handleJump) => {
    const className = data ? 'detail_entry_comp' : '';
    const showData = data !== undefined ? numeral(data).format('0.00') : '-'; 
    return (
        <div className={className} onClick={() => {handleJump(mKey)}}>{showData}</div>
    )
}

export const receivableCol = handleJump => [
    {
        title: '公司简称',
        dataIndex: 'company_name',
        key: 'company_name',
        width: 100,
        render
    },
    {
        title: '销售/区域',
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
        title: '总欠款',
        dataIndex: 'receivables_amount',
        key: 'receivables_amount',
        width: 100,
        render: renderNum
    },
    {
        title: '回款待分配',
        dataIndex: 'wait_allocation_amount',
        key: 'wait_allocation_amount',
        width: 100,
        render: renderNum
    },
    {
        title: 'M0',
        dataIndex: 'M0',
        key: 'M0',
        width: 100,
        render: data => mRender(data, 2, handleJump) 
    },
    {
        title: 'M1',
        dataIndex: 'M1',
        key: 'M1',
        width: 100,
        render: data => mRender(data, 3, handleJump)
    },
    {
        title: 'M2',
        dataIndex: 'M2',
        key: 'M2',
        width: 100,
        render: data => mRender(data, 4, handleJump)
    },
    {
        title: 'M3',
        dataIndex: 'M3',
        key: 'M3',
        width: 100,
        render: data => mRender(data, 5, handleJump)
    },
    {
        title: 'M4',
        dataIndex: 'M4',
        key: 'M4',
        width: 100,
        render: data => mRender(data, 6, handleJump)
    },
    {
        title: 'M5',
        dataIndex: 'M5',
        key: 'M5',
        width: 100,
        render: data => mRender(data, 7, handleJump)
    },
    {
        title: 'M6',
        dataIndex: 'M6',
        key: 'M6',
        width: 100,
        render: data => mRender(data, 8, handleJump)
    },
    {
        title: 'M7',
        dataIndex: 'M7',
        key: 'M7',
        width: 100,
        render: data => mRender(data, 9, handleJump)
    },
    {
        title: 'M8',
        dataIndex: 'M8',
        key: 'M8',
        width: 100,
        render: data => mRender(data, 10, handleJump)
    },
    {
        title: 'M9',
        dataIndex: 'M9',
        key: 'M9',
        width: 100,
        render: data => mRender(data, 11, handleJump)
    },
    {
        title: 'M10-M12',
        dataIndex: 'M10-M12',
        key: 'M10-M12',
        width: 100,
        render: data => mRender(data, 12, handleJump)
    },
    {
        title: 'M12以内',
        dataIndex: '-M12',
        key: '-M12',
        width: 100,
        render: data => mRender(data, 13, handleJump)
    },
    {
        title: 'M12以上',
        dataIndex: 'M12+',
        key: 'M12+',
        width: 100,
        render: data => mRender(data, 14, handleJump)
    },

    {
        title: '1-2年',
        dataIndex: 'M12-M24',
        key: 'M12-M24',
        width: 100,
        render: data => mRender(data, 15, handleJump)
    },
    {
        title: '2-3年',
        dataIndex: 'M24-M36',
        key: 'M24-M36',
        width: 100,
        render: data => mRender(data, 16, handleJump)
    },
    {
        title: '3-4年',
        dataIndex: 'M36-M48',
        key: 'M36-M48',
        width: 100,
        render: data => mRender(data, 17, handleJump)
    },
    {
        title: '4-5年',
        dataIndex: 'M48-M60',
        key: 'M48-M60',
        width: 100,
        render: data => mRender(data, 18, handleJump)
    },
    {
        title: '5年以上',
        dataIndex: 'M60+',
        key: 'M60+',
        width: 100,
        render: data => mRender(data, 19, handleJump)
    },

    {
        title: '更新时间',
        dataIndex: 'modified_at',
        key: 'modified_at',
        width: 100,
        render
    },
]
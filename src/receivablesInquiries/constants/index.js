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
        {label: '销售', key: 'sale_id', compType: 'select', optionKey: 'receSalerList', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '区域', key: 'region_team_id', compType: 'select', optionKey: 'regionList', idKey: 'region_team_id', labelKey: 'region_team_name'},
        {label: '截止日期', compType: 'singleDate', key: 'time'},
        {label: '回款待分配>', compType: 'inputNumber', key: 'wait_allocation_amount'},
        {label: '欠款', compType: 'select', key: 'receivables_aging_range', optionKey: 'receivables_aging_range', idKey: 'id', labelKey: 'display', showSearch: true},
        {label: '执行人', compType: 'select', key: 'executor_admin_id', optionKey: 'excutorList', idKey: 'owner_admin_id', labelKey: 'real_name', showSearch: true},
        {label: '发票申请单ID', compType: 'input', key: 'invoice_application_id'},
        {label: '订单ID', compType: 'input', key: 'order_ids', placeholder: '支持批量查询，以空格隔开'},
        {label: '活动ID', compType: 'input', upperKey: 'campaign_id', key: 'order_ids', placeholder: '支持批量查询，以空格隔开'},
        {label: '品牌', key: 'brand_id', compType: 'searchSelect', actionKey: 'brand', dataIndex: ['id', 'view_name'], keyWord: 'view_name'},
        {label: '所属项目', key: 'project_id', compType: 'searchSelect', actionKey: 'project', dataIndex: ['id', 'name'], keyWord: 'name'},
        {label: '需求名称', key: 'requirement_id', compType: 'searchSelect', actionKey: 'requirement', dataIndex: ['id', 'name'], keyWord: 'requirement_name'},
        {label: '平台', key: 'weibo_type', compType: 'select', optionKey: 'platformList', idKey: 'pid', labelKey: 'platform_name'},
        {label: '账号名称', key: 'account_id', compType: 'searchSelect', actionKey: 'account', dataIndex: ['account_id', 'weibo_name'], keyWord: 'weibo_name'},
        {label: '订单执行完成时间', key: 'execution_completed_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '活动结算时间', key: 'campaign_settlement_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '审核时间', key: 'pass_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {compType: 'rangeAndValue', key: 'range-value', optionKey: 'receivables_aging_range'},
        {compType: 'operate', key: 'operate'}
    ];
    return keys.map(item => allOpts.find(queryItem => queryItem.upperKey === item || queryItem.key === item));
};

export const getReceListQueryKey = userGroupId => {
    switch(userGroupId) {
        case '2':
        case '25':
        case '29':
        case '10':
            return ['company_id', 'receivables_aging_range', 'region_team_id', 'time', 'sale_id', 'wait_allocation_amount', 'operate'];
        case '26':
        case '30':
        case '31':
        case '32':
        case '33':
            return ['company_id', 'receivables_aging_range', 'time', 'sale_id', 'wait_allocation_amount', 'operate'];
        case '34':
            return ['company_id', 'receivables_aging_range', 'time', 'wait_allocation_amount', 'operate'];
        default:
            return [];
    }
}

export const getQueryKeys = {
    reservationList: ['company_id', 'region_team_id', 'sale_id', 'execution_completed_time', 'range-value', 'project_id', 'requirement_id', 'weibo_type', 'account_id', 'order_ids', 'brand_id', 'executor_admin_id', 'operate'], 
    campaignList: ['company_id', 'region_team_id', 'sale_id', 'campaign_settlement_time', 'range-value', 'project_id', 'weibo_type', 'campaign_id', 'brand_id', 'operate'], 
    extendBusinessList: ['company_id', 'region_team_id', 'sale_id', 'pass_time', 'range-value', 'project_id', 'campaign_id', 'brand_id', 'operate'], 
}

export const getColKeys = {
    reservationList: ['order_id', 'company_name', 'sale_name_excutor_area', 'project_name_brand', 'requirement_id_name', 'account_id_platform_name', 'orders_relation_invoice', 'execution_completed_time', 'aging_name', 'receivables_amount'], 
    campaignList: ['campaign_id', 'campaign_name', 'company_name', 'sale_name_area', 'project_name_brand', 'platform_name', 'orders_relation_invoice', 'campaign_settlement_time', 'aging_name', 'receivables_amount'], 
    extendBusinessList: ['business_id', 'business_type_name', 'company_name', 'sale_name_area', 'project_name_brand', 'orders_relation_invoice', 'pass_time', 'aging_name', 'receivables_amount'], 
}

const render = data => {
    return data || data == 0 ? data : '-';
}

const renderNum = data => {
    return data !== undefined ? numeral(data).format('0.00') : '-'
}

const linkRender = (data, record) => {
    const { link } = record;

    return link && data ? <a target='_blank' href={link}>{data}</a> : data || '-';
}

const invoiceIdRender = data => {
    if(Array.isArray(data))
        return data.length ? data.map(item => item || item == 0 ? <div key={item}><a target='_blank' href={`/finance/invoice/applyDetail?id=${item}`}>{item}</a></div> : '-') : '-';
    return data || data == 0 ? <a target='_blank' href={`/finance/invoice/applyDetail?id=${data}`}>{data}</a> : '-';
}

const timeRender = data => {
    if(!data || !(Array.isArray(data.split(' ')))) return data || '-';
    return data.split(' ').map(item => <div key={item}>{item}</div>);
}

export const getReceivableDetailCol = keys => {
    const allCols = [
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 80,
            render: linkRender
        },
        {
            title: '活动ID',
            dataIndex: 'order_id',
            key: 'campaign_id',
            width: 80,
            render: linkRender
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
            dataIndex: 'order_id',
            key: 'business_id',
            width: 80,
            render: linkRender
        },
        {
            title: '活动名称/活动类型',
            dataIndex: 'business_type_name',
            key: 'business_type_name',
            width: 120,
            render: (_, record) => {
                const {business_name, display} = record;
                return (
                    <>
                        <div>活动名称：{render(business_name)}</div>
                        <div>活动类型：{render(display)}</div>
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
                const {sale_name, region} = record;
                return (
                    <>
                        <div>销售：{render(sale_name)}</div>
                        <div>区域：{render(region)}</div>
                    </>
                )
            }
        },
        {
            title: '所属销售/执行人/区域',
            dataIndex: 'sale_name_excutor_area',
            key: 'sale_name_excutor_area',
            width: 140,
            render: (_, record) => {
                const {sale_name, executor_admin_user, region} = record;
                return (
                    <>
                        <div>销售：{render(sale_name)}</div>
                        <div>执行人：{render(executor_admin_user)}</div>
                        <div>区域：{render(region)}</div>
                    </>
                )
            }
        },
        {
            title: '所属项目/品牌',
            dataIndex: 'project_name_brand',
            key: 'project_name_brand',
            width: 120,
            render: (_, record) => {
                const {project_name, brand_name} = record;
                return (
                    <>
                        <div>项目：{render(project_name)}</div>
                        <div>品牌：{render(brand_name)}</div>
                    </>
                )
            }
        },
        {
            title: '需求ID/需求名称',
            dataIndex: 'requirement_id_name',
            key: 'requirement_id_name',
            width: 140,
            render: (_, record) => {
                const {requirement_id, requirement_name} = record;
                return (
                    <>
                        <div>需求ID：{render(requirement_id)}</div>
                        <div>需求名称：{render(requirement_name)}</div>
                    </>
                )
            }
        },
        {
            title: '账号信息',
            dataIndex: 'account_id_platform_name',
            key: 'account_id_platform_name',
            width: 140,
            render: (_, record) => {
                const {account_id, weibo_name, platform_name} = record;
                return (
                    <>
                        <div>平台：{render(platform_name)}</div>
                        <div>账号ID：{render(account_id)}</div>
                        <div>账号名称：{render(weibo_name)}</div>
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
            render: invoiceIdRender
        },
        {
            title: '订单执行完成时间',
            dataIndex: 'execution_completed_time',
            key: 'execution_completed_time',
            width: 120,
            render: timeRender
        },
        {
            title: '活动结算时间',
            dataIndex: 'settlement_time',
            key: 'campaign_settlement_time',
            width: 100,
            render: timeRender
        },
        {
            title: '审核时间',
            dataIndex: 'pass_time',
            key: 'pass_time',
            width: 100,
            render: timeRender
        },
        {
            title: '账龄',
            dataIndex: 'aging_name',
            key: 'aging_name',
            width: 80,
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

const mRender = (data, mKey, record, handleJump) => {
    const className = data !== undefined ? 'detail_entry_comp' : '';
    const { company_id, company_real_name, company_name, region_team_id, sale_id } = record;
    const queryValues = {
        receivables_aging_range: mKey,
        region_team_id,
        sale_id
    };
    if(company_id && (company_real_name || company_name))
        Object.assign(queryValues, 
            {
                company_id: {
                key: company_id,
                label: company_real_name || company_name
            }})
    const showData = data !== undefined ? numeral(data).format('0.00') : '-'; 
    return (
        <div className={className} onClick={() => {handleJump(queryValues)}}>{showData}</div>
    )
}

export const receivableCol = (agingRangeArr, handleJump) => {
    const frontArr = [
        {
            title: '公司简称',
            dataIndex: 'company_name',
            key: 'company_name',
            width: 120,
            fixed: 'left',
            render
        },
        {
            title: '销售/区域',
            dataIndex: 'sale_name_area',
            key: 'sale_name_area',
            width: 150,
            fixed: 'left',
            render: (_, record) => {
                const {sale_name, sale_supervisor_name, sale_manager_name, region_team_name, isTotalRow} = record;
                return (
                    isTotalRow ? '-' :
                    <>
                        <div>销售：{render(sale_name)}</div>
                        <div>销售主管：{render(sale_supervisor_name)}</div>
                        <div>销售经理：{render(sale_manager_name)}</div>
                        <div>区域：{render(region_team_name)}</div>
                    </>
                )
            }
        },
        {
            title: '总欠款',
            dataIndex: 'total_receivables_amount',
            key: 'total_receivables_amount',
            width: 120,
            fixed: 'left',
            render: renderNum
        },
        {
            title: '回款待分配',
            dataIndex: 'wait_allocation_amount',
            key: 'wait_allocation_amount',
            width: 120,
            fixed: 'left',
            render: renderNum
        },
    ];
    const endArr = [
        {
            title: '更新时间',
            dataIndex: 'modified_at',
            key: 'modified_at',
            width: 100,
            render: timeRender
        }
    ];

    if(Array.isArray(agingRangeArr) && agingRangeArr.length) {
        const rangeArea = agingRangeArr.map(item => {
            const { display, id } = item;
            return {
                title: display,
                dataIndex: display,
                key: display,
                width: 110,
                render: (data, record) => mRender(data, id, record, handleJump) 
            }
        });

        return [...frontArr, ...rangeArea, ...endArr];
    }

    return [...frontArr, ...endArr];
}

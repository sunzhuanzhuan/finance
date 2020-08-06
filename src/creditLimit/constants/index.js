import React from "react";
import { Tag } from 'antd';
export const getCreditQueryItems = () => {
    const allQuery =  [
        {label: '订单ID/活动ID', key: 'orderId', compType: 'input'},
        {label: '销售', key: 'saleId', compType: 'select', optionKey: 'salerData', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '区域', key: 'reginTeamId', compType: 'select', optionKey: 'regionList', idKey: 'region_team_id', labelKey: 'region_team_name'},
        {label: '公司简称', key: 'companyId', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '公司全称', key: 'companyIdFull', compType: 'searchSelect', actionKey: 'companyFull', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '需求名称', key: 'requirementId', compType: 'searchSelect', actionKey: 'requirement', dataIndex: ['id', 'name'], keyWord: 'requirement_name'},
        {label: '项目名称', key: 'projectId', compType: 'searchSelect', actionKey: 'project', dataIndex: ['id', 'name'], keyWord: 'name'},
        {label: 'PO', key: 'po', compType: 'searchSelect', actionKey: 'poList', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '品牌', key: 'brandId', compType: 'searchSelect', actionKey: 'brand', dataIndex: ['id', 'view_name'], keyWord: 'view_name'},
        {label: '开票时间', key: 'kaipiao_time', compType: 'date', submitKey:['invoiceOpenTimeStart', 'invoiceOpenTimeEnd']},
        {label: '应还款时间', key: 'huankuan_time', compType: 'date', submitKey:['paybackTimeStart', 'paybackTimeEnd']},
        {compType: 'operate', key: 'operate'}
    ];
    return allQuery;
}

const tdRender = (arr, record = {}) => {
    return arr.map(item => {
        if(!item) {
            return null;
        }
        const { title, key, extra } = item;
        return (
            <div key={key}>
                {`${title}：${record[key] || '-'}`}
                { extra ? <Tag color="#108ee9" className='credit_td_extra_tag'>{`${extra.title}：${record[extra.key] || '-'}`}</Tag> : null }
            </div>
        )
    });
}

export const getTabOptions = [
    { tab: '预约订单', key: '3' },
    { tab: '微闪投', key: '2' },
    { tab: '拓展业务', key: '7' },
];

const tdSubList = (key, activeKey) => {
    const subOption = {
        'companyName': [
            {title: '公司简称', key: 'companyName'},
            {title: '公司全称', key: 'companyFullName'},
        ],
        'saleInfo': [
            {title: '销售', key: 'saleName'},
            {title: '区域', key: 'saleRegion'},
        ],
        'orderInfo': [
            {title: '项目', key: 'projectName'},
            {title: '品牌', key: 'brandName'},
            {title: 'PO', key: 'poCode'},
        ],
        'orderDetail': activeKey === '3' ? [
            {title: '需求ID', key: 'requirementId'},
            {title: '需求名称', key: 'requirementName'},
        ] : [
            {title: '活动名称', key: 'campaignName'},
        ],
        'orderTime': [
            activeKey === '3' ? {title: '执行完成时间', key: 'orderExecutedFinishTime'} : null,
            {title: '结算时间', key: 'orderSettleTime'},
        ],
        'invoiceTime': [
            {title: '结案时间', key: 'orderFinishTime'},
            {title: '开票时间', key: 'invoiceOpenTime', extra: {title: '申请单id', key: 'invoiceApplyId'}},
            {title: '回款条件', key: 'paybackCondition'},
        ],
        'applyTime': [
            {title: '审核通过时间', key: 'invoiceApplyOpenTime'},
            {title: '应还款时间', key: 'orderPaybckTime'},
        ],
    }
    return subOption[key]
}

const render = (data) => {
    return data || data == 0 ? data : '-';
}

export const getCreditCol = (activeKey) => {
    return [
        {
            title: '订单/活动ID',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 100,
            render
        },
        {
            title: '客户简称/全称',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 150,
            render: (_, record) => tdRender(tdSubList('companyName'), record)
        },
        {
            title: '销售/区域',
            dataIndex: 'saleInfo',
            key: 'saleInfo',
            width: 150,
            render: (_, record) => tdRender(tdSubList('saleInfo'), record)
        },
        {
            title: '所属项目/品牌/PO',
            dataIndex: 'orderInfo',
            key: 'orderInfo',
            width: 150,
            render: (_, record) => tdRender(tdSubList('orderInfo'), record)
        },
        {
            title: '需求ID/需求名称/活动名称',
            dataIndex: 'orderDetail',
            key: 'orderDetail',
            width: 170,
            render: (_, record) => tdRender(tdSubList('orderDetail', activeKey), record)
        },
        {
            title: '使用信用金额',
            dataIndex: 'creditAmountUsed',
            key: 'creditAmountUsed',
            width: 100,
            render
        },
        {
            title: '回款金额',
            dataIndex: 'paybackAmount',
            key: 'paybackAmount',
            width: 100,
            render
        },
        {
            title: '回款状态',
            dataIndex: 'paybackStatusText',
            key: 'paybackStatusText',
            width: 100,
            render
        },
        {
            title: '执行完成/结算时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
            width: 200,
            render: (_, record) => tdRender(tdSubList('orderTime', activeKey), record)
        },
        {
            title: '结案/开票时间',
            dataIndex: 'invoiceTime',
            key: 'invoiceTime',
            width: 200,
            render: (_, record) => tdRender(tdSubList('invoiceTime'), record)
        },
        {
            title: '审核通过/应还款时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
            width: 200,
            render: (_, record) => tdRender(tdSubList('applyTime'), record)
        },
    ];
}

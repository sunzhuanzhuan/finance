import React from "react";
import { Tag } from 'antd';
export const getCreditQueryItems = () => {
    const allQuery =  [
        {label: '订单ID/活动ID', key: 'verification_code', compType: 'input'},
        {label: '销售', key: 'sale_id', compType: 'select', optionKey: 'salerData', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '公司简称', key: 'company_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '公司全称', key: 'company_all_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '需求名称', key: 'requirement_id', compType: 'searchSelect', actionKey: 'requirement', dataIndex: ['id', 'name'], keyWord: 'requirement_name'},
        {label: '项目名称', key: 'project_id', compType: 'searchSelect', actionKey: 'project', dataIndex: ['id', 'name'], keyWord: 'name'},
        {label: 'PO', key: 'PO_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '品牌', key: 'brand_id', compType: 'searchSelect', actionKey: 'brand', dataIndex: ['id', 'view_name'], keyWord: 'view_name'},
        {label: '开票时间', key: 'kaipiao_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '应还款时间', key: 'huankuan_time', compType: 'date', submitKey:['time_start', 'time_end']},
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
                { extra ? <Tag color="#108ee9" className='credit_td_extra_tag'>{`${extra.title}：${record[extra.key]}`}</Tag> : null }
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
        '客户简称/全称': [
            {title: '公司简称', key: '公司简称'},
            {title: '公司全称', key: '公司全称'},
        ],
        '销售/区域': [
            {title: '销售', key: '销售'},
            {title: '区域', key: '区域'},
        ],
        '所属项目/品牌/PO': [
            {title: '项目', key: '项目'},
            {title: '品牌', key: '品牌'},
            {title: 'PO', key: 'PO'},
        ],
        '需求ID/需求名称/活动名称': activeKey === '3' ? [
            {title: '需求ID', key: '需求ID'},
            {title: '需求名称', key: '需求名称'},
        ] : [
            {title: '活动名称', key: '活动名称'},
        ],
        '执行完成/结算时间': [
            activeKey === '3' ? {title: '执行完成时间', key: '执行完成时间'} : null,
            {title: '结算时间', key: '结算时间'},
        ],
        '结案/开票时间': [
            {title: '结案时间', key: '结案时间'},
            {title: '开票时间', key: '开票时间', extra: {title: '申请单id', key: '申请单id'}},
            {title: '回款条件', key: '回款条件'},
        ],
        '审核通过/应还款时间': [
            {title: '审核通过时间', key: '审核通过时间'},
            {title: '应还款时间', key: '应还款时间'},
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
            dataIndex: '订单/活动ID',
            key: '订单/活动ID',
            width: 100,
            render
        },
        {
            title: '客户简称/全称',
            dataIndex: '客户简称/全称',
            key: '客户简称/全称',
            width: 100,
            render: (_, record) => tdRender(tdSubList('客户简称/全称'), record)
        },
        {
            title: '销售/区域',
            dataIndex: '销售/区域',
            key: '销售/区域',
            width: 100,
            render: (_, record) => tdRender(tdSubList('销售/区域'), record)
        },
        {
            title: '所属项目/品牌/PO',
            dataIndex: '所属项目/品牌/PO',
            key: '所属项目/品牌/PO',
            width: 150,
            render: (_, record) => tdRender(tdSubList('所属项目/品牌/PO'), record)
        },
        {
            title: '需求ID/需求名称/活动名称',
            dataIndex: '需求ID/需求名称/活动名称',
            key: '需求ID/需求名称/活动名称',
            width: 170,
            render: (_, record) => tdRender(tdSubList('需求ID/需求名称/活动名称', activeKey), record)
        },
        {
            title: '使用信用金额',
            dataIndex: '使用信用金额',
            key: '使用信用金额',
            width: 100,
            render
        },
        {
            title: '回款金额',
            dataIndex: '回款金额',
            key: '回款金额',
            width: 100,
            render
        },
        {
            title: '回款状态',
            dataIndex: '回款状态',
            key: '回款状态',
            width: 100,
            render
        },
        {
            title: '执行完成/结算时间',
            dataIndex: '执行完成/结算时间',
            key: '执行完成/结算时间',
            width: 150,
            render: (_, record) => tdRender(tdSubList('执行完成/结算时间', activeKey), record)
        },
        {
            title: '结案/开票时间',
            dataIndex: '结案/开票时间',
            key: '结案/开票时间',
            width: 200,
            render: (_, record) => tdRender(tdSubList('结案/开票时间'), record)
        },
        {
            title: '审核通过/应还款时间',
            dataIndex: '审核通过/应还款时间',
            key: '审核通过/应还款时间',
            width: 150,
            render: (_, record) => tdRender(tdSubList('审核通过/应还款时间'), record)
        },
    ];
}

import React from "react";
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import numeral from 'numeral';

export const getTabOptions = [
    { tab: '预约订单', key: 'yuyueyuyue', value: 3 },
    { tab: '微闪投', key: 'weishantou', value: 2 },
    { tab: '拓展业务', key: 'tuozhanyewu', value: 7 },
];

export const getOffQueryItems = queryArr => {
    const allQuery =  [
        {label: '订单ID/活动ID', key: 'verification_code', compType: 'input'},
        {label: '销售', key: 'sale_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '公司简称', key: 'company_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '公司全称', key: 'company_all_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '需求名称', key: 'required_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '项目名称', key: 'project_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: 'PO', key: 'PO_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '品牌', key: 'brand_id', compType: 'searchSelect', actionKey: 'company', dataIndex: ['company_id', 'name'], keyWord: 'company_name'},
        {label: '开票时间', key: 'kaipiao_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {label: '应还款时间', key: 'huankuan_time', compType: 'date', submitKey:['time_start', 'time_end']},
        {compType: 'operate', key: 'operate'}
    ];
    return queryArr.map(item => allQuery.find(queryItem => queryItem.upperKey === item || queryItem.key === item));
}

const tdRender = () => {

}

export const getReceOffCol = ( col ) => {
    const allCol =  [
        {
            title: '订单/活动ID',
            dataIndex: '订单/活动ID',
            key: '订单/活动ID',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '客户简称/全称',
            dataIndex: '客户简称/全称',
            key: '客户简称/全称',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '销售/区域',
            dataIndex: '销售/区域',
            key: '销售/区域',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '所属项目/品牌/PO',
            dataIndex: '所属项目/品牌/PO',
            key: '所属项目/品牌/PO',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '需求ID/需求名称/活动名称',
            dataIndex: '公司简称',
            key: '公司简称',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '使用信用金额',
            dataIndex: '使用信用金额',
            key: '使用信用金额',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '回款金额',
            dataIndex: '回款金额',
            key: '回款金额',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '回款状态',
            dataIndex: '回款状态',
            key: '回款状态',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '执行完成/结算时间',
            dataIndex: '结算时间',
            key: '结算时间',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '结案/开票时间',
            dataIndex: '开票时间',
            key: '开票时间',
            width: 100,
            render: (_, record) => tdRender(record)
        },
        {
            title: '审核通过/应还款时间',
            dataIndex: '应还款时间',
            key: '应还款时间',
            width: 100,
            render: (_, record) => tdRender(record)
        },
    ];

    return col.map(item => allCol.find(colItem => colItem.key === item));
}

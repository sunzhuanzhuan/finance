import React from "react";

export const getQueryItems = () => {
    return [
        {label: '公司简称', value: 'company', compType: 'searchSelect', key: 'company'},
        {label: '欠款', value: 'debt', compType: 'select', key: 'debt'},
        {label: '销售', value: 'salePerson', compType: 'searchSelect', key: 'salePerson'},
        {label: '销售主管', value: 'saleManage', compType: 'searchSelect', key: 'saleManage'},
        {label: '销售经理', value: 'saler', compType: 'searchSelect', key: 'saler'},
        {label: '区域', value: 'area', compType: 'searchSelect', key: 'area'},
        {label: '截止日期', value: 'date', compType: 'date', key: 'date'},
        {label: '回款待分配', value: 'distribute', compType: 'input', key: 'distribute'},
        {compType: 'operate', key: 'operate'}
    ]
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
import React, { Component } from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs;
import { TripartiteForm, AccountForm, ListTable } from '../components/usageQuery'
export class UsageQuery extends Component {
	changeTabs = () => {

	}

	render() {
		return (
			<div>
				<h2>发票使用明细查询</h2>
				<Tabs defaultActiveKey="2" onChange={this.changeTabs}>
					<TabPane tab="主账号" key="1">
						<AccountForm />
						<ListTable isNoShowColumnsTitle={['三方代理商']} />
					</TabPane>
					<TabPane tab="三方平台" key="3">
						<TripartiteForm />
						<ListTable isNoShowColumnsTitle={['订单ID', '主账号', '订单应约税率', '预付金额',
							'扣款金额', '媒介经理']} />
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default UsageQuery

import React from 'react'
import { Statistic, Icon, Tooltip } from "antd";
import { getInvoiceQueryStatisticsOptions } from '@/invoice/constants/invoiceQuery';

class QueryStatistics extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}

	getStatisticsNum = value => {
		return value || value == 0 ? <Statistic className='statistics_number' value={value}/> : '-'
	}

	getStatisticsComp= () => {
		const { dataSource = {} } = this.props;
		return getInvoiceQueryStatisticsOptions().map((item, index, arr) => {
			const { title, key } = item;
			const sign = index === 0 || index === arr.length - 1 ? '' : '|'
			return (
				<span key={key} className='statistics_normal'>
					{`${title}：`}
					{this.getStatisticsNum(dataSource[key])}
					<span className='statistics_sign'>{sign}</span>
				</span>
			)
		})
	}

	getTooltipTitle = () => {
		return getInvoiceQueryStatisticsOptions().map(item => {
			const { title, key, tips } = item;
			return (
				<p key={key} className='tooltip_item'>{`${title}：${tips}`}</p>
			)
		})
	}

	render() {
		return (
			<div className='query_statistics_comp'>
				<Tooltip overlayClassName='query_statistics_tooltip' trigger='click' placement='topLeft' title={this.getTooltipTitle()}>
					<Icon type="question-circle-o" className='cursor_pointer' />
					<span className='statistics_bold cursor_pointer'>当前筛选结果：</span>
				</Tooltip>
				{
					this.getStatisticsComp()
				}
			</div>
		)
	}
}

export default QueryStatistics

import React from 'react'
import { Statistic } from "antd";
import { getInvoiceQueryStatisticsOptions } from '@/invoice/constants/invoiceQuery';

class QueryStatistics extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}

	getStatisticsNum = value => {
		console.log('sldkjflskdjflksdjf', value)
		return <Statistic value={value} />
	}

	getStatisticsComp= () => {
		const { dataSource = {} } = this.props;
		return getInvoiceQueryStatisticsOptions().map((item, index, arr) => {
			const { title, key } = item;
			const className = index === 0 ? 'statistics_bold' : '';
			const sign = index === 0 || index === arr.length - 1 ? '' : '|'
			return (
				<span key={key} className={className}>
					{`${title}：${this.getStatisticsNum(dataSource[key])}`}
					<span className='statistics_sign'>{sign}</span>
				</span>
			)
		})
	}

	render() {
		return (
			<div className='query_statistics_comp'>
				{
					this.getStatisticsComp()
				}
			</div>
		)
	}
}

export default QueryStatistics

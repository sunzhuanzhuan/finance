import React from 'react';

export default class Statistics extends React.Component {
	constructor() {
		super();

	}
	render() {
		return <fieldset className='fieldset_css'>
			<legend>三方平台打款单</legend>
			<div style={{ padding: '0 10px' }}>
				<span>当前筛选条件下共<span className='red-font little-left-gap'>0</span>条</span>
				<span className='left-gap'>待打款金额：<span className='red-font little-left-gap'>0</span>元</span>
				<span className='left-gap'>已打款金额：<span className='red-font little-left-gap'>0</span>元</span>
				<span className='left-gap'>应回发票金额：<span className='red-font little-left-gap'>0</span>元</span>
				<span className='left-gap'>发票盈余：<span className='red-font little-left-gap'>0</span>元</span>
			</div>
		</fieldset>

	}
}

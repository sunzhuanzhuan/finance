import React from 'react'
import { Button } from 'antd'
import FormList from './FormList'
import { WBYPlatformIcon } from 'wbyui'
import numeral from 'numeral'

class Item extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			visible: false
		}
	}
	toggleVisible = (boolean) => {
		this.setState({ visible: boolean })
	}
	handleSubmit = () => {
		const { onSubmit } = this.props;
		const values = this.form.props.form.getFieldsValue();
		const obj = { ...values }, params = {};
		delete obj['keys'];
		params['platformId'] = this.props.data.platformId;
		params['trinityProfitRates'] = Object.values(obj).map(item => ({ ...item, rate: item.rate / 100, validParams: true }));
		onSubmit('modify', params);
	}
	render() {
		const { platformId, platformName, trinityProfitRates } = this.props.data;
		const { visible } = this.state;
		return <div className='top-gap setting-item'>
			< div className='setting-title' >
				<div>
					<WBYPlatformIcon
						weibo_type={platformId}
						widthSize={22}
					/>
					<span className='platform-name'>{platformName}</span>
					{visible ?
						<span className='btn-container'>
							<Button className='btn' onClick={() => { this.toggleVisible(false) }}>取消</Button>
							<Button className='btn left-gap' type='primary' onClick={this.handleSubmit}>保存</Button>
						</span>
						: <a href='javascript:;' onClick={() => { this.toggleVisible(true) }}>修改</a>}
				</div>
			</div >
			<div className='setting-form'>
				{visible ? <div>
					<div className='form-text'>利润率：</div>
					<div className='value-section'>
						<FormList data={trinityProfitRates} wrappedComponentRef={form => this.form = form} />
						<div className='form-explain little-top-gap'>
							<span className='little-left-gap'>说明：</span>
							<ul>
								<li>利润率数值设置必须覆盖所有区间即0元至99999元，可设置多个区间多个利润率。</li>
								<li>利润率区间均为包含关系，例如。0元至9999元，指的是包含0元且包含9999元。</li>
							</ul>
						</div>
					</div>
				</div> :
					<ul className='value-list'>
						{trinityProfitRates && trinityProfitRates.map((item = {}, index) => (<li key={index}>{item.min}元至{item.max}元，利润率为{numeral(item.rate * 100).format('0.00')}%</li>))}
					</ul>}
			</div>
		</div >
	}
}
export default Item;

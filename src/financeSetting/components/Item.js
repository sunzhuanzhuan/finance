import React from 'react'
import { Button, message, Modal } from 'antd'
import FormList from './FormList'
import { WBYPlatformIcon } from 'wbyui'
import numeral from 'numeral'
import { percentToValue, accMul } from '@/util'

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
		const data = Object.values(obj);
		for (let i = 0; i < data.length; i++) {
			let item = data[i];
			if (item['min'] === '' || item['max'] === '') {
				message.error('有未填写的区间输入框', 3);
				return
			}
			if (!(/^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/.test(item['min']) && /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/.test(item['max']))) {
				message.error('区间只能为两位小数', 3);
				return
			}
			if (!item['rate']) {
				message.error('有未填写的利润率输入框', 3);
				return
			}
			if (!(Number(item['rate']) >= -30 && Number(item['rate']) < 100) || !(/^-?(([0-9][0-9]*)|(([0]\.\d{1,8}|[1-9][0-9]*\.\d{1,8})))$/.test(item['rate']))) {
				message.error('利润率须为[-30,100）之间的八位小数', 3);
				return
			}
			if (!item['minRate']) {
				message.error('有未填写的利润率输入框', 3);
				return
			}
			if (!(Number(item['minRate']) >= -30 && Number(item['minRate']) < 100) || !(/^-?(([0-9][0-9]*)|(([0]\.\d{1,8}|[1-9][0-9]*\.\d{1,8})))$/.test(item['minRate']))) {
				message.error('利润率须为[-30,100）之间的八位小数', 3);
				return
			}
		}
		Modal.confirm({
			title: '',
			content: '新订单将按照修改后的利润率计算报价，确定修改该平台的利润率吗？',
			onOk: () => {
				params['platformId'] = this.props.data.platformId;
				params['trinityProfitRates'] = Object.values(obj).map(item => ({ ...item, rate: percentToValue(item.rate), minRate: percentToValue(item.minRate), validParams: true }));
				onSubmit('modify', params, () => { this.setState({ visible: false }) });
			}
		})
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
								<li>利润率数值设置必须覆盖所有区间即0元至9999999元，可设置多个区间多个利润率。</li>
								<li>利润率区间均为包含关系，例如，0元至9999999元，指的是包含0元且包含9999999元。</li>
							</ul>
						</div>
					</div>
				</div> :
					<ul className='value-list'>
						{
							trinityProfitRates && trinityProfitRates.map((item = {}, index) => 
								(
									<li key={index}>{item.min}元至{item.max}元，对外利润率为{accMul(item.rate, 100)}%，最低利润率为{accMul(item.minRate, 100)}%</li>
								)
							)
						}
					</ul>}
			</div>
		</div >
	}
}
export default Item;

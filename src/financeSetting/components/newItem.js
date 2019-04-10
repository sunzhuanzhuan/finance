import React from 'react'
import { Button, Select } from 'antd'
import FormList from './FormList'

const Option = Select.Option;
class NewItem extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			visible: false,
			value: undefined
		}
	}
	handleChange = (value) => {
		this.setState({ value })
	}
	handleSubmit = () => {
		const { onSubmit } = this.props;
		const { value } = this.state;
		const values = this.form.props.form.getFieldsValue();
		const obj = { ...values }, params = {};
		delete obj['keys'];
		params['platformId'] = value;
		params['trinityProfitRates'] = Object.values(obj).map(item => ({ ...item, rate: item.rate / 100, validParams: true }));
		onSubmit('add', params);
	}
	render() {
		const { onCancel, companyList } = this.props;
		return <div className='top-gap setting-new-item'>
			< div className='setting-title' >
				<div>
					<span className='platform-name'>新增平台</span>
					<span className='btn-container'>
						<Button className='btn' onClick={onCancel}>取消</Button>
						<Button className='btn left-gap' type='primary' onClick={this.handleSubmit}>保存</Button>
					</span>
				</div>
			</div >
			<div className='setting-form'>
				<div style={{ padding: '10px 0' }}>
					<div className='form-text'>平台名称：</div>
					<div className='value-section'>
						<Select style={{ marginLeft: '10px', width: 166 }}
							placeholder='请选择平台'
							onChange={this.handleChange}
							getPopupContainer={() => document.querySelector('.value-section')}
							allowClear
							showSearch
							filterOption={(input, option) => (
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							)}
						>
							{companyList.map(item => (<Option value={item.id} key={item.id}>{item.platformName}</Option>))}
						</Select>
					</div>
				</div>
				<div>
					<div className='form-text'>利润率：</div>
					<div className='value-section'>
						<FormList data={[]} wrappedComponentRef={form => this.form = form} />
						<div className='form-explain little-top-gap'>
							<span className='little-left-gap'>说明：</span>
							<ul>
								<li>利润率数值设置必须覆盖所有区间即0元至9999999元，可设置多个区间多个利润率。</li>
								<li>利润率区间均为包含关系，例如。0元至9999999元，指的是包含0元且包含9999999元。</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div >
	}
}
export default NewItem;

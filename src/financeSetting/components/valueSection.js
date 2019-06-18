import React from 'react'
import { Form, Input } from "antd";
const FormItem = Form.Item;

let uuid = 0;

class ValueSection extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	componentDidMount() {
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		uuid = keys.length;
		console.log(keys)
	}
	checkCount = () => {

	}
	handleAdd = () => {
		uuid++;
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(uuid);
		console.log(nextKeys)
		form.setFieldsValue({
			keys: nextKeys,
		});
	}
	handleRemove = (k) => {
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		if (keys.length === 1) {
			return;
		}
		form.setFieldsValue({
			keys: keys.filter(key => key !== k),
		});
	}
	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		getFieldDecorator('keys', { initialValue: [0] });
		const keys = getFieldValue('keys');
		const formItems = keys.map((k, index) => {
			const name = `${k}`;
			return (
				<div key={k}>
					<FormItem style={{ display: 'inline-block' }}>
						{getFieldDecorator(name, {
							initialValue: { min: "", max: "", rate: "" },
							validateTrigger: 'onBlur',
							rules: [{ validator: this.checkCount }]
						})(
							<ValueInput />
						)}
					</FormItem>
					{(keys.length > 1 && index >= 1) && <a href="javascript:;" className='left-gap remove-btn' onClick={() => this.handleRemove(k)}>删除</a>}
					{((index == keys.length - 1) && index < 9) && <div className='little-left-gap'>
						<a href='javascript:;' onClick={this.handleAdd}>添加更多</a>
					</div>}
				</div>
			);
		});
		return <div>
			{formItems}
		</div>
	}
}
export default ValueSection;
class ValueInput extends React.PureComponent {
	constructor(props) {
		super(props);
		const value = props.value || {};
		this.state = {
			min: value.min,
			max: value.max,
			rate: value.rate
		};
	}
	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			const value = nextProps.value;
			this.setState(value);
		}
	}
	triggerChange = (changedValue) => {
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(Object.assign({}, this.state, changedValue));
		}
	}
	handleMin = e => {
		const min = e.target.value;
		if (!('value' in this.props)) {
			this.setState({ min });
		}
		this.triggerChange({ min });
	}
	handleMax = e => {
		const max = e.target.value;
		if (!('value' in this.props)) {
			this.setState({ max });
		}
		this.triggerChange({ max });
	}
	handleRate = e => {
		const rate = e.target.value;
		if (!('value' in this.props)) {
			this.setState({ rate: rate });
		}
		this.triggerChange({ rate: rate });
	}
	render() {
		const { min, max, rate } = this.state;
		return <span>
			<Input style={{ width: 110, height: 32, margin: '0 10px' }} placeholder='请输入' onChange={this.handleMin} value={min} />元至
		<Input style={{ width: 110, height: 32, margin: '0 10px' }} placeholder='请输入' onChange={this.handleMax} value={max} />元，则利润率为
	<Input style={{ width: 80, height: 32, margin: '0 10px' }} placeholder='输入数值' onChange={this.handleRate} value={rate} />%
	</span>
	}
}

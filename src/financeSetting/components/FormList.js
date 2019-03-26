import React from 'react'
import { Form } from 'antd'
import ValueSection from './valueSection'

class FormList extends React.PureComponent {
	componentDidMount() {
		const { setFieldsValue } = this.props.form;
		const { data } = this.props;
		setFieldsValue({
			keys: data.map((item, index) => index)
		});
		setTimeout(() => {
			data.forEach((item, index) => {
				let obj = { ...item };
				obj['rate'] = item['rate'] * 100;
				setFieldsValue({
					[index]: obj
				})
			})
		}, 0);
	}
	render() {
		return <Form>
			<ValueSection form={this.props.form} />
		</Form>
	}
}

export default Form.create()(FormList)

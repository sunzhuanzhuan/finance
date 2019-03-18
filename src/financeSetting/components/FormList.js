import React from 'react'
import { Form } from 'antd'
import ValueSection from './valueSection'
class FormList extends React.PureComponent {
	componentDidMount() {
		const { setFieldsValue, getFieldValue } = this.props.form;
		const { data } = this.props;
		setFieldsValue({
			keys: data.map((item,index)=>index)
		});
		setTimeout(() => {
			data.forEach((item, index) => {
				setFieldsValue({
					[index]: item
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

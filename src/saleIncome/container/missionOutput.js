import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as missionOutputActions from '../actions/missionOutput'
import { Button, message, DatePicker, Form } from 'antd';
import './saleIncome.less';
import moment from 'moment';

const { MonthPicker } = DatePicker;
const FormItem = Form.Item;
const monthFormat = 'YYYY-MM';

class MissionOutput extends React.Component {
	constructor() {
		super();
		this.state = {
		}
	}
	componentDidMount() {
		const toMonth = this.getMonth();
		this.props.form.setFieldsValue({ 'time': moment(toMonth, monthFormat) });
	}
	getMonth = () => {
		let date = new Date();
		let years = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month < 10 ? "0" + month : month;
		let toMonth = years.toString() + '-' + month.toString();
		return toMonth;
	}
	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const time = getFieldValue('time') ? getFieldValue('time').format(monthFormat) : '';
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		return <div className='sale-mission-output'>
			<Form>
				<FormItem label='月份' {...formItemLayout}>
					{getFieldDecorator('time')(
						<MonthPicker placeholder="请选择月份" format={monthFormat} style={{ width: 140 }} />
					)}
				</FormItem>
			</Form>
			<div className='top-gap'><div className='output-label'>加价订单对应的客户维护费拓展项目:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.bussinessExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
			<div className='top-gap'><div className='output-label'>业绩信息表:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.execExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
			<div className='top-gap'><div className='output-label'>赠送金额统计表:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.giftExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
			<div className='top-gap'><div className='output-label'>质检扣款统计表:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.qcExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
			<div className='top-gap'><div className='output-label'>赔偿统计表:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.reparationExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
			<div className='top-gap'><div className='output-label'>回款信息表:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.payBackExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
			<div className='top-gap'><div className='output-label'>长账龄扣款表:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.longAgingExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
			<div className='top-gap'><div className='output-label'>上月待扣GMV:</div><Button type="primary" className='left-gap' onClick={() => {
				const hide = message.loading('导出中，请稍候...', 1);
				this.props.actions.lessAchievementsExcel({ time }).then(() => {
					message.success('导出成功，请查收邮件');
					hide();
				});
			}}>导出</Button></div>
		</div>
	}
}

const mapStateToProps = () => {
	return {
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...missionOutputActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(MissionOutput))

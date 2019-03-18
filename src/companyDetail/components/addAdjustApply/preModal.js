import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import * as goldenActions from "../../actions/goldenApply";
import { Modal, Button, Table } from "antd";

class PrevModal extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		const { curSelectRows, applicationPreview } = this.props;
		const array = curSelectRows.map(item => {
			let obj = {
				['order_id']: item['order_id'],
				['company_name']: item['company_name'],
				['project_name']: item['project_name'],
				['requirement_id']: item['requirement_id'],
				['requirement_name']: item['requirement_name'],
				['platform_name']: item['platform_name'],
				['weibo_name']: item['weibo_name'],
				['min_sell_price']: item['min_sell_price'],
				['price']: applicationPreview[item['order_id']],
			};
			return obj
		});
		this.setState({ data: array })

	}
	render() {
		const { data } = this.state;
		const { visible, onCancel, columns } = this.props;
		let paginationObj = {
			total: parseInt(data.length),
			showQuickJumper: true,
		};
		return <Modal title='预览结果' visible={visible} width={'100%'}
			footer={[<Button key='close' type='primary' onClick={onCancel}>关闭</Button>]}
			onCancel={onCancel}
			maskClosable={false}
		>
			<Table rowKey='order_id' columns={columns} dataSource={data} bordered pagination={paginationObj} />
		</Modal>
	}
}

const mapStateToProps = (state) => {
	return {
		applicationPreview: state.companyDetail.applicationPreview,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrevModal))

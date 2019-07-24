import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import * as goldenActions from "../../actions/goldenApply";
import { Table, message } from "antd";

class PreTable extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		const { curSelectRows, applicationPreview, isApplication, applicationDetail: { list = [] } } = this.props;
		let array = isApplication ? list : curSelectRows
		const ary = array.map(item => {
			let obj = {
				['order_id']: item['order_id'],
				['company_name']: item['company_name'],
				['project_name']: item['project_name'],
				['requirement_id']: item['requirement_id'],
				['requirement_name']: item['requirement_name'],
				['platform_name']: item['platform_name'],
				['weibo_name']: item['weibo_name'],
				['pre_min_sell_price']: applicationPreview[item['order_id']],
				['price']: item['price'],
				['quote_type']: item['quote_type']
			};
			return obj
		});
		this.setState({ data: ary })
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getApplicationDetail({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	render() {
		const { data } = this.state;
		const { columns, isApplication, readjustId, companyId, applicationDetail: { page, total } } = this.props;
		let applicationPaginationObj = {
			onChange: (current) => {
				this.queryData({ page: current, page_size: 50, status: 1, readjust_application_id: readjustId, company_id: companyId });
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: 50,
			showQuickJumper: true,
		};
		let paginationObj = {
			total: parseInt(data.length),
			showQuickJumper: true,
		};
		return <Table 
			rowKey='order_id' 
			className='preTable'
			columns={columns} 
			dataSource={data} 
			bordered 
			pagination={isApplication ? applicationPaginationObj : paginationObj} 
			scroll={{ x: 2000 }} />
	}
}

const mapStateToProps = (state) => {
	return {
		applicationDetail: state.companyDetail.applicationDetail,
		applicationPreview: state.companyDetail.applicationPreview,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PreTable))

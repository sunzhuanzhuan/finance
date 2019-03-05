import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as trinityPayAction from "../actions";
import SearForm from '../../components/SearchForm'
import Statistics from '../components/Statistics'
import PreModal from '../components/modal'
import { Table, message, Button } from 'antd'
import { prePaySearch } from '../constants/search'
import { prePayFunc } from '../constants'
import './trinityPay.less'
import qs from 'qs'


class PrePay extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			modalVisible: false,
			type: undefined
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.queryData({ ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getPrePayData({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleModal = (type, boolean) => {
		this.setState({ type, modalVisible: boolean })
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { loading, modalVisible, type } = this.state;
		const { prePayData: { list = [], page, page_size = 20, total } } = this.props;
		const prePayCols = prePayFunc(this.handleModal);
		const paginationObj = {
			onChange: (current) => {
				this.queryData({ ...search.key, page: current, page_size });
			},
			onShowSizeChange: (current, pageSize) => {
				const curPage = Math.ceil(total / pageSize);
				this.setState({ page_size: pageSize });
				this.queryData({ ...search.key, page: curPage, page_size: pageSize });
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return <div className='prePay-container'>
			<Statistics />
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				<SearForm data={prePaySearch} getAction={this.queryData} responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }} extraFooter={<Button type='primary' style={{ marginLeft: 20 }}>导出</Button>} />
			</fieldset>
			<div className='top-gap'>
				<Table
					rowKey='a'
					loading={loading}
					columns={prePayCols}
					dataSource={list}
					bordered
					pagination={list.length ? paginationObj : false}
				/>
			</div>
			{modalVisible ? <PreModal
				key={type}
				visible={modalVisible}
				type={type}
				onCancel={() => {
					this.handleModal(undefined, false)
				}}
			/> : null}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		prePayData: state.trinityPay.prePayData,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...trinityPayAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(PrePay)

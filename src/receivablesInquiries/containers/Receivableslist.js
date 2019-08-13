import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivable.less';
import { message, Table, Button } from "antd";
import ReceivableQuery from './ReceivableQuery';
import { getQueryItems, receivableCol } from '../constants';
import * as receivableAction from "../actions/receivable";
import { Scolltable } from '@/components';

class Receivableslist extends React.Component {
	constructor() {
		super();
		this.state = {
			searchQuery: {
				page: 1,
				page_size: 20
			},
			loading: false
		};
	}
	componentDidMount() {
		this.handleSearch({
			page: 1,
			page_size: 20
		});
	}
	handleSearch = searchQuery => {
		this.setState({searchQuery, loading: true});
		this.props.getReceivableList(searchQuery).then(() => {
			this.setState({loading: false});
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}

	render() {
		const { receivableList: { total = 0, page = 1, page_size = 20, list} } = this.props;
		const { searchQuery, loading } = this.state;
		const pagination = {
			onChange: current => {
				Object.assign(searchQuery, {page: current});
				this.setState({searchQuery});
				this.handleSearch(searchQuery);
			},
			onShowSizeChange: (_, pageSize) => {
				Object.assign(searchQuery, {page_size: pageSize});
				this.setState({searchQuery});
				this.handleSearch(searchQuery);
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		return <div className='rece-wrapper'>
			<div className='rece-title'>应收账款管理</div>
			<ReceivableQuery 
				queryItems={getQueryItems()}
				handleSearch={this.handleSearch}
			/>
			<div className='export-btn-wrapper'>
				<Button type='primary'>导出</Button>
			</div>
			<div className='total-info-wrapper'>
				<>公司数量：<span className='total-color'>{total}</span>个</>
				<span className='total-margin'>总欠款：<span className='total-color'>{page}</span></span>
				<>汇款待分配金额：<span className='total-color'>{page_size}</span></>
			</div>
			<Scolltable isMoreThanOne scrollClassName='.ant-table-body' widthScroll={2900}>
				<Table 
					className='receivable-tablef'
					rowKey='id' 
					columns={receivableCol} 
					dataSource={list} 
					bordered 
					pagination={pagination} 
					loading={loading}
					scroll={{ x: 2900 }}
				/>
			</Scolltable>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		receivableList: state.receivable.receivableList
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableAction}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Receivableslist)

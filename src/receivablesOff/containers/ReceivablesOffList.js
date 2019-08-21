import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { Form, message, Table, Button } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getOffListQueryKeys, getOffQueryItems, getOffOptions, getOffListColIndex, getReceOffCol } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth } from '@/util';
import { Scolltable } from '@/components';
import ReceOffModal from './ReceOffModal';
class ReceivablesOffList extends React.Component {
	constructor() {
		super();
		this.state = {
			searchQuery: {
				page: 1,
				page_size: 20
			},
			loading: false,
			addVisible: false
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
		this.props.getReceivableOffList(searchQuery).then(() => {
			this.setState({loading: false});
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}

	handleTableOperate = (operateType, record) => {
		switch(operateType) {
			case 'detail':
				const { history } = this.props;
				const src = `/finance/receivableoff/detail`;
				history.push(src);
				return;
			case 'preview':
				return;
			case 'edit':
				this.setState({editVisible: true})
				return;
			default:
				return;
		}
	}

	render() {
		const { receivableOffList: { total = 0, page = 1, page_size = 20, list }, history } = this.props;
		const { searchQuery, loading, addVisible, editVisible } = this.state;
		const totalWidth = getTotalWidth(getReceOffCol(getOffListColIndex));
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
		console.log('sldkfjlsdkjflsdkjf', getOffListQueryKeys, getOffQueryItems(getOffListQueryKeys))
		return <div className='rece-wrapper'>
			<div className='rece-title'>应收账款核销</div>
			<ReceivableOffQuery
				queryOptions={getOffOptions()} 
				queryItems={getOffQueryItems(getOffListQueryKeys)}
				handleSearch={this.handleSearch}
			/>
			<div className='export-btn-wrapper'>
				<Button type='primary' icon='plus' onClick={() => {this.setState({addVisible: !addVisible})}}>新增核销</Button>
				<Button type='primary' icon='upload'>全部导出</Button>
			</div>
			<div className='total-info-wrapper'>
				<>核销次数：<span className='total-color'>{total}</span>个</>
				<span className='total-margin'>订单数：<span className='total-color'>{page}</span></span>
				<>总核销金额：<span className='total-color'>{page_size}</span></>
				<span className='total-margin'>赠点/返点账户抵扣：<span className='total-color'>{page}</span></span>
				<>小金库抵扣：<span className='total-color'>{page_size}</span></>
			</div>
			<Scolltable isMoreThanOne scrollClassName='.ant-table-body' widthScroll={totalWidth}>
				<Table 
					className='receivable-table'
					rowKey='id' 
					columns={getReceOffCol(getOffListColIndex, this.handleTableOperate)} 
					dataSource={list} 
					bordered 
					pagination={pagination} 
					loading={loading}
					scroll={{ x: totalWidth }}
				/>
			</Scolltable>
			<ReceOffModal 
				type='add'
				visible={addVisible}
				history={history}
				width={440}
				title='选择公司'
				action={this.props.getGoldenCompanyId}
				handleCancel={() => {this.setState({addVisible: !addVisible})}} 
			/>
			<ReceOffModal 
				type='off'
				visible={editVisible}
				initialValue=''
				width={800}
				title='应收款核销'
				handleCancel={this.handleModalCancel} 
				handleOk={ () => {this.handleModalOk('off')}}
			/>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		receivableOffList: state.receivableOff.receivableOffList
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ReceivablesOffList))

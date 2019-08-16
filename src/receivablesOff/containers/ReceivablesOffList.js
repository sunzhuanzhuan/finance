import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './receivableOff.less';
import { Modal, Form, message, Table, Button } from "antd";
import ReceivableOffQuery from './ReceivableOffQuery';
import { getOffListQueryKeys, getOffQueryItems, getOffListColIndex, getReceOffCol } from '../constants';
import * as receivableOffAction from "../actions/receivableOff";
import * as goldenActions from "../../companyDetail/actions/goldenApply";
import { getTotalWidth } from '@/util';
import qs from 'qs';
import { Scolltable } from '@/components';
import SearchSelect from '@/components/SearchSelect';
const FormItem = Form.Item;

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

	handleOpenAddPage = () => {
		const { form, history } = this.props;
		form.validateFields((errs, values) => {
			if(errs) return;
			const { company_id } = values;
			const src = `/finance/receivableoff/add?${qs.stringify({ keys: { company_id } })}`;
			history.push(src);
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
				return;
			default:
				return;
		}
	}

	render() {
		const { receivableOffList: { total = 0, page = 1, page_size = 20, list }, form } = this.props;
		const { searchQuery, loading, addVisible } = this.state;
		const { getFieldDecorator } = form;
		const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 }, };
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
		return <div className='rece-wrapper'>
			<div className='rece-title'>应收账款核销</div>
			<ReceivableOffQuery 
				showMore
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
			<Modal 
				title='选择公司' 
				width={440}
				visible={addVisible}
				destroyOnClose
				onOk={this.handleOpenAddPage}
				onCancel={() => {this.setState({addVisible: !addVisible})}}
			>
				<Form>
					<FormItem label='公司简称' {...formItemLayout}>
						{getFieldDecorator('company_id', {
							rules: [
								{ required: true, message: '请先输入公司简称!' },
							]
						})(
							<SearchSelect
								selfWidth
								placeholder='请选择公司'
								action={this.props.getGoldenCompanyId}
								keyWord='company_name'
								dataToList={res => { return res.data }}
								item={['company_id', 'name']}
								style={{width: 250}}
							/>
						)}
					</FormItem>
				</Form>
			</Modal>
		</div>
	}
}

const mapStateToProps = (state) => {
	console.log('sdlfkjsdlkfjsldkfj', state);
	return {
		receivableOffList: state.receivableOff.receivableOffList
	}
}
const mapDispatchToProps = dispatch => (bindActionCreators({...receivableOffAction, ...goldenActions}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ReceivablesOffList))

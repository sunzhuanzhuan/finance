import React from 'react'
import SearchSelect from '@/components/SearchSelect';
import { PageHeader, Alert, Input, Form, Table, Button } from 'antd'
import './financeRateSetting.less'
import { getRateDetailCol } from '../constants';
const FormItem = Form.Item;

class rateDetailCommon extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false
		}
	}

	getTotalMsg = (accountNum, mainNum, isClear) => {
		const { handleOperate } = this.props;
		return (
			<div>
				<span>{`账号数：${accountNum}个`}</span>
				<span className='total-info-text'>{`主账号数${mainNum}个`}</span>
				{
					isClear ? <a onClick={handleOperate('clearSelected')}>清空</a> : null
				}
			</div>
		)
	}

	render() {
		const { form, handleOperate, type } = this.props;
		const { loading } = this.state;
		const { getFieldDecorator } = form;
		const accountNum = 10;
		const mainNum = 20;
		const pagination = {
			total: parseInt(1),
			current: parseInt(1),
			pageSize: parseInt(10),
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ['20', '50', '100', '200']
		};
		const isDetail = type === 'detailPage';

		return (
			<div className='finance-rate-detail-wrapper'>
				{
					isDetail ? 
						<PageHeader
							className="site-page-header"
							onBack={() => this.props.history.goBack()}
							title="账号详情"
							subTitle="This is a subtitle"
						/> : null
				}
				<Alert className='total-information' message={this.getTotalMsg(accountNum, mainNum)} type="info" showIcon />
				<Form className='detail-form clearfix'>
					<FormItem label='账号ID'>
						{getFieldDecorator('zhnghaoid')(
							<Input style={{width: 200}} placeholder="请输入" />
						)}
					</FormItem>
					<FormItem label='账号名' className='common-label' >
						{getFieldDecorator('snsName', { initialValue: undefined })(
							<SearchSelect
								action={() => {}} 
								style={{ width: 200 }}
								placeholder='请选择'
								keyWord='snsName'
								dataToList={res => { return res.data }}
								item={['accountId', 'snsName']}
							/>
						)}
					</FormItem>
					<FormItem label='主账号' className='common-label' >
						{getFieldDecorator('identityName', { initialValue: undefined })(
							<SearchSelect
								action={() => {}} 
								style={{ width: 200 }}
								placeholder='请选择'
								keyWord='snsName'
								dataToList={res => { return res.data }}
								item={['accountId', 'snsName']}
							/>
						)}
					</FormItem>
					<FormItem className='operate-wrapper'>
						<Button type='primary' onClick={() => {handleOperate('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {handleOperate('reset')}}>重置</Button>
					</FormItem>
				</Form>
				<div className='operate-box'>
					{
						isDetail ? 
						[
							<Button key='addAccount' type='primary' onClick={() => handleOperate('addAccount')}>添加账号</Button>,
							<Button key='delAccount' type='primary' onClick={() => handleOperate('delAccount')}>批量删除</Button>
						] 
						:
						<Button type='primary' onClick={() => handleOperate('showSelected')}>查看已选</Button>
					}
				</div> 
				
				<Alert className='select-total-info' message={this.getTotalMsg(accountNum, mainNum, true)} type="info" showIcon />
				<Table 
					rowKey='zhnghaoid' 
					columns={getRateDetailCol()} 
					dataSource={[]} 
					bordered 
					pagination={pagination} 
					loading={loading}
				/>
			</div>
		)
	}
}

export default Form.create()(rateDetailCommon)

import React from 'react'
import { Select, Spin } from "antd";
import debounce from 'lodash/debounce';

const Option = Select.Option

export default class SearchSelect extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			data: [],
			value: undefined,
			loading: false,
			more: false
		}
		this.handleSearch = debounce(this.fetchData, 400);
	}
	fetchData = (value) => {
		if (!value) {
			return
		}
		let { action, keyWord, dataToList } = this.props
		this.setState({ data: [], loading: true });
		action({ [keyWord]: value }).then(dataToList).then((list) => {
			this.setState({ data: list, loading: false });
		});
	}
	handleChange = (value) => {
		this.setState({ value, data: [] });
	}
	handleScroll = (e) => {
		if (e.target.scrollTop > 62) {
			const li = document.createElement('li');
			li.innerHTML = "<a href='javascript:;'>加载更多</a>";
			e.target.appendChild(li);
		}
	}
	render() {
		const { data, value, loading, more } = this.state;
		const { item: [id, name] } = this.props;
		const options = data.map(d => <Option key={d[id]}>{d[name]}</Option>);
		return <Select
			showSearch
			allowClear
			labelInValue
			value={value}
			defaultActiveFirstOption={false}
			filterOption={false}
			onSearch={this.handleSearch}
			onChange={this.handleChange}
			notFoundContent={loading ? <Spin size="small" /> : null}
			style={{ width: 140 }}
			placeholder="请输入"
			{...this.props}
			onPopupScroll={this.handleScroll}
		>
			{options}
			{more && <Option value=''> <Spin size="small" /> </Option>}
		</Select>
	}
}

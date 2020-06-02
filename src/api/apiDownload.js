import { saveAs } from 'file-saver'
import axios from 'axios'
const Cookie = require('js-cookie');

import { message } from 'antd'

const apiDownload = (opts, filename = 'file') => {
	opts.baseURL = '/api'
	opts.responseType = 'blob'
	opts.headers = { "X-Access-Token": Cookie.get('token') || '' }

	return axios(opts).then(res => {
		if (res.data.type === "application/json") {
			message.error("下载失败，文件不存在或权限不足");
		} else {
			let blob = new Blob([res.data]);
			saveAs(blob, filename)
		}
	})

}
export default apiDownload

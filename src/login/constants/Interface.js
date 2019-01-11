const { config } = window;
export default {
	login: {
		sendsms: config.LoginHost + '/sendsms', //登录发送短信
		verifysms: config.LoginHost + '/verifysms', //登录短信验证
		getUserLoginInfo: config.LoginHost + '/cross/getUserLoginInfo',
		getQrCode: config.LoginHost + '/wechatAuth/qrCode',
		login: config.LoginHost + 'login',
		loginWithSign: config.LoginHost + '/wechatAuth/loginWithSign',	//微信登录
		qrViewInfo: config.LoginHost + '/wechatAuth/qrViewInfo',		//获取扫码状态
		getLoginConfig: config.LoginHost + '/wechatAuth/getLoginConfig',
		getUserConfigKey: config.LoginHost + '/config/getConfigByKeys',//神策统计
	}
}

/**
 * qrViewInfo 扫码成功后，会返回user_list ,
 * loginWithSign   参数：user_id 
 * getLoginConfig  返回跳转的链接
 */

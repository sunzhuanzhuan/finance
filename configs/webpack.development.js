const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
	mode: 'development',
	devServer: {
		port: '3000',
		historyApiFallback: true,
		compress: true,
		open: true,
		hot: true,
		host: 'lg.nip.io',
		proxy: {
			"/api/price/finance": {
				target: "http://192.168.20.51:7300/mock/5c98a76a73f3100017a642ff",
				changeOrigin: true
			},
			// "/api/price/finance": {
			// 	target: "http://172.16.21.179:19094",
			// 	changeOrigin: true
			// },
			"/api/finance/readjust": {
				target: "http://192.168.20.51:7300/mock/5c8f0c2873f3100017a64234",
				changeOrigin: true
			},
			"/api/finance/invoice": {
				target: "http://192.168.20.51:7300/mock/5c8752f273f3100017a641f5",
				changeOrigin: true
			},
			"/api/finance//periodic": {
				target: "http://192.168.20.51:7300/mock/5c7fa2bd73f3100017a6412e",
				changeOrigin: true
			},
			"/api/finance/advance": {
				target: "http://192.168.20.51:7300/mock/5c7fa2bd73f3100017a6412e",
				changeOrigin: true
			},
			"/api": {
				target: "http://nb.tst-weiboyi.com",
				changeOrigin: true
			}
		},
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.(less|css)$/,
				use: [
					'css-hot-loader',
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader', // compiles Less to CSS
						options: {
							modifyVars: {
								'primary-color': '#1890ff',
								'link-color': '#1890ff',
							},
							javascriptEnabled: true,
						},
					}
				],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"',
		}),
		new webpack.HotModuleReplacementPlugin()
	]
})

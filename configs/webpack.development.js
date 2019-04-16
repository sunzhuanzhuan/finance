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
			"/api/operator-gateway": {
				target: "http://192.168.20.51:7300/mock/5c73560e73f3100017a640ad",
				changeOrigin: true
			},
			"/api/common-price/finance": {
				target: "http://192.168.20.51:7300/mock/5c98a76a73f3100017a642ff",
				changeOrigin: true
			},
			"/api/finance/invoice": {
				target: "http://192.168.20.51:7300/mock/5c98a76a73f3100017a642ff",
				changeOrigin: true
			},
			"/api/trinity": {
				target: "http://192.168.20.128:8010",
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

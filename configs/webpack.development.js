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
			"/api/test": {
				target: "http://192.168.20.51:7300/mock/5b5693d00a4cc60021ebdf6e",
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
								'primary-color': '#1DA57A',
								'link-color': '#1DA57A',
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

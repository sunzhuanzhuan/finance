const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
	devServer: {
		port: '3000',
		historyApiFallback: true,
		open: true,
		hot: true,
		host: 'lg.nip.io',
		proxy: {
			"/api": {
				target: "http://192.168.100.196:8090",
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
				test: /\.css$/,
				use: [
					'css-hot-loader',
					'style-loader',
					'css-loader'
				],
			},
			{
				test: /\.less$/,
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
			__DEV__: JSON.stringify(true),
		}),
		new webpack.HotModuleReplacementPlugin()
	]
})

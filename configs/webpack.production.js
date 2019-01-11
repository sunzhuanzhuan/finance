const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cssnano = require('cssnano');

module.exports = merge(baseConfig, {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader"
				]
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "static/css/[name].css",
			chunkFilename: "static/css/[id].css"
		}),
		new CleanWebpackPlugin(["build"], {
			root: path.resolve(__dirname, "../"),
			verbose: true
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			}
		})
	]
})

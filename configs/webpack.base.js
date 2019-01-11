const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'static/js/bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [
					path.resolve(__dirname, '../src'),
				],
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: { // 压缩 jpeg 的配置
								progressive: true,
								quality: 65
							},
							optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
								enabled: false,
							},
							pngquant: { // 使用 imagemin-pngquant 压缩 png
								quality: '65-90',
								speed: 4
							},
							gifsicle: { // 压缩 gif 的配置
								interlaced: false,
							},
							webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
								quality: 75
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', 'json', '.less', '.css'],
		modules: [
			path.resolve(__dirname, '../node_modules'),
			path.resolve(__dirname, '../src')
		],
		alias: {
			"@": path.resolve(__dirname, '../src')
		}
	},
	optimization: {
		minimizer: [
			new ParallelUglifyPlugin({ // 多进程压缩
				cacheDir: '.cache/',
				uglifyJS: {
					output: {
						comments: false,
						beautify: false
					},
					compress: {
						warnings: false,
						drop_console: true,
						collapse_vars: true,
						reduce_vars: true
					}
				}
			}),
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: "initial",
					test: path.resolve(__dirname, "node_modules"), // 路径在 node_modules 目录下的都作为公共部分
					name: "vendor", // 使用 vendor 入口作为公共部分
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html', // 配置输出文件名和路径
			template: 'public/index.html', // 配置文件模板
			minify: { // 压缩 HTML 的配置
				minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
				minifyJS: true // 压缩 HTML 中出现的 JS 代码
			}
		})
	],
}

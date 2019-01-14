const path = require('path')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const createHappyPlugin = (id, loaders) => new HappyPack({
	id: id,
	loaders: loaders,
	threadPool: happyThreadPool,
	verbose: process.env.HAPPY_VERBOSE === '1' // make happy more verbose with HAPPY_VERBOSE=1
});
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
		extensions: ['.js', '.jsx', 'json'],
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
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
				vendors: { // 项目基本框架等
					chunks: 'all',
					test: /(react|react-dom|react-router-dom|babel-polyfill|redux|axios|react-redux)/,
					priority: 100,
					name: 'vendors',
				},
				icon: {
					test: /@ant-design/,
					priority: 100,
					name: 'icon',
					chunks: 'initial'
				},
				antd: {
					test: /antd/,
					priority: 100,
					name: 'antd',
					chunks: 'async'
				},
				wbyui: {
					test: /wbyui/,
					priority: 100,
					name: 'wbyui',
					chunks: 'async'
				},
				'async-commons': {  // 异步加载公共包、组件等
					chunks: 'async',
					minChunks: 2,
					name: 'async-commons',
					priority: 90,
				},
				commons: { // 其他同步加载公共包
					chunks: 'all',
					minChunks: 2,
					name: 'commons',
					priority: 80,
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
		}),
		createHappyPlugin('happy-babel', [{
			loader: 'babel-loader',
			options: {
				babelrc: true,
				cacheDirectory: true // 启用缓存
			}
		}])
	],
}

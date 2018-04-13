import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';
const publicPath = 'http://localhost:3000/';
const plugins = [
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		_: 'lodash'
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	}),
	new SpriteLoaderPlugin()
	// new ManifestPlugin(),
];

isProd
	? plugins.push(
		new ExtractTextPlugin({
			filename: 'css/styles.css',
			allChunks: true
		}),
		new CleanWebpackPlugin(['./build'])
		// new BundleAnalyzerPlugin()
	  )
	: plugins.push(
		new HtmlWebpackPlugin({
			favicon: 'favicon.ico',
			filename: 'index.html',
			chunks: ['main', 'commons'],
			inject: false,
			template: path.join(__dirname, './src/index.twig')
		}),
		new webpack.HotModuleReplacementPlugin()
	  );

const style = isProd
	? ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			{ loader: 'css-loader', options: { sourceMap: true, minimize: true } },
			{ loader: 'postcss-loader', options: { sourceMap: true } },
			{ loader: 'sass-loader', options: { sourceMap: true } }
		]
	  })
	: [
		{ loader: 'style-loader', options: { sourceMap: true } },
		{ loader: 'css-loader', options: { sourceMap: true } },
		{ loader: 'postcss-loader', options: { sourceMap: true } },
		{ loader: 'sass-loader', options: { sourceMap: true } }
	  ];

export default {
	mode: isProd ? 'production' : 'development',
	entry: {
		main: ['babel-polyfill', path.join(__dirname, './src/index.js')]
	},
	output: {
		path: path.join(__dirname, './build'),
		publicPath,
		filename: 'js/[name].js'
	},
	target: 'web',
	optimization: {
		minimize: isProd ? true : false,
		runtimeChunk: {
			name: 'vendors'
		},
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'initial',
					minSize: 2
				}
			}
		}
	},
	plugins,
	devServer: {
		contentBase: path.join(__dirname, './build/'),
		port: 3000,
		noInfo: true,
		overlay: true,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8080'
			}
		}
	},
	devtool: 'source-map',
	module: {
		rules: [
			//---------------------ESLint---------------------//
			{
				enforce: 'pre',
				test: /\.(js|jsx)?$/,
				include: path.join(__dirname, './src'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'eslint-loader',
						options: { configFile: path.resolve(__dirname, './.eslintrc') }
					}
				]
			},
			//---------------------JS----------------------//
			{
				test: /\.(js|jsx)?$/,
				include: path.join(__dirname, './src'),
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			//---------------------VUE----------------------//
			{
				test: /\.vue?$/,
				use: 'vue-loader'
			},
			//---------------------TWIG-------------------//
			{
				test: /\.twig$/,
				loader: 'twig-loader',
				options: {
					rethrow: false
				}
			},
			//---------------------Styles---------------------//
			{
				test: /\.(sass|scss|css)$/,
				use: style
			},
			//--------------------Fonts--------------------//
			{
				test: /\.(woff2|ttf|eot)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'assets/fonts/[name].[ext]',
					publicPath
				}
			},
			//--------------------Images--------------------//
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'assets/images/[name].[ext]',
							publicPath
						}
					}
				]
			},
			//--------------------Video--------------------//
			{
				test: /\.mp4$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'assets/media/[name].[ext]',
					publicPath
				}
			},
			//---------------------SVG---------------------//
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: { symbolId: 'icon-[name]' }
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{
									addClassesToSVGElement: {
										className: 'icon'
									}
								},
								{ removeTitle: true },
								{ convertPathData: false },
								{ removeUselessStrokeAndFill: true }
							]
						}
					}
				]
			}
		]
	},
	resolve: {
		modules: ['node_modules', 'assets'],
		extensions: ['.js', '.jsx'],
		alias: {
			variables: path.resolve(__dirname, './src/styles/tools/variables.scss')
		}
	}
};

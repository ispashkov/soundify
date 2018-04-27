import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ManifestPlugin from 'webpack-manifest-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import OfflinePlugin from 'offline-plugin';

const isProd = process.env.NODE_ENV === 'production';
const publicPath = '/';
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
	new SpriteLoaderPlugin(),
	new ManifestPlugin({
		fileName: 'build-manifest.json'
	}),
	new WebpackPwaManifest({
		filename: 'manifest.json',
		name: 'Soundify App',
		orientation: 'landscape',
		display: 'standalone',
		start_url: '.',
		short_name: 'Soundify',
		description: 'Streaming Music Service',
		background_color: '#ffffff',
		ios: true,
		inject: true,
		icons: [
			{
				src: path.resolve('./src/assets/icon.png'),
				sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
			}
		]
	}),
	new OfflinePlugin({
		safeToUseOptionalCaches: true,

		externals: ['/'],

		ServiceWorker: {
			events: true,
			navigateFallbackURL: '/',
			publicPath: '/sw.js'
		},

		AppCache: {
			events: true,
			publicPath: '/appcache',
			FALLBACK: {
				'/': '/'
			}
		}
	})
];

isProd
	? plugins.push(
		new ExtractTextPlugin({
			filename: 'css/styles.[chunkhash].css',
			allChunks: true
		}),
		new CleanWebpackPlugin(['./build'])
		// new BundleAnalyzerPlugin()
	  )
	: plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			chunks: ['bundle', 'vendors'],
			template: path.join(__dirname, './src/index.twig')
		})
	  );

const style = isProd
	? ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			{ loader: 'css-loader', options: { minimize: true } },
			{ loader: 'postcss-loader' },
			{ loader: 'sass-loader' }
		]
	  })
	: [
		{ loader: 'style-loader' },
		{ loader: 'css-loader', options: { sourceMap: true } },
		{ loader: 'postcss-loader' },
		{ loader: 'sass-loader' }
	  ];

export default {
	mode: isProd ? 'production' : 'development',
	entry: {
		bundle: ['babel-polyfill', path.join(__dirname, './src/index.js')]
	},
	output: {
		path: path.join(__dirname, './build'),
		publicPath,
		filename: 'js/[name].[hash].js'
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
		https: true,
		port: 3000,
		noInfo: true,
		overlay: true,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				pathRewrite: { '^/api': '' }
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
				use: ['eslint-loader']
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
			{
				test: /\.ico$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name].[ext]',
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
			variables: path.resolve(__dirname, './src/styles/tools/variables.scss'),
			'@': path.join(__dirname, './src')
		}
	}
};

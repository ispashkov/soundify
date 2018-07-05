import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ManifestPlugin from 'webpack-manifest-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import OfflinePlugin from 'offline-plugin';

export default (env, { mode }) => {
	const publicPath = '/';
	const isProd = mode === 'production';

	const plugins = [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			_: 'lodash'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(mode)
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[contenthash].css'
		}),
		new SpriteLoaderPlugin(),
		new ManifestPlugin({
			fileName: 'static/build-manifest.json'
		}),
		new WebpackPwaManifest({
			filename: 'static/manifest.json',
			name: 'Soundify App',
			orientation: 'landscape',
			display: 'standalone',
			start_url: '/',
			short_name: 'Soundify',
			description: 'Streaming Music Service',
			background_color: '#315efb',
			theme_color: '#315efb',
			ios: true,
			inject: true,
			icons: [
				{
					src: path.resolve('src/assets/icon.png'),
					sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
					destination: path.join('static')
				}
			]
		})
	];

	isProd
		? plugins.push(
			// new BundleAnalyzerPlugin(),
			new CleanWebpackPlugin(['build']),
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
		  )
		: plugins.push(
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['bundle', 'vendors'],
				template: path.resolve('src/index.twig')
			})
		  );

	return {
		entry: {
			bundle: ['babel-polyfill', path.resolve('src/index.js')]
		},
		output: {
			path: path.resolve('build'),
			filename: 'static/js/[name].[hash].js',
			publicPath
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
			contentBase: path.resolve('build'),
			port: 3000,
			overlay: true,
			hot: true,
			historyApiFallback: true,
			proxy: {
				'/api': {
					target: 'http://localhost:8080',
					pathRewrite: { '^/api': '' }
				},
				'/uploads': {
					target: 'http://localhost:8080'
				}
			}
		},
		devtool: isProd ? 'source-map' : 'eval',
		module: {
			rules: [
				//---------------------ESLint---------------------//
				{
					enforce: 'pre',
					test: /\.(js|jsx)?$/,
					include: path.resolve('src'),
					exclude: /node_modules/,
					use: ['eslint-loader']
				},
				//---------------------JS----------------------//
				{
					test: /\.(js|jsx)?$/,
					include: path.resolve('src'),
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
					use: [
						isProd ? MiniCssExtractPlugin.loader : 'style-loader',
						{
							loader: 'css-loader',
							options: { minimize: isProd, sourceMap: true }
						},
						{ loader: 'postcss-loader', options: { sourceMap: true } },
						{ loader: 'sass-loader', options: { sourceMap: true } }
					]
				},
				//--------------------Fonts--------------------//
				{
					test: /\.(woff2|ttf|eot)$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'static/media/fonts/[name].[ext]',
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
								name: 'static/media/images/[name].[ext]',
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
								name: 'static/[name].[ext]',
								publicPath
							}
						}
					]
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
			modules: ['node_modules'],
			extensions: ['.js', '.jsx', '.json'],
			alias: {
				variables: path.resolve('src/styles/tools/variables.scss'),
				'@': path.resolve('src')
			}
		}
	};
};

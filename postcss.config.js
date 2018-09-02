module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-preset-env'),
		require('precss')({}),
		require('cssnano')({ zindex: false }),
		require('postcss-flexbugs-fixes'),
		require('postcss-sorting')({})
	]
};

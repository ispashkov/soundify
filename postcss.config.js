module.exports = {
	plugins: [
		require('autoprefixer')({ grid: true }),
		require('postcss-preset-env'),
		require('precss')({}),
		require('cssnano')({ zindex: false }),
		require('postcss-flexbugs-fixes'),
		require('postcss-sorting')({})
	]
};

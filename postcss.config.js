module.exports = {
	plugins: {
		autoprefixer: { browsers: ['> 1%', 'last 2 versions', 'ie >= 11'] },
		precss: {},
		cssnano: {},
		'postcss-flexbugs-fixes': {
			browsers: ['> 1%', 'last 2 versions', 'ie >= 11']
		},
		'postcss-sorting': {},
		'postcss-cssnext': { browsers: ['> 1%', 'last 2 versions'] }
	}
};

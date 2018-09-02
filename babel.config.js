module.exports = function (api) {
	const presets = [
		'@babel/preset-env', 
		'@babel/preset-react'
	];

	const plugins = [
		'@babel/plugin-syntax-dynamic-import', 
		'@babel/plugin-proposal-export-default-from', 
		'@babel/plugin-proposal-class-properties',
		['module-resolver', {
			'alias': {
				'@': './src'
			}
		}]
	];

	api.cache(true);

	return {
		presets,
		plugins
	};
};
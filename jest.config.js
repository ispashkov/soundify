module.exports = {
	setupTestFrameworkScriptFile: '<rootDir>/test.config.js',
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/styleMock.js',
		'\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
	}
};

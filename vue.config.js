module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
	? '/' + process.env.CI_PROJECT_NAME + '/'
	: '/',
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/Styles/Variables.scss";
					@import "@/Styles/Keyframes.scss";
				`
			}
		}
	}
};
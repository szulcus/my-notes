module.exports = {
    publicPath: '/',
    css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/Styles/Variables.scss";
					@import "@/Styles/Keyframes.scss";
				`
			}
		}
	},

    pluginOptions: {
      i18n: {
        locale: 'pl',
        fallbackLocale: 'pl',
        localeDir: 'Locales',
        enableInSFC: false
      }
    }
};

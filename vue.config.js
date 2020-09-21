module.exports = {
		publicPath: '/',
		pwa: {
			name: 'MyNotes',
			themeColor: '#32CD32',
			msTileColor: '#000000',
			appleMobileWebAppCapable: 'yes',
			appleMobileWebAppStatusBarStyle: '#202020'
		},
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

import Vue from 'vue'
import App from './App.vue'
import router from './Router'
import '@/Config/FaIcons.js'
import '@/Styles/Global.scss'
import '@/Config/Firebase'
import '@/Config/Fragment'
import i18n from './i18n'
import './registerServiceWorker'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    let lang = to.params.lang
    if (!lang) {
        lang = 'pl'
    }
    i18n.locale = lang
    next()
})

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')